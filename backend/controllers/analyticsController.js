const prisma = require("../models/prisma");


const getAnalytics = async (req, res) => {
  try {
    const { range = 'monthly' } = req.query;
    console.log('req.user is ', req.user);
    const userId = req.user.id;
    const now = new Date();
    let startDate;

    if (range === "yearly") {
      startDate = new Date(now.getFullYear(), 0, 1); // Start of year
    } else if (range === "monthly") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of month
    } else {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        deleted: false,
        date: { gte: startDate },
      },
    });

    // Calculate analytics
    const monthlySummary = {};
    const categorySummary = {};
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      const month = transaction.date.getMonth() + 1;
      const year = transaction.date.getFullYear();
      const key = `${year}-${month}`;

      if (!monthlySummary[key]) {
        monthlySummary[key] = { income: 0, expense: 0 };
      }

      if (transaction.type === "income") {
        monthlySummary[key].income += transaction.amount;
        totalIncome += transaction.amount;
      } else {
        monthlySummary[key].expense += transaction.amount;
        totalExpense += transaction.amount;

        categorySummary[transaction.category] =
          (categorySummary[transaction.category] || 0) + transaction.amount;
      }
    });

    // Format monthly data for chart
    const monthlyData = Object.entries(monthlySummary).map(([month, data]) => ({
      month,
      ...data,
    }));

    // Format category data for chart
    const categoryData = Object.entries(categorySummary).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );

    res.status(200).json({ 
        message: "Analytics data fetched successfully",
        analytics: {
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
          monthlyData,
          categoryData,
        }
  });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};

module.exports = {
  getAnalytics,
};

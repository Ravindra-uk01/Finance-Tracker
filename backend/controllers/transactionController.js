const prisma = require("../models/prisma");

const getTransactions = async (req, res) => {
  try {
    const {
      type,
      category,
      startData,
      endDate,
      page = 1,
      perPage = 10,
    } = req.query;

    console.log("Query params: ", req.query);

    const offset = (page - 1) * perPage;
    const where = {
      deleted: false,
    };

    if (req.user.role !== "ADMIN") {
      where.userId = req.user.id;
    }

    if (type) {
      where.type = type;
    }
    if (category) {
      where.category = category;
    }
    if (startData && endDate) {
      where.date = {
        gte: new Date(startData),
        lte: new Date(endDate),
      };
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip: offset,
        take: parseInt(perPage),
        orderBy: { date: "desc" },
      }),
      prisma.transaction.count({ where }),
    ]);

    res.status(200).json({ 
        message: "Transactions fetched successfully",
        transactions,
        pagination : {
            total,
            page: parseInt(page),
            perPage: parseInt(perPage),
            totalPages: Math.ceil(total / perPage),
        }
     });
  } catch (error) {
    console.log('error fetching transactions: ', error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const createTransaction = async (req, res) => {
  try {
    const {date, ...rest} = req.body;
    
    const parsedDate = new Date(date);
    const transaction = await prisma.transaction.create({
      data: {
        ...rest,
        date: parsedDate,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error creating transaction: ", error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {date, ...rest} = req.body;
    
    const parsedDate = new Date(date);
    const transactionExists = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });

    if (!transactionExists) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        ...rest,
        date: parsedDate,
      },
    });

    // user can edit its own transactions and admin all transactions
    if (req.user.role !== "ADMIN" && transaction.userId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json({
      message: `Transaction ${id} updated successfully`,
      transaction,
    });
  } catch (error) {
    console.error("Error updating transaction: ", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (req.user.role !== "ADMIN" && transaction.userId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized " });
    }

    // Soft delete
    await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: { deleted: true },
    });

    res.status(200).json({ message: `Transaction ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting transaction: ", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};



const getAnalytics = async (req, res) => {
    try {
        
        
        res.status(200).json({ message: 'Analytics data fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
}

module.exports = {
    getAnalytics
};
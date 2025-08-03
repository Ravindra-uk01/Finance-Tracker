


const getUsers = async (req, res) => {
    try {
        // Logic to fetch users
        res.status(200).json({ message: 'Users fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}


module.exports = {
    getUsers
};
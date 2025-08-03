const express = require('express');
const cors = require('cors');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const analyticsRoutes = require('./routes/analytics');
const userRoutes = require('./routes/users');
const { errorHandler } = require('./middlewares/error');


const app = express();
app.use(cors());
app.use(express.json());

// Rate limiting middleware
const authLimiter = rateLimit({
    winodowMs: 15*60*1000,
    max: 5,
    message: "Too many requests , Please try again Later"
})

const transactionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100, 
    message: "Too many requests , please try again later"
});

const analyticsLimiter = rateLimit({
    windowMs: 60*60*1000,
    max: 50,
    message : "Too many requests, Please try again later"
})

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/transactions', transactionLimiter, transactionRoutes);
app.use('/api/analytics', analyticsLimiter, analyticsRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling - need to be a logic for global error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const bcrypt = require('bcryptjs');

//  name         String
//   email        String
//   password     String
//   role         Role 

const register = async(req, res, next) => {
    try {
       
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        console.log('hashPassword : ', hashPassword);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword, 
                role: 'USER'
            }
        });
        console.log('newUser : ', newUser);

        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
             message: 'User registered successfully' ,
             user: userWithoutPassword
        });
    } catch (error) {
        next(error);
    }
}

const login = async(req, res, next) => {
    try {
       
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        console.log('user : ', user);

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ 
            message: 'User logged in successfully',
            user : userWithoutPassword
        });
    } catch (error) {
        next(error);
    }
}

const logout = async(req, res, next) => {
    try {
        // Logout logic here
        // Typically, you would clear the session or token here

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    register,       
    login,
    logout
};
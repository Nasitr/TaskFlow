const User = require('../models/User');

class AuthController {
    // Show login page
    showLogin(req, res) {
        res.render('auth/login', { 
            title: 'Login',
            error: req.query.error
        });
    }

    // Show registration page
    showRegister(req, res) {
        res.render('auth/register', { 
            title: 'Register',
            error: req.query.error
        });
    }

    // Handle login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);

            if (!user) {
                return res.redirect('/login?error=Invalid credentials');
            }

            const isValidPassword = await User.verifyPassword(password, user.password);
            if (!isValidPassword) {
                return res.redirect('/login?error=Invalid credentials');
            }

            // Set user session
            req.session.user = {
                id: user.id,
                email: user.email,
                name: user.name
            };

            res.redirect('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            res.redirect('/login?error=An error occurred');
        }
    }

    // Handle registration
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.redirect('/register?error=Email already registered');
            }

            // Create new user
            await User.create({ name, email, password });
            res.redirect('/login?message=Registration successful');
        } catch (error) {
            console.error('Registration error:', error);
            res.redirect('/register?error=An error occurred');
        }
    }

    // Handle logout
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
            }
            res.redirect('/login');
        });
    }
}

module.exports = new AuthController(); 
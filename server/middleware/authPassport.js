const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findAdminByEmail, checkPassword, findAdminById } = require('../model/adminModels.js');
const {registerUser,loginUser, findUserByEmail} = require("../model/userModel");

// Passport Local Strategy for Admin Login
passport.use('admin-local',new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            console.log("admin");
            
            const admin = await findAdminByEmail(email);
            if (!admin) {
                return done(null, false, { message: 'Email tidak ditemukan' });
            }

            const isMatch = await checkPassword(password, admin.password);
            if (!isMatch) {
                return done(null, false, { message: 'Password salah' });
            }

            return done(null, admin);
        } catch (err) {
            return done(err);
        }
    }
));
passport.use('user-local',new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            console.log("user");
            
            const user = await findUserByEmail(email);
            if (!user) {
                return done(null, false, { message: 'Email tidak ditemukan' });
            }

            const isMatch = await checkPassword(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Password salah' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const admin = await findAdminById(id);
        done(null, admin);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;

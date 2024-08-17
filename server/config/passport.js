const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findAdminByEmail, checkPassword } = require('../model/adminModels.js');

// Konfigurasi strategi lokal Passport
passport.use(new LocalStrategy(
    async (email, password, done) => {
        try {
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

// Serialisasi dan Deserialisasi pengguna
passport.serializeUser((admin, done) => {
    done(null, admin.email); // Serialize based on a unique identifier
});

passport.deserializeUser(async (email, done) => {
    try {
        const admin = await findAdminByEmail(email);
        done(null, admin);
    } catch (err) {
        done(err);
    }
});

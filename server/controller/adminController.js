const { registerAdmin, findAdminByEmail } = require("../model/adminModels.js");
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingAdmin = await findAdminByEmail(email);
        if (existingAdmin) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = {
            username,
            email,
            password: hashedPassword
        };

        await registerAdmin(newAdmin);
        console.log(newAdmin, " => Di Controller");

        res.status(201).json({ message: 'Admin berhasil terdaftar', data: newAdmin });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.loginAdmin = (req, res, next) => {
    passport.authenticate('admin-local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',// Jika Anda ingin menggunakan flash messages
        session: true        // Pastikan hanya menyimpan sesi jika login berhasil
    })(req, res, next);
}

exports.logoutAdmin = (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        res.redirect('/');
    });
}

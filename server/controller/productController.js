const  db = require('../connection/db.js'); 
const product = require("../model/productModel.js");
const {getAllProduct} = require("../model/productModel");
const upload = require('../middleware/multer.js');
const cloudinary = require("../utils/cloudinary.js");
const moment = require('moment-timezone');

exports.postProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        const indonesiaTimeYMD = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
        const indonesiaTimeHMS = moment().tz('Asia/Jakarta').format('HH:MM:SS');
        const uniqueName = indonesiaTimeYMD + "-" + indonesiaTimeHMS + "-" + req.file.originalname;
        
        cloudinary.uploader.upload(req.file.path, {public_id : uniqueName} ,async function(err, result) {
        if (!name || !price) {
            return res.status(400).json({ error: 'Semua bidang wajib diisi' });
        }

        // Membuat objek produk baru
        const newProduct = { 
            image : result["url"], 
            name, 
            price 
        };

        // Menyisipkan produk baru ke dalam database
        await product.postProduct(newProduct);


            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "error image upload"
                });
            }
            res.status(200).json({
                success: true,
                message: "upload image",
                data: result
            })
        })


    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ error: 'Kesalahan Internal Server' });
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        // Mengambil semua produk dari database
        const products = await product.getAllProduct();

        // Mengirimkan respons dengan status 200 dan data produk
        return products;
    } catch (error) {
        // Mengirimkan respons dengan status 500 jika terjadi kesalahan
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // ID produk yang akan diperbarui
        const { name, price } = req.body;

        // Validasi input
        if (!name || !price) {
            return res.status(400).json({ error: 'Semua bidang wajib diisi' });
        }

        let imageUrl = null;

        // Jika ada file gambar baru yang diupload
        if (req.file) {
            const indonesiaTimeYMD = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
            const indonesiaTimeHMS = moment().tz('Asia/Jakarta').format('HH-mm-ss'); // Perbaiki format menjadi HH-mm-ss
            const uniqueName = indonesiaTimeYMD + "-" + indonesiaTimeHMS + "-" + req.file.originalname;

            // Upload gambar baru ke Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, { public_id: uniqueName });
            imageUrl = result.url;

        }

        // Membuat objek produk baru
        const updatedProduct = { 
            name, 
            price, 
            ...(imageUrl && { image: imageUrl }) // Hanya update gambar jika imageUrl ada
        };

        // Memperbarui produk di database
        const updateResult = await product.updateProduct(id, updatedProduct);

        if (updateResult) {
            res.status(200).json({
                success: true,
                message: 'Produk berhasil diperbarui',
                data: updatedProduct
            });
        } else {
            res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ error: 'Kesalahan Internal Server' });
    }
}

exports.deleteProduct = async(req,res)=>{
    try{
        const deleted = await product.deleteProduct(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}


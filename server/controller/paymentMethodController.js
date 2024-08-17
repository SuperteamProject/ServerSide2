const midTransClient = require('midtrans-client');
const cartItem = require("../model/cartModel.js");

exports.PaymentMethodController = async (req,res)=>{
    const { id, amount } = req.body;
    const cartItems = await cartItem.getProductToCartById(id);
    let snap = new midTransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-CBJDcQ3laHuqNrE5GfuoNJeH',
       
    });

    try{
        const transaction = await snap.createTransaction({
            transaction_details: {
              order_id: `order-${Date.now()}`,
              gross_amount: amount,
            },
            item_details: cartItems.map(item => ({
              id: item.product_id,
              price: item.price,
              quantity: item.quantity,
              name: item.name,
            })),
            customer_details: {
              email: 'customer@example.com', // You can pass real user email here
            },
        });
        res.status(200).json({ payment_url: transaction.redirect_url });
        
    }catch(err){
        console.log(err);
        
        res.status(500).json({ error: 'Failed to process payment' });
    }
}
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const Product = require("../models/Product.model")
const Payment = require("../models/Payment.model.js")

const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.post("/create-payment-intent",isAuthenticated, async (req, res, next) => {

  const productId = req.body._id; 

  try {

    // TODO . this is where you will later get the correct price to be paid
    const product = await Product.findById(productId)
    const priceToPay = product.price*100
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceToPay , 
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
     
   
      
  

await Payment.create({
    price: priceToPay,
    product: productId,
    status: "incomplete",
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    
  })
  
 

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    
  } catch (error) {
    next(error)
  } 
});




router.patch("/update-payment-intent", async (req, res, next) => {
    const { clientSecret, paymentIntentId } = req.body;
  
    try {
  
      await Payment.findOneAndUpdate({
        clientSecret: clientSecret,
        paymentIntentId: paymentIntentId,
      },{ 
        status: "succeeded" 
      });
  
      res.status(200).json();
  
    } catch (error) {
      next(error);
    }
  });
  
  
  

module.exports = router
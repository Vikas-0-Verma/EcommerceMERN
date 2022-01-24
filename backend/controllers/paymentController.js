const asyncError = require('../middelware/catchasyncerror')
const stripe = require('stripe')("sk_test_51KECMZSDQLfWwbBysITJT7RZRiHlD5pM61rXjACV4DwsIQgXy4YrPRnQuEKBHBcofvPHOPlYu08B73iwHzVdODnD00zdzFP9ub");

exports.processpayment = asyncError( async(req,res, next)=>{
    console.log(req.body.amount)
    const mypayment =  await stripe.paymentIntents.create({
        amount : req.body.amount,
        currency: 'inr',
        metadata: {
            company :"Ecommerce"
        } 
    });

   
    res.status(200).json({
        success: true,
        client_secret: mypayment.client_secret
    })
})

exports.sendApiKey = asyncError( async(req,res, next)=>{

    res.status(200).json({
        success: true,
        stripeApiKey: process.env.PUBLIC_KEY
    })
})
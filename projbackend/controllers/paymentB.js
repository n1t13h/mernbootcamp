var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId:   'xyj65jnpjsqfrb6y',
    publicKey:    '5d2ztsnpc3q82733',
    privateKey:   '815619aaca146d0ef1223b752bab4f47'
});

exports.getToken = (req,res)=>{
    gateway.clientToken.generate({
      }, function (err, response) {
        if(err){
            res.status(400).send(err)
        }else{
            res.send(response)
        }
      });
}
exports.processPayment=(req,res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(
                  error
              )
          }else{
              res.json(result)
          }
      });
}
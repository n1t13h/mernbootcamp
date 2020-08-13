import React, { useState, useEffect } from 'react';
import { loadCart, cartEmpty } from './helper/CartHelper';
import { Link, Redirect } from 'react-router-dom';
import { getMeToken, processPayment } from './helper/paymenthelper';
import { createOrder } from './helper/orderhelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';
import swal from 'sweetalert'



const PaymentB = ({ products, setReload = f => f, reload = undefined }) => {
    const [info,setInfo] = useState({
        loading:false,
        success:false,
        clientToken:null,
        instance:{},
        error:"",
    })
    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    
    const getToken =(userId,token)=>{
        getMeToken(userId,token).then(info=>{
            
            console.log("INFO",info)
            console.log(info.clientToken);
            if(info.error){
                setInfo({...info,error:info.error});
            }else{
                const clientToken = info.clientToken;
                setInfo({clientToken});
            }
        }).catch()

        
    }
    const getFinalPrice = ()=>{
        let amount =0;
        products.map(p=>{
            amount = amount + p.price;
        })
        return amount;
     }
    useEffect(()=>{
        getToken(userId,token);
    },[])
    const onPurchase= () =>{
        
        setInfo({loading:true})
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()    
            .then(data=>{
                nonce = data.nonce
                const paymentData={
                    paymentMethodNonce :nonce,
                    amount : getFinalPrice(),
                };
                processPayment(userId,token,paymentData)
                .then(response=>{
                    setInfo({...info,success:true,success:response.success,loading:false})
                    console.log("PAYMENT SUCCESS");
                    const orderData = {
                        products : products,
                        transaction_id : response.transaction.id,
                        amount: response.transaction.amount
                    }
                    createOrder(userId,token,orderData);
                    cartEmpty(()=>{
                        console.log("Did we got a crash?")
                    })
                    swal({
                        title: "Good job!",
                        text: "Payment Success!!!!",
                        icon: "success",
                        button: "Aww yiss!",
                      });
                      setReload(!reload);
                })
                .catch(error=>{
                    setInfo({loading:false,success:false})
                })
            })
            .catch()
        }
    
    const createFakeOrder = ()=>{
        console.log("In fake order")
        const orderData = {
            products : products,
            transaction_id :  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            amount: getFinalPrice()
        }
        createOrder(userId,token,orderData)
    }
    const showBrainTreeDropIn = ()=>{
        return(
            <div>
                {info.clientToken !==null && products.length > 0 ?(
                    <div>
                    <DropIn
                      options={{ authorization: info.clientToken }}
                      onInstance={(instance) => (info.instance = instance)}
                    />
                    {info.clientToken===undefined?<h3>Log In To Continue</h3>:
                    <button className="btn  rounded btn-lg theme-blue"  onClick={onPurchase}>Buy</button>}
                  </div>
                ):(
                    <h3 className="text-dark">Please Login or Add Something to Cart</h3>
                )}
            </div>
        )
    }
    return (
        <div>
            <h3 className="text-black">Braintree</h3>
    <h2>Your Total Bill is $ {getFinalPrice()}</h2>
                    
            {showBrainTreeDropIn()}
        </div>
    )
}
export default PaymentB;
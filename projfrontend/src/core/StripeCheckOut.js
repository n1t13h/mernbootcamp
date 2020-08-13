import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { Link } from 'react-router-dom';


const StripeCheckOut = ({products,setReload=f=>f,reload=undefined})=>{
    const [data,setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:"",
    })

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const getFinalPrice = ()=>{
       let amount =0;
       products.map(p=>{
           amount = amount + p.price;
       })
       return amount;
    }
    const showStripeButton=()=>{
        return isAuthenticated()?(
            <button className="btn btn-info">Pay With Stripe</button>
        ):(<Link to="/signin" className="btn btn-warning">Sign in</Link>)
    }
    return(
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}
export default StripeCheckOut;
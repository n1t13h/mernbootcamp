import React, { useState } from 'react';
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper"
const Signin = () => {
    const [ values, setValues ] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })

    const { email, password, error, didRedirect, loading } = values;

    const { user } = isAuthenticated();
    const performRedirect = ()=>{
        // TODO:COME BACK HERE
        if(didRedirect){
            if(user && user.role ===1){
                return <Redirect to="/admin/dashboard"/>;
            }else{
                return <Redirect to="/user/dashboard"/>;

            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>;
        }
    }
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });


    };
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading....</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{
                            display: error ? "" : "none"
                        }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        signin({
            email,password
        })
        .then(
            data=>{
                if(data.error){
                    setValues({...values,error:data.error,loading:false});

                }else{
                    authenticate(data,()=>{
                        setValues({
                            ...values,
                            didRedirect:true,

                        })
                    });
                }
            }
        )
        .catch(
            console.log("Sign in request failed")
        )
    }
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>

                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input value={password} className="form-control" onChange={handleChange("password")} type="password" />
                        </div>
                        <button onClick={onSubmit} className="btn theme-red text-white font-weight-bold btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base title="Sign IN Page" description="A Page For User To Sign IN!" className="theme-blue container pt-4 pb-4 mb-4">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            
        </Base>
    )

}

export default Signin
import React, { useState,useEffect } from 'react';
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { updateCategory, getCategory } from "./helper/adminapicall";
const UpdateCategory = ({match,history}) => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    useEffect(() => {
        preload(match.params.categoryId);
    }, [])

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setName(data.name);
                // console.log(categories);
            }

        })
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        updateCategory(match.params.categoryId,user._id,token,{name})
        .then(data => {
            if(data.err){
                setError(true);
            }else{
                setError(false);
                setSuccess(true);
                setName("");
            }
            setTimeout(()=>(
                history.push('/admin/dashboard')
            ),2000)
        })


    }
    const handleChange = event => {
        setError("");
        setName(event.target.value);

    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>
        )
    }
    const successMessage= () =>{
        if(success){
            return <div class="alert alert-primary" role="alert">
            Category Updated Successfully , Redirecting....
          </div>
        }
    }
    
    const warningMessage= () =>{
        if(error){
            return <div class="alert alert-primary" role="alert">
            Error Creating the item
          </div>
        }
    }
    const categoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-dark font-weight-bold">Enter The Category</label>
                    <input placeholder="For Ex. Summer" className="form-control" value={name} onChange={handleChange} type="text" />
                    <button className="btn btn-outline-info rounded btn-lg mt-2" onClick={onSubmit} >Create </button>
                </div>
            </form>
        )
    }
    return (
        <Base title="Create a category here" description="add a new category for new products" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2 ">
                    {successMessage()}
                    {warningMessage()}
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>

    )
}
export default UpdateCategory;
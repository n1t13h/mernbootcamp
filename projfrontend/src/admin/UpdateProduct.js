import React, { useState, useEffect } from 'react';
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper';
import { Link, Redirect } from 'react-router-dom';
import { updateProduct, getCategories,getProduct, updateCategory } from "./helper/adminapicall";


const UpdateProduct = ({match}) => {
    const goBack = () => {
        return (
            <div className="mb-2">
                <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
                    Admin Home
                    </Link>

            </div>
        )
    }
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        stock: "",
        price: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""

    })

    useEffect(() => {
        preload(match.params.productId);
    }, [])

    const successMessage= () =>(
        
        <div class="alert alert-success" role="alert" style={{display:createdProduct?"":"none"}}>
            {createdProduct} Created Successfully
            
        </div>
       
    )
    const errorMessage= () =>(
        
        <div class="alert alert-danger" role="alert" style={{display:error?"":"none"}}>
            {error}
        </div>
       
    )
    
    
 

    const { name, description, stock, price, photo, categories, category, error, createdProduct, formData, getaRedirect } = values;
    const preload = (productId) => {
        getProduct(productId).then(data => {
            preloadCategories()
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ 
                    ...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category.id,
                    stock:data.stock,
                    formData:new FormData(),
                    
                 });
                // console.log(categories);
            }

        })
    }
    const preloadCategories = ()=>{
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({categories: data,formData:new FormData()});
                // console.log(categories);
            }
        })
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        updateCategory(match.params.categoryId,user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        error:"",
                        success:true
                    })

                }
            })
            .catch()

    }
    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value,error:"" });
    }
    const createProductForm = () => (
        <form >
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories && categories.map((cate, index) => (
                        <option key={index} value={cate._id}>{cate.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-2">
                Create Product
          </button>
        </form>
    );
    return (
        <Base title="Add A Product Here" description="Welcome to product creation section">
            <div className="container bg-info p-4">
                {goBack()}
                <div className="row bg-dark text-white rounded">

                    <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        {errorMessage()}
                        {createProductForm()}
                    </div>
                </div>
            </div>
        </Base>
    )
}
export default UpdateProduct;
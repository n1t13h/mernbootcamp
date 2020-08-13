import React from 'react';
import { API } from '../../backend';
const ImageHelper = ({product}) => {

    const imageurl = product ? `${API}/product/photo/${product._id}`:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" ;
    return (
        <div className="rounded">
            <img
                src={imageurl}
                alt="photo"
                style={{ maxHeight: "50%", maxWidth: "80%" }}
                className=" rounded img-thumbnail"

            />
        </div>
    )
}
export default ImageHelper
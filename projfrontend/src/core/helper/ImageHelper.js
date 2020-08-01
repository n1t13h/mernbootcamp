import React from 'react';
import { API } from '../../backend';
const ImageHelper = ({product}) => {

    const imageurl = product ? `${API}/product/photo/${product._id}`:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" ;
    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageurl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    )
}
export default ImageHelper
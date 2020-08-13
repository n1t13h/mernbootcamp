import { API } from "../../backend";
import { Fragment } from "react";

export const createCategory = (userId, token, category) => {
    return fetch(
        `${API}/category/create/${userId}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category),
        },

    )
        .then(response => {
            return response.json()
        })
        .catch(
            err => console.log(err)
        )
}
// GET ALL categories
export const getCategories = () => {
    return fetch(`${API}/categories`,
        {
            method: "GET",
        })
        .then(response => response.json())
        .catch(err => console.log(err))
}
export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`,
        {
            method: "GET"
        }
    )
        .then(response => response.json())
        .catch(err => console.log(err))

}
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  export const updateCategory = (categoryId,userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)

        }
    )
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// PRODUCT CALLS

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product

        }
    )
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getProducts = () => {
    return fetch(`${API}/products`,
        {
            method: "GET",
        })
        .then(response => response.json())
        .catch(err => console.log(err))
}

// DELTE A PRODUCT
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

// GET A PRODUCT
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,
        {
            method: "GET"
        }
    )
        .then(response => response.json())
        .catch(err => console.log(err))

}



// UPDATE  A PRODUCT 
export const updateProduct = (productId,userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,
        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product

        }
    )
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}


export const getOrders = (userId,token) => {
    return fetch(`${API}/order/all/${userId}`,
        {
            method: "GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err))
}
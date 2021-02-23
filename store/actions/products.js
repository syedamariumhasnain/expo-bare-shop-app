import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

// For Test Case: No product fount (when products.length === 0)
// put url, "https://shop-app-3caa2-default-rtdb.firebaseio.com/product.json"
// (correct url but serching in file which dont contain owr data)

// For Test Case: Error occured (try, catch when !response.ok, throw error)
// put url, "https://shop-app-3caa2-default-rtdb.firebaseio.com/products.jon"
// (broken the url, for catching server side errors)

// here we are using async await, NOT then catch, so we have to put the code in try catch block, so can easily throw error
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      // since it is GET request, don't need to mention "method"
      const response = await fetch(
        "https://shop-app-3caa2-default-rtdb.firebaseio.com/products.json"
      );
 
      // console.log(response);

      // returns true if response is in 200 status code range
      if(!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      // console.log(resData);

      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://shop-app-3caa2-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://shop-app-3caa2-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    // console.log(resData);

    // above this you can add any async code you want
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(
      // using `` codes we can pass data dynamically in url
      `https://shop-app-3caa2-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        // PUT fully re-write the resoure with new data while
        // PATCH updates it in specific places you want 
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
        throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title, // same as title: title,
        description, // description: description etc ...
        imageUrl,
      },
    });
  };

};

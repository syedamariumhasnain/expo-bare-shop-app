import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

// here we dont want data from app to perform action but data from database is provided to reducer to uppdate state data and thus app
export const fetchProducts = () => {
  return async (dispatch) => {
    // since it is GET request, don't need to mention "method"
    const response = await fetch(
      "https://shop-app-3caa2-default-rtdb.firebaseio.com/products.json"
    );

    const resData = await response.json();
    // console.log(resData);

    const loadedProducts = [];
    // since we need data ina array form, so we are looping through the object and pushing each product in array
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
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
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
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title, // same as title: title,
      description, // description: description etc ...
      imageUrl,
    },
  };
};

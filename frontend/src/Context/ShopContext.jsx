import React, { createContext, useEffect, useState } from "react";

// API Context
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_products, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAllProducts(data))
            .catch((error) => console.error('Error fetching data: ', error))
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prevValue) => ({
            ...prevValue,
            [itemId]: prevValue[itemId] + 1
        }));
    }

    const removeToCart = (itemId) => {
        setCartItems((prevValue) => ({
            ...prevValue,
            [itemId]: prevValue[itemId] - 1
        }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => {
                    return product.id === Number(item)
                })
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { all_products, cartItems, addToCart, removeToCart, getTotalCartAmount, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
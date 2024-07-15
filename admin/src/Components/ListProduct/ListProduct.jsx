import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

function ListProduct() {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        await fetch("http://localhost:4000/removeproduct", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        });
        await fetchInfo();
    }

    return (
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p style={{ textAlign: "center" }}>Old Price</p>
                <p style={{ textAlign: "center" }}>New Price</p>
                <p style={{ textAlign: "center" }}>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return (
                        <div key={index}>
                            <div className="listproduct-format-main listproduct-format">
                                <img src={product.image} alt="product icon" className="listproduct-product-icon" />
                                <p>{product.name}</p>
                                <p style={{ textAlign: "center" }}>${product.old_price}</p>
                                <p style={{ textAlign: "center" }}>${product.new_price}</p>
                                <p style={{ textAlign: "center" }}>{product.category}</p>
                                <img onClick={() => { removeProduct(product.id) }} src={cross_icon} alt="" className="listproduct-remove-icon" />
                            </div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListProduct;
import React, { useState, useEffect } from "react";
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function stringToBool(str) {
    return str === 'true' ? true : false;
}

function ProductView({ products }) {
    
    // const [sideOpen, setSideOpen] = useState(true);
    
    const [sideOpen, setSideOpen] = useState(localStorage.sideOpen !== undefined ? stringToBool(localStorage.sideOpen) : true);
    
    const [selectedProduct, setProduct] = useState();
    
    useEffect(() => {
        console.log(`selectedProduct CHANGED TO`, selectedProduct);
        if (selectedProduct) setSideOpen(true);
        setSideOpen(true);
            
    }, [selectedProduct]);

    useEffect(() => {
        console.log(`sideOpen CHANGED TO`, sideOpen);
        if (!sideOpen) setProduct();
        localStorage.sideOpen = sideOpen.toString();
    }, [sideOpen]);

    return (
        <div className="product-view">
            <div className="product-main-area">
                <h1>Products</h1>
                <div className="product-list">
                    {products.map(item =>
                        <ProductListItem
                            key={item.id}
                            product={item}
                            onClick={() => setProduct(item)}
                            isSelected={selectedProduct ? selectedProduct.id === item.id : false}
                        />
                    )}
                </div>
            </div>
            <div className="product-side-panel">
                <div className="product-side-panel-toggle-wrapper">
                    <div className="product-side-panel-toggle"
                        onClick={() => setSideOpen(!sideOpen)}>
                        {sideOpen ? '>' : '<'}
                    </div>
                </div>
                <ProductDetails visible={sideOpen} product={selectedProduct}/>
            </div>
        </div>
    );
}

export default ProductView;

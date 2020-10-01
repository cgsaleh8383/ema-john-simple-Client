import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import './ProductDetail.css'


const ProductDetail = () => {
    
    const { productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://fathomless-taiga-01948.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    },[productKey]);

   
    return (
        <div>
            
            {/* <h1>{productKey}coming soon</h1> */}
            <h1 className='product-title'>Your product detail.</h1>
            <p className='product-title'>Thanks for coming our shop . If you want to the product for our shop please contact us .</p>
            <Product showAddToCard={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
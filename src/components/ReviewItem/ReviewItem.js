import React from 'react';

const ReviewItem = (props) => {
    
    const {name, quantity, key, price} = props.product;
    const reviewItem = {
        margin: '20px',
        padding: '40px',
        boxShadow: '10px 10px 40px gray'
    }
    return (
        <div style={reviewItem} className='product-container'>
            <h5 className="product-name"> Name: {name}</h5>
            <h4>Quantity: {quantity}</h4>
            <p>${price}</p>
            <button
             className='main-btn'
                onClick={() => props.RemoveProduct(key)}
             >Remove</button>
        </div>
    );
};

export default ReviewItem;
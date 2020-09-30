import React from 'react';

const Cart = (props) => {
    const cart = props.cart;

    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
        //uporer ta ba  nicer ta dilei colbe

    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = totalPrice + product.price * product.quantity;
       
    }

    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0;
    }
    else if (totalPrice > 15) {
        shipping = 4.99;
    }
    else if (totalPrice > 0) {
        shipping = 12.99;
    }

    const tex = (totalPrice / 10).toFixed(2);
    const grandTotal =( totalPrice + shipping + Number(tex)).toFixed(2);

    const formateNumber = num => {
        const precision  = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div className='text-center mr-auto'>
            <h4>Order Summery</h4>
            <p>Item Order: {cart.length}</p>
            <p><small>Product price {formateNumber(totalPrice)}</small></p>
            <p>Shipping: {shipping}</p>
             <p><small>Text + Vat: {tex}</small></p>
            <p>Total Price: {grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;
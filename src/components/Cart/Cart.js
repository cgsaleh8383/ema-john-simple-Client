import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;

    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    //uporer ta ba  nicer ta dilei colbe

    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = totalPrice + product.price * product.quantity || 1;

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
    const grandTotal = (totalPrice + shipping + Number(tex)).toFixed(2);

    const formateNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }


    const toggleMenu = () => {
        let navigation = document.querySelector('.navigation');
        let toggle = document.querySelector('.toggle');
        navigation.classList.toggle('active')
        toggle.classList.toggle('active')
    };
    return (
        <section>
            <div className="sidebar_Container">
                <div className='navigation'>

                    <h4>Order Summery</h4>
                    <p>Item Order: {cart.length}</p>
                    <p><small>Product price {formateNumber(totalPrice)}</small></p>
                    <p>Shipping: {shipping}</p>
                    <p><small>Text + Vat: {tex}</small></p>
                    <p>Total Price: {grandTotal}</p>
                    {
                        props.children
                    }

                    <div className='dashboard_header'>
                        <div className="toggle" onClick={toggleMenu}></div>
                    </div>
                </div>
            </div>
        </section>

        //   // <div className='text-center mr-auto'>
        //     {/* <h4>Order Summery</h4>
        //     <p>Item Order: {cart.length}</p>
        //     <p><small>Product price {formateNumber(totalPrice)}</small></p>
        //     <p>Shipping: {shipping}</p>
        //     <p><small>Text + Vat: {tex}</small></p>
        //     <p>Total Price: {grandTotal}</p>
        //     {
        //         props.children
        //     } */}
        // // </div>
    );
};

export default Cart;
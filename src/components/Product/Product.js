import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props)
    const { product, handleAddProduct } = props;
    const { img, name, seller, price, stock, key } = product;
    return (
        // <div className='product'>
        //     <div className="">
        //         <img src={img} alt=""/>
        //     </div>
        //     <div className='product-box'>
        //         <h4 className="product-name"> <Link to={'/product/'+key}>{name}</Link> </h4>
        //         <br/>
        //         <h4 className="product-name">{seller}</h4>
        //         <p>$ {price}</p>
        //         <p><small>only {stock} left in stock - order soon</small></p>
        //         {props.showAddToCard === true &&  <button className='main-btn fa-shopping-cart'

        //             onClick={() => handleAddProduct(product)}
        //         ><FontAwesomeIcon icon={faShoppingCart} />add to card</button>}
        //     </div>

        // </div>

        <div class="wrapper">
            <div class="card col-md-12">
                <img src={img} alt="" />
                <div class="content">
                    <div class="row">
                        <div class="details">
                            <span>{seller}</span>
                            <p><Link to={'/product/' + key}>{name}</Link></p>
                        </div>
                        <div class="price">$30</div>
                    </div>
                    <div class="buttons">
                        {props.showAddToCard === true && <button className='main-btn '

                            onClick={() => handleAddProduct(product)}>
                                <FontAwesomeIcon icon={faShoppingCart} />add to card</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
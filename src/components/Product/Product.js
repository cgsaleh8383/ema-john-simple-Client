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
      
        <div class="wrapper">
            <div class="card col-md-12">
                <img src={img} alt="" />
                <div class="content">
                    <div class="row">
                        <div class="details">
                            <span>{seller}</span>
                            <p><Link to={'/product/' + key}>{name}</Link></p>
                        </div>
                             <div class="price">${price}</div>
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
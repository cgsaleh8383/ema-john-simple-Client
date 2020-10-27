import React from 'react';

const ReviewItem = (props) => {
    
    const {name, quantity, key, price, img} = props.product;
  
    return (
    //    <section className='row'>
    //         <div className='product-container'>
    //         <h5 className="product-name"> Name: {name}</h5>
    //         <h4>Quantity: {quantity}</h4>
    //         <p>${price}</p>
    //         <button
    //          className='main-btn'
    //             onClick={() => props.RemoveProduct(key)}
    //          >Remove</button>
    //     </div>
    //    </section>


  <section className='review_item'>
        <div class="wrapper">
            <div class="card col-md-12">
                <img src={img} alt="" />
                <div class="content">
                    <div class="row">
                        <div class="details">
                            <p>{name}</p>
                        </div>
                             <div class="price">${price}</div>
                                 <span>{quantity}</span>
                    </div>
                       <div className='remove_button'>
                           <button class="buttons" onClick={() => props.RemoveProduct(key)}> remove</button>
                       </div>
                    </div>
                </div>
            </div>
  </section>
    );
};

export default ReviewItem;
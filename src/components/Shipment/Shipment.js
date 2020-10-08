import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';



const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shippingDta, setShippingDta] = useState(null)

    const onSubmit = data => {
        setShippingDta(data)
    };

    const handlePaymentSuccess = paymentId => {
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: shippingDta, paymentId, orderTime: new Date() };

        fetch('https://fathomless-taiga-01948.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder()
                    alert('Your order was successfully')
                }
            })
    }

    console.log(watch("example"));
    

    return (
      <div className="container">
            <div className='row'>
                <div style={{display: shippingDta ? 'none' : 'block'}} className="col-md-6">
                    < form onSubmit={handleSubmit(onSubmit)} >
                        <div className="ship-from">
                            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                            {errors.name && <span className="error">Name is required</span>}

                            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
                            {errors.email && <span className="error">Email is required</span>}

                            < input name="address" ref={register({ required: true })} placeholder='Your Address' />
                            {errors.address && <span className="error">Address is required</span>}

                            < input name="phone" ref={register({ required: true })} placeholder='Your Phone Number' />
                            {errors.phone && <span className="error">Phone Number is required</span>}

                            < input name="country" ref={register({ required: true })} placeholder='Your Country Name' />
                            {errors.country && <span className="error">Country Name is required</span>}

                            < input name="ZipCode" ref={register({ required: true })} placeholder='Your Country Zip Code' />
                            {errors.zipCode && <span className="error">Zip Code is required</span>}

                            <input className="form_submit" type="submit" />
                        </div>


                    </form >
                </div>
                <div style={{ display: shippingDta ? 'block' : 'none' }}  className="col-md-6">
                    <h2>Please Payment Pay</h2>
                    <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
                </div>
            </div>

      </div>
      
  );

};

export default Shipment;
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@material-ui/core';
import { useState } from 'react';


const CardForm = ({handlePayment}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message)
            setPaymentSuccess(null)
        } 
        else {
            setPaymentSuccess(paymentMethod.id)
            setPaymentError(null)
            handlePayment(paymentMethod.id)
        }
    };

    return (
       <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <Button type="submit" disabled={!stripe} variant="contained" color="primary">
                    Pay
                </Button>
            </form>
            {
                paymentError && <p style={{ color: 'red'}}>{paymentError}</p>
            }
            {
                paymentSuccess && <p style={{ color: 'green'}}>Your payment was successful </p>
            }
       </div>
    );
};

export default CardForm;
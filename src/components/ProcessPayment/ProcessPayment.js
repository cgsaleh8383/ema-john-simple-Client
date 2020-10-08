import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardForm from './CardForm';

const stripePromise = loadStripe('pk_test_51HZs1IEdTgB8PRseMYTrvmIS4up6NjJafFCvQuVZGtFDSzMsjBqKHhDPMEH4MAJ1mB1pa92n3H9oUNbV1OSwQr0H00oQAflgFf');

const ProcessPayment = ({handlePayment}) => {
    return (

        <Elements stripe={stripePromise}>
           <CardForm handlePayment={handlePayment}></CardForm>
        </Elements>

    );
};

export default ProcessPayment;
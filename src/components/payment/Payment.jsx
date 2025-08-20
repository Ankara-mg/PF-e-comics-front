import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { sendEmail } from '../../redux/actions/admin';
import { processPayment, removeFromCartOnly } from '../../redux/actions/shop_favs_rating';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './payment.css'
import NavBar from '../navBar/Navbar';
import Swal from 'sweetalert2';


const Payment = () => {
    const backendURL = import.meta.env.VITE_API;
    const url = `${backendURL}/shop/`
    const stateCart = useSelector(state => state.shop_fav_rating.cart_shopping)
    let listEmail = []
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [succeeded, /*setSucceeded*/] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState('');

    var totalprices = 0;
    stateCart.map(e => totalprices = e.price + totalprices)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true);

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement), // Selecciona el num de tarjeta del componente Card
        })

        const { id } = paymentMethod;
        const card = paymentMethod.card.funding

        var totalprices = 0;
        stateCart.map(e => totalprices = e.price + totalprices)
        totalprices = Math.floor(totalprices * 100)

        try {
            if(!error){
                const { data } = await axios.post(url + 'checkout', {

                    carrito: stateCart,
                    id: id,

                    price: totalprices,

                });


                // alert("PAYMENT SUCCESSFUL!")
                Swal.fire({
                    title: 'PAYMENT SUCCESSFUL!',
                    icon: 'success',
                    confirmButtonText: 'close'
                })

                const userEmail = await JSON.parse(localStorage.getItem('email'))
                if (userEmail) {
                    listEmail.push(userEmail)
                }

                console.log(email);
                dispatch(sendEmail(listEmail))
                
                setEmail(() => "")
                listEmail = []
                elements.getElement(CardElement).clear()

                const status = "Completo"
                stateCart.map(p => dispatch(processPayment(p, card, status)))

                stateCart.map(p => dispatch(removeFromCartOnly(p)))
                setProcessing(false);
                
                //navigate("/user/home")

            } else {
                console.error("Error")
            }
        } catch (error) {
            // Error en el pago, ej sin fondos

            // alert(error.response.data.error)
            setProcessing(false);
            Swal.fire({
                title: 'Error!',
                text: (error.response.data.error),
                icon: 'error',
                confirmButtonText: 'close'
            })
        }
    }

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <div className='contenedorFonfo'>
            <form id="payment-form" onSubmit={handleSubmit}>
                {/* <input
                    className='inputpayment'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                /> */}
                <CardElement id="card-element" onChange={handleChange} />
                <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                    className='btn_payment'
                >
                    <div className='butoncompra_payment'  >
                        <span id="button-text">
                            {processing ? (
                                <div className="spinner" id="spinner"></div>
                            ) : (
                                "Pay Now"
                            )}
                        </span>
                    </div>

                </button>
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded, see the result in your
                    <a
                        href={`https://dashboard.stripe.com/test/payments`}
                    >
                        {" "}
                        Stripe dashboard.
                    </a> Refresh the page to pay again.
                </p>
                {/* <NavBar searchbar={true} /> */}
                {/* <Link to='/user/shop'></Link> */}
                {/* <button className='undo'> undo</button> */}

            </form>
            <span className="material-symbols-outlined undo_payment" onClick={() => navigate(-1)}>undo</span>
            <span className='undo-text_payment' onClick={() => navigate(-1)}>Back</span>
        </div>
    )
}

export default Payment;

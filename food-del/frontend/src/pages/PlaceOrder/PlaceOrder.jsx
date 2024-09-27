import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);
    const navigate = useNavigate();

    const [payment, setPayment] = useState("cod");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "India",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const validateForm = () => {
        let formErrors = {};

        if (!data.firstName) formErrors.firstName = "First name is required.";
        if (!data.lastName) formErrors.lastName = "Last name is required.";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            formErrors.email = "Email is required.";
        } else if (!emailPattern.test(data.email)) {
            formErrors.email = "Invalid email address.";
        }

        const phonePattern = /^[6-9]\d{9}$/;
        if (!data.phone) {
            formErrors.phone = "Phone number is required.";
        } else if (!phonePattern.test(data.phone)) {
            formErrors.phone = "Invalid phone number. Must be 10 digits starting with 6, 7, 8, or 9.";
        }

        if (!data.street) formErrors.street = "Street address is required.";
        if (!data.city) formErrors.city = "City is required.";
        if (!data.state) formErrors.state = "State is required.";

        const pinPattern = /^[1-9][0-9]{5}$/;
        if (!data.zipcode) {
            formErrors.zipcode = "PIN code is required.";
        } else if (!pinPattern.test(data.zipcode)) {
            formErrors.zipcode = "Invalid PIN code. Must be 6 digits.";
        }

        if (!data.country) formErrors.country = "Country is required.";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setApiError("");

        try {
            let orderItems = food_list.filter(item => cartItems[item._id] > 0)
                .map(item => ({ ...item, quantity: cartItems[item._id] }));

            let orderData = {
                address: data,
                items: orderItems,
                amount: getTotalCartAmount() + deliveryCharge,
            };

            let response;
            if (payment === "stripe") {
                response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
                if (response.data.success) {
                    window.location.replace(response.data.session_url);
                } else {
                    throw new Error("Something went wrong with Stripe payment.");
                }
            } else {
                response = await axios.post(`${url}/api/order/placecod`, orderData, { headers: { token } });
                if (response.data.success) {
                    navigate("/myorders");
                    toast.success(response.data.message);
                    setCartItems({});
                } else {
                    throw new Error("Something went wrong with COD order.");
                }
            }
        } catch (error) {
            setApiError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("To place an order, please sign in first.");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-field">
                    <input
                        type="text"
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        placeholder="First name"
                        required
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                    <input
                        type="text"
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        placeholder="Last name"
                        required
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <input
                    type="email"
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    placeholder="Email address"
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                    type="text"
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    placeholder="Street"
                    required
                />
                {errors.street && <p className="error">{errors.street}</p>}
                <div className="multi-field">
                    <input
                        type="text"
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        placeholder="City"
                        required
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                    <input
                        type="text"
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        placeholder="State"
                        required
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                </div>
                <div className="multi-field">
                    <input
                        type="text"
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        placeholder="Zip code"
                        required
                    />
                    {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                    <input
                        type="text"
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        placeholder="Country"
                        required
                    />
                    {errors.country && <p className="error">{errors.country}</p>}
                </div>
                <input
                    type="text"
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    placeholder="Phone"
                    required
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on Delivery )</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <button className="place-order-submit" type="submit">
                    {isLoading ? "Processing..." : payment === "cod" ? "Place Order" : "Proceed To Payment"}
                </button>
                {apiError && <p className="error">{apiError}</p>}
            </div>
        </form>
    );
};

export default PlaceOrder;

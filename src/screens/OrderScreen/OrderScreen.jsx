import { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { CartContext } from "../../providers/CartProvider";
import classes from "./OrderScreen.module.css";
import { useNavigate } from "react-router-dom";

export default function OrderScreen() {
    const navigator = useNavigate();
    const nameRef = useRef(),
        phoneRef = useRef(),
        descriptionRef = useRef(),
        addressRef = useRef();

    const { items, clearCart } = useContext(CartContext);
    let price = 0;

    for (const itemKey of Object.keys(items)) {
        const item = items[itemKey];
        price += item.price * item.count;
    }

    function sendOrder() {
        let data = {};

        data.items = Object.keys(items).map((itemKey) => {
            const item = items[itemKey];
            return String(item.id);
        });
        data.counts = Object.keys(items).map((itemKey) => {
            const item = items[itemKey];
            return String(item.count);
        });

        data.name = nameRef.current.value;
        data.address = addressRef.current.value;
        data.number = phoneRef.current.value;
        data.description = descriptionRef.current.value;

        fetch("http://127.0.0.1:8000/sale", {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            console.log(response);
        });

        navigator("/");
        clearCart();
    }

    return (
        <>
            <Header></Header>
            <main>
                <form className={classes.form}>
                    <h2>Сумма заказа составляет {price} с.</h2>
                    <label>
                        ФИО
                        <input ref={nameRef} type="text" />
                    </label>
                    <label>
                        Номер телефона
                        <input ref={phoneRef} type="phone" />
                    </label>
                    <label>
                        Адрес доставки
                        <input ref={addressRef} type="text" />
                    </label>
                    <label>
                        Описание
                        <textarea
                            ref={descriptionRef}
                            className={classes.textarea}
                            rows={5}
                        />
                    </label>
                    <button
                        type="button"
                        className="button"
                        onClick={sendOrder}
                    >
                        Submit
                    </button>
                </form>
            </main>
        </>
    );
}

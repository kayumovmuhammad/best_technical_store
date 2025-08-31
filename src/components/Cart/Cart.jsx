import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import classes from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    const { items, addOneToCart, deleteOneFromCart, clearCart } =
        useContext(CartContext);
    return (
        <div className={classes.flex_cart}>
            {Object.keys(items).length == 0 && (
                <h2>Nothing has been added to the cart.</h2>
            )}
            {Object.keys(items).map((itemKey, index) => {
                const item = items[itemKey];

                return (
                    <div key={index} className={classes.product_card}>
                        <div className={classes.img_name}>
                            <div>
                                <img
                                    onClick={() => {
                                        console.log("hello");
                                        
                                        navigate(`/product/${item.id}`);
                                    }}
                                    src={item.imageLinks[0]}
                                    alt=""
                                    className={classes.img}
                                />
                            </div>
                            <div className={classes.name_price}>
                                <div>{item.name}</div>
                                <div>{item.price * item.count} c.</div>
                            </div>
                        </div>
                        <div className={classes.count}>
                            <div
                                className={classes.button}
                                onClick={() => {
                                    addOneToCart(item.id);
                                }}
                            >
                                +
                            </div>
                            <div>{item.count}</div>
                            <div
                                className={classes.button}
                                onClick={() => {
                                    deleteOneFromCart(item.id);
                                }}
                            >
                                -
                            </div>
                        </div>
                    </div>
                );
            })}

            {!!Object.keys(items).length && (
                <>
                    <div
                        className={classes.big_button}
                        onClick={() => {
                            clearCart();
                        }}
                    >
                        Clear Cart
                    </div>
                    <div
                        className={classes.big_button}
                        onClick={() => {
                            navigate("/order");
                        }}
                    >
                        Place An Order
                    </div>
                </>
            )}
        </div>
    );
}

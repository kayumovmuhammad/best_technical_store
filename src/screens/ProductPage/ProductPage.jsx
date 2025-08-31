import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import classes from "./ProductPage.module.css";
import { CartContext } from "../../providers/CartProvider";

export default function ProductPage() {
    const { id } = useParams();
    const { addToCart, items } = useContext(CartContext);

    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(`http://127.0.0.1:8000/get_item?id=${id}`, {
            signal: abortController.signal,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error");
                }
                return res.json();
            })
            .then((data) => {
                if (data.length == 0) {
                    throw new Error("No Product");
                }
                setProduct(data[0]);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.name == "AbortError") {
                    return;
                }
                console.log(err);
                setError(true);
                setIsLoading(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        if (items.length == 0) {
            navigator("/");
        }
    }, [items.length]);

    if (isLoading) {
        return (
            <>
                <Header></Header>
                <main>
                    <h1>Loading...</h1>
                </main>
            </>
        );
    }
    if (error) {
        return (
            <>
                <Header></Header>
                <main>
                    <h1>Error</h1>
                </main>
            </>
        );
    }

    return (
        <>
            <Header></Header>
            <main className={classes.main}>
                <div className={classes.content}>
                    <img
                        className={classes.img}
                        src={product.imageLinks}
                        alt="img"
                    />
                    <div className={classes.heading}>
                        <h1>{product.name}</h1>
                        <p>Описание: {product.description}</p>
                        <p>Категория: {product.category}</p>
                        <p>Цена: {product.price}</p>
                        {!items[product.id] && (
                            <div
                                className="button"
                                onClick={() => {
                                    addToCart(product);
                                }}
                            >
                                Buy
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

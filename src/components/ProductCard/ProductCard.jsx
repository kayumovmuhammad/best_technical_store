import { Link } from "react-router-dom";
import classes from "./ProductCard.module.css";
import AddToCart from "../../assets/icons/add_to_cart_icon.svg?react";
import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";

export default function ProductCard({ product }) {
    const { addToCart, items } = useContext(CartContext);

    return (
        <div className={classes.fr}>
            <Link
                className={classes.product_card}
                to={`/product/${product.id}`}
            >
                <div className={classes.img}>
                    <img src={product.imageLinks[0]} alt="" width={200} />
                </div>
                <div className={classes.product_heading}>
                    <div className={classes.name}>{product.name}</div>
                    <div className={classes.price}>{product.price + " c."}</div>
                </div>
            </Link>
            {!items[product.id] &&
                <div
                    onClick={() => {
                        addToCart(product);
                        console.log(items);
                    }}
                >
                    <AddToCart className={classes.add_btn} />
                </div>
            }
        </div>
    );
}

import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useContext, useRef } from "react";
import CartIcon from "../../assets/icons/cart_icon.svg?react";
import LightIcon from "../../assets/icons/light_theme_icon.svg?react";
import DarkIcon from "../../assets/icons/dark_theme_icon.svg?react";
import { ThemeContext } from "../../providers/ThemeProvider";
import Cart from "../Cart/Cart";

export default function Header({ searchInput }) {
    const searchRef = useRef();
    const navigate = useNavigate();
    const [theme, toggleTheme] = useContext(ThemeContext);

    return (
        <header className={classes.header}>
            <Link className={classes.heading_link} to="/">
                <h2>Technical Store</h2>
            </Link>
            <ul>
                <li>
                    <div className={classes.cart_icon}>
                        <CartIcon
                            onClick={() => {
                                document
                                    .getElementsByClassName(classes.cart)[0]
                                    .classList.toggle(classes.visible);
                            }}
                        ></CartIcon>
                        <div className={`${classes.cart}`}>
                            <Cart></Cart>
                        </div>
                    </div>
                </li>
                <li>
                    {searchInput || (
                        <input
                            type="text"
                            placeholder="Search"
                            className="search_input"
                            ref={searchRef}
                            onKeyDown={(event) => {
                                if (event.key == "Enter") {
                                    navigate(
                                        `/search?query=${searchRef.current.value}&page=1`
                                    );
                                }
                            }}
                        />
                    )}
                </li>
                <li>
                    <div onClick={toggleTheme}>
                        {theme == "light" ? <LightIcon /> : <DarkIcon />}
                    </div>
                </li>
            </ul>
        </header>
    );
}

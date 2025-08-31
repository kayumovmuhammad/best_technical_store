import { Link, useNavigate } from "react-router-dom";
import classes from "./NavigateOnPages.module.css";
import { useState } from "react";

export default function NavigateOnPages({
    currentPage,
    currentQuery,
    pageCount,
}) {
    const [isHidden, setIsHidden] = useState(false);
    const navigator = useNavigate();

    return (
        !isHidden && (
            <nav className={classes.nav}>
                {currentPage > 1 && (
                    <div
                        className={classes.nav_el + " button"}
                        onClick={() => {
                            setIsHidden(true);
                            navigator(
                                `/search?query=${currentQuery}&page=${
                                    Number(currentPage) + 1
                                }`
                            );
                        }}
                    >
                        {"<"}
                    </div>
                )}

                <div className={classes.page}>{currentPage}</div>

                {currentPage < pageCount && (
                    <div
                        className={classes.nav_el + " button"}
                        onClick={() => {
                            setIsHidden(true);
                            navigator(
                                `/search?query=${currentQuery}&page=${
                                    Number(currentPage) + 1
                                }`
                            );
                        }}
                    >
                        {">"}
                    </div>
                )}
            </nav>
        )
    );
}

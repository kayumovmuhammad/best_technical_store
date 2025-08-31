import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import useDebounce from "../../hooks/useDebounce";
import classes from "./SearchPage.module.css"

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef();
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const searchDebounce = useDebounce(searchParams.get("query"), 300);

    const currentPage = searchParams.get("page") || "1";
    const currentQuery = searchParams.get("query") || "";

    const searchInput = (
        <input
            className="search_input"
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={currentQuery}
            onChange={() => {
                setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev);
                    newParams.set("query", inputRef.current.value);
                    return newParams;
                });
            }}
        ></input>
    );
    
    useEffect(() => {
        const abortController = new AbortController();

        setIsLoading(true);

        fetch(
            `http://127.0.0.1:8000/info/search?searchable=${
                searchDebounce || ""
            }&page=${currentPage}`,
            { signal: abortController.signal }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setIsLoading(false);
                setProducts(data.data);
                setPageCount(data.pageCount);
            })
            .catch((err) => {
                if (err.name == "AbortError") {
                    return;
                }
                console.log(err.name);
                setIsLoading(false);
            })

        return () => {
            abortController.abort();
        };
    }, [searchDebounce, currentPage]);

    return (
        <>
            <Header searchInput={searchInput}></Header>
            <main className={classes.main}>
                <ProductsGrid
                    currentQuery={currentQuery}
                    isLoading={isLoading}
                    products={products}
                    pageCount={pageCount}
                    currentPage={currentPage}
                ></ProductsGrid>
            </main>
        </>
    );
}

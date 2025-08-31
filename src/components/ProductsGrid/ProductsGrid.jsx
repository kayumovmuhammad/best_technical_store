import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductsGrid.module.css";
import NavigateOnPages from "../NavigateOnPages/NavigateOnPages";

export default function ProductsGrid({
    currentQuery,
    isLoading,
    products,
    currentPage,
    pageCount,
}) {
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!products.length) {
        return <h1>Nothing to show</h1>;
    }


    return (
        <>
            <ul className={classes.products}>
                {products.map((product, index) => (
                    <li key={index}>
                        <ProductCard product={product}></ProductCard>
                    </li>
                ))}
            </ul>
            <NavigateOnPages currentPage={currentPage} currentQuery={currentQuery} pageCount={pageCount}></NavigateOnPages>
        </>
    );
}

import React from "react";
import Product from "./Product";

const GroceryApp = (props) => {
    let [products, setProducts] = React.useState(props.products);
    const onVote = (dir, index) => {
        // Update the products array accordingly ...
        const nextProducts = [...products];
        const product = products[index];
        nextProducts[index] = { ...product, votes: product.votes + dir };
        setProducts(nextProducts)
    };

    return (
        <ul>
            {products?.map((item, index) => {
                return <Product key={index} name={item.name} votes={item.votes} onVote={onVote} index={index} />
            })}
        </ul>
    );
}

export default GroceryApp;
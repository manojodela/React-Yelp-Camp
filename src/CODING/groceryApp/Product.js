const Product = props => {

    const plus = () => {
        // Call props.onVote to increase the vote count for this product
        props.onVote(1, props.index)
      
    };
    const minus = () => {
        // Call props.onVote to decrease the vote count for this product
        props.onVote(-1, props.index)
    };
    return (
        <li>
            <span>{props.name}</span> - <span>votes: {props.votes}</span>
            <button onClick={plus}>+</button>{" "}
            <button onClick={minus}>-</button>
        </li>
    );
};
export default Product;
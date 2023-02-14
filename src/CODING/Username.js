// React is loaded and is available as React and ReactDOM
// imports should NOT be used
import React from "react";
class Username extends React.Component {
    state = { value: "" };

    changeValue(value) {
        this.setState({ value });
    }

    render() {
        const { value } = this.state;
        return <h1>{value}</h1>;
    }
}

export const  App = () => {
    const child = React.useRef();
    const inputVal = React.useRef();

    function clickHandler() {
        child.current.changeValue(inputVal.current.value);
    }

    return (
        <div>
            <button onClick={clickHandler}>Change Username</button>
            <input type="text" ref={inputVal} />
            <Username ref={child} />
        </div>
    );
}

export default Username;


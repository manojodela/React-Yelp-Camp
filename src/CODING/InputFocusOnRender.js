// React is loaded and is available as React and ReactDOM
// imports should NOT be used
const FocusableInput = (props) => {
    const {shouldFocus} = props;
   const inputRef = React.useRef();
    
    React.useEffect(() =>{
     shouldFocus && inputRef.current.focus();
    }, []);
    
    // Write your code here
    return <input ref = {inputRef}/>;
  };
  
  document.body.innerHTML = "<div id='root'></div>";
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<FocusableInput shouldFocus={true} />);
  setTimeout(() => console.log(document.getElementById("root").innerHTML), 300);
import * as React from 'react';

// React is loaded and is available as React and ReactDOM
// imports should NOT be used
class ImageGallery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            links : this.props.links
        }
    }

    imageHandler = (index) =>{
        this.state.links = this.state.links?.filter((img, ind) => ind != index);
        this.setState(this.state.links);
    }
  
    
    render() {
        return <div>
            {this.state.links?.map((link, index) => (
                <div className="image" key={index}>
                    <img src={link} />
                    <button className="remove" onClick={() => {this.imageHandler(index)}}>X</button>
                </div>
            ))
            }
        </div>
    }
}



export default ImageGallery
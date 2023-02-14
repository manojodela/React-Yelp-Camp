import { useState } from "react"
import { useNavigate } from "react-router";

const AddCampground = () => {
    const navigate = useNavigate();
    let formIsValid = false;
    const [user, setUserValues] = useState({ campName: '', price: '', imageURL: '', desc: '' });
    const [touched, setTouched] = useState({ campName: false, price: false, imageURL: false, desc: false });

    const CampNameIsError = user.campName.trim() === '' && touched.campName;
    const priceIsError = user.price.trim() === '' && touched.price;
    const imageULRIsError = user.imageURL.trim() === '' && touched.imageURL;
    const descIsError = user.desc.trim() === '' && touched.desc;

    if (Object.values(user).every(input => input !== '')) {
        formIsValid = true;
    }

    const changeHandler = (e) => {
        setUserValues({ ...user, [e.target.name]: e.target.value })
    }

    const onBlurHandler = (e) => {
        setTouched({ ...touched, [e.target.name]: true })
    }

    const localId = localStorage.getItem("localId");
    const addCampHandler = (e) => {
        e.preventDefault();

        fetch(`https://react-http-c178b-default-rtdb.firebaseio.com/campgrounds/${localId}.json`, {
            method: 'POST',
            body: JSON.stringify({ "localID": localId, "campName": user.campName, "price": parseInt(user.price), "imageURL": user.imageURL, "desc": user.desc }),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    let errorMessage;
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then((response) => {
            navigate('/campground');
            console.log("data saved");

        }).catch((error) => {
            alert(error);
        });
    }


    return <div className="container mb-3">
        <div className="row justify-content-center">
            <div className="col-lg-5 text-left">
                <h3 className="py-3">Add New Campground</h3>
                <form onSubmit={addCampHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Campground Name</label>
                        <input type="text" className="form-control bg-light" id="name" value={user.campName} name="campName"
                            onChange={changeHandler} onBlur={onBlurHandler} />
                        {CampNameIsError && <p className="text-danger">please enter campground name</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" className="form-control bg-light" id="price"  name="price"
                            value={user.price} onChange={changeHandler} onBlur={onBlurHandler}  min="1"/>
                        {priceIsError && <p className="text-danger">please enter valid price</p>}

                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input type="text" className="form-control bg-light" id="image" name="imageURL"
                            value={user.imageURL} onChange={changeHandler} onBlur={onBlurHandler} />
                        {imageULRIsError && <p className="text-danger">please enter ImageURL</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" className="form-control bg-light" id="" cols="15" rows="5" value={user.desc}
                            onChange={changeHandler} onBlur={onBlurHandler} ></textarea>
                        {descIsError && <p className="text-danger">please enter description</p>}
                    </div>

                    <input type="submit" className="form-control btn btn-dark" value="Add Campground" disabled={!formIsValid} />
                </form>
            </div>
        </div>
    </div>
}
export default AddCampground
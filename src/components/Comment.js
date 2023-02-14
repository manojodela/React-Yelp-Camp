import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const Comment = () => {
    const [review, setReview] = useState('');
    const [error, setError] = useState(false);
    const { key, id } = useParams();
    const localId = localStorage.getItem("localId");
    const navigate = useNavigate();
    const commentHandler = (e) => {
        e.preventDefault();
        if (review === '') {
            setError(true);
        } else {
            const reviewDate =  new Date().toDateString();
            const url = `https://react-http-c178b-default-rtdb.firebaseio.com/campgrounds/${localId}/${key}.json`;
            fetch(url, {
                method: 'PATCH',
                body: JSON.stringify({ review, reviewDate}),
                headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
                if (!res.ok) {
                    throw new Error("Fetch Error");
                }
            }).then((data) => {
                navigate(`/campground/${id}`);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <section className="card p-5">
            <div className="container my-5">
                <div className="row justify-content-center text-left">
                    <div className="col-lg-5 m-auto">
                        <h2 className="font-weight-bold my-3">Add New Comment</h2>
                        <form className="card p-2" onSubmit={commentHandler}>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2 font-weight-bold ">Description</label>
                                <textarea name="comment" className="form-control bg-light" id="comment" cols="10" value={review}
                                    onChange={(e) => { setReview(e.target.value); setError(false) }}
                                    rows="5"></textarea>
                                {error && <p className="text-danger">please provide a review</p>}
                            </div>
                            <input type="submit" className="form-control p-2 bg-dark text-white mb-1 font-weight-bold mb-3" value="Post Comment" />
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Comment;
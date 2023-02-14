import './Campground.css'
import map from '../Assets/Map.png'
import ChatBubble from '../Assets/Chat Bubble.svg';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useContext, useState, useLayoutEffect } from 'react';

const Campground = () => {
    window.scroll(0, 0);
    const { id } = useParams();
    const [campground, setCampground] = useState([]);
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState();
    const username = localStorage.getItem("username");

    useEffect(() => {
        setLoading(true);
        const localId = localStorage.getItem("localId");
        fetch(`https://react-http-c178b-default-rtdb.firebaseio.com/campgrounds.json`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                Object.keys(data).map((key, i) => {
                    if (key === localId) {
                        let keyId = Object.keys(data[key]);
                        keyId = keyId[id];
                        setKey(keyId);
                        setCampground(data[key][keyId]);
                        setLoading(false);
                    }
                })
            })

    }, [])

    if (loading) {
        return <h5 className='text-center'>loading....</h5>
    }

    return <section>
        <div className="container-fluid">
            <div className="row justify-content-center my-2">
                <div className="col-lg-4  ">
                    <div className="card p-4">
                        <img src={map} alt="poster" className="img-fluid" />
                    </div>
                </div>
                <div className="col-lg-6 text-left">

                    <div className="card mb-2">
                        <img src={campground['imageURL']} alt="Card  cap"
                            className="img-fluid" />
                        <div className="card-body">
                            <div className="card-desc">
                                <p><strong>{campground['campName']}</strong></p>
                                <p>${campground['price']}/ night</p>
                            </div>
                            <p className="card-text">{campground['desc']}</p>
                            <blockquote className="blockquote mb-0">
                                <footer> <cite title="Source Title">submited by andrew mike</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="card mb-1">
                        <div className="card-body">
                            <div className="card-desc">
                                <p><strong>Addam Johnes</strong></p>
                                <p>15min ago</p>
                            </div>
                            <p className="card-text">Honestly one of the best experiencing ever, took us a while to figure
                                out how to get there but it was amazing</p>
                            <hr />
                            <div className="card-desc">
                                <p><strong>Daniel</strong></p>
                                <p> 4hrs ago</p>
                            </div>
                            <p className="card-text">Travelling is one of the best site seeing ever, took us a while to
                                figure
                                out how to get there but it was amazing</p>
                            <hr />
                            {campground['review'] && <> <div className="card-desc">
                                <p><strong> {username} </strong></p>
                                <p>{campground['reviewDate']}</p>
                            </div>
                                <p className="card-text">{campground['review']}</p> </>}
                            <hr className="pb-3" />
                            <div className="text-end">
                                <Link to={`/campground/${id}/comment/${key}`} className="bg-dark text-white px-3 py-2 rounded ">
                                    <img src={ChatBubble} alt="review" />&nbsp; Leave a Review
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
export default Campground
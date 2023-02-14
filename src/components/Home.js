import Airbnb from '../Assets/Checkmark.svg';
import Booking from '../Assets/Airbnb.svg';
import plumguide from '../Assets/Plum Guide.svg';
import checkmark from '../Assets/Checkmark.svg'
import hero from '../Assets/Hero Image.jpg';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    return <div className="container text-left">
        <div className="row align-items-center position-relative mobile">
            <div className="col-lg-5 offset-1 pad ">
                <img src="/Assets/Logo.svg" alt="" className="logo position-absolute top-0 start-25 pt-1" />
                <div className="content">
                    <h1 className="mb-2 title">Explore the best camps on Earth.</h1>
                    <p className="desc">YelpCamp is a curated list of the best camping spots on earth. unfiltered and
                        unbiased
                        reviews. </p>
                    <ul>
                        <li> <img src={checkmark} alt="check" />&nbsp; Add your own camp suggestions.</li>
                        <li> <img src={checkmark} alt="check" />&nbsp; leave reviews and experiences.</li>
                        <li> <img src={checkmark} alt="check" />&nbsp; see locations for all camps.</li>
                    </ul>
                    <Link to="/campground" className="campbtn mb-4">View Campgrounds</Link>
                </div>
                <footer className="mt-3">
                    <p>Partnered with:</p>
                    <img src={Airbnb} alt="" />
                    <img src={Booking} alt="" />
                    <img src={plumguide} alt="" />
                </footer>
            </div>
            <div className="col-lg-6">
                <img src={hero} alt="herologo" className="img-fluid banner" height="500px" />
            </div>

        </div>
    </div>

}
export default Home
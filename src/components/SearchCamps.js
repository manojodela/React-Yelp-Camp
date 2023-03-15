import { Link, useNavigate } from 'react-router-dom';
import './SearchCamps.css';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';


const SearchCamps = () => {
    const navigate = useNavigate();
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(false);
    let loadedCamps = [];
    const [searchInput, setSearchInput] = useState('');
    const localId = localStorage.getItem("localId");

    const DelHandler = (key) => {
        fetch(`https://react-http-c178b-default-rtdb.firebaseio.com/campgrounds/${localId}/${key}.json`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.ok) {
                window.location.reload(true);
            }
        }).catch((err) => {
            throw new Error(err);
        })
    };

    useLayoutEffect(() => {
        setLoading(true);
        fetch(`https://react-http-c178b-default-rtdb.firebaseio.com/campgrounds.json`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                Object.keys(data).map((key) => {
                    if (key === localId) {
                        setCamps(data[key]);
                        setLoading(false);
                    }
                })
            })
    }, []);

    for (const key in camps) {
        loadedCamps.push(camps[key]);
    }

    const searchHandler = useCallback((e) => {
        setSearchInput(e.target.value);
    }, []);

    const searchCamp = (data) => {
        const updatedList = data?.filter((item) => {
            return searchInput === '' ? data : item.campName.toLowerCase().includes(searchInput.toLowerCase());
        });
        return updatedList;
    };




    if (loading && camps != 0) {
        return <h5 className='text-center'>loading....</h5>
    }

    return (
        <>
            <section className=" mt-2">
                <div className="bg-color container">
                    <div className="row text-left">
                        <div className="col-lg-6 p-4">
                            <h2>Welcome to YelpCamp!</h2>
                            <p className="w-75">view our handpicked campgrounds from all over the world, add your own.</p>
                            <div className="row px-3">
                                <div className="col-sm-3 col-lg-6 col-md-4 p-0">
                                    <input type="search" placeholder="Search for Camps" className="p-2 form-control search" onChange={searchHandler} value={searchInput} />
                                </div>
                                <div className="col-sm-4  col-lg-4 col-md-4 py-0 ">
                                    {/* <button className="bg-dark text-white p-2 rounded">Search </button> */}
                                </div>
                            </div>
                            <Link to="/addCampground" className="text-black hide"> or add your own campground</Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <h2 className='text-center'>Newly Added Campgrounds</h2>
                <div className="row my-3 gap">
                    {
                        searchCamp(loadedCamps).length === 0 ? <h4 className='text-center'>No Campgrounds Availbale</h4> :
                            searchCamp(loadedCamps).map((camp, key) => (
                                <div className="col-lg-4 col-md-6" key={key}>
                                    <div className="card text-left">
                                        <img className="card-img-top" src={camp.imageURL}
                                            alt="Card  cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{camp.campName}</h5>
                                            <p className="card-text">{camp.desc}</p>
                                            <div className='row align-items-center justify-content-center'>
                                                <Link to={`/campground/${key}`} className="card btn bg-white text-black font-weight-bold w-50 m-auto col-8">view
                                                    campground</Link>
                                                <i className="bi bi-trash col-2 rounded bg-dark text-white py-1" onClick={() => DelHandler(Object.keys(camps)[key])}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </>
    )
}
export default SearchCamps



{/* <section className="mt-3">
                <div className="container">
                    <div className="row my-2 gap">
                        <div className="col-lg-4 col-md-6 text-left">
                            <div className="card">
                                <img className="card-img-top" src={img1}
                                    alt="Card cap" />
                                <div className="card-body ">
                                    <h5 className="card-title">Mount ulap</h5>
                                    <p className="card-text">one of the most famous hikes in Benguet is mt ulap in itogon.</p>
                                    <button href="#" className="card btn bg-white text-black font-weight-bold w-50 m-auto">view
                                        campground</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card">
                                <img className="card-img-top" src={img2}
                                    alt="Card  cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Calaguas Islands</h5>
                                    <p className="card-text">A paradise of islands that can rival the white sand beauty of Boracy
                                    </p>
                                    <button href="#" className="card btn bg-white text-black font-weight-bold w-50 m-auto">view
                                        campground</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card">
                                <img className="card-img-top" src={img3}
                                    alt="Card  cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Onay Beach</h5>
                                    <p className="card-text">This is one of the best beach camping sites. beautiful and pristine.
                                    </p>
                                    <button href="#" className="card btn bg-white text-black font-weight-bold w-50 m-auto">view
                                        campground</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card">
                                <img className="card-img-top"
                                    src={img4}
                                    alt="Card  cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Seven Sisters Waterfall</h5>
                                    <p className="card-text">Seven Sisters Waterfall is the 39th waterfall in the norway.</p>
                                    <button href="#" className="card btn bg-white text-black font-weight-bold w-50 m-auto">view
                                        campground</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card">
                                <img className="card-img-top" src={img5}
                                    alt="Card  cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Latik Riverside</h5>
                                    <p className="card-text">Philipines is one of the most dazzling countries in all of asia.</p>
                                    <button href="#" className="card btn bg-white text-black font-weight-bold w-50 m-auto">view
                                        campground</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card">
                                <img className="card-img-top" src={img6}
                                    alt="Card  cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Buloy Springs</h5>
                                    <p className="card-text">This is one of the best beach camping sites in the country.</p>
                                    <button href="#" className="card btn bg-white text-black font-weight-bold w-50 m-auto ">view
                                        campground</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

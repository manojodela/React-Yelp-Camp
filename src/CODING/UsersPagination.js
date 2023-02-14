import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Pagination from "./Pagination";

const UsersPagination = () => {
    const [posts, setPosts] = useState([]);
    const [countList, setCountList] = useState("");
    const [searchId, setSearchId] = useState('');

    const paginateData = useCallback((p, searchId) => {
        const payload = {
            _start: `${p}`,
            _limit: 10,
            userId: searchId,
        };
        axios.get("https://jsonplaceholder.typicode.com/posts", { params: payload }).then((response) => {
            if (
                response.data === false ||
                response.status === 200
            ) {
                setPosts(response.data);
            }
        });
        console.log("call");
    }, [])

    const fetchUsers = () => {
        axios.get("https://jsonplaceholder.typicode.com/posts", searchId && { params: { userId: searchId } }).then((response) => {
            if (
                response.data === false ||
                response.status === 200
            ) {
                setPosts(response.data.slice(0, 10));
                const total = response.data.length;
                const countD = Math.ceil(total / 10);
                setCountList(countD);
            }
        });
        console.log("fet");
    }

    useEffect(() => {
        fetchUsers();
        console.log("eff");
    }, [searchId])

    

    return <>
        <div>
            <input type="text" value={searchId} className="form-control-md bg-light" onChange={(e) => setSearchId(e.target.value)} />
            <ul>
                <div className="row">
                    {posts.length === 0 ? <h2 className="w-50 m-auto pt-4">No Posts available....</h2>
                        : posts.map((post) => (
                            <div className="col-lg-4 d-flex align-items-stretch my-2" key={post.id} >
                                <div className="card">
                                    <li>   UserID: {post.userId}</li>
                                    {/* <li>{post.id}</li> */}
                                    <li>{post.title}</li>
                                    <li>{post.body}</li>
                                </div>
                            </div>
                        ))}
                </div>
            </ul>

            {posts && posts.length > 0 && <Pagination paginateData={paginateData} countlist={countList} />}
        </div>
    </>
}

export default UsersPagination;
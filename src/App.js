import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import AddCampground from './components/AddCampground';
import Home from './components/Home';
import Campground from './components/Campground';
import SearchCamps from './components/SearchCamps';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import Comment from './components/Comment';
import Test from './components/Test';
import ImageGallery from './CODING/ImageGallery';
import GroceryApp from './CODING/groceryApp/GroceryApp';
import Username from './CODING/Username';
import Register from './CODING/Register';
import UsersPagination from './CODING/UsersPagination';

function App() {
  const authCtx = useContext(AuthContext);
  const userIsLoggedIn = authCtx.isLoggedIn;

  const products = [{ name: "Oranges", votes: 0 }, { name: "Bananas", votes: 0 }];
  const links = ["https://bit.ly/3lmYVna", "https://bit.ly/3flyaMj"];

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            {!userIsLoggedIn && <Route path="/" element={<LoginPage />} />}
            {userIsLoggedIn && <Route path="/" element={<Home />} />}
            {userIsLoggedIn &&
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/addcampground" element={<AddCampground />} />
                <Route path="/campground/:id" element={<Campground />} />
                <Route path="/campground" element={<SearchCamps />} />
                <Route path="/campground/:id/comment/:key" element={<Comment />} />
              </>
            }
            <Route path='*' element={<LoginPage />} />
            <Route path='/test' element={<Test />} />
            <Route path='/grocery' element={<GroceryApp products={products} />} />
            <Route path='/imageGallery' element={<ImageGallery links={links} />} />
            <Route path='/username' element={<Username />} />
            <Route path='/register' element={<Register />} />
            <Route path='/users' element={<UsersPagination />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
// Pages
import Home from './pages/home/Home.jsx';
import Shop from './pages/shop/Shop.jsx';
import CardDetail from './components/card-detail/CardDetail.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import DashboardNav from './pages/dashboard/dashboardNav/DashboardNav.jsx';

import Favorites from './pages/favorites/Favorites.jsx';
import Checkout from './components/payment/Payment.jsx'
import Admin from './pages/dashboard/admin/Admin.jsx';
import Users from './pages/dashboard/users/Users.jsx'
import Orders from './pages/dashboard/orders/Orders.jsx';
import UploadComic from './pages/dashboard/uploadComic/UploadComic.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import Reviews from './pages/dashboard/reviews/Reviews.jsx';
import Register from './components/login/Register.jsx';
import { UserRoute } from './components/routes/UserRoute.jsx'
import { PublicRoute } from './components/routes/PublicRoute.jsx'
import { AdminRoute } from './components/routes/AdminRoute.jsx'
import Logout from './components/login/Logout.jsx';
//import Tabslogin from './components/account/Tabslogin';
import { Notfound } from './components/NotFound/Nofound.jsx';
import ModalLogin from './components/account/ModalLogin.jsx';
import ModalRegister from './components/account/ModalRegister.jsx';
import Purchases from './pages/UserProfile/Purchases.jsx';

import ShoppingCart2 from './pages/shop/MB_Shop.jsx'

function App() {
  return (
    <div className="App">
      {/*----------------------------------rutas publicas-----------------------------------------  */}
      <Routes>
        <Route path='/' element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path='/login' element={<ModalLogin />} />
          <Route path='/singup' element={<ModalRegister />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cardDetail/:id" element={<CardDetail />} />
        </Route>
        {/* --------------------------------rutas usuario ----------------------------------------- */}

        <Route path='/user' element={<UserRoute />}>
          <Route path='/user' element={<UserProfile />} />
          <Route path="/user/landing" element={<LandingPage />} />
          <Route path="/user/home" element={<Home />} />
          <Route path='/user/cardDetail/:id' element={<CardDetail />} />
          <Route path='/user/fav' element={<Favorites />} />
          <Route path='/user/users' element={<Users />} />
          <Route path="/user/shop" element={<ShoppingCart2 />} />
          <Route path='/user/shop/checkout' element={<Checkout />} />
          <Route path='/user/logout' element={<Logout />} />
          <Route path='/user/purchases' element={<Purchases />} />
        </Route>
        {/*-------------------------------- rutas de administador ----------------------------------*/}
        <Route path='/dashboard' element={<AdminRoute />} >

          {/* <Route path='/admin/dashboard' element={<DashboardNav />} /> */}
          <Route path='/dashboard' element={<DashboardNav />} >
            <Route path='admin' element={<Admin />} />
            <Route path='users' element={<Users />} />
            <Route path='reviews' element={<Reviews />} />
            <Route path='orders' element={<Orders />} />
            <Route path='upload' element={<UploadComic />} />
            <Route path='logout' element={<Logout />} />
          </Route>
        </Route>

        <Route path='/*' element={<Notfound />} />
      </Routes>
    </div >
  );
}

export default App;


// export const AppRouter = () => {

//   const { usuario } = useContext(AuthContext);
//   return (
//     <BrowserRouter>
//       <div  >
//         <Routes>
//           <Route path="/login" element={usuario.logged ? (<Navigate to="/" />) : (<LoginScreen />)} />
//           <Route path="/*" element={usuario.logged ? (<DashboardRoutes />) : (<Navigate to="/login" />)} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   )
// }
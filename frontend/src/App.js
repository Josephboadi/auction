import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import LoginSignUp from "./components/User/LoginSignUp";
import LoginSignUpSeller from "./components/User/LoginSignUpSeller";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import { loadUser_seller } from "./redux/actions/sellerAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
// import Profile from './components/User/Profile';
// import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from "./components/User/UpdatePassword";
import UpdatePasswordSeller from "./components/User/UpdatePasswordSeller";
import ForgotPassword from "./components/User/ForgotPassword";
import ForgotPasswordSeller from "./components/User/ForgotPasswordSeller";
import ResetPassword from "./components/User/ResetPassword";
import ResetPasswordSeller from "./components/User/ResetPasswordSeller";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
// import Cart from './components/Cart/Cart';
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
// import MyOrders from './components/Order/MyOrders';
import OrderDetails from "./components/Order/OrderDetails";

import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
// import Contact from "./components/layout/Contact/Contact";
// import About from "./components/layout/About/About";
// import NotFound from "./component/layout/Not Found/NotFound";

import {
  Home,
  SingleProduct,
  Profile,
  ProfileSeller,
  UpdateProfile,
  UpdateProfileSeller,
  Orders,
  // UpdateOrders,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  PrivateAdminRoute,
  AuthWrapper,
} from "./pages";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // const sellerAuth = useSelector((state) => state.seller);

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadUser_seller());

    // getStripeApiKey();
  }, []);

  // {
  //   stripeApiKey && (
  //     <Elements stripe={loadStripe(stripeApiKey)}>
  //       <PrivateRoute exact path="/process/payment" component={Payment} />
  //     </Elements>
  //   );
  // }

  // window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <AuthWrapper>
      <Router>
        {isAuthenticated && <UserOptions user={user} />}

        {/* {sellerAuth && sellerAuth.isAuthenticated && (
          <UserOptions user={sellerAuth.user} />
        )} */}

        {/* {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <PrivateRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )} */}
        {/* <Navbar /> */}
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/products/:id" children={<SingleProduct />} />

          <PrivateRoute exact path="/checkout">
            <Checkout />
          </PrivateRoute>
          <PrivateRoute exact path="/account">
            <Profile />
          </PrivateRoute>

          <PrivateAdminRoute exact path="/seller-account">
            <ProfileSeller />
          </PrivateAdminRoute>

          <PrivateRoute exact path="/me/update">
            <UpdateProfile />
          </PrivateRoute>

          <PrivateAdminRoute exact path="/me/seller-update">
            <UpdateProfileSeller />
          </PrivateAdminRoute>

          {/* <PrivateRoute exact path="/account" component={Profile} />

          <PrivateRoute exact path="/me/update" component={UpdateProfile} /> */}

          <PrivateRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />

          <PrivateAdminRoute
            exact
            path="/password/seller-update"
            component={UpdatePasswordSeller}
          />

          <Route exact path="/password/forgot" component={ForgotPassword} />

          <Route
            exact
            path="/password/seller-forgot"
            component={ForgotPasswordSeller}
          />

          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />

          <Route
            exact
            path="/password/seller-reset/:token"
            component={ResetPasswordSeller}
          />

          <Route exact path="/login" component={LoginSignUp} />

          <Route exact path="/seller-login" component={LoginSignUpSeller} />

          {/* <Route exact path="/cart" component={Cart} /> */}

          <PrivateRoute exact path="/shipping" component={Shipping} />

          <PrivateRoute exact path="/success" component={OrderSuccess} />

          {/* <PrivateRoute exact path="/orders" component={MyOrders} /> */}
          <PrivateRoute exact path="/orders">
            <Orders />
          </PrivateRoute>

          <PrivateRoute exact path="/order/confirm" component={ConfirmOrder} />

          <PrivateRoute exact path="/order/:id" component={OrderDetails} />

          {/* <PrivateRoute exact path="/order/:id">
            <UpdateOrders />
          </PrivateRoute> */}
          <PrivateAdminRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          <PrivateAdminRoute
            exact
            path="/admin/products"
            isAdmin={true}
            component={ProductList}
          />
          <PrivateAdminRoute
            exact
            path="/admin/product"
            isAdmin={true}
            component={NewProduct}
          />

          <PrivateAdminRoute
            exact
            path="/admin/product/:id"
            isAdmin={true}
            component={UpdateProduct}
          />
          <PrivateAdminRoute
            exact
            path="/admin/orders"
            isAdmin={true}
            component={OrderList}
          />

          <PrivateAdminRoute
            exact
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
          />
          <PrivateAdminRoute
            exact
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
          />

          <PrivateAdminRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
          />

          <PrivateAdminRoute
            exact
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
          />
          {/* {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <PrivateRoute exact path="/process/payment" component={Payment} />
            </Elements>
          )} */}
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </AuthWrapper>
  );
}

export default App;

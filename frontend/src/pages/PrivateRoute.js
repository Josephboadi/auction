// import React from 'react'
// import { Route, Redirect } from 'react-router-dom'
// // import { useUserContext } from '../context/user_context'
// import { useAuth0 } from '@auth0/auth0-react'

// const PrivateRoute = ({ children, ...rest }) => {
//   const { user } = useAuth0()
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         return user ? children : <Redirect to='/'></Redirect>
//       }}
//     ></Route>
//   )
// }
// export default PrivateRoute

import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== 'admin') {
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default PrivateRoute;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';
// dev-pu8wyk-g.us.auth0.com
// 7vHgXJ01aWGyMVLWdZUwQSUapigdjfKu

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      // domain={process.env.REACT_APP_AUTH_DOMAIN}
      domain="dev--dyxsszg.us.auth0.com"
      // clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      clientId="Rz4paUvwlCDQYVjxoZMnPefNvOUGZjsK"
      redirectUri={window.location.origin}
      cacheLocation="localstorage">
      <UserProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </UserProvider>
    </Auth0Provider>
  </Provider>,

  document.getElementById('root')
);

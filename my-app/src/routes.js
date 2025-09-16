import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ProductListPage from './Pages/ProductListPage/ProductListPage';
import ShopapplicationWapper from './Pages/ShopapplicationWapper';
import ProductDetailPage from './Pages/ProductDetailPage/ProductDetailPage';
import AboutPage from './Pages/About/AboutPage';
import CartPage from './Pages/CartPage/CartPage';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import PaymentPage from './Pages/Payment/PaymentPage';

import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import ThankYouPage from './Pages/ThankyouPage/ThankYouPage';
import StripePaymentPage from './Pages/StripePaymentPage/StripePaymentPage';
import AccountPage from './Pages/Account/Account';
import ProfilePage from './Pages/Account/ProfilePage';
import Orders from './Pages/Account/Orders';
import Settings from './Pages/Account/Settings';
import AddAddress from './Pages/Account/AddAddress';
// import OAuth2LoginCallback from "./pages/OAuth2LoginCallback";
import OAuth2LoginCallback from './Pages/OAuth2LoginCallback';
import CreateProduct from './Pages/Account/CreateProduct';
import CreateCategory from './Pages/Account/CreateCategory';
import AdminCategoryPage from './Pages/AdminPanel/dminCategoryPage';
import AdminProductPage from './Pages/AdminPanel/AdminProductPage';
import SearchPage from './components/search/SearchPage'





const router = createBrowserRouter([

    {
        path: '/',
        element: <ShopapplicationWapper/>,
        children:[
            {
                path: '/',
                element: <App />,
               
              },
              {
                path: "/men",
                element: <ProductListPage categoryType={'MEN'} />
              },
              {
                path: "/women",
                element: <ProductListPage categoryType="WOMEN" />
              },
              {
                path: "/kids",
                element: <ProductListPage categoryType="KIDS" />,
              }, 
              {
                path: 'product/:id',
                element: <ProductDetailPage />,
              },
              {
                path: '/account-details',
                element: <AccountPage />,
                children:[
                  {
                    path:'profile',
                    element:<ProfilePage/>
                  },
                  {
                    path:'orders',
                    element:<Orders/>
                  },
                  {
                    path:'settings',
                    element:<Settings />
                  },{
                    path:'addaddress',
                    element:<AddAddress />
                  },
                  {
                    path:'Create-Product',
                    element:<CreateProduct />
                  },
                  {
                    path:'Create-Category',
                    element:<CreateCategory />
                  }
                ]
              },
              
              {
                path: '/about',
                element: <AboutPage />,
              },
              {
                    path:'/search',
                    element:<SearchPage/>
                  },
               {
                path: '/AdminCategory',
                element: < AdminCategoryPage/>,
              },
               {
                path: '/AdminProduct',
                element: < AdminProductPage/>,
              },
              {
                path: '/Cart',
                element: <CartPage />,
              },
              {
                path: '/login',
                element: <Login />,
              },
              {
                path: '/signup',
                element: <Signup />,
              },

              {
                path: '/payment',
                element: <PaymentPage />,
              },
              {
                path: '/stripe-payment', // Add the Stripe Payment Route
                element: <StripePaymentPage />, // Add Stripe Payment page
              },
              {
                path:'/oauth2/callback',
                element:<OAuth2LoginCallback />
              },
              {
                path: '/thank-you',
                element: <ThankYouPage />,
              },
              { path: '*', element: <NotFoundPage /> },

        ]
    },
 
]);

export default router;



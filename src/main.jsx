import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements ,Navigate} from 'react-router-dom'
import Layout from './components/Layout.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact'
import Farmvilla from './components/farmvilla'
import Influencers from './components/Influencers'
import Resorts from './components/Resorts'
import Login from './components/Login'
import CheckoutPage from './components/Checkout.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'

import AdminLayout from './components/admin/Admin.jsx'; // Admin Navigation Layout
import AddWaterpark from './components/admin/AddWaterpark.jsx';
import GetBookings from './components/admin/GetBookings.jsx';
import EditWaterparkList from './components/admin/EditWaterparkList.jsx'
import AddEditPrivacyPolicy from './components/admin/AddEditPrivacyPolicy.jsx';
import AddEditTermsConditions  from './components/admin/AddEditTermsConditions.jsx';
import EditWaterpark from './components/admin/EditWaterpark.jsx'
import WaterparkTicket from './components/Ticket.jsx'
import RefundsAndCancellations from './components/Refund.jsx'
import TermsAndConditions from './components/TermsAndCond.jsx'
import UserHome from './components/UserDetails.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const user = JSON.parse(localStorage.getItem("user"));

const isAdmin = user && user.role == 'admin' ? true : false;
console.log(isAdmin);
const isLoggedIn = localStorage.getItem("isLoggedIn")=="true"?true:false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about' element={<About />} />
        <Route path='farmvilla' element={<Farmvilla />} />
        <Route path='influencers' element={<Influencers />} />

        <Route path='resorts' element={<Resorts />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='UserDetails' element={<UserHome />} />
        <Route
          path="/sign-in"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace={true} />
            ) : (
              <Login />
            )
          }
        />
        <Route path='/ticket' element={<WaterparkTicket />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundsAndCancellations />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>

      {isAdmin && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="add-waterpark" element={<AddWaterpark />} />
          <Route path="edit-waterpark" element={<EditWaterparkList />} />
          <Route path="/admin/edit-waterpark/:id" element={<EditWaterpark />} />
          <Route path="get-bookings" element={<GetBookings />} />
          <Route path="privacypolicy" element={<AddEditPrivacyPolicy  />} />
          <Route path="termsconditions" element={<AddEditTermsConditions  />} />
        </Route>
      )}
    </>

  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
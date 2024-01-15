import React from 'react'
import './App.css'; 
import './index.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Pagess/Login/index.jsx';
import Home from './Pagess/Home'; 
import Book from './Pagess/Book';
import Value from './components/Home/Value';
import Residencies from './components/Home/Residencies';
import GetStarted from './components/Home/GetStarted';
import Contact from './components/Home/Contact';
import Details from './Pagess/Details';
import Confirm from './Pagess/Confirm';
import ReservationDetails from './Pagess/ReservationDetails';
import PayNowPage from './Pagess/PayNowPage'
import AllResorts from './Pagess/AllResorts/index.jsx';

const App = () => (
  <div className='container'>
    <Routes>
      <Route path="/" element=  { <Login />} />
      <Route path="/home" exact element = { <Home />} />
      <Route path="/all" exact element = { <AllResorts />} />
      <Route path="/book" exact element = { <Book />} />
      <Route path="/login" exact element = { <Login />} />
      <Route path="/reservation-details" element = { <ReservationDetails />} />
      <Route path="/residencies" exact element = { <Residencies /> } />
      <Route path="/value" exact element = { <Value /> } />
      <Route path="/contact" exact element = { <Contact /> } />
      <Route path="/getstarted" exact element = { <GetStarted /> }/>
      <Route path="/details/:id" element={ <Details/> } />
      <Route path="/confirm/:roomid" element={ <Confirm/> } />
      <Route path="/pay-now" element={ <PayNowPage/> } />
      {/* <Route path="/qr-code" element={<QRCodePage/>} /> */}
    </Routes>
  </div>
);


export default App;
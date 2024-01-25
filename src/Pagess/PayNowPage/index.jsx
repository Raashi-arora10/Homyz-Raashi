import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './style.css';
import Header2 from '../../components/Home/Header2';

const PayNowPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Location object:', location);
  })
  const {
    resortName,
    name,
    email,
    phone,
    totalCharges,
  } = location.state || {};

  const advance = totalCharges * 0.5
  const upiId = 'raashi1@paytm';
  const note = 'You are paying to Homyz';
  const payeeName = 'Homyz';
  const encodedPayeeName = encodeURIComponent(payeeName);
  const upiPaymentUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(encodedPayeeName)}&tn=${encodeURIComponent(note)}&am=${advance}&cu=INR`;

  return (
    <div className="backs1">
      <Header2 />
      <div className='backss'>
        <div className='containerrr'>
          <h2 className="heading">Payment Details</h2>
          <p className="primaryText resort-name">{resortName}</p>
          <p className="booking-info">Booking For: {name}</p>
          <p className="booking-info">Email: {email}</p>
          <p className="booking-info">Contact No.: {phone}</p>
          <p className="charges">Total For Stay: ₹{totalCharges}</p>
          <p className="charges">Advance Payment: ₹{advance}</p>
          <div className="qrcode-container">
            <QRCode value={upiPaymentUrl} />
          </div>
          <p className='qr'>Scan The QR code to pay and complete your booking</p>
        </div>
      </div>
    </div>
  );
};

export default PayNowPage;

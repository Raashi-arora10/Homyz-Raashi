import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './style.css'; // Import your CSS file
import Header2 from '../../components/Home/Header2';

const API_URL = 'http://localhost:3000/api';

const ReservationDetails = () => {
  const location = useLocation();
  const { roomid } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirm, setConfirm] = useState(null);
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchConfirmData = async () => {
      try {
        const response = await fetch(`${API_URL}/getConfirmData`);
        if (response.ok) {
          const data = await response.json();        //Unwrapping the package
          setFetchedData(data);
          const selectItem = data.find((item) => item.roomid.toString() === roomid);
          setConfirm(selectItem || { name: 'Default Room Type' });
        } else {
          console.error('Failed to fetch confirmData');
        }
      } catch (error) {
        console.error('Error fetching confirmData:', error);
      }
    };

    fetchConfirmData();
  }, [roomid]);
  
  useEffect(() => {
    console.log('Location object:', location);
  }, [location]);

  if (!location.state) {
    return <div className="error-message">Error: Missing location state</div>;
  }

  const { checkInDate, checkOutDate, resortName, numberOfRooms, totalCharges, taxAmount, roomType } = location.state;      //location.state is a mechanism for passing and retrieving data during client-side navigation in SPAs, often associated with routing libraries like React Router.

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };

    if (!name.trim()) {
      alert('Name is required');
      valid = false;
    }

    if (!email.trim()) {
      alert('Email is required');
      valid = false;
    }

    if (!phone.trim()) {
      alert('Phone is required');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const handlePayNowClick = async () => {
    if (validateForm()) {
      try {
        // Step 1: Add payment details
        const addPaymentResponse = await fetch(`${API_URL}/registered`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resortName,
            roomType,
            checkInDate,
            checkOutDate,
            name,
            email,
            phone,
            totalCharges,
          }),
        });
  
        if (addPaymentResponse.ok) {
          alert("Booking confirmation email sent. You are redirecting to the payment gateway");
          const emailResponse = await fetch(`${API_URL}/email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: email,
              subject: 'Reservation Confirmation',
              text: `Dear ${name},\n\nBooking Confirmed!\nThank you for booking with Homyz.\n\nYour Booking Details: \n
                Resort: ${resortName}\n
                Room Type: ${roomType}\n
                Check-in: ${checkInDate}\n
                Check-out: ${checkOutDate}\n
                Total Charges: ₹${totalCharges}\n\n\nRegards,\nHomyz`,
            }),
          });
  
          if (emailResponse.ok) {
            // Step 4: Email sent successfully
            navigate('/pay-now', {
              state: {
                roomType,
                resortName,
                totalCharges,
                taxAmount,
                name,
                email,
                phone,
              },
            });
          } else {
            console.error('Failed to send confirmation email');
          }
        } else {
          console.error('Failed to add payment details');
        }
      } catch (error) {
        console.error('Error adding payment details:', error);
      }
    }
  };

  return (
    <div className="backs1">
      <Header2 />
      <div className='backss'>
        <div className="reservation-details-container">
          <h2 className='primaryText head'>Review Reservation Details</h2>
          <p className="pinkText">{roomType}, {resortName}</p>
          <p className="detail"><span>Check in: &nbsp; </span> {checkInDate}</p>
          <p className="detail"><span>Check out: &nbsp; </span> {checkOutDate}</p>
          <p className="detail"><span>Room(s): &nbsp; </span> {numberOfRooms}</p>
          <p className="details"><span>INR Taxes and fees: &nbsp; </span> ₹{taxAmount}</p>
          <p className="details"><span>INR Subtotal: &nbsp; </span> ₹{totalCharges}</p>
          {errors.name && <p className="error-message">{errors.name}</p>}
          {errors.email && <p className="error-message">{errors.email}</p>}
          {errors.phone && <p className="error-message">{errors.phone}</p>}
         
          <label className="input-label">
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
          </label>
          <br />
          <label className="input-label">
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
          </label>
          <br />
          <label className="input-label">
            Phone:
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" />
          </label>
          <br />

          <button onClick={handlePayNowClick} className="button">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; 
import Header2 from '../../components/Home/Header2';

const API_URL = 'http://localhost:3000/api';

const Confirm = () => {
  const { roomid } = useParams();
  const [confirm, setConfirm] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [totalCharges, setTotalCharges] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfirmData = async () => {
      try {
        const response = await fetch(`${API_URL}/getConfirmData`);
        if (response.ok) {
          const confirmData = await response.json();
          const selectItem = confirmData.find((item) => item.roomid.toString() === roomid);
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
    if (checkInDate && checkOutDate) {
      const pricePerRoom = parseFloat(confirm.stp) || 0;
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      const totalCharges = pricePerRoom * numberOfRooms * numberOfDays;
      const taxAmount = totalCharges * 0.05;

      setTotalCharges(totalCharges.toFixed(2));
      setTaxAmount(taxAmount.toFixed(2)); 
    }
  }, [checkInDate, checkOutDate, numberOfRooms, confirm]);

  const handleNumberOfRoomsChange = (e) => {
    setNumberOfRooms(parseInt(e.target.value, 10) || 1);
  };

  const handleContinueClick = () => {
    const currentDate = new Date();
    if (!checkInDate || !checkOutDate || new Date(checkOutDate) <= new Date(checkInDate) || new Date(checkInDate) < currentDate) {
      alert('Please enter valid check-in and check-out dates.');
      return;
    }
    setDateError('');
    navigate('/reservation-details', {
      state: {
        resortName: confirm?.hotelname || 'Default Resort Name',
        roomType: confirm?.name || 'Default Room Type',
        checkInDate,
        checkOutDate,
        numberOfRooms,
        totalCharges,
        taxAmount
      },
    });
  };

  if (!confirm) {
    return <div className="details-loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <Header2 />
      </div>
      <div className="confirm-container">
        <div className="image-section">
          <img src={confirm.imgg} alt={confirm.name} />
        </div>
        <div className="details-section">
          <h2 className="primaryText hotel">{confirm.hotelname}</h2>
          <h2 className="pinkText">{confirm.name}</h2>
          <p className="pinkText pr">Price: ₹{confirm.stp}</p>
          <p>Details: {confirm.detail}</p>
          <div className="star-rating">
            {Array.from({ length: confirm.rating }).map((_, index) => (
              <FaStar key={index} className="star" />
            ))}
          </div>

          <div className="check-in-out">
            <label htmlFor="checkInDate">Check-in Date:</label>
            <input type="date" id="checkInDate" onChange={(e) => setCheckInDate(e.target.value)} />
            <label htmlFor="checkOutDate">Check-out Date:</label>
            <input type="date" id="checkOutDate" onChange={(e) => setCheckOutDate(e.target.value)} />
            {dateError && <p className="error-message">{dateError}</p>}
          </div>

          <div className="number-of-rooms">
            <label htmlFor="numberOfRooms">Number of Rooms:</label>
            <input
              type="number"
              id="numberOfRooms"
              min="1"
              value={numberOfRooms}
              onChange={handleNumberOfRoomsChange}
            />
          </div>

          <div className="charges-summary">
            <p>Total Price: ₹{totalCharges}</p>
            <p>INR Taxes and Fees: ₹{taxAmount}</p>
            <hr className="hr-divider" />
            <p>Total for stay: ₹{(parseFloat(totalCharges) + parseFloat(taxAmount)).toFixed(2)}</p>

            <button className="button" onClick={handleContinueClick}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

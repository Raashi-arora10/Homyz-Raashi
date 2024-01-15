import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; 
import Header2 from '../../components/Home/Header2';
import axios from 'axios';

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [confirmData, setConfirmData] = useState([]);
  const lodgingSectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getDetails/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    const fetchConfirmData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getConfirmData');        //Axios is a JavaScript library that helps you make requests to external resources, like APIs or servers, from your web applications.
        setConfirmData(response.data);
      } catch (error) {
        console.error('Error fetching confirmData:', error);
      }
    };

    fetchData();
    fetchConfirmData();
  }, [id]);

  const hotelRooms = details ? confirmData.filter((room) => room.hotelId === details.id) : [];


  const handleSeeRoomsClick = () => {
    lodgingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (!details) {
    return <div className="details-loading">Loading...</div>;
  }

  const services = [
    { name: 'Swimming Pool', icon: '🏊‍♂️' },
    { name: 'Free Wi-Fi', icon: '📶' },
    { name: 'Spa & Wellness', icon: '💆‍♀️' },
    { name: 'Fitness Center', icon: '🏋️‍♂️' },
    { name: 'Restaurant', icon: '🍽️' },
    { name: 'Room Service', icon: '🛎️' },
    { name: '24/7 Reception', icon: '🕒' },
    { name: 'Parking', icon: '🅿️' },
  ];

  return (
    <>
      <div className="backs1">
        <Header2 />
        <div className="backs">
          <div className="details-container">
            <h2 className="primaryText">{details.name}</h2>
            <p className="pinkText pr">Price: {details.price}</p>
            <p className="details-detail">Details: {details.detail}</p>
            <div className="star-rating">
              {Array.from({ length: details.rating }).map((_, index) => (
                <FaStar key={index} className="star" />
              ))}
            </div>
            <img className="details-image" src={details.image} alt={details.name} />
            <button className="button" onClick={handleSeeRoomsClick}>See The Rooms</button>
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
      <h2 className="primaryText heads">Services & Equipment</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-item" key={index}>
            <span className="service-icon">{service.icon}</span>
            <p className="service-name">{service.name}</p>
          </div>
        ))}
      </div>
      <hr className='services-hr' />

      <div ref={lodgingSectionRef} className="rooms">
        <h2 className='primaryText pppp'>Lodgings Options</h2>
        <div className="room-container">
          {hotelRooms.map((room) => (
            <div className="room-item" key={room.roomid}>
              <p className='pinkText'>{room.name}</p>
              <img src={room.imgg} alt="Standard Room" />
              <p className="rate">Member Flexible Rate</p>
              <p className="room-price secondaryText"><span>{room.stp}</span></p>
              <Link to={`/confirm/${room.roomid}`}><button className="bbt button">SELECT</button></Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Details;

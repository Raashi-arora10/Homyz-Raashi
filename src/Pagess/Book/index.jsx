import React, { useState, useEffect } from 'react';
import './style.css'

const Book = ({location}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    numberOfRooms: 1,
    resort: ''
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Retrieve data from location state when the component mounts
    if (location && location.state) {
      const {
        checkInDate,
        checkOutDate,
        resortName,
        roomType,
        numberOfRooms,
        totalCharges,
        taxAmount
      } = location.state;

      // Set the retrieved data into the form state
      setFormData({
        ...formData,
        name: '', // Set the user's name here (if available)
        email: '', // Set the user's email here (if available)
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numberOfRooms: numberOfRooms,
        resort: resortName
      });
    }
  }, [location?.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData,
    [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (!formData.resort) newErrors.resort = 'Resort name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      console.log('Form data submitted:', formData);
      setFormSubmitted(true);
    }
  };

  return (
    <div className="container1">
    <div className="book-resort-form">
      <h2>Book Your Resort</h2>
      {formSubmitted ? (
        <p>Homyz wants to redirect you to payment page</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Resort Name</label>
            <select
              name="resort"
              value={formData.resort}
              onChange={handleInputChange}
            >
              <option value="">Select a Resort</option>
              <option value="Resort1">Caravela Beach</option>
              <option value="Resort2">The Leela Kovalam</option>
              <option value="Resort3">Silver Sand Beach</option>
              <option value="Resort4">Holiday Inn Resort</option>
              <option value="Resort5">Aliva Priva Jardin</option>
              <option value="Resort6">Assati Garden City</option>
              <option value="Resort7">Chitralan Puri</option>
            </select>
            {errors.resort && <span className="error">{errors.resort}</span>}
          </div>
          <div className="form-group">
            <label>Check-in Date</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
            />
            {errors.checkIn && <span className="error">{errors.checkIn}</span>}
          </div>
          <div className="form-group">
            <label>Check-out Date</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
            />
            {errors.checkOut && <span className="error">{errors.checkOut}</span>}
          </div>
          <div className="form-group">
            <label>Number of Rooms</label>
            <input
              type="number"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleInputChange}
            />
          </div>
          <button className="button br">Book Now</button>
        </form>
      )}
    </div>
    </div>
  );
};

export default Book;

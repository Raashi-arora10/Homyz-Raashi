import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './style.css';
import { sliderSettings } from '../../../utils/common';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Residencies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [resortsData, setResortsData] = useState([]);

  useEffect(() => {
    const fetchResortsData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getAllHotels'); 
        setResortsData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching resorts data:', error);
      }
    };
  
    fetchResortsData();
  }, []);
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/searchHotels?query=${searchQuery}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error searching hotels:', error);
    }
  };
  
  const handleClear = () => {
    setSearchQuery('');
    setFilteredData(resortsData);
  };

  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="pinkText">Best Choices</span>
          <span className="primaryText">Luxurious Resorts</span>
        </div>
        <div className="view-all-container">
        <Link to="/all">
          <button className='button view'>&#8594;</button>
        </Link>
      </div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />
        <Swiper {...sliderSettings}>
          <SliderButtons />
          {filteredData.map((card, i) => (
            <SwiperSlide key={i}>
              {card && (
                <div className="flexColStart r-card">
                  <Link to={`/details/${card.id}`}>
                    <img src={card.image} alt="" />
                  </Link>
                  <span className="secondaryText r-price">
                    <span style={{ color: 'blue' }}>₹</span>
                    <span>{card.price}</span>
                  </span>
                  <span style={{ flex: 1 }} className="primaryText">
                    {card.name}{' '}
                  </span>
                  <span className="secondaryText">{card.detail}</span>
                  <Link to={`/details/${card.id}`}>
                    <button className="button">View Deal &gt;</button>
                  </Link>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, handleClear }) => {
  return (
    <div className="flexCenter search-bar">
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cities..."
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-button" onClick={handleClear}>
            &#10006; {/* Unicode character for 'X' */}
          </button>
        )}
      </div>
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

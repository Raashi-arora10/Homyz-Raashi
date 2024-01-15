import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; 
import './style.css';
import Header2 from '../../components/Home/Header2';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllResorts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/searchHotels?query=${searchQuery}`);
  
      if (searchQuery.trim() === '') {
        // If no city is searched, update both resortsData and filteredData
        setResortsData(response.data);
        setFilteredData(response.data);
      } else {
        // If a city is searched, update only filteredData
        setFilteredData(response.data);
      }
    } catch (error) {
      console.error('Error searching hotels:', error);
    }
  };

  const handleFilterByPriceRange = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/filterHotelsByPriceRange', {
        params: {
          minPrice: parseFloat(minPrice),
          maxPrice: parseFloat(maxPrice),
        },
      });
  
      if (searchQuery.trim() === '') {
        setFilteredData(response.data);
      } else {
        const filteredByCity = resortsData.filter((hotel) =>
          hotel.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
        const filteredByPriceRange = response.data;
        const intersection = filteredByCity.filter((hotel) =>
          filteredByPriceRange.some((filteredHotel) => filteredHotel.id === hotel.id)
        );
  
        setFilteredData(intersection);
      }
    } catch (error) {
      console.error('Error filtering hotels by price range:', error);
    }
  };
  
  const handleClear = () => {
    setSearchQuery('');
    setFilteredData(resortsData);
  };
  return (
    <div className="backs1">
        <Header2 />
        <div className="backs">
    <section className="r-wrapperr">
      <div className="paddings innerWidth r-containerr">
        <div className="r-headd flexColStart">
          <span className="pinkText">Best Choices</span>
          <span className="primaryText xtt">Luxurious Resorts</span>
        </div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />
         <PriceFilter
          applyFilter={handleFilterByPriceRange}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          setResortsData={setResortsData} 
          setFilteredData={setFilteredData}
        />
          {filteredData.map((card, i) => (
            <div key={i} className="r-cardd">
                {card && (
                <>
                    <Link to={`/details/${card.id}`}>
                    <img src={card.image} alt="" />
                    </Link>
                    <div className="r-cardd-details">
                    <Link to={`/details/${card.id}`}>
                        <span className="primaryText xt">{card.name}</span>
                    </Link><br />
                    <div className="stars-rating">
                      {Array.from({ length: card.rating }).map((_, index) => (
                        <FaStar key={index} className="stars" />
                      ))}
                    </div><br />
                    <span className="secondaryText">{card.detail}</span><br />
                    <span className="secondaryText r-price">
                        <span style={{ color: 'blue' }}>₹</span>
                        <span>{card.price}</span>
                    </span><br />
                    <Link to={`/details/${card.id}`}>
                        <button className="button">View Deal &gt;</button>
                    </Link>
                    </div>
                </>
                )}
            </div>
            ))}
      </div>
    </section>
    </div>
    </div>
  );
};

export default AllResorts;

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, handleClear }) => {
  return (
    <div className="flexCenter search-barr">
      <div className="search-containerr">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cities..."
          className="search-inputt"
        />
        {searchQuery && (
          <button className="clear-button" onClick={handleClear}>
            &#10006;
          </button>
        )}
      </div>
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
const PriceFilter = ({ applyFilter, handleMinPriceChange, handleMaxPriceChange, setResortsData, setFilteredData }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApplyFilter = () => {
    applyFilter();
  };

  const reset = async (searchQuery) => {
    try {
      const response = await axios.get('http://localhost:3000/api/getAllHotels');
  
      if (searchQuery && typeof searchQuery === 'string') {
        const searchResponse = await axios.get(`http://localhost:3000/api/searchHotels?query=${searchQuery}`);
        setResortsData(searchResponse.data);
        setFilteredData(searchResponse.data);
      } else {
        setResortsData(response.data);
        setFilteredData(response.data);
      }
  
      setMinPrice('');
      setMaxPrice('');
    } catch (error) {
      console.error('Error fetching resorts data:', error);
    }
  };
  return (
    <div className="price-filter-container">
      <label className="price-input-label">
        Min Price:
        <input
          type="number"
          value={minPrice}
          onChange={(e) => { setMinPrice(e.target.value); handleMinPriceChange(e); }}
          className="price-input"
        />
      </label>
      <label className="price-input-label">
        Max Price:
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => { setMaxPrice(e.target.value); handleMaxPriceChange(e); }}
          className="price-input"
        />
      </label>
      <button className="apply-filter-button" onClick={handleApplyFilter}>
        Apply Filters
      </button>
      <button className="clear-button" onClick={reset}>
        &#10006;
      </button>
    </div>
  );
};
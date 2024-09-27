import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin, items }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false); // Toggle search input
  const [searchQuery, setSearchQuery] = useState("");  // Search input value
  const [searchResults, setSearchResults] = useState([]);  // Filtered results
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  // Handle search icon click
  const handleSearchClick = () => {
    setShowSearch(!showSearch); // Toggle search input
  };

  // Handle search input change and filter items
  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter items based on the search query
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    );
    
    setSearchResults(filteredItems);
  };

  // Handle clearing the search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>
      
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>mobile app</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>contact us</a>
      </ul>

      <div className="navbar-right">
        {/* Search Icon */}
        <img 
          src={assets.search_icon} 
          alt="Search" 
          onClick={handleSearchClick} 
          className="search-icon"
        />

        {/* Show search input field when `showSearch` is true */}
        {showSearch && (
          <div className="search-container">
            <form className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search..."
                autoFocus
                className="search-input"
              />
              {searchQuery && <button type="button" className="clear-button" onClick={handleClearSearch}>✕</button>}
            </form>

            {/* Display search results */}
            {searchResults.length > 0 && (
              <div className="search-results">
                <ul>
                  {searchResults.map(item => (
                    <li key={item.id} onClick={() => navigate(`/item/${item.id}`)}>
                      <p>{item.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No results found */}
            {searchQuery && searchResults.length === 0 && (
              <div className="search-no-results">
                <p>No results found.</p>
              </div>
            )}
          </div>
        )}

        {/* Cart icon */}
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {/* Sign-in / Profile logic */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" /> 
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /> 
                <p>Logout</p>
              </li> 
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

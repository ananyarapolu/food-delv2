import React from 'react'
import './Header.css'

const Header = () => {
    // Function to handle the button click
    const handleViewMenuClick = () => {
        console.log('View Menu button clicked!');
        // Example action: redirect to a menu page
        window.location.href = '/#explore-menu'; // Redirect to /menu page
    };

    return (
        <div className='header'>
            <div className='header-contents'>
            <h2>Order your favourite dessert here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dessert crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings one delicious dessert at a time.</p>
                <button onClick={handleViewMenuClick}>View Menu</button>

            </div>
        </div>
    )
}

export default Header

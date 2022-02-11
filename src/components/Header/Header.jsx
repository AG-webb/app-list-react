import React from 'react';
import './style.scss';

const Header = ({ searchQuery, setSearchQuery }) => {
    const onInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <header>
            <input
                type="text"
                placeholder="Search by App"
                name="search"
                value={searchQuery}
                onChange={onInputChange}
            />
        </header>
    );
}

export default Header;
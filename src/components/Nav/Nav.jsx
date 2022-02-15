import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const sortList = [
    {name: "Channels"},
    {name: "Voice Analytics"},
    {name: "Productivity"},
    {name: "Dialer"},
    {name: "Reporting"},
    {name: "Optimization"},
    {name: "Management"},
    {name: "All"},
]

const Nav = ({ selectedFilter, setSelectedFilter }) => {
    const onCategoryClick = (name) => {
        if(name === selectedFilter) {
            return setSelectedFilter("");
        }

        setSelectedFilter(name);
    }

    const mapSortedList = () => {
        return sortList.sort((a, b) => a["name"].localeCompare(b["name"])).map(({ name }, index) => {
            let activeClass = selectedFilter === name ? "active" : null;
            return <li key={index} className={activeClass}>
                <NavLink to="#" onClick={() => onCategoryClick(name)}>{name}</NavLink>
            </li>
        })
    }

    return (
        <nav className="nav-categories">
            <h2>Categories</h2>
            <ul className="nav-menu">
                { mapSortedList() }
            </ul>

        </nav>
    );
}

export default Nav;
import React from 'react';
import './style.scss';

const AppItem = ({ name, description, categories, subscriptions }) => {
    const mapCategories = () => {
        return categories.map((category, index) => {
            return index === categories.length - 1
            ? <span key={index}> {category} </span> 
            : <>
                <span key={index}> {category} </span> / 
            </> 
        });
    }

    const mapSubscriptions = () => {
        return subscriptions.map(({price, name}, index) => {
            return <li key={index}>
                    <span>{name}</span>
                    <h3>
                        {price !== 0 ? price : "Free"}
                        <sup>{price !== 0 ? "€" : ""}</sup>
                    </h3>
                </li>
        });
    }

    return (
        <div className="app-item">
            <div className="box-info">
                <div className="box-info--content">
                    <div className="description">
                        <h1>{name}</h1>
                        <p>{description}</p>
                    </div>
                    <div className="tags">
                        { mapCategories() }
                    </div>
                </div>
                <div className="box-info--footer">
                    <ul>
                        { mapSubscriptions() }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AppItem;
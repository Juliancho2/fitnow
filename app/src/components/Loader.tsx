import React from 'react';
import './loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <small>Loading...</small>
        </div>
    );
};

export default Loader;
import React from 'react';
import './hello.scss';
import colo from '../../assets/images/tnt.jpg';

const Hello = () => {
    return(
        <div>
            <h1 className="hello">Hello</h1>
            <img src={colo} />
        </div>
    );
};

export default Hello;
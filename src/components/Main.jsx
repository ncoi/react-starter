import React from 'react';
import Hello from './Hello/Hello';
import World from './World/World';

export default class Main extends React.Component {
    render() {
        return(
            <div>
                <Hello />
                <World />
            </div>
        );
    };
} 
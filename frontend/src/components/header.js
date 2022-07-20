import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/header.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header space">
                <h2 className="header textStyle">Pasteis🍮</h2>
                <div style={{ paddingRight: 30 }}>
                    {this.props.options.map((option, idx) => {
                        return (
                            <Link
                                key={idx}
                                className="header textStyle"
                                to={option.link}
                            >
                                {option.content}
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

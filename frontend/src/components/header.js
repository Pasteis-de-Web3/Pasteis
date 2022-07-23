import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/header.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header space">
                <Link
                    key='home'
                    className="header textStyle"
                    to='/home'
                >
                    <h2 className="header textStyle">Pasteis🍮</h2>
                </Link>
                <div style={{ paddingRight: 30 }}>
                    {this.props.options.map((option, idx) => {
                        return (
                            <Link
                                key={idx}
                                className="header textStyle"
                                to={option.link}
                                style={{ textDecoration: option.selected ? 'underline' : 'none' }}
                            >
                                {option.content}
                            </Link>
                        );
                    })}
                </div>
            </div >
        );
    }
}

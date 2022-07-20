import React from 'react';

import Header from '../components/header';

import '../styles/fonts.css';
import landing_image from '../images/landing-img.jpg';
import metamask_fox from '../images/MetaMask_Fox.png';

const ConnectWalletButton = ({ connect_wallet }) => {
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 10,
        color: 'white', // force color here since background changes
    };

    const imageStyle = {
        width: '40px',
        height: '40px',
    };

    return (
        <button style={{ ...buttonStyle }} onClick={connect_wallet}>
            <img style={imageStyle} src={metamask_fox} />
            Connect with MetaMask
        </button>
    );
};

const Landing = ({ connect_wallet }) => {
    const space_horizontal = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    };
    const space_vertical = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const imageStyle = {
        width: '800px',
        height: '600px',
        borderRadius: 15,
    };

    const landing_header_items = [{ content: 'About', link: '/about' }];

    return (
        <div>
            <Header options={landing_header_items} />
            <div style={space_horizontal}>
                <div style={space_vertical}>
                    <h1 style={{ margin: '30px' }}>
                        Hello 👋 Welcome to Pasteis 🍮 <br /> A Digital Space
                        for Hackathons!{' '}
                    </h1>
                    <ConnectWalletButton connect_wallet={connect_wallet} />
                </div>
                <img
                    style={imageStyle}
                    src={landing_image}
                    alt="landing-image"
                />
            </div>
        </div>
    );
};

export default Landing;

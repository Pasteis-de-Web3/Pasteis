import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useHistory,
} from 'react-router-dom';

import Header from '../components/header';

import '../styles/fonts.css';
import landing_image from '../images/landing-img.jpg';
import metamask_fox from '../images/MetaMask_Fox.png';
import HackathonCard from '../components/hackathoncard';

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
    const [walletId, setWalletId] = useState(undefined);

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

    const login = async () => {
        connect_wallet().then((walletId) => {
            setWalletId(walletId);
        });
    };

    const landing_header_items = [{ content: 'About', link: '/about' }];
    const logged_in_header_items = [
        { content: 'Home', link: '#' },
        { content: 'Explore', link: '#' },
        ...landing_header_items,
        { content: 'Username', link: '#' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    const hackathon_stub = [
        {
            image: 'https://www.opservices.com.br/wp-content/uploads/2017/01/Hackathon.png',
            title: 'Sample hackathon',
            description: 'This is a sample hackathon',
        },
        {
            image: 'https://www.opservices.com.br/wp-content/uploads/2017/01/Hackathon.png',
            title: "Sample hackathon with a very long title that is so massive it won't fit very well",
            description:
                "This is a sample hackathon with also a description so huge that it is expected to be causing troubles in the interface. I don't know if we should be actually caring much about this but i think it would be nice to make it look good",
        },
    ];

    return (
        <div>
            <Header
                options={
                    walletId !== undefined
                        ? logged_in_header_items
                        : landing_header_items
                }
            />
            {walletId !== undefined ? (
                <div style={space_horizontal}>
                    <div style={space_vertical}>
                        {hackathon_stub.map((hackathon) => (
                            <HackathonCard hackathon={hackathon} />
                        ))}
                    </div>
                </div>
            ) : (
                <div style={space_horizontal}>
                    <div style={space_vertical}>
                        <h1 style={{ margin: '30px' }}>
                            Hello 👋 Welcome to Pasteis 🍮 <br /> A Digital
                            Space for Hackathons!{' '}
                        </h1>
                        <ConnectWalletButton connect_wallet={login} />
                    </div>
                    <img
                        style={imageStyle}
                        src={landing_image}
                        alt="landing-image"
                    />
                </div>
            )}
        </div>
    );
};

export default Landing;

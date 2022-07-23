import React, { useEffect, useState } from 'react';

import Header from '../components/header';
import HackathonCard from '../components/hackathoncard';

import { getSignedUpHackathons } from '../mock/hackathons.js';
import { getWallet } from '../utils';

const Home = () => {

    const [walletAddress, setWallet] = useState(null);

    useEffect(() => {
        getWallet().then(walletId => setWallet(walletId));
    }, [])

    const header_items = [
        { content: 'Home', link: '/home', selected: true },
        { content: 'Explore', link: '/explore' },
        { content: 'Create', link: '/create' },
        { content: 'About', link: '/about' },
        { content: 'Username', link: `/user/${walletAddress}` },
    ];

    let [enrolled_hackathons, setEnrolledHackathons] = useState([]);

    useEffect(() => {

        getSignedUpHackathons().then((hackathons) => {
            console.log(hackathons);
            setEnrolledHackathons(hackathons);
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    let myHackathons;
    if (enrolled_hackathons.length === 0) {
        myHackathons = <p>You haven't signed up for any hackathons yet</p>
    } else {
        myHackathons = enrolled_hackathons.map((hackathon, index) => {
            return <HackathonCard key={index} hackathon={hackathon} />
        })
    }

    const titleStyle = {
        fontSize: '28px',
    }

    const overallLayout = {
        width: '100%',
    }

    const avatarStyle = {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
    }

    const topBar = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '22px',
    }

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        margin: 'auto',
    }

    return (
        <>
            <Header options={header_items} />

            <div style={overallLayout}>
                <div style={topBar}>
                    <img style={avatarStyle} src="https://images.unsplash.com/photo-1548041347-390744c58da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1392&q=80" />
                    <p>{walletAddress}</p>
                    <p style={{fontSize: '36px'}}>Welcome back!</p>
                </div>

                <div style={listStyle}>
                    <p style={titleStyle}>Your active hackathons</p>
                    {myHackathons}
                </div>
            </div>

        </>
    );
};

export default Home;

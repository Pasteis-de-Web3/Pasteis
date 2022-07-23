import React, { useState } from 'react';

import Header from '../components/header';
import HackathonCard from '../components/hackathoncard';

import { getHackathons, getSignedUpHackathons } from '../mock/hackathons.js';

const Home = () => {
    const header_items = [
        { content: 'Home', link: '/home', selected: true },
        { content: 'Explore', link: '/explore' },
        { content: 'Create', link: '/create' },
        { content: 'About', link: '/about' },
        { content: 'User', link: '/user' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    let [enrolled_hackathons, setEnrolledHackathons] = useState([]);

    getSignedUpHackathons().then((hackathons) => {
        console.log(hackathons);
        setEnrolledHackathons(hackathons);
    }).catch((err) => {
        console.log(err);
    })


    let myHackathons;
    if (enrolled_hackathons.length === 0) {
        myHackathons = <p>You haven't signed up for any hackathons yet</p>
    } else {
        myHackathons = enrolled_hackathons.map((hackathon, index) => {
            return <HackathonCard key={index} hackathon={hackathon} />
        })
    }

    const titleStyle = {
        fontSize: '36px',
    }

    const overallLayout = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }

    const imageStyle = {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
    }

    const leftBar = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: '18px',
        padding: '25px',
    }

    const rightBar = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: '18px',
        padding: '25px',
        backgroundColor: 'red'
    }

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 'auto',
        width: '90%',
        textAlign: 'center',
        paddingLeft: "60px",
        backgroundColor: 'blue'
    }


    return (
        <>
            <Header options={header_items} />
            
            <div style={overallLayout}>
                <div style={leftBar}>
                    <img style={imageStyle} src="https://images.unsplash.com/photo-1548041347-390744c58da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1392&q=80"/>
                    <p>{"0x22e...3032"}</p>
                    <p>github</p>
                    <p>twitter</p>
                </div>

                <div style={listStyle}>
                    <p style={titleStyle}>Your active hackathons</p>
                    {myHackathons}
                </div>

                <div style={rightBar}>
                    <img style={imageStyle} src="https://images.unsplash.com/photo-1548041347-390744c58da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1392&q=80"/>

                </div>

            </div>
           
        </>
    );
};

export default Home;

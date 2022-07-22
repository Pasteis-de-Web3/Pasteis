import React, { useState } from 'react';

import Header from '../components/header';
import HackathonCard from '../components/hackathoncard';

const Home = () => {
    const header_items = [
        { content: 'Home', link: '/home', selected: true },
        { content: 'Explore', link: '#' },
        { content: 'About', link: '/about' },
        { content: 'Username', link: '#' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    const enrolled_hackathons = [
        {
            image: 'https://images.unsplash.com/photo-1552799446-159ba9523315?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
            title: 'Sample hackathon',
            description: 'This is a sample hackathon',
            start_date: 1658318400,
            end_date: 1658491200,
            prizeSum: "$1M ETH",
        },
        {
            image: 'https://images.unsplash.com/photo-1483825366482-1265f6ea9bc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
            title: "Sample hackathon with a very long title that is so massive it won't fit very well",
            description:
                "This is a sample hackathon with also a description so huge that it is expected to be causing troubles in the interface. I don't know if we should be actually caring much about this but i think it would be nice to make it look good",
            start_date: 1658318400,
            end_date: 1658491200,
            prizeSum: "$1M ETH",
        },
    ]

    const hackathon_stub = [
        {
            image: 'https://forkast.news/wp-content/uploads/2021/12/polygon-1260x709.jpg',
            title: 'Polygon hackathon',
            description: 'This is a sample hackathon',
            start_date: 1658318400,
            end_date: 1658491200,
            prizeSum: "$1M ETH",
        },
        {
            image: 'https://protocol.ai/images/og-default.jpg',
            title: 'ProtocolAI hackathon',
            description: 'This is a sample hackathon',
            start_date: 1658318400,
            end_date: 1658491200,
            prizeSum: "$1M ETH",
        },
        {
            image: 'https://www.opservices.com.br/wp-content/uploads/2017/01/Hackathon.png',
            title: 'Jayee\'s hackathon',
            description: 'This is a sample hackathon',
            start_date: 1658318400,
            end_date: 1658491200,
            prizeSum: "$1M ETH",
        },
        {
            image: 'https://www.opservices.com.br/wp-content/uploads/2017/01/Hackathon.png',
            title: 'Evy\'s hackathon',
            description: 'This is a sample hackathon',
            start_date: 1658318400,
            end_date: 1658491200,
            prizeSum: "$1M ETH",
        },
    ];

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        width: '90%',
        textAlign: 'center',
    }

    let myHackathons;
    if (enrolled_hackathons.length == 0) {
        myHackathons = <p>You haven't signed up for any hackathons yet</p>
    } else {
        myHackathons = enrolled_hackathons.map((hackathon, index) => {
            return <HackathonCard key={index} hackathon={hackathon} />
        })
    }

    const titleStyle = {
        fontSize: '36px',
    }

    const inputStyle = {
        width: '50%',
        marginTop: '-20px',
        marginBottom: '20px',
        backgroundColor: '#EDEFF2',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        height: '70px',
        paddingLeft: '70px',
    }

    const [searchText, setSearchText] = useState('');
    const updateText = (event) => {
        setSearchText(event.target.value);
    }

    let findHackathons;
    if (searchText == '') {
        findHackathons = hackathon_stub;
    } else {
        findHackathons = hackathon_stub.filter((hackathon) => {
            return hackathon.title.toLowerCase().includes(searchText.toLowerCase());
        });
    }

    const notFoundText = {
        fontSize: '18px',
        height: '1000px',
    }

    return (
        <>
            <Header options={header_items} />
            <div style={listStyle}>
                <p style={titleStyle}>Your active hackathons</p>
                {myHackathons}
            </div>

            <div style={listStyle}>
                <p style={titleStyle}>Find more hackathons</p>
                <input style={inputStyle} placeholder="Search for hackathon name" onChange={updateText} />
                {
                    findHackathons.length != 0 ?
                        findHackathons.map((hackathon, idx) => (
                            <HackathonCard hackathon={hackathon} key={idx} />
                        )) : <p style={notFoundText}>No hackathons found with this name</p>
                }
            </div>
        </>
    );
};

export default Home;

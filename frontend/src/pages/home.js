import React, { useState } from 'react';

import Header from '../components/header';
import HackathonCard from '../components/hackathoncard';

const Home = () => {
    const [walletId, setWalletId] = useState(undefined);

    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '#' },
        { content: 'About', link: '/about' },
        { content: 'Username', link: '#' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    const hackathon_stub = [
        {
            image: 'https://images.unsplash.com/photo-1552799446-159ba9523315?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
            title: 'Sample hackathon',
            description: 'This is a sample hackathon',
        },
        {
            image: 'https://images.unsplash.com/photo-1483825366482-1265f6ea9bc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
            title: "Sample hackathon with a very long title that is so massive it won't fit very well",
            description:
                "This is a sample hackathon with also a description so huge that it is expected to be causing troubles in the interface. I don't know if we should be actually caring much about this but i think it would be nice to make it look good",
        },
        {
            image: 'https://forkast.news/wp-content/uploads/2021/12/polygon-1260x709.jpg',
            title: 'Sample hackathon',
            description: 'This is a sample hackathon',
        },
        {
            image: 'https://protocol.ai/images/og-default.jpg',
            title: 'Sample hackathon',
            description: 'This is a sample hackathon',
        },
        {
            image: 'https://www.opservices.com.br/wp-content/uploads/2017/01/Hackathon.png',
            title: 'Sample hackathon',
            description: 'This is a sample hackathon',
        },
        {
            image: 'https://www.opservices.com.br/wp-content/uploads/2017/01/Hackathon.png',
            title: 'Sample hackathon',
            description: 'This is a sample hackathon',
        },
    ];

    return (
        <>
            <Header options={header_items} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 'auto',
                    width: '90%',
                    textAlign: 'center',
                }}
            >
                {hackathon_stub.map((hackathon, idx) => (
                    <HackathonCard hackathon={hackathon} key={idx} />
                ))}
            </div>
        </>
    );
};

export default Home;

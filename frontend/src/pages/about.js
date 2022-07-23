import React, { useState, useEffect } from 'react'
import Header from '../components/header';
import { getWallet } from '../utils';

const About = () => {


    const [walletAddress, setWallet] = useState(null);

    useEffect(() => {
        getWallet().then(walletId => setWallet(walletId));
    }, [])

    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '/explore' },
        { content: 'Create', link: '/create' },
        { content: 'About', link: '/about', selected: true },
        { content: 'Username', link: `/user/${walletAddress}` },
    ];
    return (
        <div>
            <Header options={header_items} />
        </div>
    )
}

export default About;
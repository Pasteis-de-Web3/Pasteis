import React, { useState } from 'react'
import Header from '../components/header';


const About = () => {

    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '/explore' },
        { content: 'Create', link: '/create' },
        { content: 'About', link: '/about', selected: true},
        { content: 'Username', link: '/user' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    return (
        <div>
            <Header options={header_items} />
        </div>
    )
}

export default About;
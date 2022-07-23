import React, { useState, useEffect } from 'react'
import {
    useParams,
} from "react-router-dom"
import HackathonBadge from '../components/hackathonbadge'

import Header from '../components/header'
import Sticker from '../components/sticker'
import { getHackathon, getTeam, getAnnouncements, getPrizes } from '../mock/hackathons.js'


const User = () => {

    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '/explore' },
        { content: 'Create', link: '/create' },
        { content: 'About', link: '/about' },
        { content: 'Username', link: '/user', selected: true }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    const overallLayout = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    }
    
    const leftBar = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        fontSize: '18px'
    }

    const rightSection = {
        float: 'right',
        width: '80%',
        padding: '10px',
        textAlign: 'center',
    }

    const submitButtonStyle = {
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '15px',
        fontSize: '32px',
        padding: '10px',
        cursor: 'pointer',
        width: '100%',
    }

    const tabsStyle = {
        cursor: 'pointer',
    }

    const imageStyle = {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
    }


    return (
        <>
            <Header options={header_items} />

            <div style={overallLayout}>
                <div style={leftBar}>
                    <img style={imageStyle} src="https://images.unsplash.com/photo-1548041347-390744c58da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1392&q=80"/>
                    <p>{"0x22e...3032"}</p>
                </div>

                <div style={rightSection}>
                   
                </div>
            </div>
            
        </>
    )
}

export default User;
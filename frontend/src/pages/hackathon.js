import React, { useState, useEffect } from 'react'
import {
    useParams,
} from "react-router-dom"
import HackathonBadge from '../components/hackathonbadge'

import HackathonCard from '../components/hackathoncard'
import Header from '../components/header'
import { getHackathon, getTeam } from '../mock/hackathons.js'

const Hackathon = () => {
    const id = useParams().id

    const [hack, setHack] = useState(undefined)
    const [team, setTeam] = useState(undefined)

    getHackathon(id).then((hack) => {
        setHack(hack)
    })

    // useEffect make it only run once
    useEffect(() => {
        getTeam(id).then((team) => {
            setTeam(`0x${team.toUpperCase()}`)
        })
    }, [])

    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '#' },
        { content: 'About', link: '/about' },
        { content: 'Username', link: '#' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    // Left bar should be slim and work as a second bar
    const leftBar = {
        float: 'left',
        width: '15%',
        textAlign: 'right',
        padding: '10px',
        fontSize: '24px',
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

    const side_items = [
        { content: 'Schedule', subpage: <p>Schedule</p> },
        { content: 'Prizes', subpage: <p>Prizes</p> },
        { content: 'Find team', subpage: <p>Find team</p> },
        { content: 'Brainstorm', subpage: <p>Brainstorm</p> },
    ]

    const [selectedTab, setSelectedTab] = useState(0)

    const select =  (id) => {
        setSelectedTab(id)
    }

    return (
        <>
            <Header options={header_items} />
            {
                hack && (
                    <div>
                        <div style={leftBar}>
                            <HackathonBadge hackathon={hack} />
                            <p>Team: {team}</p>
                            <button style={submitButtonStyle}>Submit</button>
                            <div style={tabsStyle}>
                                {
                                    side_items.map((item, index) => {
                                        return <p key={index} onClick={() => select(index)} >{item.content}</p>
                                    })
                                }
                            </div>
                        </div>
                        
                        <div style={rightSection}>
                            {
                                side_items[selectedTab].subpage
                            }
                        </div>
                    </div>) || <p>Loading...</p>
            }
        </>
    )
}

export default Hackathon;
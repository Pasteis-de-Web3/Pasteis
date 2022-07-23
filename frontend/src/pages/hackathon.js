import React, { useState, useEffect } from 'react'
import {
    useParams,
} from "react-router-dom"
import HackathonBadge from '../components/hackathonbadge'

import Header from '../components/header'
import Sticker from '../components/sticker'
import { getHackathon, getTeam, getAnnouncements, getPrizes } from '../mock/hackathons.js'

const ScheduleSubpage = (props) => {
    const timelineStyle = {
        float: 'left',
        width: '45%',
        marginLeft: '5%',
        display: 'flex',
        flexDirection: 'column',
    }

    const announcementsStyle = {
        float: 'right',
        width: '45%',
        display: 'flex',
        flexDirection: 'column',

    }

    const [announcements, setAnnouncements] = useState([])
    getAnnouncements(props.pageid).then((announcements) => {
        setAnnouncements(announcements)
    })

    return (
        <div>
            <div style={timelineStyle}>Timeline</div>
            <div style={announcementsStyle}>
                {
                    announcements.map((announcement, index) => {
                        return (
                            <Sticker
                                style={{
                                    width: "400px",
                                }}
                                title={announcement.title}
                                description={announcement.description}
                                date={announcement.date}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        </div>);
}

const PrizeSubpage = (props) => {
    const [hack_prizes, setPrizes] = useState([])
    getPrizes(props.pageid).then((p) => {
        setPrizes(p)
    })

    const prizeGrid = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    return (
        <div style={prizeGrid}>
            {
                hack_prizes.map((prize, index) => {
                    return (
                        <Sticker
                            style={{
                                width: "200px",
                                margin: '10px',
                                backgroundColor: '#f5f5f5',
                            }}
                            title={prize.name}
                            description={prize.value}
                            key={index}
                        />
                    )
                })
            }
        </div>
    );
}

const FindTeamSubpage = () => {
    return <p>Find Team</p>
}

const BrainstormSubpage = () => {
    return <p>Brainstorm</p>
}

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
        { content: 'Schedule', subpage: <ScheduleSubpage pageid={id} /> },
        { content: 'Prizes', subpage: <PrizeSubpage pageid={id} /> },
        { content: 'Find team', subpage: <FindTeamSubpage pageid={id} /> },
        { content: 'Brainstorm', subpage: <BrainstormSubpage pageid={id} /> },
    ]

    const [selectedTab, setSelectedTab] = useState(0)

    const select = (id) => {
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
                                        return <p
                                            key={index}
                                            onClick={() => select(index)}
                                            style={selectedTab === index ? {
                                                //underline
                                                textDecoration: 'underline',

                                            } : {}}
                                        >
                                            {item.content}
                                        </p>
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
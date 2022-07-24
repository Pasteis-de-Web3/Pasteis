import React, { useState, useEffect } from 'react'
import {
    useParams,
} from "react-router-dom"
import HackathonBadge from '../components/hackathonbadge'
import Web3 from 'web3/dist/web3.min.js'
import HackathonJSON from '../ABIs/HackathonFactory.json'


import Header from '../components/header'
import Sticker from '../components/sticker'
import Timeline from '../components/timeline'
import Project from '../components/project'
import { getHackathon, getTeam, getAnnouncements, getPrizes, getMoments } from '../mock/hackathons.js'
import { parse_date, getWallet } from '../utils'

const HackathonFactoryContractAddress = "0x67017A7F2dEa6AC087a92994eF16e83421dBE55f" // Goerli


const ScheduleSubpage = (props) => {
    const timelineStyle = {
        float: 'left',
        width: '25%',
        marginLeft: '5%',
        display: 'flex',
        flexDirection: 'column',
    }

    const announcementsStyle = {
        float: 'right',
        width: '65%',
        display: 'flex',
        flexDirection: 'column',
    }

    const [announcements, setAnnouncements] = useState([])
    getAnnouncements(props.pageid).then((announcements) => {
        setAnnouncements(announcements)
    })

    const [moments, setMoments] = useState([]);
    getMoments(props.pageid).then((moments) => {
        setMoments(moments)
    })

    return (
        <div>
            <div style={timelineStyle}>
                <Timeline moments={moments} />
            </div>
            <div style={announcementsStyle}>
                <h1>Announcements</h1>
                <div style={{ margin: '-30px auto' }}>
                    {
                        announcements.map((announcement, index) => {
                            return (
                                <div style={{ margin: '30px 0' }}>
                                    <Sticker
                                        title={announcement.title}
                                        content={announcement.description}
                                        smallText={parse_date(announcement.date)}
                                        key={index}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
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
                            title={prize.name}
                            content={prize.content}
                            smallText={prize.value}
                            key={index}
                        />
                    )
                })
            }
        </div>
    );
}

const CollaborateSubpage = (props) => {
    
    const overallGrid = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    const rowStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    return (
        <div style={overallGrid}>
            <h2>Brainstorming Sessions</h2>
            <div style={rowStyle}>
                <Sticker
                    title="Web3 for Social Good"
                    content="How might we use web3 technologies for social & public goods?"
                    smallText="10:00 UTC"
                    key="1"
                />
                <Sticker
                title="De-Social Media"
                content="How might we create digital spaces that are transparent, open, and decentralized?"
                smallText="13:00 UTC"
                key="1"
                />
                <Sticker
                title="NFT for Everyone"
                content="What's stopping NFTs from reaching the masses? Should we rebrand NFT?"
                smallText="15:00 UTC"
                key="1"
                />
                <Sticker
                title="Smart Contract Security"
                content="How might we make the security auditing process better?"
                smallText="19:00 UTC"
                key="1"
                />
            </div>

            <h2>Find Team: 1-on-1 Chats</h2>
            <div style={rowStyle}>
                <Sticker
                    title="hi"
                    content="hello"
                    smallText="100"
                    key="1"
                />
                <Sticker
                title="hi"
                content="hello"
                smallText="100"
                key="1"
                />
            </div>
               
        </div>
    );
}

const SubmitSubpage = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')

    const [walletAddress, setWallet] = useState(null);

    useEffect(() => {
        getWallet().then(walletId => setWallet(walletId));
    }, [])

    const inputStyle = {
        width: '100%',
        backgroundColor: '#EDEFF2',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        padding: '20px 10px'
    }

    const leftSideLabelStyle = { textAlign: 'right' }


    const submitButtonStyle = {
        backgroundColor: '#30323d',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '24px',
        padding: '10px',
        cursor: 'pointer'
    }

    const submit = async () => {
        
        console.log(name, description, file)
        let provider = window.ethereum;
        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const HackathonFactoryContract = new web3.eth.Contract(HackathonJSON.abi, HackathonFactoryContractAddress)

        HackathonFactoryContract.methods.create(web3.utils.toWei("0", 'ether'), 36000, "hi", "description", walletAddress, 0, "date").send({from: walletAddress, value: web3.utils.toWei("0", 'ether')})
    }

    return (
        <div>
            <h1>Submit your project</h1>
            <table style={{ width: '90%', margin: '10px', borderSpacing: '20px' }}>
                <tbody>
                    <tr>
                        <td colSpan="1" style={leftSideLabelStyle}>
                            Project name
                        </td>
                        <td colSpan="10"><input style={inputStyle} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pasteis" /></td>
                    </tr>
                    <tr>
                        <td colSpan="1" style={leftSideLabelStyle}>
                            Project description
                        </td>
                        <td colSpan="10">
                            <textarea style={{ ...inputStyle, fontSize: '14px' }} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Pasteis is a project with different scopes..." rows="8" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="1" style={leftSideLabelStyle}>
                            Project Logo
                        </td>
                        <td colSpan="10" style={{ textAlign: 'left' }}>
                            <input type="file" style={inputStyle} name="upload" onChange={(e) => setFile(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="1" style={leftSideLabelStyle}>
                            Github
                        </td>
                        <td colSpan="10"><input style={inputStyle} onChange={(e) => setName(e.target.value)} placeholder="https://github.com/" /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={submit} style={submitButtonStyle}>Submit</button>
        </div>
    )
}

const VoteSubpage = () => {
    const overallGrid = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    const rowStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    return (
        <div style={overallGrid}>
            <h2>Projects</h2>
            <div style={rowStyle}>
                <Project
                    title="Pasteis"
                    content="Demonstration"
                    smallText="team 0x5FC"
                    key="1"
                />
            </div>
        </div>
    );
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


    const [walletAddress, setWallet] = useState(null);

    useEffect(() => {
        getWallet().then(walletId => setWallet(walletId));
    }, [])

    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '/explore', selected: true },
        { content: 'Create', link: '/create' },
        { content: 'About', link: '/about' },
        { content: 'Profile', link: `/user/${walletAddress}` },
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

    const teamStyle = {
        backgroundColor: '#ECEAE3',
        padding: '10px',
        boxShadow: '-5px 5px 8px 0 rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        textAlign: 'center',

    }

    const tabsStyle = {
        cursor: 'pointer',
    }

    const side_items = [
        { content: 'Schedule', subpage: <ScheduleSubpage pageid={id} /> },
        { content: 'Prizes', subpage: <PrizeSubpage pageid={id} /> },
        { content: 'Collaboration', subpage: <CollaborateSubpage pageid={id} /> },
        { content: 'Submit', subpage: <SubmitSubpage pageid={id} /> },
        { content: 'Vote', subpage: <VoteSubpage pageid={id} /> },
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
                            <p style={teamStyle}>Team: {team}</p>
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
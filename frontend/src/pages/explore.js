import React, { useState } from 'react';

import Header from '../components/header';
import HackathonCard from '../components/hackathoncard';

import { getHackathons, getSignedUpHackathons } from '../mock/hackathons.js';

const Explore = () => {
    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '/explore', selected: true },
        { content: 'Create', link: '/create' },
        { content: 'About', link: '/about' },
        { content: 'Username', link: '/user' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    let [enrolled_hackathons, setEnrolledHackathons] = useState([]);
    let [hackathon_stub, setHackathonStub] = useState([]);

    getHackathons().then((hackathons) => {
        console.log(hackathons);
        setHackathonStub(hackathons);
    }).catch((err) => {
        console.log(err);
    })

    getSignedUpHackathons().then((hackathons) => {
        console.log(hackathons);
        setEnrolledHackathons(hackathons);
    }).catch((err) => {
        console.log(err);
    })



    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        width: '90%',
        textAlign: 'center',
    }

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

    // generate set with ids of enrolled hackathons
    const enrolled_hackathon_ids = new Set(enrolled_hackathons.map((hackathon) => {
        return hackathon.id;
    }))

    let findHackathons;
    if (searchText === '') {
        findHackathons = hackathon_stub;
    } else {
        findHackathons = hackathon_stub.filter((hackathon) => {
            return hackathon.title.toLowerCase().includes(searchText.toLowerCase());
        });
    }

    const newHackathons = findHackathons.filter((hackathon) => {
        return !enrolled_hackathon_ids.has(hackathon.id);
    })

    const notFoundText = {
        fontSize: '18px',
        height: '1000px',
    }

    return (
        <>
            <Header options={header_items} />

            <div style={listStyle}>
                <p style={titleStyle}>Find more hackathons</p>
                <input style={inputStyle} placeholder="Search for hackathon name" onChange={updateText} />
                {
                    newHackathons.length !== 0 ?
                        newHackathons.map((hackathon, idx) => (
                            <HackathonCard hackathon={hackathon} key={idx} />
                        )) : <p style={notFoundText}>No hackathons found with this name</p>
                }
            </div>
        </>
    );
};

export default Explore;

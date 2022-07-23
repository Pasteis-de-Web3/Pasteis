import React, { useState } from 'react';

import Header from '../components/header';
import { connect } from "@tableland/sdk";

const Create = () => {
    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '/explore' },
        { content: 'Create', link: '/create',  selected: true},
        { content: 'About', link: '/about' },
        { content: 'Username', link: '/user' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    const titleStyle = {
        fontSize: '36px',
    }

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        width: '90%',
        textAlign: 'center',
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
        paddingLeft: '20px',
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'red',
        flexGrow: 1,
    }

    const buttonStyle = {
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '16px',
        padding: '8px',
        cursor: 'pointer',
        margin: '10px'
    }


    return (
        <>
            <Header options={header_items} />
            <div style={listStyle}>
                <p style={titleStyle}>Create a hackathon</p>

                <input style={inputStyle} placeholder="name" onChange={()=>{}} />
                <input style={inputStyle} placeholder="description" onChange={()=>{}} />
                <input style={inputStyle} placeholder="date" onChange={()=>{}} />
                <input style={inputStyle} placeholder="total prize (in ETH)" onChange={()=>{}} />
                <button style={buttonStyle}>Upload Image</button>
                <button style={buttonStyle}>Submit</button>
            </div>
        </>
    );
};

export default Create;

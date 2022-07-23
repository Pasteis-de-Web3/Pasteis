import React, { useState } from 'react';

import Header from '../components/header';
import { connect } from "@tableland/sdk";

const Create = () => {
    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '/explore' },
        { content: 'Create', link: '/create', selected: true },
        { content: 'About', link: '/about' },
        { content: 'Username', link: '/user' }, // TODO we need to add the circle with the avatar here. can simply be put in the content
    ];

    const listStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    const labelStyle = {
        fontSize: '18px',
        textAlign: 'right',
        paddingRight: '20px',
        verticalAlign: 'top',
    }

    const inputStyle = {
        width: '90%',
        backgroundColor: '#EDEFF2',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        paddingLeft: '20px',
    }

    const addPrizeStyle = {
        textAlign: 'center',

    }

    const plusButtonStyle = {
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '100%',
        width: '50px',
        height: '50px',
        fontSize: '32px',
        cursor: 'pointer',
        margin: 'auto',
    }

    const minusButtonStyle = {
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '100%',
        width: '25px',
        height: '25px',
        fontSize: '16px',
        cursor: 'pointer',
        margin: 'auto',
    }

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [prizes, setPrizes] = useState([])

    const addOption = () => {
        setPrizes([...prizes, { name: '', value: '' }])
    }

    const removeOption = (index) => {
        setPrizes(prizes.filter((_, i) => i !== index))
    }

    const submitButton = {
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '15px',
        fontSize: '16px',
        padding: '10px',
        cursor: 'pointer',
    }

    const submitStyle = {
        margin: 'auto',
        width: '300px',
        textAlign: 'center',
    }

    const submitFn = () => {
        console.log('Submit')
        console.log(name, description, startDate, endDate, prizes)

    }

    return (
        <>
            <Header options={header_items} />
            <div style={listStyle}>
                <table style={{ borderSpacing: '20px' }}>
                    <tbody>
                        <tr>
                            <td style={labelStyle} colSpan='1'>
                                <label>Title</label>
                            </td>
                            <td colSpan='3' >
                                <input style={inputStyle} placeholder="e.g. Pasteis" onChange={(e) => setName(e.target.value) } />
                            </td>
                        </tr>
                        <tr>
                            <td style={labelStyle} colSpan='1'>
                                <label>Description</label>
                            </td>
                            <td colSpan='3'>
                                <textarea style={inputStyle} placeholder="e.g. Pasteis is a hackathon that..." rows="10" onChange={(e) => setDescription(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='1' style={labelStyle}>Start date</td>
                            <td colSpan='1'><input type="date" onChange={(e) => setStartDate(e.target.value)} /></td>
                            <td colSpan='1' style={labelStyle}>End date</td>
                            <td colSpan='1'><input type="date" onChange={(e) => setEndDate(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan='4' style={{
                                textAlign: 'center',

                            }}>Prizes</td>

                        </tr>
                        {
                            prizes.map((prize, index) => {
                                return (
                                    <tr key={index}>
                                        <td colSpan='2'>
                                            <input style={inputStyle} placeholder="e.g. First prize"
                                                value={prize.name}
                                                onChange={(e) => {
                                                    prizes[index].name = e.target.value
                                                    setPrizes([...prizes])
                                                }}
                                            />
                                        </td>
                                        <td colSpan='1'>
                                            <input style={inputStyle} type="number" placeholder="e.g. 100"
                                                value={prize.value}
                                                onChange={(e) => {
                                                    prizes[index].value = e.target.value
                                                    setPrizes([...prizes])
                                                }}
                                            />
                                        </td>
                                        <td colSpan='1'><button style={minusButtonStyle} onClick={() => removeOption(index)}>-</button></td>
                                    </tr>
                                )
                            })
                        }

                        <tr>
                            <td colSpan='4' style={addPrizeStyle}>
                                <div style={plusButtonStyle} onClick={() => addOption()}>
                                    +
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div style={submitStyle}>
                <button style={submitButton} onClick={submitFn}>Create hackathon</button>
            </div>
        </>
    );
};

export default Create;

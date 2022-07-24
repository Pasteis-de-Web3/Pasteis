import React, { useState, useEffect } from 'react'
import Header from '../components/header';
import { getWallet } from '../utils';
import TiagoPic from '../images/Tiago.jpeg';
import SamPic from '../images/Samuel.jpeg';
import EvyPic from '../images/Evy.jpeg';
import JayeePic from '../images/Jayee.jpeg';
import PastelDeNata from '../images/pastel-de-nata.jpg';

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
        { content: 'Profile', link: `/user/${walletAddress}` },
    ];

    const members = [
        { name: 'Tiago Antunes', role: 'Frontend Developer', image: TiagoPic },
        { name: 'Samuel Tang', role: 'Fullstack Developer', image: SamPic },
        { name: 'Jayee Li', role: 'Solidity Developer', image: JayeePic },
        { name: 'Evy Pinero', role: 'Designer', image: EvyPic },
    ]

    const membersStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '40px 20px',
        //backgroundColor: '#06D6A0',
        color: 'black'
    }

    const descriptionImage = {
        width: '40%',
        padding: '20px',
    }

    return (
        <div>
            <Header options={header_items} />
            <div style={membersStyle}>
                {
                    members.map(member => (
                        <div style={{
                            margin: '20px',
                            margin: 'auto',
                            textAlign: 'center',
                        }}>
                            <img src={member.image} alt={member.name} style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '100%',
                                //border: '2px dotted #EA8C55',
                            }} />
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    ))
                }
            </div>
            <div style={{
                //backgroundColor: '#26547C',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '100%',
                margin: 'auto',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    padding: '0.5% 2%',
                }}>
                    <p style={{ width: '50%', textAlign: 'right', marginTop: '5%' }}>
                        <p>Pasteis is a decentralized platform for hosting and participating in hackathons that leverages blockchain for a flawless experience</p>
                        <p>
                            Pasteis improves transparency in the payment and voting mechanisms of a hackathon.
                            Not only does it promote trust, but also automatize the process and allow for a validated process to take part in the selection process.
                        </p>
                        <p>
                            Pasteis is the true Web3 experience for hackathon development.
                            Just like eating a Pastel de Nata is the true culinary experience.
                        </p>
                    </p>

                    <img src={PastelDeNata} style={{ ...descriptionImage }} />
                </div>
                <p></p>
            </div>
        </div>
    )
}

export default About;
import React, { useState, useEffect } from 'react'
import {
    useParams,
} from "react-router-dom"
import HackathonBadge from '../components/hackathonbadge'

import Header from '../components/header'
import { getWallet } from '../utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'


const User = () => {


    const [walletAddress, setWallet] = useState(null);

    useEffect(() => {
        getWallet().then(walletId => setWallet(walletId));
    }, [])

    const header_items = [
        { content: 'Home', link: '/home' },
        { content: 'Explore', link: '/explore' },
        { content: 'Create', link: '/create' },
        { content: 'About', link: '/about' },
        { content: 'Profile', link: `/user/${walletAddress}`, selected: true },
    ];

    const topBar = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '22px',
    }

    const avatarStyle = {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
    }

    const socialMediaStyle = {
        margin: 'auto',
        textAlign: ' center'
    }

    const socialMedia = [
        { link: 'https://github.com/TiagoMAntunes', icon: faGithub, color: 'black' },
        { link: 'https://twitter.com/r1jur4', icon: faTwitter, color: '#1E9BF0' },
    ]

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '100%',
    }

    const sectionText = {
        fontSize: '36px',
    }

    const badges = [
        {
            image: 'https://assets.poap.xyz/protoschool-study-group-2022-logo-1655834863861.png',
        }, {
            image: 'https://lh3.googleusercontent.com/4UV3IHgSWX76fogebKtsHKZuzJU1SXYkIefQRgjmPGdONuszK3FISpebJ2cI_9kga31VeuE5q5Pcehetd7fIrnYegADZWOM6WNjyUg=w600',
        }, {
            image: 'https://lh3.googleusercontent.com/4ohAVTvmsgIn6BigAG_f7OxgjKV-DFRrxz-Zjtvt6N_tbs6Qt1l804gIvB93dbSr9vTkLNy-EdmatJ1suhEWgxJANK4EyXY2Jq1mag=w600',
        }, {
            image: 'https://assets.poap.xyz/nfb-the-vibe-up-0020-2022-logo-1656958556608.png',
        }, {
            image: 'https://assets.poap.xyz/apollo-dao-creator-contest-5-2022-logo-1655919483878.png',
        }, {
            image: 'https://lh3.googleusercontent.com/NqHCpji63L_4hlhGmQ4BGmzE56CCUrjNsi5_Ku78j0muVXqavJ4DsQ2HSGwN8IcSzz5r_DKrV-2HE4OeH7iO2-B8IpjnuA3ZpVSN=w600',
        }, {
            image: 'https://pbs.twimg.com/media/FYA-mFnXEAEfo6X.jpg',
        }, {
            image: 'https://assets.poap.xyz/nfb-cosmic-chillers-0010-2022-logo-1654641454328.png',
        }, 
    ]

    const badgeStyle = {
        width: '100px',
        height: '100px',
        margin: '5px 20px',
    }

    return (
        <>
            <Header options={header_items} />

            <div style={topBar}>
                <img style={avatarStyle} src="https://images.unsplash.com/photo-1548041347-390744c58da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1392&q=80" />
                <p>{walletAddress}</p>
            </div>

            <div style={socialMediaStyle}>
                <span style={{ textDecoration: 'none', color: '#423E37', fontSize: '36px' }}>
                    {
                        socialMedia.map((item, index) => {
                            return (
                                <a key={index} href={item.link}>
                                    <FontAwesomeIcon icon={item.icon} style={{ margin: '20px', color: item.color}} />
                                </a>
                            )
                        })
                    }
                </span>
            </div>
            
            <div style={containerStyle}>
                <label style={sectionText}>
                    Finished hackathons
                </label>
            </div>

            <div style={{...containerStyle, width: '60%', marginTop: '30px'}}>
                {
                    badges.map((item, index) => {
                        return (
                            <div style={badgeStyle}>
                                <HackathonBadge key={index} hackathon={item} />
                            </div>
                        )
                    }
                    )
                }
            </div>
        </>
    )
}

export default User;
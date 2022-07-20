import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom"
import '../styles/fonts.css'
import landing_image from '../images/landing-img.jpg'
import metamask_fox from '../images/MetaMask_Fox.png'

const Header = () => {
  const textStyle = {
    fontFamily: 'Roboto Mono',
    fontStyle: 'monospace',
    color: 'black',
    textDecoration: 'none',
  }

  const space = {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: "space-between",
    alignItems: 'baseline',
  }

  return (
    <div style={space}>
      <h2 style={{...textStyle, paddingLeft: 10}}>Pasteis🍮</h2>
      <div>
        <Link style={{...textStyle, paddingRight: 30}} to="/about">about</Link>
      </div>
    </div>
  )
}

const ConnectWalletButton = ({connect_wallet}) => {
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 10
    }

    const textStyle = {
        fontFamily: 'Roboto Mono',
        fontStyle: 'monospace',
        color: 'white'
    }

    const imageStyle = {
        width: "40px",
        height: "40px",
    }

    return (
        <button style={buttonStyle} onClick={connect_wallet}>
            <img style={imageStyle} src={metamask_fox} />
            <text style={textStyle}>Connect with MetaMask</text> 
        </button>
    )
}


const Landing = ({connect_wallet}) => {
    const textStyle = {
        fontFamily: 'Roboto Mono',
        fontStyle: 'monospace',
        color: 'black',
        textDecoration: 'none',
        paddingLeft: 10
    }

    const space_horizontal = {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: "space-between",
        alignItems: 'center',
    }
    const space_vertical = {
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: "space-between",
        alignItems: 'center',
    }

    const imageStyle = {
        width: "800px",
        height: "600px",
        borderRadius: 15
    }

    return (
        <div>
            <Header />
            <div style={space_horizontal}>
                <div style={space_vertical}>
                    <h1 style={{...textStyle, paddingBottom: 30}}>Hello 👋 Welcome to Pasteis 🍮 <br/> A Digital Space for Hackathons! </h1>
                    <ConnectWalletButton connect_wallet={connect_wallet}/>
                </div>
                <img style={imageStyle} src={landing_image} alt="landing-image" />
            </div>
        
        </div>
    )
}

export default Landing;
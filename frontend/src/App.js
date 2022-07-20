import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Hackathon from './pages/hackathon';
import Landing from './pages/landing';
import Home from './pages/home';

const App = () => {
    const connect_wallet = async () => {
        const { ethereum } = window;

        await ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => console.log(accounts[0]))
            .then(() => (window.location = '/home'))
            .catch((err) => console.log(err));
    };

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Landing connect_wallet={connect_wallet} />}
                />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/login" element={<About />} />
                <Route path="/hackathon/:id" element={<Hackathon />} />
                <Route path="*" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;

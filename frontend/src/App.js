import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Hackathon from './pages/hackathon';
import Landing from './pages/landing';
import Home from './pages/home';
import Explore from './pages/explore';
import Create from './pages/create';
import User from './pages/user';

import 'font-awesome/css/font-awesome.min.css';



const App = () => {
    const [ethAddress, setEthAddress] = useState("");

    const connect_wallet = async () => {
        const { ethereum } = window;

        await ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                console.log(accounts[0])
                setEthAddress(accounts[0])
            })
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
                <Route exact path="/explore" element={<Explore />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/create" element={<Create />} />
                <Route exact path="/user/:id" element={<User />} />
                <Route path="/hackathon/:id" element={<Hackathon />} />
                <Route path="*" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;

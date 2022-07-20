import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Hackathon from './pages/hackathon';
import Landing from './pages/landing';

const App = () => {
    const connect_wallet = async () => {
        const { ethereum } = window;
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error(error);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts[0]);

        return accounts[0];
    };

    return (
        <div>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Landing connect_wallet={connect_wallet} />}
                    />
                    <Route exact path="/login" element={<About />} />
                    <Route path="/hackathon/:id" element={<Hackathon />} />
                    <Route path="*" element={<About />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;

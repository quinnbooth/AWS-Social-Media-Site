import React, { useState, useEffect } from 'react';
import './Home.css'
import NavigationBar from './NavigationBar.js';

function Home({ user, signOut, login, logout }) {

    const [page, setPage] = useState("explore");

    useEffect(() => {
        const load = async () => { login(); };
        load();
    }, [user]);

    useEffect(() => {
        const printPage = async () => { console.log(page) };
        printPage();
    }, [page]);

    const handleLogout = () => {
        logout();
        signOut();
    };

    return (
        <div className='home'>
            <NavigationBar logout={handleLogout} setPage={setPage} />
        </div>
    );
}

export default Home;
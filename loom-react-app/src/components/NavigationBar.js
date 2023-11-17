import React from 'react';

function NavigationBar({ logout, setPage }) {

    return (
        <nav className="navbar">
            <ul className="left">
                <li><button className="navbutton" onClick={() => setPage("explore")}>Explore</button></li>
                <li><button className="navbutton" style={{color: 'white'}} onClick={() => setPage("me")}>Me</button></li>
            </ul>
            <ul className="right">
                <li className='settings'>
                    <button className='settingsbutton' onClick={() => setPage("settings")} >&#9881;</button>
                </li>
                <li><button className="navbutton" onClick={logout}>Logout</button></li>
            </ul>
        </nav>
    );

};

export default NavigationBar;
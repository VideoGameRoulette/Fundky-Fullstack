import React, { Fragment, useState } from 'react';
import HeaderLogo from './headerLogo';

const Header = () => {
    const [id, setID] = useState('0');
    const [bg, setBG] = useState('0');

    function sendID() {
        if (id === '0') return;
        window.location = `/?id=${id}&bg=${bg}`;
    };

    return (
        <Fragment key="header">
            <div className="container h-16 bg-indigo-900 m-auto mb-8 flex items-center">
                <div className="flex justify-start w-6/12 gap-4">
                    <HeaderLogo image='/logo192.png' title='Fundky Assistant' />
                </div>
                <div className="flex justify-end w-6/12">
                    <input className="h-8 bg-indigo-500 rounded border border-indigo-300 text-white pl-2 mr-2" type="text" placeholder="Campaign ID" onChange={(e) => setID(e.target.value)} />
                    <input className="h-8 bg-indigo-500 rounded border border-indigo-300 text-white pl-2 mr-2" type="text" placeholder="Background Poll ID" onChange={(e) => setBG(e.target.value)} />
                    <button className="rounded border border-indigo-300 bg-sky-500 p-1 mr-2" onClick={() => sendID()}>Refresh</button>
                </div>
            </div>
        </Fragment>

    );
};

export default Header;
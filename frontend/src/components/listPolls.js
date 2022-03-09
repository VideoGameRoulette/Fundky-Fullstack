import React, { Fragment, useState, useEffect } from 'react';

const ListPolls = ({ clientid = '0' }) => {
    const [polls, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const getPolls = async () => {
        try {
            const { polls } = await fetch("/api/polls/" + clientid)
                .then((response) => response.json());
            setData(polls);
            setLoaded(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => { getPolls(); }, []);

    useEffect(() => { console.log("Polls Fetched! - ", polls); }, [polls]);


    const renderPage = () => {
        if (!isLoaded) {
            return (
                <Fragment key="polls">
                    <h1>No Polls</h1>
                </Fragment>
            );
        }
        return (
            <Fragment key="polls">
                <h1 className="text-center border border-indigo-500 bg-indigo-900 text-white">Poll List</h1>
                <table className="m-auto w-full">
                    <thead>
                        <tr>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">ID</th>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">DESCRIPTION</th>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polls.map((poll, idx) => (
                            <tr key={idx}>
                                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">{poll.id}</td>
                                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">{poll.description.title}</td>
                                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">{poll.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    };

    return (
        renderPage()
    );

};

export default ListPolls;
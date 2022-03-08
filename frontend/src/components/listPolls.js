import React, { Fragment, useState, useEffect } from 'react';

const ListPolls = ({ clientid }) => {
    const [polls, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const getPolls = async () => {
        try {
            const { polls } = await fetch("http://localhost:5000/polls/" + clientid)
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
                <h1 className="text-center mt-5">Poll List</h1>
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DESCRIPTION</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polls.map((poll, idx) => (
                            <tr key={idx}>
                                <td>{poll.id}</td>
                                <td>{poll.description.title}</td>
                                <td>{poll.status}</td>
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
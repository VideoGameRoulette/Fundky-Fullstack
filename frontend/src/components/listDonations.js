import React, { Fragment, useState, useEffect } from 'react';

const ListDonations = ({ clientid = '0' }) => {
    const [donations, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const getDonations = async () => {
        try {
            const { donations } = await fetch("http://localhost:5000/donations/list/" + clientid)
                .then((response) => response.json());
            setData(donations);
            setLoaded(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => { getDonations(); }, []);

    useEffect(() => { console.log("Donations Fetched! - ", donations); }, [donations]);

    const getStreamName = (donation) => {
        if (donation.stream !== undefined) {
            return <td className="text-center border border-indigo-300 bg-indigo-500 text-white">Poll Name</td>
        }
        return <td className="text-center border border-indigo-300 bg-indigo-500 text-white"></td>
    };

    const getStream = (donation) => {
        if (donation.stream !== undefined) {
            return <td className="text-center border border-indigo-300 bg-indigo-500 text-white">{donation.stream.poll.option.description.description}</td>
        }
        return <td className="text-center border border-indigo-300 bg-indigo-500 text-white"></td>
    };

    const renderPage = () => {
        if (!isLoaded) {
            return (
                <Fragment key="donations">
                    <h1>No Donations</h1>
                </Fragment>
            );
        }
        return (
            <Fragment key="donations">
                <h1 className="text-center border border-indigo-500 bg-indigo-900 text-white">Donations List</h1>
                <table className="m-auto w-full">
                    <thead>
                        <tr>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">ID</th>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">NAME</th>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">AMOUNT</th>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">COMMENT</th>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">POLL NAME</th>
                            <th className="border border-indigo-300 bg-indigo-700 text-white">POLL OPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, idx) => (
                            <tr key={idx}>
                                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">{donation.id}</td>
                                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">{donation.displayName}</td>
                                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">${donation.amount}</td>
                                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">{donation.message ?? donation.message}</td>
                                {getStreamName(donation)}
                                {getStream(donation)}
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

export default ListDonations;
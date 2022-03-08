import React, { Fragment, useState, useEffect } from 'react';

const ListDonations = ({ clientid }) => {
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
                <h1 className="text-center mt-5">Donations List</h1>
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, idx) => (
                            <tr key={idx}>
                                <td>{donation.id}</td>
                                <td>{donation.displayName}</td>
                                <td>${donation.amount}</td>
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
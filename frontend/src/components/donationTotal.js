import React, { Fragment, useState, useEffect } from 'react';

const DonationTotal = ({ clientid }) => {
    const [donations, setData] = useState(0);
    const [isLoaded, setLoaded] = useState(false);

    const getDonations = async () => {
        try {
            const data = await fetch('http://localhost:5000' + '/donations/total/' + clientid)
                .then((response) => response.json());
            setData(data.current);
            setLoaded(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => { getDonations(); }, []);

    useEffect(() => { console.log("Donation Total Fetched! - ", donations); }, [donations]);


    const renderPage = () => {
        if (!isLoaded) {
            return (
                <Fragment key="total">
                    <h1>$0.00</h1>
                </Fragment>
            );
        }
        return (
            <Fragment key="total">
                <h1 className="text-center mt-5">Donations Total: ${donations}</h1>
            </Fragment>
        );
    };

    return (
        renderPage()
    );

};

export default DonationTotal;
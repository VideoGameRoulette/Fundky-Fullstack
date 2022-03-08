import React, { Fragment, useState, useEffect } from 'react';

const ListMilestones = ({ clientid }) => {
    const [milestones, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const getMilestones = async () => {
        try {
            const { milestones } = await fetch("http://localhost:5000/milestones/" + clientid)
                .then((response) => response.json());
            setData(milestones);
            setLoaded(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => { getMilestones(); }, []);

    useEffect(() => { console.log("Milestones Fetched! - ", milestones); }, [milestones]);


    const renderPage = () => {
        if (!isLoaded) {
            return (
                <Fragment key="polls">
                    <h1>No Milestones</h1>
                </Fragment>
            );
        }
        return (
            <Fragment key="milestones">
                <h1 className="text-center mt-5">Milestones List</h1>
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DESCRIPTION</th>
                            <th>GOAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {milestones.map((milestone, idx) => (
                            <tr key={idx}>
                                <td>{milestone.id}</td>
                                <td>{milestone.description.description}</td>
                                <td>{milestone.goal}</td>
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

export default ListMilestones;
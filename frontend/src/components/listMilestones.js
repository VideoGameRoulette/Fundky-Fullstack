import React, { Fragment, useState, useEffect } from "react";

const ListMilestones = ({ clientid = "0" }) => {
  const [milestones, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const getMilestones = async () => {
    try {
      const { milestones } = await fetch("/api/milestones/" + clientid).then(
        (response) => response.json()
      );
      setData(milestones);
      setLoaded(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getMilestones();
  }, []);

  useEffect(() => {
    console.log("Milestones Fetched! - ", milestones);
  }, [milestones]);

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
        <h1 className="text-center border border-indigo-500 bg-indigo-900 text-white mt-5">
          Milestones List
        </h1>
        <table className="m-auto w-full">
          <thead>
            <tr>
              <th className="border border-indigo-300 bg-indigo-700 text-white">
                ID
              </th>
              <th className="border border-indigo-300 bg-indigo-700 text-white">
                DESCRIPTION
              </th>
              <th className="border border-indigo-300 bg-indigo-700 text-white">
                GOAL
              </th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone, idx) => (
              <tr key={idx}>
                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">
                  {milestone.id}
                </td>
                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">
                  {milestone.description.description}
                </td>
                <td className="text-center border border-indigo-300 bg-indigo-500 text-white">
                  {milestone.goal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  };

  return renderPage();
};

export default ListMilestones;

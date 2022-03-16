import React, { Fragment, useState, useEffect } from "react";

const SetBackground = ({ clientid = "0", bgid = "0" }) => {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const getBackgroundOptions = async (id) => {
    if (clientid === "0") return;
    try {
      const { polls, background } = await fetch(
        `/api/polls/${clientid}?pollid=${id}`
      ).then((response) => response.json());
      setData(background);
      setLoaded(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (bgid !== "0") getBackgroundOptions(bgid);
  }, []);

  useEffect(() => {
    console.log("Polls For Options Fetched! - ", data);
  }, [data]);

  const renderPage = () => {
    if (!isLoaded) {
      return (
        <Fragment key="bgs">
          <h1 className="text-center border border-indigo-500 bg-indigo-900 text-white mt-5">
            Background
          </h1>
          <table className="m-auto w-full">
            <thead>
              <tr>
                <th className="border border-indigo-300 bg-indigo-700 text-white">
                  Option Name
                </th>
                <th className="border border-indigo-300 bg-indigo-700 text-white">
                  Raised
                </th>
              </tr>
            </thead>
          </table>
        </Fragment>
      );
    }
    return (
      <Fragment key="bgs">
        <h1 className="text-center border border-indigo-500 bg-indigo-900 text-white mt-5">
          Background
        </h1>
        <table className="m-auto w-full">
          <thead>
            <tr>
              <th className="border border-indigo-300 bg-indigo-700 text-white">
                Option Name
              </th>
              <th className="border border-indigo-300 bg-indigo-700 text-white">
                Raised
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((poll, idx) => (
                <tr key={idx}>
                  <td className="text-center border border-indigo-300 bg-indigo-500 text-white">
                    {poll[0].description.description}
                  </td>
                  <td className="text-center border border-indigo-300 bg-indigo-500 text-white">
                    {poll[0].collected}
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

export default SetBackground;

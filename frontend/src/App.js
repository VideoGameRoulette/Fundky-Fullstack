import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import ListPolls from './components/listPolls';
import ListMilestones from './components/listMilestones';
import ListDonations from './components/listDonations';
import DonationTotal from './components/donationTotal';

function App() {
  const [total, setTotal] = useState(0);

  const fetchTotal = async (clientid) => {
    const data = await fetch('http://localhost:5000' + '/donations/total/' + clientid)
      .then((response) => response.json());
    setTotal(data.current);
  };

  return (
    <Fragment>
      <ListPolls clientid='421' />
      <ListMilestones clientid='421' />
      <ListDonations clientid='421' />
      <DonationTotal clientid='421' />
    </Fragment>
  );
}

export default App;

import React, { Fragment } from 'react';
import { useLocation } from "react-router-dom";

import ListPolls from './components/listPolls';
import ListMilestones from './components/listMilestones';
import ListDonations from './components/listDonations';
import DonationTotal from './components/donationTotal';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  let query = useQuery();
  var id = query.get("id");
  return (
    <Fragment>
      <ListPolls clientid={id} />
      <ListMilestones clientid={id} />
      <ListDonations clientid={id} />
      <DonationTotal clientid={id} />
    </Fragment>
  );
}

export default App;

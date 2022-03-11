import React, { Fragment } from 'react';
import { useLocation } from "react-router-dom";

import Header from './components/header';
import ListPolls from './components/listPolls';
import ListMilestones from './components/listMilestones';
import ListDonations from './components/listDonations';
import DonationTotal from './components/donationTotal';
import SetBackground from './components/setBackground';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  let query = useQuery();
  var id = query.get("id");
  var background = query.get("bg");
  return (
    <Fragment>
      <Header />
      <div className="container h-[860px] bg-slate-700 m-auto overflow-y-scroll">
        <ListPolls clientid={id} />
        <ListMilestones clientid={id} />
        <DonationTotal clientid={id} />
        <ListDonations clientid={id} />
        <SetBackground clientid={id} bgid={background} />
      </div>
    </Fragment>
  );
}

export default App;

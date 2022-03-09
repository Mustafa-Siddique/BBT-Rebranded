import './App.css';
import Bottomnav from './component/Bottomnav';
import Faqs from './component/Faqs';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Ownerprofile from './component/Ownerprofile';
import Page404 from './component/Page404';
import Projectpage from './component/Projectpage';
import OwnerScam from './component/OwnerScam';
import PageBoobyTrap from './component/PageBoobyTrap';
import { getBBTBalance, } from './Web3_connection/ContractMethods';
import { loginProcess } from './Web3_connection/web3_methods'
import client from './client';
import InEligible from './component/InEligible';
import Platform from './component/Platform';
import SafeHaven from './component/SafeHaven';
import Safecards from './component/Safecards';
import SafeOwners from './component/SafeOwners';
import OngoingScam from './component/OngoingScam';

function App() {

  // Fetch required number of Tokens for accessing Safe Haven
  const [BBTLimit, setBBTLimit] = useState(undefined)
  useEffect(() => {
    client.fetch(
      `*[_type == "minHolding"]{
        minBal,
      }`
    ).then((data) => setBBTLimit(data[0].minBal)).catch(console.error)
  }, []);


  const [BBTBal, setBBTBal] = useState(0)
  useEffect(() => {
    const fetchBal = async () => {
      await loginProcess();
      let currentBal = await getBBTBalance()
      setBBTBal(currentBal)
    }
    // fetchBal()
  }, [])

  if (BBTLimit) {
    console.log(BBTBal, BBTLimit)
  }
  try {
    window.ethereum.on('accountsChanged', function (accounts) {
      // window.location.reload();
    })
  }
  catch (e) {
    //
  }

  return (
    <div className="App" id='App'>
      <Router>
        <Bottomnav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="faqs" element={<Faqs />} />


          {/* <Route path="boobytrap" element={<PageBoobyTrap/>}>
            <Route path='upcomingscam' element={<UpcomingBoobytrap/>}/>
            <Route path='ongoingscam' element={<OngoingScam/>}/>
            <Route path='scamowner' element={<OwnerScam/>}/>
            <Route path='scamdev' element={<DevScam/>}/>
            <Route path='scaminfluencer' element={<InfluencerScam/>}/>
            <Route path='scampromoter' element={<PromoterScam/>}/>
          </Route>
          <Route path="/boobytrap/upcomingscam/:slug/:id/" element={<Projectpage/>}/>
          <Route path="/boobytrap/ongoingscam/:slug/:id/" element={<Ongoingpage/>}/>
          <Route path="/boobytrap/scamowner/:slug/:id/" element={<Ownerprofile/>}/>
          <Route path="/boobytrap/scamdev/:slug/:id/" element={<Devprofile/>}/>
          <Route path="/boobytrap/scaminfluencer/:slug/:id/" element={<InfluencerProfile/>}/>
          <Route path="/boobytrap/scampromoter/:slug/:id/" element={<PromoterProfile/>}/> */}

          {/* Routes for Platform */}
          <Route path="/platform" element={<Platform />}>
            {/* SAFE HAVEN */}
            <Route path='safehaven' element={<SafeHaven />}>
              <Route path='safuprojects' element={<Safecards />} />
              <Route path='safeowners' element={<SafeOwners />} />
            </Route>
            <Route path="safeheaven/:slug/:id" element={<Projectpage balance={<Projectpage />} />} />
            <Route path="safeheaven/:slug/:id" element={<Projectpage balance={<Ownerprofile />} />} />

            {/* Routes for Boobytrap */}
            <Route path="boobytrap" element={<PageBoobyTrap />}>
              <Route path='scamprojects' element={<OngoingScam />} />
              <Route path='scamowners' element={<OwnerScam />} />
            </Route>
          </Route>

          {/* <Route path="/safehaven/boobytrap/:slug/:id" element={<Projectpage/>}/> */}
          <Route path="ineligible" element={<InEligible />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
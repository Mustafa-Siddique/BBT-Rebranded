import './App.css';
import Bottomnav from './component/Bottomnav';
import Faqs from './component/Faqs';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Ownerprofile from './component/Ownerprofile';
import Page404 from './component/Page404';
import Projectpage from './component/Projectpage';
import Devprofile from './component/Devprofile';
import InfluencerProfile from './component/InfluencerProfile';
import PromoterProfile from './component/PromoterProfile';
import Ongoingpage from './component/Ongoingpage';
import PageBoobyTrap from './component/PageBoobyTrap';
import UpcomingBoobytrap from './component/UpcomingBoobytrap';
import OngoingScam from './component/OngoingScam';
import OwnerScam from './component/OwnerScam';
import DevScam from './component/DevScam';
import InfluencerScam from './component/InfluencerScam';
import PromoterScam from './component/PromoterScam';
import {getBBTBalance} from './Web3_connection/ContractMethods';
import client from './client';
import InEligible from './component/InEligible';
import Platform from './component/Platform';
import SafeHaven from './component/SafeHaven';
import Safecards from './component/Safecards';
import SafeOwners from './component/SafeOwners';

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
    const fetchBal = async() => {
      let currentBal = await getBBTBalance()
      setBBTBal(currentBal)
    }
    fetchBal()
  }, [])

  if(BBTLimit){
    console.log(BBTBal,BBTLimit)
  }
  try{
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
    })
  }
  catch(e){
    //
  }

  return (
    <div className="App" id='App'>
      <Router>
        <Bottomnav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="faqs" element={<Faqs />} />

          {/* Routes for Boobytrap */}
          <Route path="boobytrap" element={<PageBoobyTrap/>}>
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
          <Route path="/boobytrap/scampromoter/:slug/:id/" element={<PromoterProfile/>}/>

          {/* Routes for Platform */}
          <Route path="/platform" element={<Platform/>}>
            <Route path='safehaven' element={<SafeHaven/>}>
              <Route path='safuprojects' element={<Safecards/>}/>
              <Route path='safeowners' element={<SafeOwners/>}/>
            </Route>
            <Route path="safeheaven/:slug/:id" element={<Projectpage balance={<Projectpage/>}/>}/>
            <Route path="safeheaven/:slug/:id" element={<Projectpage balance={<Ownerprofile/>}/>}/>
          </Route>
          
          {/* <Route path="/safehaven/boobytrap/:slug/:id" element={<Projectpage/>}/> */}
          <Route path="ineligible" element={<InEligible/>} />
          <Route path="*" element={<Page404/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
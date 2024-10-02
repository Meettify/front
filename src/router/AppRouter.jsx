import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/signup/SignupPage';
import SignupSuccessPage from '../pages/signup/SignupSuccessPage';
import MeetingDetail from '../pages/meeting/MeetingDetail'
import MeetingAccept from '../pages/meeting/MeetingAccept'
import MeetingUpdate from '../pages/meeting/MeetingUpdate'
import MettingInsert from '../pages/meeting/MettingInsert'
import MeetingMain from '../pages/meeting/MeetingMain';
import MeetingContent from '../components/meeting/MeetingContent';



const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/signupsuccess' element={<SignupSuccessPage/>} />
      <Route path='/meeting/main' element={<MeetingMain/>}/>
      <Route path='/meeting/detail' element={<MeetingDetail/>} />
      <Route path='/meeting/update' element={<MeetingUpdate/>} />
      <Route path='/meeting/insert' element={<MettingInsert/>} />
      <Route path='/meeting/content' element={<MeetingContent/>} />
      <Route path='/meeting/accept' element={<MeetingAccept/>} />
    </Routes>
  </Router>
);

export default AppRouter;

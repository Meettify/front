import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/signup/SignupPage';
import SignupSuccessPage from '../pages/signup/SignupSuccessPage';
import MeetingDetail from '../pages/meeting/MeetingDetail'
import MeetingUpdate from '../pages/meeting/MeetingUpdate'
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
      <Route path='/meeting/content' element={<MeetingContent/>} />
    </Routes>
  </Router>
);

export default AppRouter;

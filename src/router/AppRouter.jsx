import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/signup/SignupPage';
import SignupSuccessPage from '../pages/signup/SignupSuccessPage';
import GroupDetail from '../pages/group/GroupDetail'
import GroupUpdate from '../pages/group/GroupUpdate'

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/signupsuccess' element={<SignupSuccessPage/>} />
      <Route path='/groupdetail' element={<GroupDetail/>} />
      <Route path='/groupupdate' element={<GroupUpdate/>} />
    </Routes>
  </Router>
);

export default AppRouter;

import React from 'react';
import Dashboard from './dashboard';
import { GetServerSideProps } from 'next';

const DashBoardStart: React.FC<GetServerSideProps> = () => {
  return <Dashboard />;
};

export default DashBoardStart;

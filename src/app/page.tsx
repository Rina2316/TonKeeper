import React from 'react';
import { redirect } from 'next/navigation';

const HomePage = () => {
 
  redirect('/wallet');

  return null; 
};

export default HomePage;

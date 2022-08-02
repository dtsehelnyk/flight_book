import React from 'react';
import BreathingWatch from '../../components/Clock/BreathingWatch';
import Header from '../../components/Header';

const ClockPage: React.FC = () => {
  
  return (
    <>
      <Header title='Breathing' subtitle='subtitle_1'>
        <b>Header additional content</b>
      </Header>

      <BreathingWatch />
    </>
  )
}

export default ClockPage;
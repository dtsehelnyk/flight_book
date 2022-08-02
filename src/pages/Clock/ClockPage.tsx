import { FC } from 'react';
import StopWatch from '../../components/Clock/StopWatch';
import Header from '../../components/Header';

const ClockPage: FC = () => {
  return (
    <>
      <Header title='Clock' subtitle='subtitle_1'>
        <b>Header additional content</b>
      </Header>

      <StopWatch />
    </>
  )
}

export default ClockPage;
import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import Clock from '../Clock';
import { Button, ButtonGroup } from '@mui/material';

const StopWatch: FC = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [convertedTime, setConvertedTime] = useState<ClockTime>({
    ms: 0,
    sec: 0,
    min: 0,
    hour: 0,
  });

  useEffect(() => {
    let interval: NodeJS.Timer | number | undefined;

    if (running) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else if (!running) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    setConvertedTime({
      ms: +time.toString().slice(-3, -2),
      sec: moment.duration(time).seconds(),
      min: moment.duration(time).minutes(),
      hour: Math.trunc(moment.duration(time).asHours()),
    })
  }, [time]);

  const handleStart = () => {
    setRunning(true);
  }

  const handleStop = () => {
    setRunning(false);
  }

  return (
    <Clock
      ms={convertedTime.ms}
      sec={convertedTime.sec}
      min={convertedTime.min}
      hour={convertedTime.hour}
      clockType='stop_watch'
      size='large'
    >
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => handleStart()}>Start</Button>
        <Button>Step</Button>
        <Button onClick={() => handleStop()}>Pause</Button>
        <Button>Reset</Button>
      </ButtonGroup>
    </Clock>
  );
}

export default StopWatch;

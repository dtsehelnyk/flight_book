import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import Clock from '../Clock';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import BreathingCircle from '../BreathingCircle';
import RecoveringBreathe from './RecoveringBreathe';

interface BreathingRow {
  cycles: number,
  duration: string,
}

const BreathingWatch: FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [cycles, setCycles] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [convertedTime, setConvertedTime] = useState<ClockTime>({
    ms: 0,
    sec: 0,
    min: 0,
    hour: 0,
  });

  const [isRecoveringBreathe, setIsRecoveringBreathe] = useState(false);
  const [recoveringBreatheLeft, setRecoveringBreatheLeft] = useState(150);

  const [breathingRows, setBreathingRows] = useState<BreathingRow[]>([]);

  // breathing timer
  useEffect(() => {
    let interval: NodeJS.Timer | number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else if (!isRunning) {
      window.clearInterval(interval);
    }

    return () => window.clearInterval(interval);
  }, [isRunning]);

  // breathing counter
  useEffect(() => {
    let interval: NodeJS.Timer | number | undefined;

    if (isBreathing) {
      interval = window.setInterval(() => {
        setCycles((prevCyclesAmount) => prevCyclesAmount + 1)
      }, 3000);
    } else if (!isBreathing) {
      window.clearInterval(interval);
    }

    return () => window.clearInterval(interval);
  }, [isBreathing]);

   // recovering breathe
   useEffect(() => {
    let interval: NodeJS.Timer | number | undefined;

    if (isRecoveringBreathe) {
      interval = window.setInterval(() => {
        setRecoveringBreatheLeft((prevRecoveringBreatheLeft) => prevRecoveringBreatheLeft - 1);
      }, 100);

      if (recoveringBreatheLeft === 0) {
        setIsRecoveringBreathe(false);
        handleStart();
      }
    } else if (!isBreathing) {
      window.clearInterval(interval);
      setIsRecoveringBreathe(false);
    }

    return () => window.clearInterval(interval);
  }, [isBreathing, isRecoveringBreathe, recoveringBreatheLeft]);

  // time converting
  useEffect(() => {
    setConvertedTime({
      ms: +time.toString().slice(-3, -2),
      sec: moment.duration(time).seconds(),
      min: moment.duration(time).minutes(),
      hour: Math.trunc(moment.duration(time).asHours()),
    });
  }, [time]);

  const handleStart = () => {
    setIsBreathing(true);
  }

  const handleStopBreathing = () => {
    setIsRunning(true);
    setIsBreathing(false);
    setRecoveringBreatheLeft(150);
  }

  const handleAddCycle = () => {
    setBreathingRows([
      ...breathingRows,
      {
        cycles,
        duration: `${convertedTime.hour <= 9 ? '0' + convertedTime.hour : convertedTime.hour}
        : ${convertedTime.min <= 9 ? '0' + convertedTime.min : convertedTime.min}
        : ${convertedTime.sec <= 9 ? '0' + convertedTime.sec : convertedTime.sec}.${convertedTime.ms}`
      }
    ]);
    setIsRunning(false);
    setTime(0);

    setCycles(0);
    setIsRecoveringBreathe(true);
  }

  const handleStopPractice = () => {
    setIsRecoveringBreathe(false);
    setRecoveringBreatheLeft(150);
    setCycles(0);
    setIsBreathing(false)
    setIsRunning(false);
    setTime(0);
  }

  return (
    <Clock
      ms={convertedTime.ms}
      sec={convertedTime.sec}
      min={convertedTime.min}
      hour={convertedTime.hour}
      clockType='breathing_watch'
      size='large'
    >
      <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{marginBottom: '20px'}}>
        <Button disabled={isBreathing || isRecoveringBreathe || isRunning} onClick={() => handleStart()}>
          Start practice
        </Button>
        <Button disabled={!isBreathing} onClick={() => handleStopBreathing()}>
          Stop breathing
        </Button>
        <Button disabled={!isRunning} onClick={() => handleAddCycle()}>
          Round
        </Button>
        <Button onClick={() => handleStopPractice()}>
          Stop
        </Button>
      </ButtonGroup>

      <Box sx={{display: 'flex'}}>
        <BreathingCircle cycles={cycles} isActive={true} isInProgress={isBreathing} />
        <RecoveringBreathe progress={recoveringBreatheLeft}/>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Round #</TableCell>
              <TableCell align="left">Cycles</TableCell>
              <TableCell align="left">Duration</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {breathingRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell align="left">{row.cycles}</TableCell>
                <TableCell align="left">{row.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Clock>
  );
}

export default BreathingWatch;
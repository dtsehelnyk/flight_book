import { FC, ReactNode } from 'react';

// import ClockPanel from './ClockPanel';
import { Typography } from '@mui/material';

interface OwnProps {
  clockType: 'timer' | 'watch' | 'stop_watch' | 'breathing_watch';
  size: 'small' | 'medium' | 'large';
  children?: ReactNode | string;
  hour?: number;
  min?: number;
  sec?: number;
  ms?: number;
}

type Props = OwnProps;

const Clock: FC<Props> = (props) => {
  const { clockType, children, hour = 0, min = 0, sec = 0, ms = 0 } = props;

  return (
    <>
      <Typography>
        {
          `${hour <= 9 ? '0' + hour : hour}
          : ${min <= 9 ? '0' + min : min}
          : ${sec <= 9 ? '0' + sec : sec}.${ms }`
        }
      </Typography>
      {children}
    </>
  );
}

export default Clock;

import React, { FC } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';

interface Props {
  clockType: 'timer' | 'watch';
  start: () => void;
  pause: () => void;
}

const ClockPanel: FC<Props> = (props) => {
  const { clockType, start, pause } = props;

  return (
    <>
      {clockType === "timer" &&
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => start()}>Start</Button>
          <Button>Step</Button>
          <Button onClick={() => pause()}>Pause</Button>
          <Button>Reset</Button>
        </ButtonGroup>
      }
    </>
  );
}

export default ClockPanel;
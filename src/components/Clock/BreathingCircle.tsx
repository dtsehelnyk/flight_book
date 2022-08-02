import { FC } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface OwnProps {
  cycles: number;
  isActive: boolean;
  isInProgress: boolean;
}

const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    marginBottom: 20,
    width: 300,
    height: 300,
    border: `70px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
    color: theme.palette.text.primary,
}));

const BreathingCircle: FC<OwnProps> = (props) => {
  const {cycles, isActive = false, isInProgress} = props;

  return (
    <Container style={isInProgress
      ? {
        animationName: 'pulse',
        animationDuration: '1.5s',
        animationTimingFunction: 'ease-out',
        animationDirection: 'alternate',
        animationIterationCount: cycles * 2,
        animationPlayState: 'running',
      } : {}}
    >
      <style>{`
        @keyframes pulse {
          100% { opacity: 0.2; }
        }
      `}</style>
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 108,
        }}
      >
        {cycles}
      </span>
    </Container>
  );
}

export default BreathingCircle;
import { FC } from "react";

import Slider from "@mui/material/Slider";
import { Stack } from "@mui/material";

interface Props {
  progress: number,
}

const RecoveringBreathe: FC<Props> = (props) => {
  const { progress } = props;

  return (
    <Stack sx={{ height: 300 }} spacing={1} direction="row">
      <Slider
        sx={{height:'100%', padding: '0 100px'}}
        aria-label="Temperature"
        orientation="vertical"
        max={15}
        value={progress / 10}
        valueLabelDisplay="on"
      />
    </Stack>
  );
}

export default RecoveringBreathe;
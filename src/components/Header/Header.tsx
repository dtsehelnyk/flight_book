import React, { FC, ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  subtitle?: ReactNode | string;
  children?: ReactNode | string;
}

const Header: FC<Props> = (props) => {
  const { title, subtitle, children } = props;

  return (
    <Box sx={{ marginBottom: '16px' }}>
      <Typography variant='h3'>
        {title}<br/>
      </Typography>

      <Typography variant='subtitle1'>
        {subtitle}
      </Typography>
      {children}
    </Box>
  )
}

export default Header;
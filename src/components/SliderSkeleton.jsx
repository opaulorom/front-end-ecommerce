import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SliderSkeleton() {
  return (
    <Box sx={{ width: 100}}>
      <Skeleton sx={{ height: 500}} animation="wave" />
     
    </Box>
  );
}

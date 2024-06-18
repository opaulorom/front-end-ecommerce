import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function CategoryCarouselSkeleton() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "5rem", marginTop:"8rem" }}>
      <div style={{ textAlign: "center" }}>
        <Skeleton variant="circular" width={150} height={150} />
   
      </div>
      
      <div style={{ textAlign: "center" }}>
        <Skeleton variant="circular" width={150} height={150} />
   
      </div>

      <div style={{ textAlign: "center" }}>
        <Skeleton variant="circular" width={150} height={150} />
        
      </div>

      <div style={{ textAlign: "center" }}>
        <Skeleton variant="circular" width={150} height={150} />
      
      </div>
    </div>
  );
}

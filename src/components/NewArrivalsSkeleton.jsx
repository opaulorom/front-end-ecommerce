import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function NewArrivalsSkeleton() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "5rem", marginTop:"8rem" }}>
      <div style={{ textAlign: "center" }}>
        <Skeleton variant="rectangular" style={{ width: "15vw", height: "40vh" }} />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>
      
      <div style={{ textAlign: "center" }}>
        <Skeleton variant="rectangular" style={{ width: "15vw", height: "40vh" }} />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>

      <div style={{ textAlign: "center" }}>
        <Skeleton variant="rectangular" style={{ width: "15vw", height: "40vh" }} />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>

      <div style={{ textAlign: "center" }}>
        <Skeleton variant="rectangular" style={{ width: "15vw", height: "40vh" }} />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>
    </div>
  );
}

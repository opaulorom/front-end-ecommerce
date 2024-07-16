import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function CategoryCarouselSkeleton() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "5rem", marginTop: "-22rem", overflow: 'hidden' }}>
      <style>
        {`
          @media (min-width: 700px) {
            .hide-on-large {
              display: none;
            }
          }
        `}
      </style>
      <div className="hide-on-large" style={{ display: "flex", flexDirection: "row", marginLeft:"18rem", marginTop:"2rem" }}>
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
    </div>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function NewArrivalsSkeleton() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)", /* Define duas colunas com largura igual */
      justifyContent: "center", /* Centraliza as colunas horizontalmente */
      gap: "1rem", /* Espaçamento entre os elementos */
   
  '@media (max-width: 768px)': {
    gridTemplateColumns: "1fr", /* Altera para uma coluna quando a largura for menor que 768px */
  }
    }}>
      <div style={{ textAlign: "center", width: "100%" }}>
        <Skeleton variant="rectangular" style={{ width: "100%", height: "30vh" }} />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>
      
      <div style={{ textAlign: "center", width: "100%" }}>
        <Skeleton variant="rectangular" style={{ width: "100%", height: "30vh" }} />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>

      <div style={{ textAlign: "center", width: "100%" }}>
        <Skeleton variant="rectangular" style={{ width: "100%", height: "30vh" }} />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>

      <div style={{ textAlign: "center", width: "100%" }}>
        <Skeleton variant="rectangular" style={{ width: "100%", height: "30vh" }} />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>
    </div>
  );
}

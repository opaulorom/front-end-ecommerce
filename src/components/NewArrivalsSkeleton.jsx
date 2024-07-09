import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Stack } from "@mui/material";

export default function NewArrivalsSkeleton() {
  return (<div style={{
    display:"flex",
    justifyContent:"center"
  }}>

    <Stack 
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)" /* Colunas responsivas */,
        justifyContent: "center" /* Centraliza as colunas horizontalmente */,
        
        gap: "5rem" /* Espaçamento entre os elementos */,
        "@media (min-width: 700px)": {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)" /* Colunas responsivas */,
          justifyContent: "center" /* Centraliza as colunas horizontalmente */,
          alignItems:"center"
        },
      }}
    >
      <Box  style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </Box >

      <Box  style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </Box >

      <Box  style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </Box >

      <Box  style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </Box >
      <Box  style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </Box >

      <Box  style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </Box >

      <Box  style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </Box >

      <Box  style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </Box >
    </Stack >

  </div>
  );
}

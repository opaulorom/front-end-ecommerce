import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function CategorySubcategoriesSkeleton() {
  return (

    <div style={{
      display: "flex",
      justifyContent: "space-between",
      gap: "1rem"
    }}>
      <div>
        <div >
          <div style={{
            marginBottom: "3rem"
          }}>
            <Skeleton width={160} height={25} />

          </div>





          <div>

            <Skeleton width={160} height={25} />
            <Skeleton width={90} />
            <Skeleton width={80} />
            <Skeleton width={70} />
            <Skeleton width={90} />
          </div>



          <div style={{

            marginTop: "5rem"
          }}>

            <Skeleton width={160} height={25} />
            <Skeleton width={90} />
            <Skeleton width={80} />
            <Skeleton width={70} />
            <Skeleton width={90} />
            <Skeleton width={90} />
            <Skeleton width={80} />
            <Skeleton width={70} />
            <Skeleton width={90} />
            <Skeleton width={90} />
            <Skeleton width={80} />
            <Skeleton width={70} />
            <Skeleton width={90} />
          </div>


          <div style={{

            marginTop: "5rem"
          }}>
            <Skeleton width={160} height={25} />


            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              marginTop: "2rem"
            }}>

              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />

            </div>
          </div>
          <div style={{

            marginTop: "5rem"
          }}>

            <Skeleton width={160} height={25} />
            <Skeleton width={90} />
            <Skeleton width={80} />
            <Skeleton width={70} />
            <Skeleton width={90} />
          </div>
        </div>
      </div>
      <div>

        <div style={{ display: "flex", justifyContent: "center", gap: "5rem", marginTop: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>
        </div>


        <div style={{ display: "flex", justifyContent: "center", gap: "5rem", marginTop: "8rem" }}>
          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>
        </div>


        <div style={{ display: "flex", justifyContent: "center", gap: "5rem", marginTop: "8rem" }}>
          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Skeleton variant="rectangular" style={{ width: "13vw", height: "40vh" }} />
            <Skeleton width={80} />
            <Skeleton width={160} />
          </div>
        </div>

      </div>


    </div>
  );
}

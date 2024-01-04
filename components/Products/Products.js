import React from "react";
import Product from "./Product";
import { Grid, Typography } from "@mui/material";
const Products = ({ products }) => {
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ paddingX: "9px", marginY: 2, marginBottom: 5 }}
      >
        {products.length !== 0 ? (
          "" /////map data here//////}""
        ) : (
          <Typography variant="h5" sx={{ margin: "auto" }}>
            ////response if data note found////////{" "}
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Products;

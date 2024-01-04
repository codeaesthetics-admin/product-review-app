import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, IconButton, Grid, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
const Header = ({ searchValue, setSearchValue, setStartQueryParam }) => {
  const { pathname } = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    searchValue.length !== 0 ? setIsSearching(true) : setIsSearching(false);
  }, [searchValue]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "70px",
          marginTop: 1,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              paddingBottom={1}
              sx={{ fontWeight: "600" }}
            >
              {pathname === "/" && "Product Review & Feedback System"}
              {pathname === "/dashboard" && "Dashboard"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "right" }}
          >
            <TextField
              value={searchValue}
              sx={{
                maxWidth: "320px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "26px",
                },
                "& .MuiOutlinedInput-input": {
                  paddingY: "10px",
                  paddingRight: "60px",
                },
              }}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setStartQueryParam(1);
              }}
              placeholder="Search"
              fullWidth
            />

            <IconButton
              type="button"
              sx={{ position: "absolute", marginTop: "2px" }}
              onClick={() => {
                setSearchValue(); ////pass data here////);
              }}
            >
              <Search />
            </IconButton>
            {isSearching && (
              <IconButton
                type="button"
                sx={{ position: "absolute", marginRight: 4, marginTop: "-2px" }}
                onClick={() => {
                  setSearchValue("");
                  setIsSearching(false);
                }}
              >
                x
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Header;

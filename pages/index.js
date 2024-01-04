import React, { useEffect, useState } from "react";
import Products from "../components/Products/Products";
import Pagination from "../components/Pagination/Pagination";
import { Box, CircularProgress, Button, Typography } from "@mui/material";
import Header from "../components/Header/Header";
import { useRouter } from "next/router";
import { axiosRequest } from "../components/api/api";

const productsEndpoint = `8000/products`;

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [startQueryParam, setStartQueryParam] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const pages = Math.ceil(totalItems / 8);
  const { pathname } = useRouter();
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/") {
      setLoader(false);
      getSearchedProductAPI();
    }
  }, [searchValue, startQueryParam]);

  async function getSearchedProductAPI() {
    try {
      const response = await axiosRequest(
        "get",
        /////add api route/////
        /// Write body here if needed else write “undefined”////,
        {
          ////Write required params here////
        }
      );
      ///// update your state here with repose data//////
    } catch (error) {
      setLoader(true);
      alert("Something went wrong please try again later.");
    }
  }

  return (
    <>
      <div>
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setStartQueryParam={setStartQueryParam}
        />
        <Button
          variant="contained"
          sx={{
            background: "green",
            color: "white",
            borderColor: "green",
            "&.MuiButton-root:hover": {
              background: "green",
              color: "white",
              borderColor: "green",
            },
          }}
          onClick={() => {
            ""; /////code here////
          }}
        >
          Dashboard
        </Button>
        <Box sx={{ minHeight: "75vh" }}>
          {loader ? (
            <Products products={products} />
          ) : (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
            >
              <CircularProgress sx={{ color: "#00B65E" }} />
            </Box>
          )}
        </Box>
        {pages !== 0 && (
          <Pagination
            setStartQueryParam={setStartQueryParam}
            startQueryParam={startQueryParam}
            pages={pages}
          />
        )}
      </div>
    </>
  );
}

import React from "react";
import { Box, Typography, Rating } from "@mui/material";

const ReviewConfirmation = ({ rating }) => {
  return (
    <Box sx={{ paddingTop: 15 }}>
      {/* value={Math.floor(////place code here////)} */}
      <Rating className="font-setting" sx={{ fontSize: "60px" }} readOnly />
      <Typography sx={{ marginBottom: 3 }}>{rating} out of 5</Typography>
      <Typography>////show a message here///////</Typography>
      <Typography>{/* ////show a message here/////// */}</Typography>
    </Box>
  );
};

export default ReviewConfirmation;

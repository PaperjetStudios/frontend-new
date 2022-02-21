import { Rating, Typography } from "@mui/material";
import React from "react";
import Box from "../box";
import { Review } from "./types";

type Props = {
  className?: string;
  reviews: Review[];
  rating: string;
};

const ReviewBase: React.FC<Props> = ({ className, rating, reviews }) => {
  if (rating) {
  }
  if (reviews.length > 0) {
    return (
      <Box className="mt-2">
        <Rating
          readOnly
          size="small"
          value={parseInt(rating)}
          precision={0.5}
        />
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography variant="subtitle2" color="#aaa">
          No Reviews Yet!
        </Typography>
      </Box>
    );
  }
};

export default ReviewBase;

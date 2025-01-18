import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

interface RatingStarProps {
  rating: number;
}

const RatingStar: React.FC<RatingStarProps> = ({ rating }) => {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={rating}
        precision={0.5}
        readOnly
        size="small" // Adjusts the star size
      />
    </Stack>
  );
};

export default RatingStar;

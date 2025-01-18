// "use client";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// interface BasicSelectProps {
//   maxQuantity: number;
// }
// export default function BasicSelect() {
//   const [age, setAge] = React.useState("");

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };

//  return (
//    <Box sx={{ minWidth: 120 }}>
//      <FormControl
//        size="small"
//        sx={{
//          width: "120px",
//          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//            {
//              borderColor: "gray",
//            },
//        }}
//      >
//        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
//        <Select
//          labelId="demo-simple-select-label"
//          id="demo-simple-select"
//          value={age}
//          label="Quantity"
//          onChange={handleChange}
//        >
//          <MenuItem value={1}>1 Litre</MenuItem>
//          <MenuItem value={2}>2 Litres</MenuItem>
//          <MenuItem value={3}>3 Litres</MenuItem>
//        </Select>
//      </FormControl>
//    </Box>
//  );
// }

"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface BasicSelectProps {
  maxQuantity: number;
}

export default function BasicSelect({ maxQuantity }: BasicSelectProps) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Quantity"
          onChange={handleChange}
        >
          {Array.from({ length: maxQuantity }, (_, i) => (
            <MenuItem key={i} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
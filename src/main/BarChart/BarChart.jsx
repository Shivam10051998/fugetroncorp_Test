import React from "react";
import {MenuItem, FormControl,Select} from "@mui/material";
import { weekly, monthly, yearly } from "../../mockjson/Bar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export default function BarChart() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState(weekly);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === 0) setData(weekly);
    if (event.target.value === 1) setData(monthly);
    if (event.target.value === 2) setData(yearly);
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Record"
        >
          <MenuItem value={0}>weekly</MenuItem>
          <MenuItem value={1}>monthly</MenuItem>
          <MenuItem value={2}>yearly</MenuItem>
        </Select>
      </FormControl>
      <div style={{width:'50%',height:'50%'}}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

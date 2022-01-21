import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Grid, Stack} from "@mui/material";
import Card from "@mui/material/Card";
import { lightBlue,purple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { NumberFormatCustom } from "../NumberFormatCustom";
import SignalScreen from "../SignalScreen";


const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

let streamName;
var streamLB;
var streamUB;
var streamTF;


const handleChangeName = e => {
  streamName = e.target.value;
  console.log(streamName);
};
const handleChangelB = e => {
  streamLB = e.target.value;
  console.log(streamLB);
};
const handleChangeuB = e => {
  streamUB = e.target.value;
  console.log(`Typed => ${e.target.value}`);
};
const handleChangetF = e => {
  streamTF = e.target.value;
  console.log(`Typed => ${e.target.value}`);
};

export const RandomSignal = (props) => {

    return (
              <Stack container spacing={6} direction="column" alignItems="center" justifyContent="center">
                  
                  <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  sx={{pt: 1, minWidth: 300}}
                  onChange={handleChangeName}
                  />

                  <TextField 
                    variant="outlined" 
                    sx={{pt: 1, minWidth: 300}}
                    label="Lower boundary"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    onChange={handleChangelB}
                  />
                  <TextField
                    variant="outlined"
                    sx={{ pt: 1, minWidth: 300 }}
                    label="Upper boundary"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    onChange={handleChangeuB}
                  />
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Transmission frequency"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    onChange={handleChangetF}
                  />
              </Stack>
    )
}

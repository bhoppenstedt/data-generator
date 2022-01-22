import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Grid, Stack} from "@mui/material";
import Card from "@mui/material/Card";
import { lightBlue,purple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { NumberFormatCustom } from "../NumberFormatCustom";
import SignalScreen from "../SignalScreen";
import {SignalButton} from "../SignalButton";

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};


export const RandomSignal = (props) => {

  const handleNameChange = e => {
    setSignalName(e.target.value)
  };
  const handleLBChange = e => {
    setLowerBoundary(e.target.value)
  };
  const handleUBChange = e => {
    setUpperBoundary(e.target.value)
  };
  const handleTFChange = e => {
    setTransmissionFrequency(e.target.value)
  };

  function putReq() {
    
    var params={lowerBoundary,upperBoundary,transmissionFrequency}
    fetch('/api/random/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  };
  
  const [signalName, setSignalName] = useState('')
  const [lowerBoundary, setLowerBoundary] = useState(0)
  const [upperBoundary, setUpperBoundary] = useState(1)
  const [transmissionFrequency, setTransmissionFrequency] = useState(1)

      return (
              <Stack container spacing={6} direction="column" alignItems="center" justifyContent="center">
                  <TextField 
                  id="name" 
                  label="Name" 
                  variant="outlined" 
                  sx={{pt: 1, minWidth: 300}}
                  onChange={handleNameChange}
                  />

                  <TextField 
                    variant="outlined" 
                    sx={{pt: 1, minWidth: 300}}
                    label="Lower boundary"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="lowerBoundary"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    onChange={handleLBChange}
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
                    onChange={handleUBChange}
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
                   onChange={handleTFChange}
                  />
                  <SignalButton name={"Generate"} onClick={() => putReq()} icon={<></>}/>
              </Stack>
    )
}

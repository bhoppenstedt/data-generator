import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from "../GenerateButton.js";


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
              <Stack container spacing={'15px'} direction="column" alignItems="center" justifyContent="center" sx={{width: '95%'}}>
                  <TextField 
                  id="name" 
                  label="name" 
                  variant="outlined"
                  size="normal"
                  onChange={handleNameChange}
                  sx={{outlineColor: "#9496F5", marginTop: "5px"}}
                  />

                  <TextField 
                    variant="outlined"
                    label="lower boundary"
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
                    label="upper boundary"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="upperBoundary"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    onChange={handleUBChange}
                  />

                  <TextField
                    variant="outlined"
                    label="transmission frequency"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="transmissionFrequency"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                   onChange={handleTFChange}
                  />
                  <GenerateButton name={"Generate"} onClick={() => putReq()} icon={<></>}/>
              </Stack>
    )
}

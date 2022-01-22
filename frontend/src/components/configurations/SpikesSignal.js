import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {Stack} from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from '../GenerateButton';

export const SpikesSignal = (props) => {
  const handleNameChange = e => {
    setSignalName(e.target.value)
  };
  const handleBAChange = e => {
    setBase(e.target.value)
  };
  const handleDIChange = e => {
    setDistance(e.target.value)
  };
  const handleSIChange = e => {
    setSize(e.target.value)
  };
  const handlePRChange = e => {
    setPropability(e.target.value)
  };
  const handleTFChange = e => {
    setTransmissionFrequency(e.target.value)
  };

  function putReq() {
    
    var params={base,distance,size,propability,transmissionFrequency}
    fetch('/api/spiked/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  };
  
  const [signalName, setSignalName] = useState('')
  const [base , setBase] = useState(100)
  const [distance, setDistance] = useState(3)
  const [size, setSize] = useState(10)
  const [propability, setPropability] = useState(0.5)
  const [transmissionFrequency, setTransmissionFrequency] = useState(1)
    return (
      <Stack container spacing={4} direction="column" alignItems="center" justifyContent="center">
                  <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  sx={{pt: 1, minWidth: 300}}
                  onChange={handleNameChange}
                  />
                  
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Base"
                    value={props.numberformat}
                    onChange={handleBAChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Distance"
                    value={props.numberformat}
                    onChange={handleDIChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Size"
                    value={props.numberformat}
                    onChange={handleSIChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Probability"
                    value={props.numberformat}
                    onChange={handlePRChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Transmission frequency"
                    value={props.numberformat}
                    onChange={handleTFChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <GenerateButton name={"Generate"} onClick={() => putReq()} icon={<></>}/>
                </Stack>
    )
}

import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {Stack} from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from '../GenerateButton';
import { Typography } from "@mui/material";

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
    fetch('http://localhost:5000/api/' + props.format + '/spiked/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => props.setStreams(Array.from(data)))
    .catch(function() {
      console.log("Failed to create spiked signal!");
    });

  };
  const [signalName, setSignalName] = useState('')
  const [base , setBase] = useState(100)
  const [distance, setDistance] = useState(3)
  const [size, setSize] = useState(10)
  const [propability, setPropability] = useState(0.5)
  const [transmissionFrequency, setTransmissionFrequency] = useState(1)
    return (
      <Stack container spacing={'15px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>

<Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                            signal name:
                  </Typography>
                  <TextField 
                  id="outlined-basic"
                  variant="outlined"
                  onChange={handleNameChange}
                  />
                  
                  <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                            base:
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={props.numberformat}
                    onChange={handleBAChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />

                  <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                            distance:
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={props.numberformat}
                    onChange={handleDIChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />

                  <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                            size:
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={props.numberformat}
                    onChange={handleSIChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />

                  <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                            probability:
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={props.numberformat}
                    onChange={handlePRChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />

                  <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                            transmission frequency:
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={props.numberformat}
                    onChange={handleTFChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <GenerateButton name={"Generate"} format ={props.format} setFormat = {props.setFormat} onClick={() => putReq()} icon={<></>}/>
                </Stack>
    )
}

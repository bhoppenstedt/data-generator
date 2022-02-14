import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import { Stack, Grid } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { SignalButton } from "../SignalButton";
import { GenerateButton } from "../GenerateButton.js";
import { Typography } from "@mui/material";

export const SinusSignal = (props) => {

  const handleNameChange = e => {
    setSignalName(e.target.value)
  };
  const handleFRChange = e => {
    setFrequency(e.target.value)
  };
  const handleAMChange = e => {
    setAmplitude(e.target.value)
  };
  const handleTFChange = e => {
    setTransmissionFrequency(e.target.value)
  };

  function putReq() {
    
    var params={frequency,amplitude,transmissionFrequency}
    fetch('http://localhost:5000/api/sinus/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => props.setStreams(Array.from(data)));

  };
  
  const [signalName, setSignalName] = useState('')
  const [frequency, setFrequency] = useState(3)
  const [amplitude, setAmplitude] = useState(50)
  const [transmissionFrequency, setTransmissionFrequency] = useState(1)

  return (
    <Stack container spacing={'15px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>
      
                <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                          signal name:
                </Typography>
                <TextField 
                id="outlined-basic" 
                label="name" 
                variant="outlined" 
                onChange={handleNameChange}
                />

                <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                          frequency:
                </Typography>
                <TextField
                  variant="outlined"
                  label="value"
                  value={props.numberformat}
                  onChange={handleFRChange}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />

                <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                          amplitude:
                </Typography>
                <TextField
                  variant="outlined"
                  label="value"
                  value={props.numberformat}
                  onChange={handleAMChange}
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
                  label="value"
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

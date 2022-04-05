import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from '../GenerateButton';
import { Typography } from "@mui/material";

export const NormallyDistributed = (props) => {

  const handleNameChange = e => {
    setSignalName(e.target.value)
  };
  const handleCEChange = e => {
    setCenter(e.target.value)
  };
  const handleSCChange = e => {
    setScale(e.target.value)
  };
  const handleTFChange = e => {
    setTransmissionFrequency(e.target.value)
  };


  function putReq() {
    
    var params={center,scale,transmissionFrequency}
    fetch('http://localhost:5000/api/' + props.format + '/emphasized/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => props.setStreams(Array.from(data)));

  };
  const [signalName, setSignalName] = useState('')
  const [center , setCenter] = useState(100)
  const [scale, setScale] = useState(15)
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
                            expected value:
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={props.numberformat}
                    onChange={handleCEChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />

                  <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                            standard deviation:
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={props.numberformat}
                    onChange={handleSCChange}
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

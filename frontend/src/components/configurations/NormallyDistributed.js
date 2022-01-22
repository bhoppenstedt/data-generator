import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from '../GenerateButton';

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
    fetch('/api/emphasized/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  };
  
  const [signalName, setSignalName] = useState('')
  const [center , setCenter] = useState(100)
  const [scale, setScale] = useState(15)
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
                    label="Expected value"
                    value={props.numberformat}
                    onChange={handleCEChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Standard Deviation"
                    value={props.numberformat}
                    onChange={handleSCChange}
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

import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from '../GenerateButton';

export const CosinusSignal = (props) => {

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
    fetch('/api/cosinus/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  };
  
  const [signalName, setSignalName] = useState('')
  const [frequency, setFrequency] = useState(3)
  const [amplitude, setAmplitude] = useState(50)
  const [transmissionFrequency, setTransmissionFrequency] = useState(1)

    return (
      <Stack container spacing={6} direction="column" alignItems="center" justifyContent="center">
        
                  <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  sx={{pt: 1, minWidth: 300}}
                  onChange={handleNameChange}
                  />

                  <TextField
                    variant="outlined"
                    sx={{ pt: 1, minWidth: 300 }}
                    label="Frequence"
                    value={props.numberformat}
                    onChange={handleFRChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    variant="outlined"
                    sx={{ pt: 1, minWidth: 300 }}
                    label="Amplitude"
                    value={props.numberformat}
                    onChange={handleAMChange}
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

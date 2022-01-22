import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import { Stack, Grid } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { SignalButton } from "../SignalButton";
import { GenerateButton } from "../GenerateButton.js";

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
    fetch('/api/sinus/' + signalName + '/', {
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
      <Grid container item xs={12} alignContent={"center"} alignItems={"center"} justifyContent={"center"}>
                  
        

                  <Grid item xs={12}>
                  <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  onChange={handleNameChange}
                  />
</Grid>
<Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Frequence"
                    value={props.numberformat}
                    onChange={handleFRChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
</Grid>
<Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Amplitude"
                    value={props.numberformat}
                    onChange={handleAMChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
</Grid>
<Grid item xs={12}>
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
                  </Grid>
                  
                </Grid>
        
    )
}

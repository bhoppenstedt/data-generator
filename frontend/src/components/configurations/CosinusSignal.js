import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from '../GenerateButton';
import { Typography } from '@mui/material';
import InputField from "./InputField.js"
import { Autocomplete } from "@mui/material";

export const CosinusSignal = (props) => {
 
  
  const formatOptions = [
    {label: 'MQTT'},
    {label: 'Kafka'},
    {label: 'Websocket'}
  ];

  // update the states of each input
  const handleNameChange = e => {
    setSignalName(e.target.value)
    checkField();
  };
  const handleFRChange = e => {
    setFrequency(e.target.value)
    checkField();
  };
  const handleAMChange = e => {
    setAmplitude(e.target.value)
    checkField();
  };
  const handleTFChange = e => {
    setTransmissionFrequency(e.target.value)
    checkField();
  };

  function putReq() {
    
    var params={frequency,amplitude,transmissionFrequency}
    fetch('http://localhost:5000/api/' + props.format + '/cosinus/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => props.setStreams(Array.from(data)))
    .catch(function() {
      console.log("Failed to create cosinus signal!");
    });
  };

  function checkField() {
    if(signalName == "") {
      setMissingSN(true);
    } else {
      setMissingSN(false);
    }

    if(frequency == "") {
      setMissingFre(true);
    } else {
      setMissingFre(false);
    }

    if(amplitude == "") {
      setMissingAmp(true);
    } else {
      setMissingAmp(false);
    }

    if(transmissionFrequency == "") {
      setMissingTF(true);
    } else {
      setMissingTF(false);
    }

    if(props.format == "") {
      setMissingFormat(true);
    } else {
      setMissingFormat(false);
    }
  }

  function checkAndSend() {
    checkField();
    if(!missingSN && !missingFre && !missingAmp && !missingTF && !missingFormat) {
      putReq();
    }
  }
 
  const [signalName, setSignalName] = useState('')
  const [frequency, setFrequency] = useState(0)
  const [amplitude, setAmplitude] = useState(0)
  const [transmissionFrequency, setTransmissionFrequency] = useState(0)

  const [missingSN, setMissingSN] = useState(false);
  const [missingFre, setMissingFre] = useState(false);
  const [missingAmp, setMissingAmp] = useState(false);
  const [missingTF, setMissingTF] = useState(false); 
  const [missingFormat, setMissingFormat] = useState(false);



// different inputs for the the following signal 

  var styleTypo = {
    fontFamily: 'Open Sans, sans-serif', 
    fontWeight: "400",
    fontSize: 15, 
    color: '#3F0092',
  }

    return (
      <Stack container spacing={'12px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>
        
        <InputField inputText={"signal name"} helpingText={"Enter a name."} onChange={handleNameChange} missing={missingSN} ></InputField>

        <InputField inputText={"frequency"} helpingText={"Enter a frequency."} onChange={handleFRChange} missing={missingFre} ></InputField>

        <InputField inputText={"amplitude"} helpingText={"Enter an amplitude."} onChange={handleAMChange} missing={missingAmp} ></InputField>

        <InputField inputText={"transmission frequency"} helpingText={"Enter a transmission frequency."} onChange={handleTFChange} missing={missingTF} ></InputField>

        <Autocomplete 
              options={formatOptions}
              //sx={{ width: "100%" }}
              sx = {
                {'& label.Mui-focused': {
                color: '#3F0092',
                },
                '& .MuiInput-underline:after': {
                borderBottomColor: '#3F0092',
                },
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: missingFormat ? "red" : '#3F0092',
                },
                '&:hover fieldset': {
                    borderColor: '#3F0092',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#3F0092',
                }}}}
              onInputChange={(event, inputValue) => props.setFormat(inputValue.toLowerCase())}
              renderInput={(params) => 
                <Stack container spacing={'12px'}>
                  <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                      publisher:
                  </Typography>
                  <TextField {...params} size="small" label="" helperText={missingFormat ? "Choose a publisher." : ""}  />
                </Stack>
              }
        />    
        <GenerateButton name={"Generate"} format ={props.format} setFormat = {props.setFormat} onClick={() => checkAndSend()} icon={<></>}/>
                  
               
      </Stack>
    )
}

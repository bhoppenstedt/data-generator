import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from "../GenerateButton.js";
import { Typography } from "@mui/material";
import InputField from "./InputField.js"
import { Autocomplete } from "@mui/material";


export function RandomSignal ({streams, setStreams, format, setFormat}) {

  const formatOptions = [
    {label: 'MQTT'},
    {label: 'Kafka'},
    {label: 'Websocket'}
  ];
  
  const handleNameChange = e => {
    setSignalName(e.target.value)
    checkField();
  };
  const handleLBChange = e => {
    setLowerBoundary(e.target.value)
    checkField();
  };
  const handleUBChange = e => {
    setUpperBoundary(e.target.value)
    checkField();
  };
  const handleTFChange = e => {
    setTransmissionFrequency(e.target.value)
    checkField();
  };

  function putReq() {
    
    var params={lowerBoundary,upperBoundary,transmissionFrequency}
    fetch('http://localhost:5000/api/' + format + '/random/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => setStreams(Array.from(data)))
    .catch(function() {
      console.log("Failed to create random signal!");
    });

  };

  function checkField() {
    if(signalName == "") {
      setMissingSN(true);
    } else {
      setMissingSN(false);
    }

    if(lowerBoundary == "") {
      setMissingLB(true);
    } else {
      setMissingLB(false);
    }

    if(upperBoundary == "") {
      setMissingUB(true);
    } else {
      setMissingUB(false);
    }

    if(transmissionFrequency == "") {
      setMissingTF(true);
    } else {
      setMissingTF(false);
    }
  }

  function checkAndSend() {
    checkField();
    if(!missingSN && !missingLB && !missingUB && !missingTF) {
      putReq();
    }
  }
  
  const [signalName, setSignalName] = useState("")
  const [lowerBoundary, setLowerBoundary] = useState(0)
  const [upperBoundary, setUpperBoundary] = useState(0)
  const [transmissionFrequency, setTransmissionFrequency] = useState(0)

  const [missingSN, setMissingSN] = useState(false);
  const [missingLB, setMissingLB] = useState(false);
  const [missingUB, setMissingUB] = useState(false);
  const [missingTF, setMissingTF] = useState(false);

  // diffrent inputs for bowndries with handleChange 

      return (
              <Stack container spacing={'12px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>
                
                  <InputField inputText={"signal name"} helpingText={"Enter a name."} onChange={handleNameChange} missing={missingSN} ></InputField>

                  <InputField inputText={"lower boundary"} helpingText={"Enter a lower boundary."} onChange={handleLBChange} missing={missingLB} ></InputField>

                  <InputField inputText={"upper boundary"} helpingText={"Enter an upper boundary."} onChange={handleUBChange} missing={missingUB} ></InputField>

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
                              borderColor: '#3F0092',
                          },
                          '&:hover fieldset': {
                              borderColor: '#3F0092',
                          },
                          '&.Mui-focused fieldset': {
                              borderColor: '#3F0092',
                          }}}}
                        onChange={(event, value) => setFormat(value.label.toLowerCase())}
                        //isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => 
                          <Stack container spacing={'12px'}>
                            <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                                publisher:
                            </Typography>
                            <TextField {...params} size="small" label="" />
                          </Stack>
                        }
                  />    

                  <GenerateButton name={"Generate"} onClick={() => checkAndSend()} icon={<></>}/>

              </Stack>
    )
}

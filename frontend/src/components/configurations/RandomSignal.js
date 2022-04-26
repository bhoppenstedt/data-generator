import { fabClasses, Stack } from "@mui/material";
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
    if(checkNameTaken(e.target.value)){
      setNameAlreadyTaken(true);
      setMissingSN(true);
    } else {
      setNameAlreadyTaken(false);
      setMissingSN(false);
    }
    setSignalName(e.target.value)
  };
  const handleLBChange = e => {
    console.log("value: " + e.target.value.length)
    if(e.target.value === "-") {
      setLowerBoundary(e.target.value)
    }
    if(e.target.value <= 10000000 && e.target.value >= -10000000 || e.target.value === "") {
      setLowerBoundary(e.target.value)
    }
  };
  const handleUBChange = e => {
    console.log("value: " + e.target.value.length)
    if(e.target.value === "-") {
      setUpperBoundary(e.target.value)
    }
    if(e.target.value <= 10000000 && e.target.value >= -10000000 || e.target.value === "") {
      setUpperBoundary(e.target.value)
    }
  };
  const handleTFChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value !== "0.00000" && e.target.value <= 200) {
      setTransmissionFrequency(e.target.value)
    }
  }
  function handleFormatChange(formatValue) {
    setFormat(formatValue);
  }

  function checkNameTaken(enteredName) {
    for (const stream of streams) {
      if(stream.name === enteredName) {
        return true;
      }
    }
  }

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

    if(format == "") {
      setMissingFormat(true);
    } else {
      setMissingFormat(false);
    }
  }

  function checkAndSend() {
    checkField();
    if(!missingSN && !missingLB && !missingUB && !missingTF && !missingFormat) {
      putReq();
    }
  }
  
  const [signalName, setSignalName] = useState("")
  const [lowerBoundary, setLowerBoundary] = useState("")
  const [upperBoundary, setUpperBoundary] = useState("")
  const [transmissionFrequency, setTransmissionFrequency] = useState("")

  const [missingSN, setMissingSN] = useState(false);
  const [missingLB, setMissingLB] = useState(false);
  const [missingUB, setMissingUB] = useState(false);
  const [missingTF, setMissingTF] = useState(false);
  const [missingFormat, setMissingFormat] = useState(false);
  const [nameAlreadyTaken, setNameAlreadyTaken] = useState(false);

  // diffrent inputs for bowndries with handleChange 

      return (
              <Stack container spacing={'12px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>
                
                  <InputField inputText={"signal name"} helpingText={nameAlreadyTaken ? "Name already in use!" : "Enter a name."} onChange={handleNameChange} missing={missingSN} ></InputField>

                  <InputField inputText={"lower boundary"} helpingText={"Enter a lower boundary."} onChange={handleLBChange} missing={missingLB} value={lowerBoundary} ></InputField>

                  <InputField inputText={"upper boundary"} helpingText={"Enter an upper boundary."} onChange={handleUBChange} missing={missingUB} value={upperBoundary} ></InputField>

                  <InputField inputText={"transmission frequency"} helpingText={"Enter a transmission frequency."} onChange={handleTFChange} missing={missingTF} value={transmissionFrequency} ></InputField>

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
                        onInputChange={(event, inputValue) => handleFormatChange(inputValue.toLowerCase())}
                        //isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => 
                          <Stack container spacing={'12px'}>
                            <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                                publisher:
                            </Typography>
                            <TextField {...params} 
                              size="small" 
                              label=""
                              helperText={missingFormat ? "Choose a publisher." : ""} 
                            />
                          </Stack>
                        }
                  />    

                  <GenerateButton name={"Generate"} onClick={() => checkAndSend()} icon={<></>}/>

              </Stack>
    )
}

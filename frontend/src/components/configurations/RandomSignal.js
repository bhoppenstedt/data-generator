import { fabClasses, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from "../GenerateButton.js";
import { Typography } from "@mui/material";
import InputField from "./InputField.js"
import { Autocomplete } from "@mui/material";


export const RandomSignal = (props) => {

  const formatOptions = [
    {label: 'MQTT'},
    {label: 'Kafka'},
    {label: 'Websocket'}
  ];
  
  const handleNameChange = e => {
    setSignalName(e.target.value)
  };

  const handleLBChange = e => {
    if(e.target.value === "-") {
      setLowerBoundary(e.target.value)
    }
    if((/^\d(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 10000000 || e.target.value === "") {
      setLowerBoundary(e.target.value)
    }
    if((/^-\d(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value >= -10000000 || e.target.value === "") {
      setLowerBoundary(e.target.value)
    }
  };

  const handleUBChange = e => {
    if(e.target.value === "-") {
      setUpperBoundary(e.target.value)
    }
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 10000000 || e.target.value === "") {
      setUpperBoundary(e.target.value)
    }
    if((/^-\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value >= -10000000 || e.target.value === "") {
      setUpperBoundary(e.target.value)
    }
  };

  const handleTFChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value !== "0.00000" && e.target.value <= 200) {
      setTransmissionFrequency(e.target.value)
    }
  }

  function handleFormatChange(formatValue) {
    props.setFormat(formatValue);
  }

  function putReq() {
    var params={lowerBoundary,upperBoundary,transmissionFrequency}
    fetch('http://localhost:5000/api/' + props.format + '/random/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => props.setStreams(Array.from(data)))
    .catch(function() {
      console.log("Failed to create random signal!");
    });
  };

  function checkField() {
    if(signalName == "") {
      setMissingSN(true);
    } else if (checkNameTaken(signalName)) {
      setMissingSN(true);
      setNameAlreadyTaken(true);
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

    if(props.format == "") {
      setMissingFormat(true);
    } else {
      setMissingFormat(false);
    }
  }

  function checkAndSend() {
    setShow(true);
    if(!missingSN && !missingLB && !missingUB && !missingTF && !missingFormat && !boundaryError && !nameAlreadyTaken){
      putReq();
    }
  }

  function checkNameTaken() {
    for (const stream of props.streams) {
      if(stream.name === signalName) {
        setNameAlreadyTaken(true);
        break;
      } else {
        setNameAlreadyTaken(false);
      }
    }
  }

  function checkBoundaries(){
    if(lowerBoundary == "" && upperBoundary == "") {
      setBoundaryError(false);

    } else if(Number(lowerBoundary) >= Number(upperBoundary)){
      setBoundaryError(true);

    } else {
      setBoundaryError(false);
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
  const [boundaryError, setBoundaryError] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    checkBoundaries();
  }, [lowerBoundary])

  useEffect(() => {
    checkBoundaries();
  }, [upperBoundary])

  useEffect(() => {
    checkNameTaken();
  }, [signalName])

  useEffect(() => {
    checkField();
  }, [signalName, lowerBoundary, upperBoundary, transmissionFrequency, props.format])

  // diffrent inputs for bowndries with handleChange 

      return (
              <Stack container spacing={'12px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>
                
                  <InputField inputText={"signal name"} helpingText={nameAlreadyTaken ? "Name already in use!" : "Enter a name."} onChange={handleNameChange} missing={(show && missingSN)} error={nameAlreadyTaken} ></InputField>

                  <InputField inputText={"lower boundary"} helpingText={"Enter a lower boundary." + (boundaryError ? " Needs to be lower than upper boundary!" : " (-10.000.000 - 10.000.000)")} onChange={handleLBChange} missing={(show && missingLB)} value={lowerBoundary} error={boundaryError} ></InputField>

                  <InputField inputText={"upper boundary"} helpingText={"Enter an upper boundary." + (boundaryError ? " Needs to be higher than lower boundary!" : " (-10.000.000 - 10.000.000)")} onChange={handleUBChange} missing={(show && missingUB)} value={upperBoundary} error={boundaryError} ></InputField>

                  <InputField inputText={"transmission frequency"} helpingText={"Enter a transmission frequency. (0.1 - 200)"} onChange={handleTFChange} missing={(show && missingTF)} value={transmissionFrequency} ></InputField>

                  <Autocomplete 
                        options={formatOptions}
                        sx = {
                          {'& label.Mui-focused': {
                          color: '#3F0092',
                          },
                          '& .MuiInput-underline:after': {
                          borderBottomColor: '#3F0092',
                          },
                          '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                              borderColor: (show && missingFormat) ? "red" : '#3F0092',
                          },
                          '&:hover fieldset': {
                              borderColor: '#3F0092',
                          },
                          '&.Mui-focused fieldset': {
                              borderColor: '#3F0092',
                          }}}}
                        onInputChange={(event, inputValue) => handleFormatChange(inputValue.toLowerCase())}
                        renderInput={(params) => 
                          <Stack container spacing={'12px'}>
                            <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                                publisher:
                            </Typography>
                            <TextField {...params} 
                              size="small" 
                              label=""
                              helperText={(show && missingFormat) ? "Choose a publisher." : ""} 
                            />
                          </Stack>
                        }
                  />    

                  <GenerateButton name={"Generate"} onClick={() => checkAndSend()} icon={<></>}/>

              </Stack>
    )
}

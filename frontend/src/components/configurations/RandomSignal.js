import { fabClasses, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from "../GenerateButton.js";
import { Typography } from "@mui/material";
import InputField from "./InputField.js"
import { Autocomplete } from "@mui/material";


export const RandomSignal = (props) => {

  // options to select at publisher selection, sets new value
  const formatOptions = [
    {label: 'MQTT'},
    {label: 'Kafka'},
    {label: 'Websocket'}
  ];
  
  // method called on change of signalname inputfield, sets new value
  const handleNameChange = e => {
    setSignalName(e.target.value)
  };

  // method called on change of lower boundary inputfield, sets new value
  // REGEX to restrict values
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

  // method called on change of upper boundary inputfield, sets new value
  // REGEX to restrict values
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

  // method called on change of transmission frequency inputfield, sets new value
  // REGEX to restrict values
  const handleTFChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value !== "0.00000" && e.target.value <= 200) {
      setTransmissionFrequency(e.target.value)
    }
  }

  // method called on change of publisher selection, sets new value
  function handleFormatChange(formatValue) {
    props.setFormat(formatValue);
  }

  /**
   * PUT-Request to create a datastream
   */
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

  // function thats called using useEffect hook
  // checks all inputfields for input
  // empty inputfields set a missing flag
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

  //show flag enables all helpertexts on empty or wrong inputs
  // if no value is empty or missing and signalname is not taken, send PUT-Request
  function checkAndSend() {
    setShow(true);
    if(!missingSN && !missingLB && !missingUB && !missingTF && !missingFormat && !boundaryError && !nameAlreadyTaken){
      putReq();
    }
  }

  // checks current input of signalname for duplication
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

  // ensures that lower boundary is not greater or equal to upper boundary
  // if greater or equal, sets a error flag to show errortext and prevent PUT-Request from being sent
  function checkBoundaries(){
    if(lowerBoundary == "" && upperBoundary == "") {
      setBoundaryError(false);

    } else if(Number(lowerBoundary) >= Number(upperBoundary)){
      setBoundaryError(true);

    } else {
      setBoundaryError(false);
    }
  }
  
  // declare state variables
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

  // useEffect hook triggers on lower or upper boundary change
  // calls method to check for a boundary error
  useEffect(() => {
    checkBoundaries();
  }, [lowerBoundary])

  useEffect(() => {
    checkBoundaries();
  }, [upperBoundary])

  // useEffect hook triggers on signalname change
  // calls method to validate name
  useEffect(() => {
    checkNameTaken();
  }, [signalName])

  // hook triggers on change of all state variables
  // calls checkField function
  useEffect(() => {
    checkField();
  }, [signalName, lowerBoundary, upperBoundary, transmissionFrequency, props.format])

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

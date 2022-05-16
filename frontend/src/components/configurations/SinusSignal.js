import React,{useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import { Stack, Grid } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { SignalButton } from "../SignalButton";
import { GenerateButton } from "../GenerateButton.js";
import { Typography } from "@mui/material";
import InputField from "./InputField.js"
import { Autocomplete } from "@mui/material";

export const SinusSignal = (props) => {

  const formatOptions = [
    {label: 'MQTT'},
    {label: 'Kafka'},
    {label: 'Websocket'}
  ];

  // update the states of each input
  const handleNameChange = e => {
    setSignalName(e.target.value)
  };

  const handleFRChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 10000000 && e.target.value >= 1 || e.target.value === "") {
      setFrequency(e.target.value)
    }
  };
  const handleAMChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 10000000 && e.target.value >= 1 || e.target.value === "") {
      setAmplitude(e.target.value)
    }
  };
  const handleTFChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 200 || e.target.value === "") {
      setTransmissionFrequency(e.target.value)
    }
  };
  function handleFormatChange(formatValue) {
    props.setFormat(formatValue);
  }

  function putReq() {
    var params={frequency,amplitude,transmissionFrequency}
    fetch('http://localhost:5000/api/' + props.format + '/sinus/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => props.setStreams(Array.from(data)))
    .catch(function() {
      console.log("Failed to create sinus signal!");
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
    setShow(true);
    if(!missingSN && !missingFre && !missingAmp && !missingTF && !missingFormat && !nameAlreadyTaken) {
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
  

  const [signalName, setSignalName] = useState('')
  const [frequency, setFrequency] = useState("")
  const [amplitude, setAmplitude] = useState("")
  const [transmissionFrequency, setTransmissionFrequency] = useState("")

  const [missingSN, setMissingSN] = useState(false);
  const [missingFre, setMissingFre] = useState(false);
  const [missingAmp, setMissingAmp] = useState(false);
  const [missingTF, setMissingTF] = useState(false); 
  const [missingFormat, setMissingFormat] = useState(false);
  const [nameAlreadyTaken, setNameAlreadyTaken] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    checkNameTaken();
  }, [signalName])

  useEffect(() => {
    checkField();
  }, [signalName, frequency, amplitude, transmissionFrequency, props.format])

  return (
    <Stack container spacing={'12px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>

                <InputField inputText={"signal name"} helpingText={nameAlreadyTaken ? "Name already in use!" : "Enter a name."} onChange={handleNameChange} missing={(show && missingSN)} error={nameAlreadyTaken} ></InputField>

                <InputField inputText={"frequency"} helpingText={"Enter a frequency. (1 - 10.000.000)"} onChange={handleFRChange} missing={(show && missingFre)} value={frequency} ></InputField>

                <InputField inputText={"amplitude"} helpingText={"Enter an amplitude. (1 - 10.000.000)"} onChange={handleAMChange} missing={(show && missingAmp)} value={amplitude} ></InputField>

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

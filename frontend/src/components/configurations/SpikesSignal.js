import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {Stack} from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from '../GenerateButton';
import { Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import InputField from "./InputField.js"



export const SpikesSignal = (props) => {

  const formatOptions = [
    {label: 'MQTT'},
    {label: 'Kafka'},
    {label: 'Websocket'}
  ];

  const handleNameChange = e => {
    setSignalName(e.target.value)
    checkField();
  };
  const handleBAChange = e => {
    setBase(e.target.value)
    checkField();
  };
  const handleDIChange = e => {
    setDistance(e.target.value)
    checkField();
  };
  const handleSIChange = e => {
    setSize(e.target.value)
    checkField();
  };
  const handlePRChange = e => {
    setPropability(e.target.value)
    checkField();
  };
  const handleTFChange = e => {
    setTransmissionFrequency(e.target.value)
    checkField();
  };

  function putReq() {
    
    var params={base,distance,size,propability,transmissionFrequency}
    fetch('http://localhost:5000/api/' + props.format + '/spiked/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => props.setStreams(Array.from(data)))
    .catch(function() {
      console.log("Failed to create spiked signal!");
    });
  };

  function checkField() {
    if(signalName == "") {
      setMissingSN(true);
    } else {
      setMissingSN(false);
    }

    if(base == "") {
      setMissingBa(true);
    } else {
      setMissingBa(false);
    }

    if(distance == "") {
      setMissingDi(true);
    } else {
      setMissingDi(false);
    }

    if(size == "") {
      setMissingSi(true);
    } else {
      setMissingSi(false);
    }

    if(propability == "") {
      setMissingPro(true);
    } else {
      setMissingPro(false);
    }

    if(transmissionFrequency == "") {
      setMissingTF(true);
    } else {
      setMissingTF(false);
    }
  }

  function checkAndSend() {
    checkField();
    if(!missingSN && !missingBa && !missingDi && !missingSi && !missingPro && !missingTF) {
      putReq();
    }
  }




  const [signalName, setSignalName] = useState('')
  const [base , setBase] = useState(0)
  const [distance, setDistance] = useState(0)
  const [size, setSize] = useState(0)
  const [propability, setPropability] = useState(0)
  const [transmissionFrequency, setTransmissionFrequency] = useState(0)

  const [missingSN, setMissingSN] = useState(false);
  const [missingBa, setMissingBa] = useState(false);
  const [missingDi, setMissingDi] = useState(false);
  const [missingSi, setMissingSi] = useState(false);
  const [missingPro, setMissingPro] = useState(false);
  const [missingTF, setMissingTF] = useState(false);

    return (
      <Stack container spacing={'12px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>

                  <InputField inputText={"signal name"} helpingText={"Enter a name."} onChange={handleNameChange} missing={missingSN} ></InputField>

                  <InputField inputText={"base"} helpingText={"Enter a base."} onChange={handleBAChange} missing={missingBa} ></InputField>

                  <InputField inputText={"distance"} helpingText={"Enter a distance."} onChange={handleDIChange} missing={missingDi} ></InputField>

                  <InputField inputText={"size"} helpingText={"Enter a size."} onChange={handleSIChange} missing={missingSi} ></InputField>

                  <InputField inputText={"probability"} helpingText={"Enter a probability."} onChange={handlePRChange} missing={missingPro} ></InputField>

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
                        onChange={(event, value) => props.setFormat(value.label.toLowerCase())}
                        renderInput={(params) => 
                          <Stack container spacing={'12px'}>
                            <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                                publisher:
                            </Typography>
                            <TextField {...params} size="small" label="" />
                          </Stack>
                        }
                  />    

                  <GenerateButton name={"Generate"} format ={props.format} setFormat = {props.setFormat} onClick={() => checkAndSend()} icon={<></>}/>
                </Stack>
    )
}

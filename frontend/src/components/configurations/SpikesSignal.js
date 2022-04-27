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
    if(checkNameTaken(e.target.value)){
      setNameAlreadyTaken(true);
      setMissingSN(true);
    } else {
      setNameAlreadyTaken(false);
      setMissingSN(false);
    }
    setSignalName(e.target.value)
  };
  const handleBAChange = e => {
    console.log("value: " + e.target.value.length)
    if(e.target.value === "-") {
      setBase(e.target.value)
    }
    if((/^\d(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 10000000 || e.target.value === "") {
      setBase(e.target.value)
    }
    if((/^-\d(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value >= -10000000 || e.target.value === "") {
      setBase(e.target.value)
    }
  };
  const handleDIChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 10000000 && e.target.value >= 1 || e.target.value === "") {
      setDistance(e.target.value)
    }
  };
  const handleSIChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 10000000 && e.target.value >= 1 || e.target.value === "") {
      setSize(e.target.value)
    }
  };
  const handlePRChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 1 || e.target.value === "") {
      setPropability(e.target.value)
    }
  };
  const handleTFChange = e => {
      if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value !== "0.00000" && e.target.value <= 200) {
        setTransmissionFrequency(e.target.value)
      }
  }

  function checkNameTaken(enteredName) {
    for (const stream of props.streams) {
      if(stream.name === enteredName) {
        return true;
      }
    }
  }


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

    if(props.format == "") {
      setMissingFormat(true);
    } else {
      setMissingFormat(false);
    }
  }

  function checkAndSend() {
    checkField();
    if(!missingSN && !missingBa && !missingDi && !missingSi && !missingPro && !missingTF && !missingFormat) {
      putReq();
    }
  }




  const [signalName, setSignalName] = useState('')
  const [base , setBase] = useState("")
  const [distance, setDistance] = useState("")
  const [size, setSize] = useState("")
  const [propability, setPropability] = useState("")
  const [transmissionFrequency, setTransmissionFrequency] = useState("")

  const [missingSN, setMissingSN] = useState(false);
  const [missingBa, setMissingBa] = useState(false);
  const [missingDi, setMissingDi] = useState(false);
  const [missingSi, setMissingSi] = useState(false);
  const [missingPro, setMissingPro] = useState(false);
  const [missingTF, setMissingTF] = useState(false); 
  const [missingFormat, setMissingFormat] = useState(false);
  const [nameAlreadyTaken, setNameAlreadyTaken] = useState(false);

    return (
      <Stack container spacing={'12px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>

                  <InputField inputText={"signal name"} helpingText={"Enter a name."} onChange={handleNameChange} missing={missingSN} ></InputField>

                  <InputField inputText={"base"} helpingText={"Enter a base."} onChange={handleBAChange} missing={missingBa} value={base}></InputField>

                  <InputField inputText={"distance"} helpingText={"Enter a distance."} onChange={handleDIChange} missing={missingDi} value={distance} ></InputField>

                  <InputField inputText={"size"} helpingText={"Enter a size."} onChange={handleSIChange} missing={missingSi} value={size} ></InputField>

                  <InputField inputText={"probability"} helpingText={"Enter a probability."} onChange={handlePRChange} missing={missingPro} value={propability} ></InputField>

                  <InputField inputText={"transmission frequency"} helpingText={"Enter a transmission frequency. (0.1 - 200)"} onChange={handleTFChange} missing={missingTF} value={transmissionFrequency} ></InputField>

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

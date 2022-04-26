import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { GenerateButton } from '../GenerateButton';
import { Typography } from "@mui/material";
import InputField from "./InputField.js"
import { Autocomplete } from "@mui/material";

export const NormallyDistributed = (props) => {

  const formatOptions = [
    {label: 'MQTT'},
    {label: 'Kafka'},
    {label: 'Websocket'}
  ];

  const handleNameChange = e => {
    setSignalName(e.target.value)
    checkField();
  };
  const handleCEChange = e => {
    console.log("value: " + e.target.value.length)
    if(e.target.value === "-") {
      setCenter(e.target.value)
    }
    if( e.target.value <= 10000000 && e.target.value >= -1000000 || e.target.value === "") {
      setCenter(e.target.value)
    }
  };
  const handleSCChange = e => {
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value <= 10000000  && e.target.value >= 1 || e.target.value === "") {
      setScale(e.target.value)
    }
  };
  const handleTFChange = e => { 
    if((/^\d*(.([1,2,3,4,5,6,7,8,9]\d{0,4})?)?$/.test(e.target.value)) && e.target.value !== "0.00000" && e.target.value <= 200) {
      setTransmissionFrequency(e.target.value)
    }
  }


  function putReq() {
    var params={center,scale,transmissionFrequency}
    fetch('http://localhost:5000/api/' + props.format + '/emphasized/' + signalName + '/', {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(dataJSON => JSON.parse(dataJSON))
    .then(data => props.setStreams(Array.from(data)))
    .catch(function() {
      console.log("Failed to create normally distributed signal!");
    });
  };

  function checkField() {
    if(signalName == "") {
      setMissingSN(true);
    } else {
      setMissingSN(false);
    }

    if(center == "") {
      setMissingCe(true);
    } else {
      setMissingCe(false);
    }

    if(scale == "") {
      setMissingSc(true);
    } else {
      setMissingSc(false);
    }

    if(transmissionFrequency == "") {
      setMissingTF(true);
    } else {
      setMissingTF(false);
    }
  }

  function checkAndSend() {
    checkField();
    if(!missingSN && !missingCe && !missingSc && !missingTF && !missingFormat) {
      putReq();
    }

    if(props.format == "") {
      setMissingFormat(true);
    } else {
      setMissingFormat(false);
    }
  }

  const [signalName, setSignalName] = useState('')
  const [center , setCenter] = useState("")
  const [scale, setScale] = useState("")
  const [transmissionFrequency, setTransmissionFrequency] = useState("")

  const [missingSN, setMissingSN] = useState(false);
  const [missingCe, setMissingCe] = useState(false);
  const [missingSc, setMissingSc] = useState(false);
  const [missingTF, setMissingTF] = useState(false); 
  const [missingFormat, setMissingFormat] = useState(false);

    return (
      <Stack container spacing={'12px'} direction="column" alignItems="left" justifyContent="center" sx={{width: '88%'}}>
                  <InputField inputText={"signal name"} helpingText={"Enter a name."} onChange={handleNameChange} missing={missingSN} ></InputField>

                  <InputField inputText={"expected value"} helpingText={"Enter an expected value."} onChange={handleCEChange} missing={missingCe} value={center} ></InputField>

                  <InputField inputText={"standard deviation"} helpingText={"Enter a standard deviation."} onChange={handleSCChange} missing={missingSc} value={scale} ></InputField>

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
                        //onChange={(event, value) => props.setFormat(value.label.toLowerCase())}
                        onInputChange={(event, inputValue) => props.setFormat(inputValue.toLowerCase())}
                        renderInput={(params) => 
                          <Stack container spacing={'12px'}>
                            <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                                publisher:
                            </Typography>
                            <TextField {...params} size="small" fullWidth helperText={missingFormat ? "Choose a publisher." : ""}  />
                          </Stack>
                        }
                  />    
                  <GenerateButton name={"Generate"} format ={props.format} setFormat = {props.setFormat} onClick={() => checkAndSend()} icon={<></>}/>
      </Stack>
                
    )
}

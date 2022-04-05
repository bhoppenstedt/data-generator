import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { Autocomplete, Card, Divider, TextField } from "@mui/material";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { CosinusSignal } from "./configurations/CosinusSignal";
import { NormallyDistributed } from "./configurations/NormallyDistributed";
import { RandomSignal } from "./configurations/RandomSignal";
import { SinusSignal } from "./configurations/SinusSignal";
import { SpikesSignal } from "./configurations/SpikesSignal";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { SignalButton } from "./SignalButton";

function SignalScreen ({streams, setStreams, format, setFormat}) {
    const [currentSignalType, setCurrentSignalType] = useState('random')
    const [value] = useState("");

    function patchReq(streamType, streamName) {
        fetch('/api/'+ streamType + '/' + streamName + '/', {
            method: "PATCH",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json));
    }

    function deleteReq(streamType, streamName) {
        fetch('/api/'+ streamType + '/' + streamName + '/', {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json));
    }
    

    return (
        <Card variant= "outlined" sx={{bgcolor: 'background.paper', border: 3, borderColor: '#A1A5F9',height:"85vh", marginLeft: "8vw", marginRight: "1vw", boxShadow: '3px 3px 10px 1px rgba(0, 0, 0, 0.16)'}}>
            <Grid container height= "100%">
                <Grid item xs={6}>
                    <Stack container spacing={'15px'} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "700",fontSize: 24, color: '#3F0092', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            signal type
                        </Typography>

                            <SignalButton  name={"RANDOM SIGNAL"} selected={currentSignalType == 'random'} onClick={() => setCurrentSignalType('random')}/>

                            <SignalButton  name={"SINUS SIGNAL"} selected={currentSignalType == 'sinus'} onClick={() => setCurrentSignalType('sinus')}/>

                            <SignalButton  name={"COSINUS SIGNAL"} selected={currentSignalType == 'cosinus'} onClick={() => setCurrentSignalType('cosinus')}/>

                            <SignalButton  name={"SPIKED SIGNAL"} selected={currentSignalType == 'spiked'} onClick={() => setCurrentSignalType('spiked')}/>

                            <SignalButton  name={"NORM. DIST. SIGNAL"} selected={currentSignalType == 'emphasized'} onClick={() => setCurrentSignalType('emphasized')}/>

                    </Stack>
                </Grid>

                <Grid>
                <Divider fullWodth orientation="vertical" flexItem style={{marginLeft:"-2px",marginRight:"-2px", marginTop: "10px", height:"97.5%", width: "2px", color: "rgba(161,165,249,1)", opacity: "100%", align:"center"}} />
                </Grid>

                <Grid item xs={6}>
                    <Stack container spacing={'10px'} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "700",fontSize: 24, color: '#3F0092', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            signal configuration
                        </Typography>
                    
                        {currentSignalType === 'random' ? (<RandomSignal format ={format} setFormat = {setFormat} streams={streams} setStreams={setStreams} handleChange={(e) => {}} numberformat={value.numberformat}/>)
                            : currentSignalType === 'sinus' ? <SinusSignal format ={format} setFormat = {setFormat} streams={streams} setStreams={setStreams} handleChange={(e) => {}} numberformat={value.numberformat}/>
                            : currentSignalType === 'cosinus' ? <CosinusSignal format ={format} setFormat = {setFormat} streams={streams} setStreams={setStreams} handleChange={(e) => {}} numberformat={value.numberformat}/>
                            : currentSignalType === 'spiked' ? <SpikesSignal format ={format} setFormat = {setFormat} streams={streams} setStreams={setStreams} handleChange={(e) => {}} numberformat={value.numberformat}/>
                            : currentSignalType === 'emphasized' ? <NormallyDistributed format ={format} setFormat = {setFormat} streams={streams} setStreams={setStreams} handleChange={(e) => {}} numberformat={value.numberformat}/>
                            : null }
                        
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SignalScreen;
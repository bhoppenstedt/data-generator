import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { Card, Divider } from "@mui/material";
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

const SignalScreen = () => {
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
            <Grid container>
                <Grid item xs={6}>
                    <Stack container spacing={'15px'} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "700",fontSize: 24, color: '#3F0092', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            signal type
                        </Typography>

                            <SignalButton  name={"RANDOM SIGNAL"} onClick={() => setCurrentSignalType('random')}/>

                            <SignalButton  name={"SINUS SIGNAL"} onClick={() => setCurrentSignalType('sinus')}/>

                            <SignalButton  name={"COSINUS SIGNAL"} onClick={() => setCurrentSignalType('cosinus')}/>

                            <SignalButton  name={"SPIKED SIGNAL"} onClick={() => setCurrentSignalType('spiked')}/>

                            <SignalButton  name={"NORM. DIST. SIGNAL"} onClick={() => setCurrentSignalType('emphasized')}/>

                    </Stack>
                </Grid>

                
                <Divider orientation="vertical" flexItem style={{marginLeft:"-2px",marginLeft:"-2px", marginTop: "10px", width: "2px", height: "770px", color: "rgba(161,165,249,1)", opacity: "100%", align:"center"}} />
                

                <Grid item xs={6}>
                    <Stack container spacing={'10px'} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "700",fontSize: 24, color: '#3F0092', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            signal configuration
                        </Typography>
                    
                        {currentSignalType === 'random' ? (<RandomSignal handleChange={(e) => {}} numberformat={value.numberformat}/>)
                            : currentSignalType === 'sinus' ? <SinusSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                            : currentSignalType === 'cosinus' ? <CosinusSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                            : currentSignalType === 'spiked' ? <SpikesSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                            : currentSignalType === 'emphasized' ? <NormallyDistributed handleChange={(e) => {}} numberformat={value.numberformat}/>
                            : null }
                        
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SignalScreen;
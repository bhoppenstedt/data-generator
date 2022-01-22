import {Card, Divider} from "@mui/material";
import React from "react"
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {purple} from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import {SignalButton} from "./SignalButton";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import {RandomSignal} from "./configurations/RandomSignal";
import {SinusSignal} from "./configurations/SinusSignal";
import {CosinusSignal} from "./configurations/CosinusSignal";
import {SpikesSignal} from "./configurations/SpikesSignal";
import {NormallyDistributed} from "./configurations/NormallyDistributed";
import { borderLeft, color } from "@mui/system";
import { useState } from "react";

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
                        <Typography component="div" sx={{ fontSize: 25, fontWeight: "bold", color: purple[900], marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            signal type
                        </Typography>

                        <SignalButton name={"Random signal"} onClick={() => setCurrentSignalType('random')}  icon={<CasinoOutlinedIcon sx={{ fontSize: 20, fontFamily: '"Roboto", sans-serif'}} />}/>

                        <SignalButton name={"Sinus signal"} onClick={() => setCurrentSignalType('sinus')}  icon={<CasinoOutlinedIcon sx={{ fontSize: 50}} />}/>

                        <SignalButton name={"Cosinus signal"} onClick={() => setCurrentSignalType('cosinus')}  icon={<AutoGraphOutlinedIcon sx={{ fontSize: 50}}/>}/>

                        <SignalButton name={"Spiked signal"} onClick={() => setCurrentSignalType('spiked')}  icon={<AutoGraphOutlinedIcon sx={{ fontSize: 50}} />}/>

                        <SignalButton name={"Normally distributed signal"} onClick={() => setCurrentSignalType('emphasized')}  icon={<TimelineOutlinedIcon sx={{ fontSize: 30}} />}/>

                    </Stack>
                </Grid>

                <Divider orientation="vertical" flexItem style={{marginRight:"-1px", marginLeft:"-4px", marginTop: "10px", width: "2px", height: "770px", color: "rgba(161,165,249,1)", opacity: "100%"}} />

                <Grid item xs={6}>
                    <Stack container spacing={4} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" sx={{ fontSize: 25, fontWeight: "bold", color: purple[900], marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            signal configuration
                        </Typography>
                        {currentSignalType == 'random' ? (<RandomSignal handleChange={(e) => {}} numberformat={value.numberformat}/>)
                            : currentSignalType == 'sinus' ? <SinusSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                : currentSignalType == 'cosinus' ? <CosinusSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                    : currentSignalType == 'spiked' ? <SpikesSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                        : currentSignalType == 'emphasized' ? <NormallyDistributed handleChange={(e) => {}} numberformat={value.numberformat}/>
                                            : null }
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SignalScreen;
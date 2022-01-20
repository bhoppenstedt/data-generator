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
import axios from 'axios'

const SignalScreen = () => {
    const [showrs, setShowRS] = React.useState(true);
    const [showss, setShowSS] = React.useState(true);
    const [showcs, setShowCS] = React.useState(true);
    const [showsws, setShowSWS] = React.useState(true);
    const [showns, setShowNS] = React.useState(true);
    const [value] = React.useState("");

    const setConfig = (current) => {
        setShowCS(false)
        setShowNS(false)
        setShowRS(false)
        setShowSS(false)
        setShowSWS(false)
        current(true)
    }

    var dataStreams = [
        "test1","test2","test3","test4","test5","test6"
    ]

    var currentSignalType

    function putReq(streamType, streamName, params) {
        
          fetch('/api/'+ streamType + '/' + streamName + '/', {
            method: "PUT",
            body: JSON.stringify(params),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json()) 
          .then(json => console.log(json));
    };
    
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
    
    function changeCurrentSignal(type){
        console.log(type)
        currentSignalType = type
        console.log(currentSignalType)
    }

    return (
        <Card variant= "outlined" sx={{bgcolor: 'background.paper', border: 3, borderColor: '#A1A5F9',height:"85vh", marginLeft: "8vw", marginRight: "1vw", boxShadow: '3px 3px 10px 1px rgba(0, 0, 0, 0.16)'}}>
            <Grid container>
                <Grid item xs={6}>
                    <Stack container spacing={'15px'} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" sx={{ fontSize: 25, fontWeight: "bold", color: purple[900], marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            signal type
                        </Typography>

                        <SignalButton name={"Random signal"} onClick={() => setConfig(setShowRS), changeCurrentSignal("random")}  icon={<CasinoOutlinedIcon sx={{ fontSize: 20, fontFamily: '"Roboto", sans-serif'}} />}/>

                        <SignalButton name={"Sinus signal"} onClick={() => setConfig(setShowSS), changeCurrentSignal("sinus")}  icon={<CasinoOutlinedIcon sx={{ fontSize: 50}} />}/>

                        <SignalButton name={"Cosinus signal"} onClick={() => setConfig(setShowCS), changeCurrentSignal("cosinus")}  icon={<AutoGraphOutlinedIcon sx={{ fontSize: 50}}/>}/>

                        <SignalButton name={"Spiked signal"} onClick={() => setConfig(setShowSWS), changeCurrentSignal("spiked")}  icon={<AutoGraphOutlinedIcon sx={{ fontSize: 50}} />}/>

                        <SignalButton name={"Normally distributed signal"} onClick={() => setConfig(setShowNS), changeCurrentSignal("emphasized")}  icon={<TimelineOutlinedIcon sx={{ fontSize: 30}} />}/>

                    </Stack>
                </Grid>

                <Divider orientation="vertical" flexItem style={{marginRight:"-1px", marginLeft:"-4px", marginTop: "10px", width: "2px", height: "770px", color: "rgba(161,165,249,1)", opacity: "100%"}} />

                <Grid item xs={6}>
                    <Stack container spacing={4} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" sx={{ fontSize: 25, fontWeight: "bold", color: purple[900], marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            signal configuration
                        </Typography>
                        {showrs ? (<RandomSignal handleChange={(e) => {}} numberformat={value.numberformat}/>)
                            : showss ? <SinusSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                : showcs ? <CosinusSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                    : showsws ? <SpikesSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                        : showns ? <NormallyDistributed handleChange={(e) => {}} numberformat={value.numberformat}/>
                                            : null }
                        <SignalButton name={"Generate"} onClick={() => putReq(currentSignalType,"kevin",{lowerBoundary:1, upperBoundary:10, transmissionFrequency:1})} icon={<></>}/>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SignalScreen;
import React from 'react'
import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Header from "./components/Header";
import Output from "./components/Output";
import SignalScreen from "./components/SignalScreen";
import { useState } from 'react';

var startArray = [];
var streamsServer = JSON.stringify(fetch('/api/signals/')
                        .then(res => res.json())
                        .then(dataJSON => JSON.parse(dataJSON))
                        .then(data => startArray = Array.from(data))
                        .then(() => console.log(startArray)));

const empty= [
    {
        "lowerBoundary": "-",
        "upperBoundary": "-",
        "transmissionFrequency": "-",
        "type": "-",
        "running": false,
        "name": "no signal running"
    }
]

const Main = (props) => {
    const theme = useTheme();
    const colorMode = React.useContext(props.ColorModeContext);

    const [streams, setStreams] = useState([]);

    return (
        <Grid container={true} >
            <Grid item xs ={12}>
                <Header title="Data generator"/>
            </Grid>
            <Grid item xs ={1}/>
            <Grid item xs ={5} sx={{pt:"26px"}}>
                <SignalScreen streams={streams} setStreams={setStreams}/>
            </Grid>
            <Grid item xs ={5} sx={{pt:"26px"}}>
                <Output streams={streams} setStreams={setStreams}/>
            </Grid>
            <Grid item xs ={1}/>
        </Grid>
    )
}

export default Main;
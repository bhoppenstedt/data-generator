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
                        .then(data => startArray = Array.from(data)));

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

    const [streams, setStreams] = useState([]);
    const [format , setFormat] = useState('MQTT');

    function updateArray() {
        var fetchArray = JSON.stringify(fetch('http://localhost:5000/api/signals/')
                            .then(res => res.json())
                            .then(dataJSON => JSON.parse(dataJSON))
                            .then(data => setStreams(Array.from(data))));
    }

    return (
        <Grid container={true} >
            <Grid item xs ={12}>
                <Header title="Data generator"/>
            </Grid>
            <Grid item xs ={1}/>
            <Grid item xs ={5} sx={{pt:"26px"}}>
                <SignalScreen streams={streams} setStreams={setStreams} format ={format} setFormat = {setFormat}/>
            </Grid>
            <Grid item xs ={5} sx={{pt:"26px"}}>
                <Output streams={streams} setStreams={setStreams}/>
            </Grid>
            <Grid item xs ={1}/>
        </Grid>
    )
}

export default Main;
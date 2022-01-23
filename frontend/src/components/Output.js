import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import {purple} from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import {IconButton} from "@mui/material";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import StreamBoxElem from "./StreamBoxElem.js"

var array = [];
const streamsServer = JSON.stringify(fetch('/api/signals/')
                        .then(res => res.json())
                        .then(dataJSON => JSON.parse(dataJSON))
                        .then(data => array = Array.from(data))
                        .then(() => console.log(array)));


const streams2= [
    {
        "lowerBoundary": 2,
        "upperBoundary": 55,
        "transmissionFrequency": 6.0,
        "type": "random",
        "running": true,
        "name": "test1"
    },
    {
        "lowerBoundary": 2,
        "upperBoundary": 55,
        "transmissionFrequency": 6.0,
        "type": "random",
        "running": true,
        "name": "test1"
    },
    {
        "lowerBoundary": 2,
        "upperBoundary": 55,
        "transmissionFrequency": 6.0,
        "type": "random",
        "running": true,
        "name": "test1"
    },
    {
        "lowerBoundary": 2,
        "upperBoundary": 55,
        "transmissionFrequency": 6.0,
        "type": "random",
        "running": true,
        "name": "test1"
    },
    {
        "lowerBoundary": 2,
        "upperBoundary": 55,
        "transmissionFrequency": 6.0,
        "type": "random",
        "running": true,
        "name": "test1"
    },
    {
        "lowerBoundary": 2,
        "upperBoundary": 55,
        "transmissionFrequency": 6.0,
        "type": "random",
        "running": true,
        "name": "test1"
    },
    {
        "lowerBoundary": 2,
        "upperBoundary": 55,
        "transmissionFrequency": 6.0,
        "type": "random",
        "running": true,
        "name": "test1"
    },
    
]

const Output = () => {
    
    const [streams, setStreams] = useState(streams2);

    const streamElements = streams.map((stream) => 
    <StreamBoxElem name={stream.name} type={stream.type} argument1={stream.lowerBoundary} argument2={stream.upperBoundary} argument3={stream.transmissionFrequency} runningState={stream.running}/>);

    return (
            <Card variant="outlined" sx={{bgcolor: 'background.paper', border: 3, borderColor: '#A1A5F9', marginLeft: "1vw", marginRight: "8vw", height: "85vh", boxShadow: '3px 3px 10px 1px rgba(0, 0, 0, 0.16)'}}>
                <Grid container direction="column" wrap="nowrap" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography component="div" sx={{ fontSize: 25, fontWeight: "bold", color: '#3F0092', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            datastreams
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sx={{width: "100%"}}>
                        <Grid height="100%" container direction="row" justifyContent="space-evenly" alignItems="center">
                            <Grid item xs={6} justifyContent="left" alignItems="left">
                                <Typography component="div" variant="h5" sx={{ fontSize: 20,fontFamily: 'Open Sans, sans-serif', fontWeight: "600",fontSize: 20, color: purple[900], margin: "10px" }} align={"left"}>
                                    active streams:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={0} justifyContent="right" alignItems="center">
                                        <Typography component="div" variant="h5" sx={{ fontSize: 20,fontFamily: 'Open Sans, sans-serif', fontWeight: "600",fontSize: 20, color: purple[900]}} align={"right"}>
                                            start all
                                        </Typography>
                                        <IconButton onClick={ () => setStreams(array)}>
                                            <PlayCircleOutlineOutlinedIcon
                                                sx={{ fontSize: 30, color: purple[900] }}
                                            />
                                        </IconButton>
                                        
                                        <Typography component="div" variant="h5" sx={{ fontSize: 20,fontFamily: 'Open Sans, sans-serif', fontWeight: "600",fontSize: 20, color: purple[900]}} align={"right"}>
                                            stop all
                                        </Typography>
                                        <IconButton>
                                            <StopCircleOutlinedIcon
                                                sx={{ fontSize: 30, color:purple[900] }}
                                            />
                                        </IconButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{width: "96%", overflowY:"scroll"}}>
    
                        {streamElements}

                    </Grid>

                </Grid>
            </Card>

    )
}

export default Output;
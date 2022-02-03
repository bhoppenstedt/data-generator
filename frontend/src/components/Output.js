import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import './Output.css';
import Typography from "@mui/material/Typography";
import {purple} from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import {IconButton} from "@mui/material";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import StreamBoxElem from "./StreamBoxElem.js"

function Output ({streams, setStreams}) {

    function updateArray() {
        var fetchArray = JSON.stringify(fetch('http://localhost:5000/api/signals/')
                            .then(res => res.json())
                            .then(dataJSON => JSON.parse(dataJSON))
                            .then(data => setStreams(Array.from(data))));
    }

    const streamElements = streams.map((stream) => 
    <StreamBoxElem name={stream.name} type={stream.type} argument1={stream.lowerBoundary} argument2={stream.upperBoundary} argument3={stream.transmissionFrequency} runningState={stream.running}/>);

    return (
            <Card variant="outlined" sx={{bgcolor: 'background.paper', border: 3, borderColor: '#A1A5F9', marginLeft: "1vw", marginRight: "8vw", height: "85vh", boxShadow: '3px 3px 10px 1px rgba(0, 0, 0, 0.16)'}}>
                <Grid height="87%" container  justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography align="center" component="div" sx={{ fontFamily:'Open Sans, sans-serif', fontSize: 25, fontWeight: "700", color: '#3F0092', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            datastreams
                        </Typography>
                    </Grid>
                    
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center" item xs={12} sx={{width: "100%"}}>

                            <Grid item xs={6} justifyContent="left" alignItems="left">
                                <Typography component="div" variant="h5" sx={{ fontSize: 20,fontFamily: 'Open Sans, sans-serif', fontWeight: "600",fontSize: 20, color: purple[900], margin: "10px" }} align={"left"}>
                                    active streams: {(streams.filter((stream) => stream.running == true)).length} / {streams.length}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack direction="row" spacing={0} justifyContent="right" alignItems="center">
                                        <Typography component="div" variant="h5" sx={{ fontSize: 20,fontFamily: 'Open Sans, sans-serif', fontWeight: "600",fontSize: 20, color: purple[900]}} align={"right"}>
                                            start all
                                        </Typography>
                                        <IconButton onClick={ () => updateArray()}>
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
                    <Grid height="100%" item xs={12} sx={{overflowY:"auto"}}>
                        <Paper alignItems="center" sx={{paddingLeft:"12px", paddingRight:"12px", width: "100%", boxShadow:"0px 0px 0px 0px rgba(0, 0, 0, 0)"}}>
                            {streamElements}
                        </Paper>
                    </Grid>
                </Grid>
            </Card>

    )
}

export default Output;
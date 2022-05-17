import React from 'react'
import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Header from "./components/Header";
import Output from "./components/Output";
import SignalScreen from "./components/SignalScreen";
import { useState } from 'react';

// Basic structure of the app 
// Header, signal configuration and datastream list
const Main = (props) => {

    // "streams" will contain all datastreams received from backend
    // "format" stores current selected publisher
    //  both passed as prop to child elements
    const [streams, setStreams] = useState([]);
    const [format, setFormat] = useState("");
    
    return (
        <Grid container={true} >

            <Grid item xs ={12}>
                <Header title="Data generator"/>
            </Grid>

            <Grid item xs ={0} xl = {1}/>

            <Grid item xs ={6} xl = {5} sx={{pt:"26px"}}>
                <SignalScreen streams={streams} setStreams={setStreams} format ={format} setFormat = {setFormat}/>
            </Grid>

            <Grid item xs ={6} xl = {5} sx={{pt:"26px"}}>
                <Output streams={streams} setStreams={setStreams}/>
            </Grid>

            <Grid item xs ={0} xl = {1}/>
            
        </Grid>
    )
}

export default Main;
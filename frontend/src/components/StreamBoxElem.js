import {Card, Divider} from "@mui/material";
import React from "react"
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { color } from "@mui/system";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';





const StreamBoxElem = ({name, type, argument1, argument2, argument3, runningState}) => {

    function patchReq(streamType, streamName) {
        fetch('http://localhost:5000/api/'+ streamType + '/' + streamName + '/', {
            method: "PATCH",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json));
    }



return (

<Card sx={{ height: "100px", background: 'linear-gradient( to bottom, rgba(255,255,255,0.5), rgba(232,232,232,1))', boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, .16)', marginBottom: "10px"}}>
    <CardContent>
        <Grid container item xs={12} container direction="row">
            <Grid item xs={10}>
                <Grid container item xs={12} container direction="row">
                    <Grid item xs={12}>
                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 20, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.6)" } gutterBottom>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.4)" }>
                            signaltype: {type}
                        </Typography>

                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.4)" }>
                            lower boundary: {argument1}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.4)" }>
                            upper boundary: {argument2}
                        </Typography>

                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.4)" }>
                            transmission frequency: {argument3}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Stack direction="column" alignItems={"center"}>
                    <Typography sx={{ fontSize: 15,fontWeight: "600",  color: runningState ? "#5FA500" : "#9D9D9D", lineHeight: "normal"}}>
                        {runningState ? "Running" : "Stopped"}
                    </Typography>
                    <IconButton onClick={() => patchReq(type, name)}>
                        {runningState ? <StopIcon sx={{ fontSize: 25, color:'#3F0092' }}/> : <PlayArrowIcon sx={{fontSize: 25, color:'#5FA500' }}/>}
                    </IconButton>
                </Stack>
            </Grid>
        </Grid>
    </CardContent>
</Card>
        
);
}



export default StreamBoxElem;
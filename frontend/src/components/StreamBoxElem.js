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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';




const StreamBoxElem = ({name, type, argument1, argument2, argument3, runningState, streams, setStreams}) => {

    function updateArray() {
        var fetchArray = JSON.stringify(fetch('http://localhost:5000/api/signals/')
                            .then(res => res.json())
                            .then(dataJSON => JSON.parse(dataJSON))
                            .then(data => setStreams(Array.from(data))));
    }

    function patchReq(streamType, streamName) {
        fetch('http://localhost:5000/api/'+ streamType + '/' + streamName + '/', {
            method: "PATCH",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res => res.json())
        .then(dataJSON => JSON.parse(dataJSON))
        .then(data => setStreams(Array.from(data)));

  };

    function deleteReq(streamType, streamName) {
        fetch('http://localhost:5000/api/'+ streamType + '/' + streamName + '/', {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res => res.json())
        .then(dataJSON => JSON.parse(dataJSON))
        .then(data => setStreams(Array.from(data))
        .then(log => console.log(log)));
        
  };


return (

<Card sx={{ height: "100px", background: 'linear-gradient( to bottom, rgba(255,255,255,0.5), rgba(232,232,232,1))', boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, .16)', marginBottom: "10px", paddingX:"14px", paddingY:"2px"}}>
    
        <Grid container item xs={12} container direction="row">
            <Grid item xs={10}>
                <Grid container item xs={12} container direction="row">
                    <Grid item xs={12}>
                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 20, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.6)" }>
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

                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.4)" }>
                            placeholder: {argument1}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.4)" }>
                            upper boundary: {argument2}
                        </Typography>

                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.4)" }>
                            transmission frequency: {argument3}
                        </Typography>

                        <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }} color={runningState ? "rgba(1,1,1,1)" : "rgba(1,1,1,0.4)" }>
                            placeholder: {argument1}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Stack direction="column" alignItems={"center"} marginTop="20%">
                    <Typography sx={{ fontSize: 15, fontWeight: "600",  color: runningState ? "#5FA500" : "#9D9D9D", lineHeight: "normal"}}>
                        {runningState ? "running.." : "stopped"}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        <IconButton size="small" onClick={() => patchReq(type, name)}>
                            {runningState ? <StopIcon sx={{ fontSize: 25, color:'#3F0092' }}/> : <PlayArrowRoundedIcon sx={{fontSize: 25, color:'#5FA500' }}/>}
                        </IconButton>
                        <IconButton size="small" onClick={() => deleteReq(type, name)}>
                            <DeleteForeverIcon></DeleteForeverIcon>
                        </IconButton>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    
</Card>
        
);
}



export default StreamBoxElem;
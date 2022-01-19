import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {purple} from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import {Container, IconButton} from "@mui/material";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import StreamBoxElem from "./StreamBoxElem";

const Output = () => {

    useEffect(() => {
        fetch('/api/signals/')
        //fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            const obj = JSON.parse(data);
            console.log(obj);
            console.log(Object.values(obj));
            
        })
    }, []);
    

    return (
            <Card variant="outlined" sx={{bgcolor: 'background.paper', border: 3, borderColor: '#A1A5F9', marginLeft: "1vw", marginRight: "8vw", height: "85vh", boxShadow: '3px 3px 10px 1px rgba(0, 0, 0, 0.16)'}}>
                <Grid container direction="column" wrap="nowrap" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography component="div" sx={{ fontSize: 25, fontWeight: "bold", color: purple[900], marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                            datastreams
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sx={{width: "100%"}}>
                        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                            <Grid item xs={6} justifyContent="left" alignItems="left">
                                <Typography component="div" variant="h5" sx={{ fontSize: 20, fontWeight: "bold", color: purple[900], margin: "10px" }} align={"left"}>
                                    active streams:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={0} justifyContent="right" alignItems="center">
                                        <Typography component="div" variant="h5" sx={{  fontSize: 20, fontWeight: "bold", color: purple[900], marginRight:"0px" }} align={"right"}>
                                            start all
                                        </Typography>
                                        <IconButton>
                                            <PlayCircleOutlineOutlinedIcon
                                                sx={{ fontSize: 30, color: purple[900] }}
                                            />
                                        </IconButton>
                                        
                                        <Typography component="div" variant="h5" sx={{  fontSize: 20, fontWeight: "bold", color:purple[900], marginRight:"0px" }} align={"right"}>
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
                    <Grid item xs={12} sx={{width: "100%"}}>
                        <Card sx={{height: "85%", width: "95%", overflowY: "scroll"}} >
                            
                            

                        </Card>
                    </Grid>

                </Grid>
            </Card>

    )
}

export default Output;
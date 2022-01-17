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
import React from "react";

const Output = () => {
    return (
            <Card variant="outlined" sx={{bgcolor: 'background.paper', border: 3, borderColor: '#A1A5F9', marginLeft: "1vw", marginRight: "8vw", height: "85vh", boxShadow: '3px 3px 10px 1px rgba(0, 0, 0, 0.16)'}}>
                <Grid container direction="column" wrap="nowrap" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography component="div" variant="h5" sx={{ color: purple[900], pt:"10px" }}>
                            datastreams
                        </Typography>
                    </Grid>
                    <Divider flexItem />
                    <Grid item xs={12} sx={{width: "100%", paddingTop: "10px"}}>
                        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                            <Grid item xs={4} justifyContent="center" alignItems="center">
                                <Typography component="div" variant="h5" sx={{ color: purple[900] }} align={"center"}>
                                    active streams:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                        <Typography component="div" variant="h5" sx={{ color: purple[900] }}>
                                            Play all:
                                        </Typography>
                                        <IconButton>
                                            <PlayCircleOutlineOutlinedIcon
                                                sx={{ fontSize: 30, color: purple[900] }}
                                            />
                                        </IconButton>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                        <Typography component="div" variant="h5" sx={{ color:purple[900] }} align={"right"}>
                                            Stop all:
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
                </Grid>

                {(
                    <Card sx={{ minWidth: 15 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 20, minWidth: 250 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Data stream name
                            </Typography>
                            <Typography variant="body2">Signal : Name</Typography>
                            <Typography variant="body2">
                                Output format: Format
                            </Typography>
                            <Typography
                                sx={{ fontSize: 20 }}
                                variant="body2"
                            >
                                Running........
                            </Typography>
                        </CardContent>
                    </Card>
                ) }

                {(
                    <Card sx={{ minWidth: 15 }}>
                        <CardContent>
                            <Typography
                                sx={{fontSize: 20, minWidth: 250 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Data stream name
                            </Typography>
                            <Typography variant="body2">Signal : Name</Typography>
                            <Typography variant="body2">
                                Output format: Format
                            </Typography>
                            <Typography
                                sx={{fontSize: 20 }}
                                variant="body2"
                            >
                                Running........
                            </Typography>
                        </CardContent>
                    </Card>
                ) }
            </Card>

    )
}

export default Output;
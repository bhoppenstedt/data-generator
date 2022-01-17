import {Card} from "@mui/material";
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

    return (
        <Card variant= "outlined" sx={{bgcolor: 'background.paper', border: 3, borderColor: '#A1A5F9',height:"85vh", marginLeft: "8vw", marginRight: "1vw", boxShadow: '3px 3px 10px 1px rgba(0, 0, 0, 0.16)'}}>
            <Grid container>
                <Grid item xs={6}>
                    <Stack container spacing={6} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" variant="h5" sx={{ color: purple[900], marginTop:"1vw" }}>
                            signal Type
                        </Typography>

                        <SignalButton name={"Random signal"} onClick={() => setConfig(setShowRS)} icon={<CasinoOutlinedIcon sx={{ fontSize: 50, color: purple[900] }} />}/>

                        <SignalButton name={"Sinus Signal"} onClick={() => setConfig(setShowSS)} icon={<CasinoOutlinedIcon sx={{ fontSize: 50, color: purple[900] }} />}/>

                        <SignalButton name={"Cosinus Signal"} onClick={() => setConfig(setShowCS)} icon={<AutoGraphOutlinedIcon sx={{ fontSize: 50, color: purple[900]}}/>}/>

                        <SignalButton name={"Signal with spikes"} onClick={() => setConfig(setShowSWS)} icon={<AutoGraphOutlinedIcon sx={{ fontSize: 50, color: purple[900]}} />}/>

                        <SignalButton name={"Normally distributed signal"} onClick={() => setConfig(setShowNS)} icon={<TimelineOutlinedIcon sx={{ fontSize: 50, color: purple[900] }} />}/>

                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack container spacing={4} direction="column" alignItems="center" justifyContent="center">
                        <Typography component="div" variant="h5" sx={{ color: purple[900],marginTop:"1vw" }}>
                            signal configuration
                        </Typography>
                        {showrs ? (<RandomSignal handleChange={(e) => {}} numberformat={value.numberformat}/>)
                            : showss ? <SinusSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                : showcs ? <CosinusSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                    : showsws ? <SpikesSignal handleChange={(e) => {}} numberformat={value.numberformat}/>
                                        : showns ? <NormallyDistributed handleChange={(e) => {}} numberformat={value.numberformat}/>
                                            : null }
                        <SignalButton name={"Generate"} onClick={() => console.log("generate")} icon={<></>}/>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SignalScreen;
import {Card, Divider} from "@mui/material";
import React from "react"
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { color } from "@mui/system";







const StreamBoxElem = ({name, type, format}) => {
    return (
    <Card sx={{ height: "100px", background: 'linear-gradient( to bottom, rgba(255,255,255,1), rgba(232,232,232,1))', boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, .16)', marginBottom: "10px"}}>
        <CardContent>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }} color="rgba(1,1,1,1)" gutterBottom>
                Datastream {name}
            </Typography>

            <Grid container item xs={12} container direction="row">
            <Grid item xs={6}>
                <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
                    signal: {type}
                </Typography>

                <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
                    Output format: {format}
                </Typography>
            </Grid>
            <Grid item xs={6} align={"right"}>
                <Typography sx={{ fontSize: 15, color: "#5FA500", align: "left", lineHeight: "normal"}}>
                    Running...
                </Typography>
            </Grid>
            </Grid>
        </CardContent>
    </Card>
        
);
}



export default StreamBoxElem;
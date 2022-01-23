import {Card, Divider} from "@mui/material";
import React from "react"
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { color } from "@mui/system";







const StreamBoxElem = ({name, type, argument1, argument2, argument3, runningState}) => {
    return (
    <Card sx={{ height: "100px", background: 'linear-gradient( to bottom, rgba(255,255,255,0.5), rgba(232,232,232,1))', boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, .16)', marginBottom: "10px"}}>
        <CardContent>
            <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 20, fontWeight: "600" }} color="rgba(1,1,1,1)" gutterBottom>
                {name}
            </Typography>

            <Grid container item xs={12} container direction="row">
                <Grid item xs={4}>
                    <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }}>
                        Type: {type}
                    </Typography>

                    <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }}>
                        Argument 1: {argument1}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }}>
                        Argument 2: {argument2}
                    </Typography>

                    <Typography sx={{ fontFamily: "Open Sans, sans-serif", fontSize: 14, fontWeight: "600" }}>
                        Argument 3: {argument3}
                    </Typography>
                </Grid>
                <Grid item xs={4} align={"right"}>
                    <Typography sx={{ fontSize: 15,fontWeight: "600",  color: runningState ? "#5FA500" : "#9D9D9D", align: "left", lineHeight: "normal"}}>
                        {runningState ? "Running..." : "Stopped"}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
        
);
}



export default StreamBoxElem;
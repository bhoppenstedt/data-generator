import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import {lightBlue,purple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { NumberFormatCustom } from "../NumberFormatCustom";

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

export const SinusSignal = (props) => {
    return (
        <Grid
            container
          >
            <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 5, my:2 }}
                  >
                    Signal configuration
                  </Typography>  
            <Box sx={{  minWidth: 200,pt:3 }}>
              <Grid container style={{ height: "30vh" }}>
              <Card variant="outlined" sx={{  height: 670, minWidth: 350,mx:-10,commonStyles, borderColor: 'secondary.main'}}>
                         
          
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 5, my: 3 }}
                  >
                  Sinus Signal
                  </Typography>
                  <TextField
                    variant="outlined"
                    sx={{ my: 1, mx: 5, pt: 1, minWidth: 300 }}
                    label="Frequence"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    variant="outlined"
                    sx={{ my: 4, mx: 5, pt: 1, minWidth: 300 }}
                    label="Amplitude"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    variant="outlined"
                    sx={{ m: -15, mx: -42.5, my: 17, pt: 1, minWidth: 300 }}
                    label="Transmission frequency"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Card>
                <Grid item xs={1}></Grid>
              </Grid>
            </Box>{" "}
          </Grid>
    )
}

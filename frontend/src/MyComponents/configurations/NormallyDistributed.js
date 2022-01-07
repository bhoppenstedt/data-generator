import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { lightBlue,purple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { NumberFormatCustom } from "../NumberFormatCustom";

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

export const NormallyDistributed = (props) => {
    return (
<Grid
            container
          ><Box sx={{  minWidth: 200, pt:3 }}>
              <Grid container style={{ height: "30vh" }}>
            <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 5, my:2 }}
                  >
                    Signal configuration
                  </Typography> 
            
                <Card variant="outlined" sx={{ height: 670, minWidth: 350,mx:-10,commonStyles, borderColor: 'secondary.main'}}>
                            
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 5, my: 3 }}
                  >
                  Normally Distributed Signal
                  </Typography>
                  <Grid container
            spacing={16}
            direction="column"
            sx={{ mx: -10, my: -20, pt: -20 }}
            alignItems="center"
            justifyContent="center"
          >
                  <TextField
                    variant="outlined"
                    sx={{ my: 25, mx: -10, pt: 1, minWidth: 300 }}
                    label="Expected value"
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
                    sx={{ my: -22, mx: 5, pt: 1, minWidth: 300 }}
                    label="Standard Deviation"
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
                    sx={{ my: 23, mx: 5, pt: 1, minWidth: 300 }}
                    label="Size"
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
                    sx={{ m: -35, mx: -32, my: -20, pt: 1, minWidth: 300 }}
                    label="Transmission frequency"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  </Grid>
                </Card>
                <Grid item xs={1}></Grid>
              </Grid>
            </Box>{" "}
          </Grid>
    )
}

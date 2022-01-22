import React from "react";
import TextField from "@mui/material/TextField";
import { Stack, Grid } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";
import { SignalButton } from "../SignalButton";

export const SinusSignal = (props) => {
    return (
      <Grid container item xs={12} alignContent={"center"} alignItems={"center"} justifyContent={"center"}>
                  
        

                  <Grid item xs={12}>
                  <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  
                  //onChange={handleChangeName}
                  />
</Grid>
<Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Frequence"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
</Grid>
<Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
                    label="Amplitude"
                    value={props.numberformat}
                    onChange={props.handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
</Grid>
<Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
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
                  
                </Grid>
        
    )
}

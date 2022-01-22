import React from "react";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { NumberFormatCustom } from "../NumberFormatCustom";

export const NormallyDistributed = (props) => {
    return (
      <Stack container spacing={4} direction="column" alignItems="center" justifyContent="center">

                  <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  sx={{pt: 1, minWidth: 300}}
                  //onChange={handleChangeName}
                  />

                  <TextField
                    variant="outlined"
                    sx={{pt: 1, minWidth: 300 }}
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
                    sx={{pt: 1, minWidth: 300 }}
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
                  </Stack>
                
    )
}

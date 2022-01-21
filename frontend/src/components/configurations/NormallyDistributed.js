import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
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

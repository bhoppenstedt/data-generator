import React from 'react'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import { purple } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { NumberFormatCustom } from "../NumberFormatCustom";

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

export const CosinusSignal = (props) => {
    return (
      <Stack container spacing={6} direction="column" alignItems="center" justifyContent="center">
        
                  <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  sx={{pt: 1, minWidth: 300}}
                  onChange={handleChangeName}
                  />
                  
                  <TextField
                    variant="outlined"
                    sx={{ pt: 1, minWidth: 300 }}
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
                    sx={{ pt: 1, minWidth: 300 }}
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

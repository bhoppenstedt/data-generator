import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid, Stack, Card } from "@mui/material";
import { lightBlue, purple} from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { NumberFormatCustom } from "../NumberFormatCustom";

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

export const SpikesSignal = (props) => {
    return (
<Grid
            container
          >
            <Box sx={{minWidth: 200, pt:3}}>
            <Grid container style={{ height: "30vh" }}>
            <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 5, my:2 }}
                  >
                    Signal configuration
                  </Typography> 
                  
             <Card variant="outlined" sx={{height: 670, minWidth: 350,mx:-10, commonStyles, borderColor: 'secondary.main' }}>
              
                <Stack sx={{height: 730, minWidth: 350}}>
                            
                 <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 5, my: 3 }}
                  >
                  Signal with Spikes
                  </Typography>
                  <TextField
                    variant="outlined"
                    sx={{ my: 2, mx: 5.5, pt: 1, minWidth: 300 }}
                    label="Base"
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
                    sx={{ my: 3, mx: 5.5, pt: 1, minWidth: 300 }}
                    label="Distance"
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
                    sx={{ my: -2, mx: 5.5, pt: 1, minWidth: 300 }}
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
                    sx={{ my: 8, mx: 5.5, pt: 1, minWidth: 300 }}
                    label="Probability"
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
                    sx={{ mx: 5.5, my: -5, pt: 1, minWidth: 300 }}
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
              </Card>
              </Grid>
            </Box>
          </Grid>
    )
}

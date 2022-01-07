import React from "react";
import Card from "@mui/material/Card";
import { deepPurple, lightBlue } from "@mui/material/colors";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import Button from "@mui/material/Button";
import { ThemeProvider, makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";

const theme = {
    background: 'linear-gradient(45deg, #90BDFB 30%, #A1A5F9 90%)',
  };

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #90BDFB 30%, #A1A5F9 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 36,
    },
}));
const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};
export function SignalButton(props){
    return <Card spacing={2} variant="outlined"sx={{minHeight: 10, minWidth: 420,color: 'primary.contrastText',commonStyles, borderColor: 'secondary.main' }} >
            {props.icon}
            <ThemeProvider theme={theme}>
            <Button className={useStyles().root} variant="contained" onClick={props.onClick} sx={{ mx: 6, my: 5 }}>
              {props.name}
            </Button>
            </ThemeProvider>
    </Card>

    
}
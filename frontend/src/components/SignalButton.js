import React from "react";
import Card from "@mui/material/Card";
import { deepPurple, lightBlue } from "@mui/material/colors";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import Button from "@mui/material/Button";
import { ThemeProvider, makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {Container, Paper} from "@mui/material";

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

export function SignalButton(props){
    return (
        <Paper variant="outlined" sx={{minHeight: "8vh", maxHeight: "12vh", width:"80%", color: 'primary.contrastText',  bgcolor: 'background.paper', border: 1, borderColor: 'secondary.main' }}
            component={Stack} direction={"column"} justifyContent="center">
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" alignSelf={"center"}>
                {props.icon}
                <ThemeProvider theme={theme}>
                    <Button className={useStyles().root} variant="contained" onClick={props.onClick}>
                        {props.name}
                    </Button>
                </ThemeProvider>
            </Stack>
    </Paper>)
}
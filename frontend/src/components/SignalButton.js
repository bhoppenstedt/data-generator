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
    background: 'linear-gradient(45deg, #D8E7FB 100%, #BDBFFE 100%)',
  };

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient( to bottom, rgba(216,231,251,1), rgba(189,191,254,1))',
        color: '#3F0092',
        boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, .16)',
        height: 70,
    },
}));

export function SignalButton(props){
    return (
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" alignSelf={"center"} sx={{width: '95%'}}>
                <ThemeProvider theme={theme}>
                    <Button fullWidth className={useStyles().root} variant="contained" onClick={props.onClick}>
                        {props.name}
                    </Button>
                </ThemeProvider>
            </Stack>
    )
}
import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider, makeStyles } from '@mui/styles';
import Stack from "@mui/material/Stack";
import { ToggleButton } from "@mui/material";


const theme = {
    background: 'linear-gradient(45deg, #D8E7FB 100%, #BDBFFE 100%)',
  };

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient( to bottom, rgba(255,255,255,1), rgba(232,232,232,1))',
        color: '#3F0092',
        boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, .16)',
        height: 52,
        fontSize: 20,
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: "700",
        textTransform: "inherit",
        justifyContent: "center",
        
    
    }
}));

export function GenerateButton(props){
    return (
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" alignSelf={"center"} sx={{width: '100%'}}>
                    <Button className={useStyles().root} variant="contained" onClick={props.onClick}>
                        CREATE
                    </Button>
            </Stack>
    )
}
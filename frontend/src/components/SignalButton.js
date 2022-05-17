import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider, makeStyles } from '@mui/styles';
import Stack from "@mui/material/Stack";
import { ToggleButton } from "@mui/material";

// Button to select a signal type
export function SignalButton(props){
    return (
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" alignSelf={"center"} sx={{width: '95%'}}>
                    <Button fullWidth disableRipple variant="contained" onClick={props.onClick} 
                    sx={{
                        background: props.selected ?'linear-gradient( to bottom, rgba(216,231,251,1), rgba(189,191,254,1))' : 'linear-gradient( to bottom, rgba(255,255,255,1), rgba(232,232,232,1)) !important' ,
                        color: '#3F0092 !important',
                        boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, .16) !important',
                        height: 70,
                        fontSize: 20,
                        fontFamily: 'Open Sans, sans-serif !important',
                        fontWeight: "600 !important",
                        textTransform: "inherit !important",
                        justifyContent: "left !important",
                        width: "90% !important", 
                        paddingX: "16px !important",
                        paddingY: "8px !important",
                        borderRadius: "4px !important"
                    }}>
                        {props.name}
                    </Button>
            </Stack>
    )
}
import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider, makeStyles } from '@mui/styles';
import Stack from "@mui/material/Stack";
import { ToggleButton } from "@mui/material";
import { Autocomplete, Card, Divider, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
export function GenerateButton(props){
    const format = [
        {label: 'MQTT'},
        {label: 'Kafka'}
    ];
    return (
        
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" alignSelf={"center"} sx={{width: '100%'}}>
                    
                    <Autocomplete 
                        options={format}
                        sx={{ width: 120 }}
                        renderInput={(params) => <TextField {...params} label="Format" />}
                    />
               
                    <Button sx={{
                        background: 'linear-gradient( to bottom, rgba(255,255,255,1) , rgba(232,232,232,1)) !important',
                        color: '#3F0092 !important',
                        boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, .16) !important',
                        height: 52,
                        fontSize: 20,
                        fontFamily: 'Open Sans, sans-serif !important',
                        fontWeight: "700 !important",
                        textTransform: "inherit !important",
                        justifyContent: "center !important",
                        paddingX: "16px !important",
                        paddingY: "8px !important",
                        borderRadius: "4px !important"
                    }}
                    variant="contained" onClick={props.onClick}>
                        CREATE
                    </Button>
                  
            </Stack>
    )
}
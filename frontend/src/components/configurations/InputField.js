import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import React, {useState} from "react";









export function InputField(props){
    return (
        <Stack container spacing={'12px'}>

            <Typography component="div" sx={{ fontFamily: 'Open Sans, sans-serif', fontWeight: "400",fontSize: 15, color: '#3F0092'}}>
                {props.inputText}:
            </Typography>

            <TextField 
                error={props.error}
                helperText={(props.missing || props.error) ? props.helpingText : ""}
                value={props.value} 
                variant="outlined"
                size="small"
                onChange={props.onChange}
                sx = {
                {'& label.Mui-focused': {
                color: '#3F0092',
                },
                '& .MuiInput-underline:after': {
                borderBottomColor: '#3F0092',
                },
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: props.missing ? "red" : '#3F0092',
                },
                '&:hover fieldset': {
                    borderColor: '#3F0092',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#3F0092',
                }}}}
            />

        </Stack>
    )
}

export default InputField;
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import React from "react";

const Header = (props) => {
    const bg = props.theme.palette.mode === "dark" ? 'linear-gradient(45deg, #90BDFB 30%, #A1A5F9 90%)' : 'linear-gradient(to bottom, #90BDFB 30%, #A1A5F9 90%)'
    return (
            <AppBar position="static" sx={{background: bg, height: "80px"}}>
                    <Typography component="div" sx={{ alignSelf:"center", fontFamily: 'Open Sans, sans-serif', fontWeight: "700",fontSize: 45, color: '#FFFFFF', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                        datastream generator
                    </Typography>
            </AppBar>
    );
}

export default Header;
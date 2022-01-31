import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import React from "react";

const Header = (props) => {
    const bg = 'linear-gradient(to bottom, rgba(144,189,251,0.73), rgba(161,165,259,1))'
    return (
            <AppBar position="static" sx={{background: bg, height: "80px", boxShadow:'0px 0px 0px 0px rgba(0, 0, 0, 0)'}}>
                    <Typography component="div" sx={{ alignSelf:"center", fontFamily: 'Open Sans, sans-serif', fontWeight: "700",fontSize: 45, color: '#FFFFFF', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                        datastream generator
                    </Typography>
            </AppBar>
    );
}

export default Header;
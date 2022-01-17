import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import React from "react";

const Header = (props) => {
    const bg = props.theme.palette.mode === "dark" ? 'linear-gradient(45deg, #90BDFB 30%, #A1A5F9 90%)' : 'linear-gradient(to bottom, #90BDFB 30%, #A1A5F9 90%)'
    return (
            <AppBar position="static" sx={{background: bg, height: "80px"}}>
                    <Typography variant="h6" component="div" sx={{FlexGrow: 1, alignSelf: "center", fontSize: 45, marginTop: "4px", fontWeight: "bold"}}>
                        datastream generator
                    </Typography>
            </AppBar>
    );
}

export default Header;
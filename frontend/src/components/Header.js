import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import React from "react";
import Icon from '@material-ui/core/Icon';
import { IconButton, SvgIcon } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import { Stack } from "@mui/material";


const Header = (props) => {

    const bg = 'linear-gradient(to bottom, rgba(144,189,251,0.73), rgba(161,165,259,1))'

    return (
            <AppBar position="static" sx={{background: bg, height: "90px", boxShadow:'0px 0px 0px 0px rgba(0, 0, 0, 0)'}}>

                <Stack direction={"row"} justifyContent="center" alignItems="center">

                    <Typography component="div" sx={{ alignSelf:"center", fontFamily: 'Open Sans, sans-serif', fontWeight: "700",fontSize: 45, color: '#FFFFFF', marginTop:"0.1vw", marginBottom:"0.5vw" }}>
                        datastream generator
                    </Typography>

                    <SvgIcon sx={{width:"100px", height:"90px"}}>
                        <svg id="Komponente_1_1" data-name="Komponente 1 – 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 47">
                        <defs>
                        </defs>
                        <circle id="Ellipse_1" data-name="Ellipse 1" class="cls-1" cx="23.5" cy="23.5" r="23.5"/>
                        <circle id="Ellipse_2" data-name="Ellipse 2" class="cls-1" cx="4.5" cy="4.5" r="4.5" transform="translate(38 6)"/>
                        <circle id="Ellipse_3" data-name="Ellipse 3" class="cls-1" cx="4.5" cy="4.5" r="4.5" transform="translate(81 25)"/>
                        <circle id="Ellipse_5" data-name="Ellipse 5" class="cls-1" cx="4.5" cy="4.5" r="4.5" transform="translate(68 30)"/>
                        <circle id="Ellipse_10" data-name="Ellipse 10" class="cls-1" cx="2.5" cy="2.5" r="2.5" transform="translate(60 23)"/>
                        <circle id="Ellipse_11" data-name="Ellipse 11" class="cls-1" cx="2.5" cy="2.5" r="2.5" transform="translate(46 36)"/>
                        <circle id="Ellipse_12" data-name="Ellipse 12" class="cls-1" cx="2.5" cy="2.5" r="2.5" transform="translate(67 8)"/>
                        <circle id="Ellipse_13" data-name="Ellipse 13" class="cls-1" cx="2.5" cy="2.5" r="2.5" transform="translate(82 11)"/>
                        <circle id="Ellipse_6" data-name="Ellipse 6" class="cls-1" cx="4.5" cy="4.5" r="4.5" transform="translate(34 36)"/>
                        <circle id="Ellipse_4" data-name="Ellipse 4" class="cls-1" cx="4.5" cy="4.5" r="4.5" transform="translate(45 25)"/>
                        <circle id="Ellipse_7" data-name="Ellipse 7" class="cls-1" cx="6.5" cy="6.5" r="6.5" transform="translate(49 9)"/>
                        <circle id="Ellipse_8" data-name="Ellipse 8" class="cls-1" cx="3.5" cy="3.5" r="3.5" transform="translate(56 32)"/>
                        <circle id="Ellipse_9" data-name="Ellipse 9" class="cls-1" cx="5.5" cy="5.5" r="5.5" transform="translate(68 15)"/>
                        </svg>
                    </SvgIcon>

                </Stack>
                
            </AppBar>
    );
}

export default Header;
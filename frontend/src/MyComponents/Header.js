import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme} from "@mui/material/styles";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function Header(props) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: 'linear-gradient(45deg, #90BDFB 30%, #A1A5F9 90%)',}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mx:50,flexGrow: 1 }}>
            Datastream Generator
          </Typography>
          <IconButton
            sx={{ ml: 20 }}
            onClick={props.colorMode.toggleColorMode}
            color="inherit"
          >
            {props.theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}

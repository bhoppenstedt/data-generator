import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import Main from "./Main";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ColorThemeWrap = () => {
    const [mode, setMode] = React.useState("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }), []);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
        }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Main ColorModeContext={ColorModeContext}/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ColorThemeWrap;
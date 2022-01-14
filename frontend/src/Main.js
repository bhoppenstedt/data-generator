import React from 'react'
import {Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Header from "./components/Header";
import Output from "./components/Output";
import SignalScreen from "./components/SignalScreen";

const Main = (props) => {
    const theme = useTheme();
    const colorMode = React.useContext(props.ColorModeContext);
    return (
        <Grid container>
            <Grid item xs ={12}>
                <Header title="Data generator" colorMode={colorMode} theme={theme} />
            </Grid>
            <Grid item xs ={6} sx={{pt:4}}>
                <SignalScreen/>
            </Grid>
            <Grid item xs ={6} sx={{pt:4}}>
                <Output/>
            </Grid>
        </Grid>
    )
}

export default Main;
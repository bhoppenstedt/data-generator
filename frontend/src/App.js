import * as React from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import {Card,Grid,Button,Autocomplete,Positions,Paper, Container,Grow} from "@mui/material";
import Header from "./MyComponents/Header";
import { Footer } from "./MyComponents/Footer";
import { Middle } from "./MyComponents/Middle";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";



const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
      <Grid
      container
      >
        <Grid item xs ={12}>
        <Header title="Data generator" colorMode={colorMode} theme={theme} />
        </Grid>
        <Grid item xs ={7}>
          <Middle/>
        </Grid>
        <Grid item xs ={5}>
        <Footer/>
        </Grid>
      </Grid>
  );

  /*return (
     <>
<Paper variant="outlined" >
    <Header title="Data generator" colorMode={colorMode} theme={theme} />
  

     
      <Grid
        container
        style={{ height: "100vh" }}
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
      
        <Middle />
        <Footer style={{ marginTop: 1000 }} />
      </Grid>
</Paper>
  </>
  );
}*/
}
export default function App1() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
         },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}


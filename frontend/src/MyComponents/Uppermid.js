/*import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box1 from '@mui/material/Box';
import Container from '@mui/material/Container';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
/*const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ mx:10,fontSize: 20, minWidth: 600 }} color="text.secondary" gutterBottom>
       DatenStrömen Name
      </Typography>
      <Typography variant="body2">
      Signal : Name
      </Typography>
      <Typography variant="body2"> 
       Ausgabeformat: Format
      </Typography>
      <Typography sx={{mx:10,fontSize: 20}}variant="body2">
      Running........
      </Typography>
    </CardContent>
  </React.Fragment>

  
   
);

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
  });
}
ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Uppermid(props) {
  return (
    /*<Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
   
    <React.Fragment>
    <Container>
        <Box1 sx={{ my: -10}}>
          {[...new Array(1)]
            .map(
              () => 
              <Stack pt={3}
    divider={<Divider orientation="vertical" flexItem />}
    justifyContent="center"
    alignItems="center"
    spacing={2}>
    <Card sx={{ minWidth: 15 }}>
      <CardContent>
      <Typography sx={{ mx:10,fontSize: 20, minWidth: 600 }} color="text.secondary" gutterBottom>
      Data stream name
      </Typography>
      <Typography variant="body2">
      Signal : Name
      </Typography>
      <Typography variant="body2"> 
      Output format: Format
      </Typography>
      <Typography sx={{mx:10,fontSize: 20}}variant="body2">
      Running........
      </Typography>
    </CardContent>
    </Card>

    <Card sx={{ minWidth: 15 }}>
      <CardContent>
      <Typography sx={{ mx:10,fontSize: 20, minWidth: 600 }} color="text.secondary" gutterBottom>
      Data stream name
      </Typography>
      <Typography variant="body2">
      Signal : Name
      </Typography>
      <Typography variant="body2"> 
      Output format: Format
      </Typography>
      <Typography sx={{mx:10,fontSize: 20}}variant="body2">
      Running........
      </Typography>
    </CardContent>
    </Card>
    </Stack>,
  )}
</Box1>
</Container>
</React.Fragment> 
  );
}



//////middle class////////
const min = 0;
const max = 10;
const [value, setValue] = React.useState("");
 <TextField
              variant="standard"
              sx={{ m: 5, mx: 5, pt: 1, minWidth: 200 }}
        label = "lower boundary"
        type="number"
        inputProps={{ min, max }}
        value={value}
        onChange={(e) => {
          var value = parseInt(e.target.value, 10);

          if (value > max) value = max;
          if (value < min) value = min;

          setValue(value);
        }}
      />
*/

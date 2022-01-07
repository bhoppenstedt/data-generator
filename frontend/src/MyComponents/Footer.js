import * as React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box1 from "@mui/material/Box";
import { lightBlue, purple, Blue } from "@mui/material/colors";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { IconButton } from "@mui/material";

const commonStyles = {
  bgcolor: 'background.paper',
  m: 50,
  border: 1,
  width: '5rem',
  height: '5rem',
};

export function Footer(props) {
 
  return (
    <Grid container>
    
        <Grid item xs={12}>
          <Box1 sx={{minWidth: 100, pt: 7,mx:-5,my:-6}}>
            {[...new Array(1)].map(() => (
              <Stack
                pt={1}
                divider={<Divider orientation="vertical" flexItem />}
                justifyContent="center"
                alignItems="center"
                spacing={8}
              >
                <Card variant="outlined" sx={{height: 770, minWidth: 700,commonStyles, borderColor: 'secondary.main'}}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 40, my: 2 }}
                  >
                    datastreams
                  </Typography>
                  <Divider variant="middle" />
                  <Grid container>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 2, my: 1 }}
                  >
                    active streams:
                  </Typography>
                  <Typography component="div"
                    variant="h5"
                    sx={{ color: purple[900], mx: 5, my: 3 }}>Play all:</Typography>
                   
                  <IconButton>
                    
                    <PlayCircleOutlineOutlinedIcon
                      sx={{  mx: 1, m: 1,fontSize: 30, color: purple[900] }}
                    />
                  </IconButton>
                  <Typography component="div"
                    variant="h5"
                    sx={{ color:purple[900], mx: 5, my: 3 }}>Stop all:</Typography>
                  <IconButton> 
                    <StopCircleOutlinedIcon
                      sx={{ mx: 1, my: 1, fontSize: 30, color:purple[900] }}
                    />
                  </IconButton>
                  </Grid>

                  {(
                    <Card sx={{ minWidth: 15 }}>
                      <CardContent>
                        <Typography
                          sx={{ mx: 10, fontSize: 20, minWidth: 250 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Data stream name
                        </Typography>
                        <Typography variant="body2">Signal : Name</Typography>
                        <Typography variant="body2">
                          Output format: Format
                        </Typography>
                        <Typography
                          sx={{ mx: 10, fontSize: 20 }}
                          variant="body2"
                        >
                          Running........
                        </Typography>
                      </CardContent>
                    </Card>
                  ) }

                  {(
                    <Card sx={{ minWidth: 15 }}>
                      <CardContent>
                        <Typography
                          sx={{ mx: 10, fontSize: 20, minWidth: 250 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Data stream name
                        </Typography>
                        <Typography variant="body2">Signal : Name</Typography>
                        <Typography variant="body2">
                          Output format: Format
                        </Typography>
                        <Typography
                          sx={{ mx: 10, fontSize: 20 }}
                          variant="body2"
                        >
                          Running........
                        </Typography>
                      </CardContent>
                    </Card>
                  ) }
                </Card>
              </Stack>
            ))}
          </Box1>
         </Grid>
    </Grid>
  );
}

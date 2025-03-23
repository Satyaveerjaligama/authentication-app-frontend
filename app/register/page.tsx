"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function Register() {
  return (
    <Box className="place-items-center h-screen content-center">
      <Card className="w-md !rounded-2xl">
        <CardContent className="p-4">
          <Grid container rowSpacing={2} className="text-center">
            <Grid item xs={12}>
              <Typography variant="h5">Register</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email/Phone number" type="text" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Password" type="password" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Re-type Password" type="password" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

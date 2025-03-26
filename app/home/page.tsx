"use client";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { SnackBarContext } from "../layout";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/utilities/constants";

const Home = () => {
  const router = useRouter();
  const { setOpen, setMessage } = useContext(SnackBarContext);

  const testApi = () => {
    axios({
      method: "GET",
      url: `${process.env.USER_API}/${API_ENDPOINTS.TEST}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setOpen(true);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setOpen(true);
        setMessage(`${err.response.data.message}, Please login again`);
        router.push("/login");
      });
  };

  return (
    <Box className="place-items-center h-screen content-center">
      <Card className="w-md !rounded-2xl">
        <CardContent className="p-4">
          <Typography>
            &quot;Test API&quot; button will only work for first 15 secs
          </Typography>
          <Typography className="!my-4">
            Because when user logs in, a token is generated for 15 secs (this 15
            secs time is customizable, need to be changed in backend service
            when generating the token)
          </Typography>
          <Button variant="contained" onClick={testApi}>
            Test API
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Home;

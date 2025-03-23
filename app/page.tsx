"use client";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box className="place-items-center h-screen content-center">
      <Card className="w-md !rounded-2xl">
        <CardContent className="p-4">
          <Typography>Please navigate to Login or Register Page</Typography>
          <Link href="/login" className="underline text-blue-600">
            Login
          </Link>
          <br></br>
          <Link href="/register" className="underline text-blue-600">
            Register
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
}

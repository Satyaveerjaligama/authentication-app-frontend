"use client";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Snackbar, SnackbarCloseReason, ThemeProvider } from "@mui/material";
import { createContext, useState } from "react";
import appTheme from "@/utilities/theme";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const SnackBarContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOpen: (open: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMessage: (message: string) => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setSnackBarMessage("");
  };

  return (
    <html lang="en">
      <head>
        <title>Authentication App</title>
      </head>
      <body
        className={`${nunito.className} antialiased`}
        style={{ backgroundColor: "#45496a" }}
      >
        <ThemeProvider theme={appTheme}>
          <SnackBarContext.Provider
            value={{ setOpen, setMessage: setSnackBarMessage }}
          >
            {children}
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message={snackBarMessage}
            />
          </SnackBarContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

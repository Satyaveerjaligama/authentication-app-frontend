import { createTheme } from "@mui/material";

const appTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          fontFamily: "Nunito",
          textTransform: "none",
          backgroundColor: "#45496a",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#45496a",
          },
        },
        notchedOutline: {
          borderRadius: "15px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#45496a",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Nunito",
        },
      },
    },
  },
});

export default appTheme;

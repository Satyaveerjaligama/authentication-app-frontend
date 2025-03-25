"use client";
import loginValidations from "@/validations/loginValidations";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import * as yup from "yup";

interface FormErrors {
  emailOrPhone?: string;
  password?: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    emailOrPhone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validateForm = async () => {
    try {
      await loginValidations.validate(formData, { abortEarly: false });
      setFormErrors({ emailOrPhone: "", password: "" });
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: FormErrors = {};
        err.inner.forEach((e) => {
          if (e.path) {
            errors[e.path as keyof typeof formErrors] = e.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const submitHandler = async () => {
    const isDetailsValid = await validateForm();
    if (isDetailsValid) {
      setLoading(true);
      axios({
        method: "POST",
        url: "http://localhost:8000/user/v1/login",
        data: {
          ...formData,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data?.token);
            router.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box className="place-items-center h-screen content-center">
      <Card className="w-md !rounded-2xl">
        <CardContent className="p-4">
          <Grid container rowSpacing={2} className="text-center">
            <Grid item xs={12}>
              <Typography variant="h5">Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email/Phone number"
                type="text"
                fullWidth
                value={formData.emailOrPhone}
                onChange={onChange}
                name="emailOrPhone"
                error={formErrors.emailOrPhone !== ""}
                helperText={formErrors.emailOrPhone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                name="password"
                onChange={onChange}
                value={formData.password}
                error={formErrors.password !== ""}
                helperText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={submitHandler}
                loading={loading}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

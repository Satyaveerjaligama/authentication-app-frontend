"use client";
import { API_ENDPOINTS } from "@/utilities/constants";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useState } from "react";
import * as yup from "yup";
import { SnackBarContext } from "../layout";

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
  const { setOpen, setMessage } = useContext(SnackBarContext);

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
        url: `${process.env.USER_API}/${API_ENDPOINTS.LOGIN}`,
        data: {
          ...formData,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setOpen(true);
            setMessage("Login successful");
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
              <Typography variant="h5" className="!font-bold">
                Login
              </Typography>
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
            <Grid item xs={12}>
              <Typography>
                Don&apos;t have an account ?{" "}
                <Link href="/register" className="underline text-blue-600">
                  Register
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

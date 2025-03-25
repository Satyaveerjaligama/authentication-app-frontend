"use client";
import registerValidations from "@/validations/registerValidations";
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
  retypePassword?: string;
  name?: string;
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    retypePassword: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    emailOrPhone: "",
    password: "",
    retypePassword: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validateRegister = async () => {
    try {
      await registerValidations.validate(formData, { abortEarly: false });
      setFormErrors({ emailOrPhone: "", password: "", retypePassword: "" });
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
    const isDetailsValid = await validateRegister();
    if (isDetailsValid) {
      if (isDetailsValid) {
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { retypePassword, ...data } = formData;
        axios({
          method: "POST",
          url: "http://localhost:8000/user/v1/register",
          data,
        })
          .then((res) => {
            if (res.status === 201) {
              router.push("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <Box className="place-items-center h-screen content-center">
      <Card className="w-md !rounded-2xl">
        <CardContent className="p-4">
          <Grid container rowSpacing={2} className="text-center">
            <Grid item xs={12}>
              <Typography variant="h5">Register</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email/Phone number"
                type="text"
                name="emailOrPhone"
                fullWidth
                value={formData.emailOrPhone}
                onChange={onChange}
                error={formErrors.emailOrPhone !== ""}
                helperText={formErrors.emailOrPhone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                type="text"
                name="name"
                fullWidth
                value={formData.name}
                onChange={onChange}
                error={formErrors.name !== ""}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                value={formData.password}
                onChange={onChange}
                error={formErrors.password !== ""}
                helperText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Re-type Password"
                type="password"
                name="retypePassword"
                fullWidth
                value={formData.retypePassword}
                onChange={onChange}
                error={formErrors.retypePassword !== ""}
                helperText={formErrors.retypePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={submitHandler}
                loading={loading}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

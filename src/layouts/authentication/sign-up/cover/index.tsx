import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import api from "api/axios";

type FormData = {
  email: string;
  password: string;
  agreed: boolean;
};

const schema = yup
  .object({
    email: yup.string().required("Email é obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    agreed: yup.boolean().oneOf([true], "Você deve aceitar os Termos e Condições"),
  })
  .required();

function Cover(): JSX.Element {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "", agreed: false },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    try {
      await api.post("/auth/signup", {
        email: data.email,
        password: data.password,
      });

      navigate("/authentication/sign-in/cover");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <CoverLayout image="https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/bg-sign-up-cover.jpeg">
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <MDBox
                mb={2}
                p={1.5}
                borderRadius="md"
                bgColor="error"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <MDTypography variant="button" color="white">
                  {serverError}
                </MDTypography>
              </MDBox>
            )}

            <MDBox mb={2}>
              <MDInput
                {...register("email")}
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                {...register("password")}
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox {...register("agreed")} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {errors.agreed && (
              <MDTypography variant="caption" color="error">
                {errors.agreed.message}
              </MDTypography>
            )}

            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Sign Up"}
              </MDButton>
            </MDBox>

            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;

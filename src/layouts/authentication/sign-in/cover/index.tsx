import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import api from "api/axios";
import { AuthContext } from "contexts/AuthContext";

// material components you used (MDBox etc) assumed available
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const schema = yup
  .object({
    email: yup.string().required("Email é obrigatório").email("Email inválido"),
    password: yup.string().required("Senha é obrigatória").min(6, "Senha mínima 6 caracteres"),
    rememberMe: yup.boolean(),
  })
  .required();

export default function SignInCover(): JSX.Element {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    setLoading(true);

    try {
      const resp = await api.post(
        "/auth/signin",
        { email: data.email.trim(), password: data.password },
        { withCredentials: true } // se backend usar cookie HttpOnly
      );

      // Exemplo de resposta com accessToken e user:
      // { accessToken: "...", user: { id, name, email } }
      const { accessToken, user } = resp.data;

      // salvar remember flag
      localStorage.setItem("rememberMe", data.rememberMe ? "true" : "false");

      if (data.rememberMe) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        sessionStorage.setItem("accessToken", accessToken);
      }

      setUser(user);
      navigate("/dashboards");
    } catch (err: any) {
      console.error("SignIn error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Erro desconhecido. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // O formulário será submetido pelo botão, então não precisamos fazer nada aqui,
      // mas a função previne o erro de tipo do TypeScript.
    }
  };

  return (
    <CoverLayout image={process.env.REACT_APP_SIGNIN_BG || "/images/bg-sign-in-cover.jpeg"}>
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
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <MDBox mb={2}>
              <MDInput
                {...register("email")}
                id="email"
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
                error={!!errors.email}
                helperText={errors.email?.message}
                autoFocus
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                {...register("password")}
                id="password"
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                error={!!errors.password}
                helperText={errors.password?.message}
                onKeyDown={handlePasswordKeyDown}
              />
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch {...register("rememberMe")} defaultChecked />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>

            {serverError && (
              <MDBox mt={2}>
                <MDTypography variant="caption" color="error">
                  {serverError}
                </MDTypography>
              </MDBox>
            )}

            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={20} /> : "Sign in"}
              </MDButton>
            </MDBox>

            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>

            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Forgot your password?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/reset-password/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Reset password
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

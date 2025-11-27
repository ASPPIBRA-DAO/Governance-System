import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import CoverLayout from "layouts/authentication/components/CoverLayout";
import api from "api/axios";

type FormData = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

const schema: yup.SchemaOf<FormData> = yup.object({
  token: yup.string().required("O token é obrigatório"),
  newPassword: yup
    .string()
    .required("A nova senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "As senhas não conferem")
    .required("A confirmação de senha é obrigatória"),
});

function ResetPasswordWithToken(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const [serverMessage, setServerMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { token: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      setValue("token", urlToken);
    }
  }, [location, setValue]);

  const onSubmit = async (data: FormData) => {
    setServerMessage("");
    setIsError(false);

    try {
      const response = await api.post("/auth/reset-password", {
        token: data.token,
        newPassword: data.newPassword,
      });

      setServerMessage(
        response.data.message || "Senha atualizada com sucesso! Redirecionando para o login..."
      );

      setTimeout(() => {
        navigate("/authentication/sign-in/cover");
      }, 2000);
    } catch (err: any) {
      setIsError(true);

      if (err.response?.data?.message) {
        setServerMessage(err.response.data.message);
      } else {
        setServerMessage("Erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <CoverLayout
      coverHeight="50vh"
      image="https://pub-e76a89eaf4914341b899a2d3d623545b.r2.dev/images/bg-reset-cover.jpeg"
    >
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Definir Nova Senha
          </MDTypography>

          <MDTypography display="block" variant="button" color="white" my={1}>
            Crie sua nova senha abaixo.
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            {serverMessage && (
              <MDBox
                mb={3}
                p={1.5}
                borderRadius="md"
                bgColor={isError ? "error" : "success"}
                sx={{ opacity: 0.9 }}
              >
                <MDTypography variant="button" color="white">
                  {serverMessage}
                </MDTypography>
              </MDBox>
            )}

            <MDBox mb={2}>
              <MDInput
                {...register("token")}
                type="text"
                label="Token de Redefinição"
                variant="standard"
                fullWidth
                error={!!errors.token}
                helperText={errors.token?.message}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                {...register("newPassword")}
                type="password"
                label="Nova Senha"
                variant="standard"
                fullWidth
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            </MDBox>

            <MDBox mb={4}>
              <MDInput
                {...register("confirmPassword")}
                type="password"
                label="Confirmar Nova Senha"
                variant="standard"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </MDBox>

            <MDBox mt={6} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Definir Nova Senha"
                )}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPasswordWithToken;

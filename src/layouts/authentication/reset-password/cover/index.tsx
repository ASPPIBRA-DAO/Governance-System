import { useState } from "react";
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
  email: string;
};

const schema = yup
  .object({
    email: yup.string().required("O e-mail é obrigatório").email("Formato de e-mail inválido"),
  })
  .required();

function Cover(): JSX.Element {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setMessage("");
    setIsError(false);

    try {
      // A requisição é enviada, mas não esperamos pela resposta para evitar
      // qualquer análise de tempo que possa vazar informação.
      api.post("/auth/request-password-reset", { email: data.email });
    } catch (error) {
      // Erros de rede ou do servidor são capturados aqui, mas não são expostos ao usuário.
      // O erro pode ser logado em um serviço de monitoramento.
      console.error("Request password reset error:", error);
    }

    // Para evitar a enumeração de e-mails, sempre mostramos a mesma mensagem de sucesso.
    setMessage("Se o e-mail pertencer a uma conta registrada, um link de redefinição foi enviado.");
    setIsError(false);
  };

  return (
    <CoverLayout
      coverHeight="50vh"
      image="https://pub-6281c5e736e844ed8315dabb4b6de38f.r2.dev/images/bg-reset-cover.jpeg"
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
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Você receberá um e-mail em breve
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            {message && (
              <MDBox
                mb={3}
                p={1.5}
                borderRadius="md"
                bgColor={isError ? "error" : "success"}
                sx={{ opacity: 0.9 }}
              >
                <MDTypography variant="button" color="white">
                  {message}
                </MDTypography>
              </MDBox>
            )}

            <MDBox mb={4}>
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

            <MDBox mt={6} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                disabled={isSubmitting || !!message} // Desabilita após o envio
              >
                {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Resetar Senha"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;

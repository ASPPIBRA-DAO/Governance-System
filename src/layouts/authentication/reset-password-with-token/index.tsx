/**
=========================================================
* New Page for Resetting Password with Token
=========================================================
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function ResetPasswordWithToken(): JSX.Element {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const apiBaseUrl = "/api";

    if (!token || !newPassword) {
      alert("Please provide both the token and a new password.");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const message = await response.text();
      alert(message);

      if (response.status === 200) {
        navigate("/authentication/sign-in/cover");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
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
            Set New Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter the token from your email and your new password.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Reset Token"
                variant="standard"
                fullWidth
                value={token}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
              />
            </MDBox>
            <MDBox mb={4}>
              <MDInput
                type="password"
                label="New Password"
                variant="standard"
                fullWidth
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleResetPassword}>
                Set New Password
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPasswordWithToken;

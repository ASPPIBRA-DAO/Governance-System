import { SignJWT, jwtVerify } from "jose";
import bcrypt from "@ethercorps/bcrypt-edge";

/**
 * Helper para criar respostas JSON com CORS seguro.
 */
function createJsonResponse(body, init, request, env) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  const origin = request.headers.get("Origin");
  const allowedOrigin = env.ALLOWED_ORIGIN;

  if (origin && allowedOrigin && origin === allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Vary", "Origin");
  }

  return new Response(JSON.stringify(body), { ...init, headers });
}

/**
 * Hash SHA-256.
 */
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Normaliza e-mail.
 */
function normalizeEmail(email) {
  return (email || "").toString().trim().toLowerCase();
}

/**
 * Gera JWT de acesso.
 */
async function generateAccessToken(userId, env) {
  const alg = "HS256";
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
  return token;
}

/**
 * Função placeholder para envio de e-mail assíncrono.
 */
async function sendResetEmail(env, email, resetLink) {
  // Em um cenário real, você usaria fetch() para chamar um serviço como Resend, Mailgun, etc.
  console.log(`(Email Assíncrono Enviado) Para: ${email}, Link: ${resetLink}`);
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      const origin = request.headers.get("Origin");
      const allowedOrigin = env.ALLOWED_ORIGIN;
      if (origin && allowedOrigin && origin === allowedOrigin) {
        const headers = new Headers();
        headers.set("Access-Control-Allow-Origin", origin);
        headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        headers.set("Access-Control-Allow-Credentials", "true");
        return new Response(null, { status: 204, headers });
      }
      return new Response("Forbidden", { status: 403 });
    }

    const url = new URL(request.url);

    try {
      if (url.pathname.startsWith("/auth")) {
        // --- SIGNUP ---
        if (url.pathname === "/auth/signup" && request.method === "POST") {
          const { email, password } = await request.json();
          const emailNormalized = normalizeEmail(email || "");
          if (!emailNormalized || !password || password.length < 6) {
            return createJsonResponse(
              { message: "Dados inválidos. A senha deve ter no mínimo 6 caracteres." },
              { status: 400 },
              request,
              env
            );
          }
          const exists = await env.DB.prepare("SELECT id FROM users WHERE email = ?")
            .bind(emailNormalized)
            .first();
          if (exists) {
            return createJsonResponse(
              { message: "Este e-mail já está cadastrado." },
              { status: 409 },
              request,
              env
            );
          }
          const hashedPassword = await bcrypt.hash(password, 12);
          await env.DB.prepare("INSERT INTO users (email, password) VALUES (?, ?)")
            .bind(emailNormalized, hashedPassword)
            .run();
          return createJsonResponse(
            { message: "Cadastro realizado com sucesso!" },
            { status: 201 },
            request,
            env
          );
        }

        // --- SIGNIN ---
        if (url.pathname === "/auth/signin" && request.method === "POST") {
          const { email, password } = await request.json();
          const emailNormalized = normalizeEmail(email || "");
          const user = await env.DB.prepare("SELECT id, email, password FROM users WHERE email = ?")
            .bind(emailNormalized)
            .first();
          if (!user) {
            return createJsonResponse(
              { message: "Credenciais inválidas" },
              { status: 401 },
              request,
              env
            );
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return createJsonResponse(
              { message: "Credenciais inválidas" },
              { status: 401 },
              request,
              env
            );
          }
          const accessToken = await generateAccessToken(user.id, env);
          const refreshToken = crypto.randomUUID() + crypto.randomUUID();
          const refreshHash = await sha256(refreshToken);
          const nowSec = Math.floor(Date.now() / 1000);
          const expiresRefresh = nowSec + 60 * 60 * 24 * 30; // 30 dias
          await env.DB.prepare(
            "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)"
          )
            .bind(user.id, refreshHash, expiresRefresh)
            .run();
          const cookie = `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=${
            60 * 60 * 24 * 30
          }; SameSite=Strict;`;
          const body = { accessToken, user: { id: user.id, email: user.email } };
          const response = createJsonResponse(body, { status: 200 }, request, env);
          response.headers.set("Set-Cookie", cookie);
          return response;
        }

        // --- REFRESH TOKEN ---
        if (url.pathname === "/auth/refresh" && request.method === "POST") {
          const cookieHeader = request.headers.get("cookie") || "";
          const match = cookieHeader.match(/refreshToken=([^;]+)/);
          if (!match) {
            return createJsonResponse(
              { message: "Refresh token não encontrado" },
              { status: 401 },
              request,
              env
            );
          }
          const refreshToken = match[1];
          const refreshHash = await sha256(refreshToken);
          const row = await env.DB.prepare(
            "SELECT user_id, expires_at FROM refresh_tokens WHERE token_hash = ?"
          )
            .bind(refreshHash)
            .first();
          if (!row || row.expires_at < Math.floor(Date.now() / 1000)) {
            return createJsonResponse(
              { message: "Refresh token inválido ou expirado" },
              { status: 401 },
              request,
              env
            );
          }
          const newAccess = await generateAccessToken(row.user_id, env);
          return createJsonResponse({ accessToken: newAccess }, { status: 200 }, request, env);
        }

        // --- REQUEST PASSWORD RESET ---
        if (url.pathname === "/auth/request-password-reset" && request.method === "POST") {
          const { email } = await request.json();
          const emailNormalized = normalizeEmail(email || "");
          if (emailNormalized) {
            const user = await env.DB.prepare("SELECT id FROM users WHERE email = ?")
              .bind(emailNormalized)
              .first();
            if (user) {
              const rawToken = crypto.randomUUID() + crypto.randomUUID();
              const tokenHash = await sha256(rawToken);
              const expiresAt = Math.floor(Date.now() / 1000) + 60 * 30; // 30 min
              await env.DB.prepare(
                "INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)"
              )
                .bind(user.id, tokenHash, expiresAt)
                .run();
              const resetLink = `${env.ALLOWED_ORIGIN}/authentication/reset-password-with-token?token=${rawToken}`;
              ctx.waitUntil(sendResetEmail(env, emailNormalized, resetLink));
            }
          }
          return createJsonResponse(
            {
              message:
                "Se o e-mail pertencer a uma conta registrada, um link de redefinição foi enviado.",
            },
            { status: 200 },
            request,
            env
          );
        }

        // --- RESET PASSWORD WITH TOKEN ---
        if (url.pathname === "/auth/reset-password" && request.method === "POST") {
          const { token, newPassword } = await request.json();
          if (!token || !newPassword || newPassword.length < 6) {
            return createJsonResponse(
              { message: "Token inválido ou nova senha muito curta." },
              { status: 400 },
              request,
              env
            );
          }
          const tokenHash = await sha256(token);
          const row = await env.DB.prepare(
            `SELECT pr.user_id, pr.expires_at FROM password_reset_tokens pr WHERE pr.token_hash = ?`
          )
            .bind(tokenHash)
            .first();
          if (!row) {
            return createJsonResponse(
              { message: "Token inválido." },
              { status: 400 },
              request,
              env
            );
          }
          if (row.expires_at < Math.floor(Date.now() / 1000)) {
            await env.DB.prepare("DELETE FROM password_reset_tokens WHERE token_hash = ?")
              .bind(tokenHash)
              .run();
            return createJsonResponse(
              { message: "Token expirado." },
              { status: 400 },
              request,
              env
            );
          }
          const hashedPassword = await bcrypt.hash(newPassword, 12);
          await env.DB.prepare("UPDATE users SET password = ? WHERE id = ?")
            .bind(hashedPassword, row.user_id)
            .run();
          await env.DB.prepare("DELETE FROM password_reset_tokens WHERE token_hash = ?")
            .bind(tokenHash)
            .run();
          return createJsonResponse(
            { message: "Senha atualizada com sucesso!" },
            { status: 200 },
            request,
            env
          );
        }
      }

      return createJsonResponse({ message: "Not Found" }, { status: 404 }, request, env);
    } catch (error) {
      console.error("Unhandled error:", error);
      return createJsonResponse(
        { message: "Erro interno no servidor." },
        { status: 500 },
        request,
        env
      );
    }
  },
};

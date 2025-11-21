// Define CORS headers for reuse
const corsHeaders = {
	'Access-Control-Allow-Origin': 'http://localhost:3000',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	'Access-Control-Allow-Credentials': 'true',
};

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hash = await crypto.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

// Helper function to initialize the database
async function setupDatabase(db: D1Database) {
	await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS password_resets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires INTEGER NOT NULL
    );
  `);
}

// Main request handler logic
async function handleRequest(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	ctx.waitUntil(setupDatabase(env.DB));

	const { pathname } = new URL(request.url);

	try {
		if (pathname === '/') {
			return new Response('Ok', { status: 200 });
		}

		if (pathname.startsWith('/api/')) {
			// User Sign-Up
			if (pathname === '/api/signup') {
				if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
				const { email, password } = await request.json();
				if (!email || !password) return new Response('Missing email or password', { status: 400 });

				const existingUser = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
				if (existingUser) return new Response('User already exists', { status: 409 });

				const hashedPassword = await hashPassword(password);
				await env.DB.prepare('INSERT INTO users (email, password) VALUES (?, ?)').bind(email, hashedPassword).run();

				return new Response('User created successfully', { status: 201 });
			}

			// User Sign-In
			if (pathname === '/api/signin') {
				if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
				const { email, password } = await request.json();
				if (!email || !password) return new Response('Missing email or password', { status: 400 });

				const user = await env.DB.prepare('SELECT password FROM users WHERE email = ?').bind(email).first<{ password: string }>();
				if (!user) return new Response('Invalid credentials', { status: 401 });

				const hashedPassword = await hashPassword(password);
				if (hashedPassword !== user.password) return new Response('Invalid credentials', { status: 401 });

				return new Response(JSON.stringify({ message: 'Sign-in successful' }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// Request Password Reset
			if (pathname === '/api/request-password-reset') {
				if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
				const { email } = await request.json();
				if (!email) return new Response('Missing email', { status: 400 });

				const user = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
				if (user) {
					const token = crypto.randomUUID();
					const expires = Date.now() + 3600000; // 1 hour
					await env.DB.prepare('INSERT INTO password_resets (email, token, expires) VALUES (?, ?, ?)').bind(email, token, expires).run();
					console.log(`Password reset token for ${email}: ${token}`);
				}
				return new Response('If an account with this email exists, a password reset link has been sent.', { status: 200 });
			}

			// Reset Password with Token
			if (pathname === '/api/reset-password') {
				if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
				const { token, newPassword } = await request.json();
				if (!token || !newPassword) return new Response('Missing token or new password', { status: 400 });

				const resetRequest = await env.DB.prepare('SELECT email, expires FROM password_resets WHERE token = ?')
					.bind(token)
					.first<{ email: string; expires: number }>();

				if (!resetRequest || resetRequest.expires < Date.now()) {
					return new Response('Invalid or expired token', { status: 400 });
				}

				const newHashedPassword = await hashPassword(newPassword);
				await env.DB.prepare('UPDATE users SET password = ? WHERE email = ?').bind(newHashedPassword, resetRequest.email).run();

				await env.DB.prepare('DELETE FROM password_resets WHERE token = ?').bind(token).run();

				return new Response('Password has been reset successfully', { status: 200 });
			}

			return new Response('API Endpoint not found.', { status: 404 });
		}

		return new Response('Not Found', { status: 404 });
	} catch (e: any) {
		return new Response(e.message, { status: 500 });
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// Handle actual requests
		const response = await handleRequest(request, env, ctx);

		// Clone the response to make it mutable
		const newResponse = new Response(response.body, response);

		// Append CORS headers to the actual response
		for (const [key, value] of Object.entries(corsHeaders)) {
			newResponse.headers.set(key, value);
		}

		return newResponse;
	},
};

interface Env {
	DB: D1Database;
}

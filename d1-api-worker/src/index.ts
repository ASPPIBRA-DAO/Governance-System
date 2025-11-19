
export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const { pathname } = new URL(request.url);

        try {
            if (pathname === '/api/proposals') {
                if (request.method === 'GET') {
                    const { results } = await env.DB.prepare('SELECT * FROM proposals').all();
                    return new Response(JSON.stringify(results), {
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    });
                }

                if (request.method === 'POST') {
                    const { title, description } = await request.json();
                    if (!title || !description) {
                        return new Response('Missing title or description', { status: 400, headers: corsHeaders });
                    }
                    await env.DB.prepare('INSERT INTO proposals (title, description) VALUES (?, ?)')
                              .bind(title, description)
                              .run();
                    return new Response('Proposal created', { status: 201, headers: corsHeaders });
                }
            }

            return new Response('Not Found', { status: 404, headers: corsHeaders });

        } catch (e: any) {
            return new Response(e.message, { status: 500, headers: corsHeaders });
        }
    },
} satisfies ExportedHandler<Env>;

interface Env {
    DB: D1Database;
}

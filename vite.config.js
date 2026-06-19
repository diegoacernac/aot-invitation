import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { confirmReservation, ConfirmError } from './lib/confirmReservation.js';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function devApiPlugin(env) {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/confirm', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        Object.assign(process.env, env);

        try {
          const body = await readJsonBody(req);
          const result = await confirmReservation(body);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch (error) {
          const status = error instanceof ConfirmError ? error.status : 500;
          const message =
            error instanceof ConfirmError
              ? error.message
              : 'No se pudo enviar el email';

          if (!(error instanceof ConfirmError)) {
            console.error(error);
          }

          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: message }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), devApiPlugin(env)],
  };
});

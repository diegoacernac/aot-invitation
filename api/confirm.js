import { confirmReservation, ConfirmError } from '../lib/confirmReservation.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await confirmReservation(req.body ?? {});
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof ConfirmError) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'No se pudo enviar el email' });
  }
}

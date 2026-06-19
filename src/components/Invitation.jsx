import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendConfirmation } from '../sendConfirmation';

const screenTransition = {
  initial: { opacity: 0, scale: 0.92, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
  transition: { duration: 0.6, type: 'spring', stiffness: 100 },
};

async function fireConfetti(branch) {
  try {
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 130,
      spread: 82,
      origin: { y: 0.62 },
      colors: [branch.accent, '#ede9e4', '#ffffff', branch.accent],
    });
  } catch (_) {}
}

export default function Invitation({ branch }) {
  const [accepted, setAccepted] = useState(null);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const openContactStep = () => {
    setError('');
    setAccepted('contact');
  };

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    setSending(true);
    setError('');
    try {
      await sendConfirmation({
        email: email.trim(),
        branchId: branch.id,
      });
      await fireConfetti(branch);
      setAccepted('yes');
    } catch (err) {
      setError(err.message || 'No se pudo enviar el correo');
    } finally {
      setSending(false);
    }
  };

  if (accepted === 'yes') {
    return (
      <motion.div
        className="invitation invitation--success"
        style={{ '--accent': branch.accent }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180 }}
      >
        <motion.span
          className="success-icon"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <img src={branch.icon} alt={branch.name} className="invitation-icon-img" />
        </motion.span>
        <motion.p className="success-text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          ¡Misión aceptada!
        </motion.p>
        <motion.p className="success-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Hoy nos vemos en tu casa.
          <br />
          {branch.title} queda pendiente — lo acordamos después.
          <br />
          Revisa tu correo — te envié la confirmación.
        </motion.p>
      </motion.div>
    );
  }

  if (accepted === 'contact') {
    return (
      <motion.div
        className="invitation"
        {...screenTransition}
        style={{ '--accent': branch.accent }}
      >
        <motion.span className="invitation-icon" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <img src={branch.icon} alt={branch.name} className="invitation-icon-img" />
        </motion.span>
        <motion.p className="invitation-branch" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {branch.name}
        </motion.p>
        <motion.div className="invitation-divider" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} />
        <motion.h2 className="invitation-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          Confirma tu misión
        </motion.h2>
        <motion.p className="invitation-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Déjame tu correo y te envío los detalles de tu elección y el plan de hoy.
        </motion.p>
        <motion.form
          className="invitation-form"
          onSubmit={handleSubmitEmail}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            className="invitation-input"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={sending}
          />
          {error && <p className="invitation-error">{error}</p>}
          <motion.button
            className="btn-accent"
            type="submit"
            disabled={sending}
            whileHover={sending ? {} : { scale: 1.04 }}
            whileTap={sending ? {} : { scale: 0.97 }}
          >
            {sending ? 'Enviando…' : 'Confirmar misión'}
          </motion.button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setAccepted(null)}
            disabled={sending}
          >
            Volver
          </button>
        </motion.form>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="invitation"
      {...screenTransition}
      style={{ '--accent': branch.accent }}
    >
      <motion.span
        className="invitation-icon"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
      >
        <img src={branch.icon} alt={branch.name} className="invitation-icon-img" />
      </motion.span>
      <motion.p className="invitation-branch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}>
        {branch.name}
      </motion.p>
      <motion.div className="invitation-divider" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.42, duration: 0.5 }} />
      <motion.h2 className="invitation-title" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        {branch.title}
      </motion.h2>
      <motion.p className="invitation-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}>
        {branch.message}
      </motion.p>
      <motion.div className="invitation-divider" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.72, duration: 0.5 }} />
      <motion.p className="invitation-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        Hoy · en tu casa
      </motion.p>
      <motion.div className="invitation-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.94 }}>
        <motion.button
          className="btn-accent"
          onClick={openContactStep}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {branch.cta}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

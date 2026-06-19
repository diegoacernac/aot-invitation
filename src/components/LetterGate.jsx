import { useState } from 'react';
import { motion } from 'framer-motion';
import { LETTER_ACCESS_KEY } from '../lib/letterAccess';

const screenTransition = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.65, type: 'spring', stiffness: 90 },
};

export default function LetterGate({ branch, onUnlock }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (key.trim() === LETTER_ACCESS_KEY) {
      onUnlock();
      return;
    }

    setError('Clave incorrecta. ¿Seguro que ya te avisé?');
  };

  return (
    <motion.div
      className="letter-gate"
      {...screenTransition}
      style={{ '--accent': branch.accent }}
    >
      <motion.span
        className="letter-icon"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 160 }}
      >
        <img src={branch.icon} alt={branch.name} className="invitation-icon-img" />
      </motion.span>

      <motion.p
        className="letter-eyebrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Alto ahí, cadete
      </motion.p>

      <motion.div
        className="letter-divider"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />

      <motion.p
        className="letter-gate-message"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48 }}
      >
        Te dije que no entraras hasta que yo te avisara…
        <br />
        <br />
        Pero si no es el caso, ingresa la clave.
      </motion.p>

      <motion.form
        className="invitation-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58 }}
      >
        <input
          className="invitation-input"
          type="password"
          inputMode="numeric"
          name="key"
          placeholder="Clave"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
          autoComplete="off"
        />

        {error && <p className="invitation-error">{error}</p>}

        <motion.button
          className="btn-accent"
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Entrar
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

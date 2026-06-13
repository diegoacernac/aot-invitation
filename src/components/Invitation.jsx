import { useState } from 'react';
import { motion } from 'framer-motion';

const screenTransition = {
  initial: { opacity: 0, scale: 0.92, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
  transition: { duration: 0.6, type: 'spring', stiffness: 100 },
};

export default function Invitation({ branch }) {
  const [accepted, setAccepted] = useState(null);

  const handleAccept = async () => {
    try {
      const { default: confetti } = await import('canvas-confetti');
      confetti({
        particleCount: 130,
        spread: 82,
        origin: { y: 0.62 },
        colors: [branch.accent, '#ede9e4', '#ffffff', branch.accent],
      });
    } catch (_) {}
    setAccepted('yes');
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
          <img src={branch.icon} alt={branch.name} className='invitation-icon-img'/>
        </motion.span>
        <motion.p
          className="success-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          ¡Misión aceptada!
        </motion.p>
        <motion.p
          className="success-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Nos vemos el jueves 18 por la noche.
        </motion.p>
      </motion.div>
    );
  }

  if (accepted === 'friday') {
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <img src={branch.icon} alt={branch.name} className='invitation-icon-img'/>
        </motion.span>
        <motion.p
          className="success-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          ¡Perfecto!
        </motion.p>
        <motion.p
          className="success-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          El viernes 19 entonces — tu día libre.
          <br />
          Te escribo para confirmar.
        </motion.p>
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
        <img src={branch.icon} alt={branch.name} className='invitation-icon-img'/>
      </motion.span>

      <motion.p
        className="invitation-branch"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32 }}
      >
        {branch.name}
      </motion.p>

      <motion.div
        className="invitation-divider"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.42, duration: 0.5 }}
      />

      <motion.h2
        className="invitation-title"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {branch.title}
      </motion.h2>

      <motion.p
        className="invitation-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.62 }}
      >
        {branch.message}
      </motion.p>

      <motion.div
        className="invitation-divider"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.72, duration: 0.5 }}
      />

      <motion.p
        className="invitation-date"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Jueves 18 · noche
      </motion.p>

      <motion.div
        className="invitation-actions"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.94 }}
      >
        <motion.button
          className="btn-accent"
          onClick={handleAccept}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {branch.cta}
        </motion.button>
        <button className="btn-secondary" onClick={() => setAccepted('friday')}>
          Prefiero el viernes
        </button>
      </motion.div>
    </motion.div>
  );
}

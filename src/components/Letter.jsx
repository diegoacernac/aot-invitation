import { motion } from 'framer-motion';
import { letter } from '../data/letters';

const screenTransition = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.65, type: 'spring', stiffness: 90 },
};

export default function Letter({ branch, onAccept }) {
  return (
    <motion.div
      className="letter"
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
        Una carta para ti
      </motion.p>

      <motion.div
        className="letter-divider"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      />

      <motion.div
        className="letter-body"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        {letter.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </motion.div>

      <motion.button
        className="btn-accent"
        onClick={onAccept}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Acepto
      </motion.button>
    </motion.div>
  );
}

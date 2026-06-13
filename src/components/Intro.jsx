import { motion } from 'framer-motion';

const WingsSVG = () => (
  <svg viewBox="0 0 200 90" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    {/* Left wing — 5 feather arcs */}
    <path d="M100,62 C88,60 72,54 52,60 C72,52 88,56 100,62" opacity="0.9"/>
    <path d="M100,62 C85,52 66,42 44,46 C66,38 85,48 100,62" opacity="0.82"/>
    <path d="M100,62 C84,46 62,32 40,34 C60,26 83,40 100,62" opacity="0.72"/>
    <path d="M100,62 C84,40 65,24 42,22 C60,18 83,34 100,62" opacity="0.60"/>
    <path d="M100,62 C86,36 70,18 48,12 C64,10 84,28 100,62" opacity="0.46"/>
    {/* Right wing — mirrored */}
    <path d="M100,62 C112,60 128,54 148,60 C128,52 112,56 100,62" opacity="0.9"/>
    <path d="M100,62 C115,52 134,42 156,46 C134,38 115,48 100,62" opacity="0.82"/>
    <path d="M100,62 C116,46 138,32 160,34 C140,26 117,40 100,62" opacity="0.72"/>
    <path d="M100,62 C116,40 135,24 158,22 C140,18 117,34 100,62" opacity="0.60"/>
    <path d="M100,62 C114,36 130,18 152,12 C136,10 116,28 100,62" opacity="0.46"/>
    {/* Center body */}
    <ellipse cx="100" cy="65" rx="4" ry="6"/>
    <path d="M97,56 L100,52 L103,56 L100,60Z"/>
  </svg>
);

const screenTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.5 },
};

export default function Intro({ onStart }) {
  return (
    <motion.div className="intro" {...screenTransition}>
      <motion.div
        className="intro-badge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.9 }}
      >
        <span className="intro-badge-line" />
        Attack on Titan
        <span className="intro-badge-line" />
      </motion.div>

      <motion.div
        className="intro-wings"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{ delay: 0.35, duration: 1.4 }}
      >
        <WingsSVG />
      </motion.div>

      <motion.p
        className="intro-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.85 }}
      >
        En un mundo donde los muros protegen lo que más importa...
      </motion.p>

      <motion.button
        className="btn-primary"
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        Comenzar
      </motion.button>
    </motion.div>
  );
}

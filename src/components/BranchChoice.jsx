import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { branches } from '../data/branches';
import { saveChoice } from '../lib/choiceStorage';

const screenTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.5 },
};

export default function BranchChoice({ onSelect }) {
  const [phase, setPhase] = useState('idle');
  const [selected, setSelected] = useState(null);
  const [assigning, setAssigning] = useState(null);

  const handleClick = (branch) => {
    if (phase !== 'idle') return;

    setSelected(branch);
    setPhase('locking');
    saveChoice(branch.id);

    setTimeout(() => {
      setAssigning(branch);
      setTimeout(() => onSelect(branch), 1300);
    }, 550);
  };

  const isLocking = phase === 'locking';

  return (
    <>
      <motion.div className="choice" {...screenTransition}>
        <div className="choice-header">
          <h1 className="choice-title">Fiorella, eres mi cadete.</h1>
          <div className="choice-divider" />
          <p className="choice-subtitle">Elige tu destino.</p>
        </div>

        <div className="choice-grid">
          {branches.map((branch, i) => {
            const isSelected = selected?.id === branch.id;

            return (
              <motion.button
                key={branch.id}
                layout
                className={`branch-card${
                  branch.cardVideo
                    ? ' branch-card--has-video'
                    : branch.cardBg
                      ? ' branch-card--has-bg'
                      : ''
                }${isLocking && isSelected ? ' branch-card--selected' : ''}`}
                style={{
                  '--accent': branch.accent,
                  ...(branch.cardBg && !branch.cardVideo && {
                    '--card-bg': `url(${branch.cardBg})`,
                  }),
                }}
                onClick={() => handleClick(branch)}
                disabled={phase !== 'idle'}
                initial={{ opacity: 0, y: 45 }}
                animate={{
                  opacity: isLocking ? (isSelected ? 1 : 0) : 1,
                  scale: isLocking ? (isSelected ? 1.04 : 0.88) : 1,
                  y: isLocking && !isSelected ? 24 : 0,
                }}
                transition={{ duration: 0.45, delay: isLocking ? 0 : 0.2 + i * 0.15 }}
                whileHover={phase === 'idle' ? { scale: 1.03 } : {}}
                whileTap={phase === 'idle' ? { scale: 0.97 } : {}}
              >
                {branch.cardVideo && (
                  <video
                    className="branch-card-video"
                    src={branch.cardVideo}
                    poster={branch.cardBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
                <img src={branch.icon} alt={branch.name} className="branch-icon-img" />
                <span className="branch-name">{branch.name}</span>
                <span className="branch-sub">{branch.subtitle}</span>
                <span className="branch-cta">Elegir →</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {assigning && (
          <motion.div
            className="assign-overlay"
            style={{ '--accent': assigning.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="assign-box">
              <span className="assign-icon">
                <img src={assigning.icon} alt={assigning.name} className="assign-icon-img" />
              </span>
              <motion.p
                className="assign-text"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                Asignado a
              </motion.p>
              <motion.p
                className="assign-branch"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, type: 'spring', stiffness: 140 }}
              >
                {assigning.name}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

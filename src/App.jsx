import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AudioPlayer from './components/AudioPlayer';
import Intro from './components/Intro';
import BranchChoice from './components/BranchChoice';
import LetterGate from './components/LetterGate';
import Letter from './components/Letter';
import Invitation from './components/Invitation';
import { branches } from './data/branches';
import { getSavedChoice, clearChoice, markLetterUnlocked } from './lib/choiceStorage';
import './App.css';
import Particles from './components/Particles';

function resolveInitialState() {
  const saved = getSavedChoice();
  if (!saved) {
    return { screen: 'intro', branch: null, musicStarted: false };
  }

  const branch = branches.find((b) => b.id === saved.branchId) ?? null;
  if (!branch) {
    return { screen: 'intro', branch: null, musicStarted: false };
  }

  if (saved.letterUnlocked) {
    return { screen: 'letter', branch, musicStarted: true };
  }

  return { screen: 'letter-gate', branch, musicStarted: true };
}

export default function App() {
  const initial = resolveInitialState();
  const [screen, setScreen] = useState(initial.screen);
  const [selectedBranch, setSelectedBranch] = useState(initial.branch);
  const [musicStarted, setMusicStarted] = useState(initial.musicStarted);

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
    setScreen('invitation');
  };

  const handleStart = () => {
    setMusicStarted(true);
    setScreen('choice');
  };

  const handleLetterUnlock = () => {
    markLetterUnlocked();
    setScreen('letter');
  };

  const handleLetterAccept = () => {
    clearChoice();
    setSelectedBranch(null);
    setMusicStarted(false);
    setScreen('intro-finished');
  };

  return (
    <main className={`app app--${screen}`}>
      <Particles />
      <AudioPlayer shouldPlay={musicStarted} />
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <Intro key="intro" onStart={handleStart} />
        )}
        {screen === 'intro-finished' && (
          <Intro key="intro-finished" finished />
        )}
        {screen === 'choice' && (
          <BranchChoice key="choice" onSelect={handleSelectBranch} />
        )}
        {screen === 'letter-gate' && selectedBranch && (
          <LetterGate
            key="letter-gate"
            branch={selectedBranch}
            onUnlock={handleLetterUnlock}
          />
        )}
        {screen === 'letter' && selectedBranch && (
          <Letter key="letter" branch={selectedBranch} onAccept={handleLetterAccept} />
        )}
        {screen === 'invitation' && selectedBranch && (
          <Invitation key="invitation" branch={selectedBranch} />
        )}
      </AnimatePresence>
    </main>
  );
}

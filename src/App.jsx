import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AudioPlayer from './components/AudioPlayer';
import Intro from './components/Intro';
import BranchChoice from './components/BranchChoice';
import Invitation from './components/Invitation';
import './App.css';
import Particles from './components/Particles';

export default function App() {
  const [screen, setScreen] = useState('intro');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
    setScreen('invitation');
  };

  const handleStart = () => {
    setMusicStarted(true);
    setScreen('choice');
  };

  return (
    <main className={`app app--${screen}`}>
      <Particles />
      <AudioPlayer shouldPlay={musicStarted} />
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <Intro key="intro" onStart={handleStart} />
        )}
        {screen === 'choice' && (
          <BranchChoice key="choice" onSelect={handleSelectBranch} />
        )}
        {screen === 'invitation' && selectedBranch && (
          <Invitation key="invitation" branch={selectedBranch} />
        )}
      </AnimatePresence>
    </main>
  );
}

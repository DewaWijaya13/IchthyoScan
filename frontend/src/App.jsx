import { useState } from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import BackgroundParticles from './components/BackgroundParticles/BackgroundParticles';
import Dropzone from './components/Dropzone/Dropzone';
import ImagePreview from './components/ImagePreview/ImagePreview';
import ScanningView from './components/ScanningView/ScanningView';
import ResultCard from './components/ResultCard/ResultCard';
import UnknownCard from './components/UnknownCard/UnknownCard';
import SpeciesShowcase from './components/SpeciesShowcase/SpeciesShowcase';
import Footer from './components/Footer/Footer';
import Toast from './components/Toast/Toast';
import { AboutModal, GuideModal } from './components/Modal/Modal';
import { APP_STATES } from './utils/constants';
import { useScanAPI } from './hooks/useScanAPI';

function App() {
  const {
    appState,
    file,
    result,
    error,
    setError,
    handleFileSelect,
    scanImage,
    resetScan,
  } = useScanAPI();

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 font-sans">
      <BackgroundParticles />
      
      <Header 
        onOpenAbout={() => setIsAboutOpen(true)} 
        onOpenGuide={() => setIsGuideOpen(true)} 
      />

      <main className="flex-1 flex flex-col items-center w-full max-w-6xl mx-auto">
        {/* Only show Hero when idle or previewing */}
        {(appState === APP_STATES.IDLE || appState === APP_STATES.PREVIEW) && (
          <HeroSection />
        )}

        <div className="w-full max-w-2xl px-4 sm:px-6 animate-fade-in-up mt-4">
          {appState === APP_STATES.IDLE && (
            <Dropzone 
              onFileAccepted={handleFileSelect} 
              onValidationError={setError} 
            />
          )}

          {appState === APP_STATES.PREVIEW && (
            <ImagePreview 
              file={file} 
              onScan={scanImage} 
              onCancel={resetScan} 
            />
          )}

          {appState === APP_STATES.SCANNING && (
            <ScanningView file={file} />
          )}

          {appState === APP_STATES.RESULT_SUCCESS && (
            <ResultCard 
              file={file} 
              result={result} 
              onReset={resetScan} 
            />
          )}

          {appState === APP_STATES.RESULT_UNKNOWN && (
            <UnknownCard 
              file={file} 
              onReset={resetScan} 
            />
          )}
        </div>

        {/* Separator before showcase */}
        {(appState === APP_STATES.IDLE || appState === APP_STATES.RESULT_SUCCESS || appState === APP_STATES.RESULT_UNKNOWN) && (
          <div className="w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-16 sm:my-24" />
        )}

        {/* Always show species showcase unless scanning or previewing */}
        {appState !== APP_STATES.SCANNING && appState !== APP_STATES.PREVIEW && (
          <SpeciesShowcase />
        )}
        
        {/* Bottom padding for main */}
        <div className="h-16" />
      </main>

      <Footer />

      {/* Modals & Toasts */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      
      <Toast 
        message={error} 
        onClose={() => setError(null)} 
      />
    </div>
  );
}

export default App;

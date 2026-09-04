import React, { useState, useEffect, useRef } from 'react';
import {
  voiceCatalogService,
  SupportedLanguage,
  StructuredCatalogOutput,
  LANGUAGE_METADATA,
  PRESET_VOICE_SAMPLES
} from '../../services/voiceCatalogService';
import {
  Mic,
  MicOff,
  Volume2,
  Edit3,
  CheckCircle2,
  Sparkles,
  Languages,
  RotateCcw,
  Check,
  ArrowRight,
  Radio,
  FileText,
  AlertCircle
} from 'lucide-react';

interface VoiceCatalogerStepProps {
  onCatalogGenerated: (data: StructuredCatalogOutput, language: SupportedLanguage) => void;
  onNext: () => void;
  onBack: () => void;
}

export const VoiceCatalogerStep: React.FC<VoiceCatalogerStepProps> = ({
  onCatalogGenerated,
  onNext,
  onBack
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('Telugu');
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [catalogOutput, setCatalogOutput] = useState<StructuredCatalogOutput | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = LANGUAGE_METADATA[selectedLang].code;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setLiveTranscript(current);

        if (event.results[0].isFinal) {
          const generated = voiceCatalogService.parseSpeechToCatalog(current, selectedLang);
          setCatalogOutput(generated);
          onCatalogGenerated(generated, selectedLang);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error/fallback:', err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    // Default seed sample
    const sample = PRESET_VOICE_SAMPLES[selectedLang][0];
    setLiveTranscript(sample.transcript);
    setCatalogOutput(sample.output);
    onCatalogGenerated(sample.output, selectedLang);
  }, [selectedLang]);

  const handleStartRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = LANGUAGE_METADATA[selectedLang].code;
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        // Fallback simulation if already started or blocked
        simulateVoiceInput();
      }
    } else {
      simulateVoiceInput();
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current && isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
  };

  const simulateVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      const sample = PRESET_VOICE_SAMPLES[selectedLang][0];
      setLiveTranscript(sample.transcript);
      setCatalogOutput(sample.output);
      onCatalogGenerated(sample.output, selectedLang);
      setIsRecording(false);
    }, 2000);
  };

  const handleSelectPreset = (sample: (typeof PRESET_VOICE_SAMPLES)['Telugu'][0]) => {
    setLiveTranscript(sample.transcript);
    setCatalogOutput(sample.output);
    onCatalogGenerated(sample.output, selectedLang);
  };

  const handleTextChange = (text: string) => {
    setLiveTranscript(text);
    const generated = voiceCatalogService.parseSpeechToCatalog(text, selectedLang);
    setCatalogOutput(generated);
    onCatalogGenerated(generated, selectedLang);
  };

  const handlePlayVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsPlayingAudio(true);
      const textToSpeak = catalogOutput
        ? `${catalogOutput.title}. ${catalogOutput.description}`
        : liveTranscript;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = LANGUAGE_METADATA[selectedLang].code;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  const langMeta = LANGUAGE_METADATA[selectedLang];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-craft-700 bg-craft-50 px-3 py-1 rounded-full border border-craft-200">
          Step 2 • Multilingual Voice Cataloger
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
          Speak in Your Regional Language
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Select Telugu, Hindi, Tamil, or English. Speak into your microphone or choose from craft voice samples below.
        </p>
      </div>

      {/* Language Selector */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {(['Telugu', 'Hindi', 'Tamil', 'English'] as SupportedLanguage[]).map((lang) => {
          const meta = LANGUAGE_METADATA[lang];
          const isSelected = selectedLang === lang;
          return (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLang(lang)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-craft-600 text-white shadow-md shadow-craft-600/25 ring-2 ring-craft-400'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>{meta.label}</span>
              <span className="opacity-80 text-[11px] font-normal font-mono">({meta.nativeLabel})</span>
            </button>
          );
        })}
      </div>

      {/* Live Voice Recording Console */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
        <div className="max-w-xl mx-auto space-y-5">
          {/* Main Record Button with Wave Animation */}
          <div className="relative inline-block">
            {isRecording && (
              <>
                <span className="animate-ping absolute -inset-4 rounded-full bg-rose-400 opacity-75" />
                <span className="animate-pulse absolute -inset-8 rounded-full bg-rose-200 opacity-40" />
              </>
            )}
            <button
              type="button"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative shadow-xl ${
                isRecording
                  ? 'bg-rose-600 text-white scale-105'
                  : 'bg-gradient-to-tr from-craft-600 to-craft-500 hover:from-craft-700 hover:to-craft-600 text-white hover:scale-105 shadow-craft-600/30'
              }`}
            >
              {isRecording ? <MicOff className="w-9 h-9 animate-bounce" /> : <Mic className="w-9 h-9" />}
              <span className="text-[11px] font-bold uppercase tracking-wider mt-1">
                {isRecording ? 'Listening...' : 'Tap & Speak'}
              </span>
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800">
              {isRecording
                ? `Recording in ${langMeta.label} (${langMeta.code})... Speak clearly about your craft.`
                : `Tap the microphone to speak in ${langMeta.label}, or type / choose samples below.`}
            </p>
            <p className="text-[11px] text-slate-400">
              Supported Code: <span className="font-mono">{langMeta.code}</span>
            </p>
          </div>

          {/* Quick Voice Preset Phrases (for 1-click testing) */}
          <div className="text-left bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
              Quick Craft Voice Presets ({langMeta.label}):
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_VOICE_SAMPLES[selectedLang].map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(s)}
                  className="px-3 py-2 bg-white hover:bg-craft-50 border border-slate-200 hover:border-craft-400 rounded-xl text-left text-xs font-semibold text-slate-800 transition-all flex items-center gap-1.5"
                >
                  <span>🗣️</span>
                  <span className="line-clamp-1">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Transcript & Manual Input Box */}
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 text-left space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-950 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-craft-600" />
                <span>Recognized Speech Transcript ({langMeta.label})</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayVoice}
                  className="text-craft-700 hover:text-craft-900 font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'Playing...' : 'Play Speech'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Save Text' : 'Type / Edit'}</span>
                </button>
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={liveTranscript}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={langMeta.promptPlaceholder}
                rows={3}
                className="w-full p-3 rounded-xl border border-amber-300 text-xs text-slate-900 focus:border-craft-600 bg-white font-medium"
              />
            ) : (
              <p className="text-xs text-slate-800 italic leading-relaxed font-medium bg-white p-3 rounded-xl border border-amber-100 shadow-xs">
                "{liveTranscript || langMeta.promptPlaceholder}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI Structured Product Output Card */}
      {catalogOutput && (
        <div className="bg-craft-50/70 rounded-3xl p-6 sm:p-8 border-2 border-craft-200 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-slate-900 text-base">
                AI Extracted Product Spec Sheet
              </h4>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              ✓ Ready for Marketplace
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Generated Title
                </label>
                <input
                  type="text"
                  value={catalogOutput.title}
                  onChange={(e) => {
                    const upd = { ...catalogOutput, title: e.target.value };
                    setCatalogOutput(upd);
                    onCatalogGenerated(upd, selectedLang);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-craft-200 font-bold text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Story & Craft Description
                </label>
                <textarea
                  value={catalogOutput.description}
                  onChange={(e) => {
                    const upd = { ...catalogOutput, description: e.target.value };
                    setCatalogOutput(upd);
                    onCatalogGenerated(upd, selectedLang);
                  }}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-white border border-craft-200 text-xs text-slate-700 leading-relaxed font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Craft Category
                </label>
                <span className="inline-block px-3 py-1.5 rounded-xl bg-white font-bold text-xs text-craft-700 border border-craft-200">
                  {catalogOutput.category}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  Identified Materials
                </label>
                <div className="flex flex-wrap gap-1">
                  {catalogOutput.materials.map((m, i) => (
                    <span key={i} className="text-[11px] bg-white px-2 py-0.5 rounded border border-craft-200 text-slate-700 font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                  SEO Tags
                </label>
                <div className="flex flex-wrap gap-1">
                  {catalogOutput.tags.map((t, i) => (
                    <span key={i} className="text-[10px] font-semibold text-craft-700 bg-craft-100/80 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nav buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
        >
          &larr; Back to Photo Studio
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-xs shadow-md shadow-craft-600/20 flex items-center gap-1.5"
        >
          <span>Accept & Next: Dynamic Pricing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

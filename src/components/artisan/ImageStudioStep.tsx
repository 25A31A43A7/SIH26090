import React, { useState } from 'react';
import { imageEnhancementService, EnhancementOptions } from '../../services/imageEnhancementService';
import { Camera, Sparkles, Wand2, Check, RefreshCw, Layers, SunMedium, Crop } from 'lucide-react';

interface ImageStudioStepProps {
  originalImage: string;
  onImageEnhanced: (enhancedUrl: string, originalUrl: string) => void;
  onNext: () => void;
}

const SAMPLE_ARTISAN_IMAGES = [
  {
    label: 'Kondapalli Softwood Toy',
    url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Jaipur Blue Ceramic Pot',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Handloom Silk Saree Weave',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'
  },
  {
    label: 'Assam Bamboo Lamp',
    url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800'
  }
];

export const ImageStudioStep: React.FC<ImageStudioStepProps> = ({
  originalImage,
  onImageEnhanced,
  onNext
}) => {
  const [selectedImg, setSelectedImg] = useState<string>(originalImage || SAMPLE_ARTISAN_IMAGES[0].url);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [backdrop, setBackdrop] = useState<EnhancementOptions['backdropTheme']>('studio-white');
  const [removeBg, setRemoveBg] = useState(true);
  const [autoLighting, setAutoLighting] = useState(true);
  const [crop1to1, setCrop1to1] = useState(true);

  const handleRunEnhancement = async () => {
    setIsEnhancing(true);
    const result = await imageEnhancementService.enhanceImage(selectedImg, {
      removeBackground: removeBg,
      enhanceLighting: autoLighting,
      autoCrop: crop1to1,
      backdropTheme: backdrop,
      brightness: 15,
      contrast: 12
    });
    setIsEnhancing(false);
    setIsEnhanced(true);
    onImageEnhanced(result.enhancedUrl, selectedImg);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImg(reader.result as string);
        setIsEnhanced(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-craft-700 bg-craft-50 px-3 py-1 rounded-full border border-craft-200">
          Step 1 • AI Image Studio
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
          Transform Your Mobile Photo
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Our AI eliminates messy workshop backgrounds, balances lighting, and formats for professional e-commerce buyers.
        </p>
      </div>

      {/* Preset sample selector */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 text-center">
          Choose a sample handicraft photo or upload your own:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_ARTISAN_IMAGES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedImg(sample.url);
                setIsEnhanced(false);
              }}
              className={`p-2 rounded-2xl border text-left transition-all overflow-hidden ${
                selectedImg === sample.url
                  ? 'border-craft-600 ring-2 ring-craft-400 bg-craft-50'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <img src={sample.url} alt={sample.label} className="w-full h-24 object-cover rounded-xl mb-1.5" />
              <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{sample.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 text-center">
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors">
            <Camera className="w-4 h-4 text-craft-600" />
            <span>Upload from Mobile / Camera</span>
            <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Before */}
        <div className="bg-slate-100 rounded-3xl p-4 border border-slate-200 text-center">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2 px-2">
            <span>Original Artisan Photo</span>
            <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded">Raw Mobile Cam</span>
          </div>
          <div className="h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-200 relative">
            <img src={selectedImg} alt="Before" className="w-full h-full object-cover filter brightness-90 contrast-95" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Workshop lighting • Busy background</p>
        </div>

        {/* After (AI Studio) */}
        <div className="bg-craft-50/70 rounded-3xl p-4 border-2 border-craft-300 text-center relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-craft-800 mb-2 px-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Enhanced Preview</span>
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300">
              E-Commerce Ready
            </span>
          </div>

          <div
            style={{
              background: backdrop === 'studio-white'
                ? 'radial-gradient(circle, #ffffff 0%, #f1ede6 100%)'
                : backdrop === 'warm-terracotta'
                ? 'radial-gradient(circle, #fdf8f5 0%, #ecd7ca 100%)'
                : 'radial-gradient(circle, #fbfaf8 0%, #e6decb 100%)'
            }}
            className="h-64 sm:h-72 rounded-2xl overflow-hidden relative flex items-center justify-center p-3 shadow-inner border border-craft-200"
          >
            <img
              src={selectedImg}
              alt="Enhanced Preview"
              className={`max-h-full max-w-full object-contain drop-shadow-xl transition-all duration-500 ${
                isEnhanced ? 'scale-100 filter brightness-105 contrast-105 saturate-110' : 'scale-95 filter brightness-95'
              }`}
            />

            {isEnhancing && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-2" />
                <p className="text-xs font-bold">Removing background & balancing lighting...</p>
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-craft-800 font-semibold">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Showroom Studio Clean • 1:1 Square Auto-Crop</span>
          </div>
        </div>
      </div>

      {/* AI Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={removeBg} onChange={(e) => setRemoveBg(e.target.checked)} className="accent-craft-600 rounded" />
            <span>AI Background Removal</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={autoLighting} onChange={(e) => setAutoLighting(e.target.checked)} className="accent-craft-600 rounded" />
            <span>Auto White-Balance</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunEnhancement}
            disabled={isEnhancing}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Wand2 className="w-4 h-4" />
            <span>{isEnhancing ? 'Processing...' : 'Run AI Enhancement'}</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 rounded-xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-xs shadow-md shadow-craft-600/20 transition-all"
          >
            Accept & Next: Voice Description &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

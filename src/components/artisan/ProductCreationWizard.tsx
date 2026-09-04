import React, { useState } from 'react';
import { ProductCategory, Product } from '../../types';
import { ImageStudioStep } from './ImageStudioStep';
import { VoiceCatalogerStep } from './VoiceCatalogerStep';
import { PricingAssistantStep } from './PricingAssistantStep';
import { ProductPreviewStep } from './ProductPreviewStep';
import { StructuredCatalogOutput, SupportedLanguage } from '../../services/voiceCatalogService';
import { Sparkles, Camera, Mic, Calculator, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ProductCreationWizardProps {
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  onCancel: () => void;
  onSuccess: (product: Product) => void;
}

export const ProductCreationWizard: React.FC<ProductCreationWizardProps> = ({
  artisanId,
  artisanName,
  artisanLocation,
  onCancel,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Accumulated wizard state
  const [wizardData, setWizardData] = useState({
    name: 'Kondapalli Traditional Dancing Doll',
    category: 'Wooden Crafts' as ProductCategory,
    description: 'Authentic handcrafted bobblehead dancing doll from Kondapalli artisans.',
    materials: ['Poniki Softwood', 'Natural Vegetable Dyes', 'Tamarind Glue'],
    tags: ['Kondapalli', 'GI Tagged', 'Dancing Doll'],
    price: 850,
    quantity: 15,
    enhancedImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    originalImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    artisanId,
    artisanName,
    artisanLocation,
    rawCost: 280,
    labourHours: 9,
    aiSuggestedPrice: 850,
    priceRange: { min: 750, max: 950 }
  });

  const steps = [
    { label: 'AI Image Studio', icon: Camera },
    { label: 'Voice Catalog', icon: Mic },
    { label: 'Fair Pricing', icon: Calculator },
    { label: 'Govt Approval', icon: CheckCircle2 }
  ];

  const handleImageEnhanced = (enhancedUrl: string, originalUrl: string) => {
    setWizardData((prev) => ({ ...prev, enhancedImage: enhancedUrl, originalImage: originalUrl }));
  };

  const handleCatalogGenerated = (data: StructuredCatalogOutput, lang: SupportedLanguage) => {
    setWizardData((prev) => ({
      ...prev,
      name: data.title,
      category: data.category,
      description: data.description,
      materials: data.materials,
      tags: data.tags,
      rawCost: data.suggestedRawCost,
      labourHours: data.suggestedLabourHours
    }));
  };

  const handlePriceFinalized = (
    price: number,
    rawCost: number,
    labourHours: number,
    aiSuggested: number,
    range: { min: number; max: number }
  ) => {
    setWizardData((prev) => ({
      ...prev,
      price,
      rawCost,
      labourHours,
      aiSuggestedPrice: aiSuggested,
      priceRange: range
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Wizard Header & Step Indicator */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-extrabold text-white">AI Product Creation Wizard</h2>
              <p className="text-xs text-amber-400 font-medium">
                Photo Studio &rarr; Regional Voice &rarr; Dynamic Pricing &rarr; Govt Verification
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-white font-semibold"
          >
            Cancel Listing
          </button>
        </div>

        {/* Step Progress Pills */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                onClick={() => isDone && setCurrentStep(idx)}
                className={`flex items-center gap-2 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-craft-600/90 border-craft-400 text-white font-bold ring-2 ring-craft-500/50'
                    : isDone
                    ? 'bg-slate-800/80 border-slate-700 text-emerald-400 font-semibold'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs flex-shrink-0 ${
                    isCurrent
                      ? 'bg-white text-craft-700'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs truncate hidden sm:inline">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-10">
        {currentStep === 0 && (
          <ImageStudioStep
            originalImage={wizardData.originalImage}
            onImageEnhanced={handleImageEnhanced}
            onNext={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 1 && (
          <VoiceCatalogerStep
            onCatalogGenerated={handleCatalogGenerated}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        )}

        {currentStep === 2 && (
          <PricingAssistantStep
            category={wizardData.category}
            initialRawCost={wizardData.rawCost}
            initialLabourHours={wizardData.labourHours}
            onPriceFinalized={handlePriceFinalized}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <ProductPreviewStep
            productData={wizardData}
            onEditStep={(stepIdx) => setCurrentStep(stepIdx)}
            onSubmitComplete={(product) => onSuccess(product)}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
};

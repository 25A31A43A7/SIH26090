import React, { useState, useEffect } from 'react';
import { pricingService, PricingCalculation } from '../../services/pricingService';
import { ProductCategory } from '../../types';
import { Calculator, Sparkles, IndianRupee, ShieldCheck, Check, ArrowRight } from 'lucide-react';

interface PricingAssistantStepProps {
  category: ProductCategory;
  initialRawCost?: number;
  initialLabourHours?: number;
  onPriceFinalized: (price: number, rawCost: number, labourHours: number, aiSuggested: number, range: { min: number; max: number }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PricingAssistantStep: React.FC<PricingAssistantStepProps> = ({
  category,
  initialRawCost = 280,
  initialLabourHours = 9,
  onPriceFinalized,
  onNext,
  onBack
}) => {
  const [rawCost, setRawCost] = useState<number>(initialRawCost);
  const [labourHours, setLabourHours] = useState<number>(initialLabourHours);
  const [hourlyWage, setHourlyWage] = useState<number>(65);
  const [finalPrice, setFinalPrice] = useState<number>(850);
  const [calculation, setCalculation] = useState<PricingCalculation>(
    pricingService.calculateSuggestedPrice(initialRawCost, initialLabourHours, category, 65)
  );

  useEffect(() => {
    const calc = pricingService.calculateSuggestedPrice(rawCost, labourHours, category, hourlyWage);
    setCalculation(calc);
    setFinalPrice(calc.aiSuggestedPrice);
    onPriceFinalized(calc.aiSuggestedPrice, rawCost, labourHours, calc.aiSuggestedPrice, calc.marketRange);
  }, [rawCost, labourHours, category, hourlyWage]);

  const handlePriceChange = (val: number) => {
    setFinalPrice(val);
    onPriceFinalized(val, rawCost, labourHours, calculation.aiSuggestedPrice, calculation.marketRange);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-craft-700 bg-craft-50 px-3 py-1 rounded-full border border-craft-200">
          Step 3 • AI Dynamic Pricing Assistant
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
          Fair Profit & Transparent Pricing
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Our algorithm ensures your handcraft hours are properly valued based on national GI handicraft wage benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Cost Input Sliders */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Calculator className="w-5 h-5 text-craft-600" />
            <span>Craft Effort & Cost Inputs</span>
          </h4>

          {/* Raw Material Cost */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <label className="font-bold text-slate-700 uppercase">
                Raw Material & Pigments Cost
              </label>
              <span className="font-mono font-bold text-craft-700 text-sm">
                ₹{rawCost}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="20"
              value={rawCost}
              onChange={(e) => setRawCost(parseInt(e.target.value))}
              className="w-full accent-craft-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400">Softwood, natural dyes, glazes, silk threads</span>
          </div>

          {/* Labour Hours */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <label className="font-bold text-slate-700 uppercase">
                Time Spent Handcrafting
              </label>
              <span className="font-mono font-bold text-craft-700 text-sm">
                {labourHours} Hours
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={labourHours}
              onChange={(e) => setLabourHours(parseInt(e.target.value))}
              className="w-full accent-craft-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400">Chiseling, carving, weaving, firing, painting</span>
          </div>

          {/* Hourly Fair Wage Benchmark */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <label className="font-bold text-slate-700 uppercase">
                Hourly Artisan Wage Benchmark
              </label>
              <span className="font-mono font-bold text-emerald-700 text-sm">
                ₹{hourlyWage} / hr
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              step="5"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400">Ministry of Textiles skilled artisan standard</span>
          </div>
        </div>

        {/* Right Column: AI Suggested Output */}
        <div className="bg-craft-50/70 rounded-3xl p-6 sm:p-8 border-2 border-craft-300 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-craft-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-bold uppercase text-craft-900 tracking-wider">
                  AI Fair Price Recommendation
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                +{calculation.profitPercentage}% Profit Margin
              </span>
            </div>

            {/* Estimated Market Range & AI Suggested Price */}
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-4 rounded-2xl border border-craft-200 shadow-xs">
                <span className="text-[11px] text-slate-500 font-semibold uppercase block">
                  Market Range
                </span>
                <span className="text-lg font-bold text-slate-800 font-mono mt-1 block">
                  ₹{calculation.marketRange.min} – ₹{calculation.marketRange.max}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-craft-500 shadow-sm">
                <span className="text-[11px] text-craft-700 font-bold uppercase block">
                  AI Suggested Price
                </span>
                <span className="text-2xl font-extrabold text-craft-700 font-mono mt-0.5 block">
                  ₹{calculation.aiSuggestedPrice}
                </span>
              </div>
            </div>

            {/* Cost Breakdown Accordion */}
            <div className="mt-5 bg-white rounded-2xl p-4 border border-craft-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Raw Material Cost</span>
                <span className="font-semibold text-slate-900">₹{calculation.rawMaterialCost}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Artisan Labour Value ({calculation.labourHours} hrs @ ₹{calculation.hourlyArtisanWage}/hr)</span>
                <span className="font-semibold text-slate-900">₹{calculation.labourCost}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Protective Packaging Margin</span>
                <span className="font-semibold text-slate-900">₹{calculation.packagingLogisticsCost}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold pt-2 border-t border-slate-100">
                <span>Artisan Direct Profit</span>
                <span>₹{calculation.fairProfitMargin}</span>
              </div>
            </div>

            {/* Editable Final Price Input */}
            <div className="mt-5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1">
                Your Final Selling Price (₹)
              </label>
              <div className="relative">
                <IndianRupee className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={finalPrice}
                  onChange={(e) => handlePriceChange(parseInt(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-craft-400 font-extrabold text-lg text-slate-900 focus:border-craft-600"
                />
              </div>
              <p className="text-[11px] text-craft-800 font-medium mt-1 italic">
                * Final selling price is decided by the artisan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
        >
          &larr; Back to Voice Cataloger
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-xs shadow-md shadow-craft-600/20 flex items-center gap-1.5"
        >
          <span>Accept & Next: Review & Submit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

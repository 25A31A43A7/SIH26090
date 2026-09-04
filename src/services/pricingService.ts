import { ProductCategory } from '../types';

export interface PricingCalculation {
  rawMaterialCost: number;
  labourHours: number;
  hourlyArtisanWage: number;
  labourCost: number;
  packagingLogisticsCost: number;
  fairProfitMargin: number; // In Rupees
  profitPercentage: number;
  aiSuggestedPrice: number;
  marketRange: {
    min: number;
    max: number;
  };
  recommendationReason: string;
  marketComparisonNote: string;
}

class PricingService {
  private categoryMultipliers: Record<ProductCategory, number> = {
    'Pottery': 1.25,
    'Handloom': 1.35,
    'Wooden Crafts': 1.3,
    'Bamboo Crafts': 1.2,
    'Traditional Textiles': 1.4,
    'Paintings': 1.5,
    'Home Decor': 1.28,
    'Other Handicrafts': 1.22
  };

  calculateSuggestedPrice(
    rawMaterialCost: number,
    labourHours: number,
    category: ProductCategory = 'Wooden Crafts',
    hourlyWage: number = 65 // Fair standard artisan hourly wage
  ): PricingCalculation {
    const validRawCost = Math.max(0, rawMaterialCost);
    const validHours = Math.max(1, labourHours);
    const labourCost = Math.round(validHours * hourlyWage);
    const packagingLogisticsCost = Math.round(validRawCost * 0.12 + 40);

    const baseCost = validRawCost + labourCost + packagingLogisticsCost;
    const craftMultiplier = this.categoryMultipliers[category] || 1.3;

    // Suggested price includes a 28% fair trade artisan margin
    const suggestedPrice = Math.round(baseCost * craftMultiplier);
    const fairProfitMargin = Math.round(suggestedPrice - baseCost);
    const profitPercentage = Math.round((fairProfitMargin / suggestedPrice) * 100);

    const minRange = Math.round(suggestedPrice * 0.88);
    const maxRange = Math.round(suggestedPrice * 1.18);

    const recommendationReason = `Based on ₹${validRawCost} raw materials + ${validHours} hours of skilled craftwork (at fair wage ₹${hourlyWage}/hr) + ₹${packagingLogisticsCost} protective packaging. Applies a ${profitPercentage}% fair-trade margin aligned with ${category} marketplace demand.`;

    const marketComparisonNote = `Similar hand-crafted ${category} products in urban retail markets sell between ₹${minRange} and ₹${maxRange}. Direct digital listing ensures you retain 100% of the artisan earnings.`;

    return {
      rawMaterialCost: validRawCost,
      labourHours: validHours,
      hourlyArtisanWage: hourlyWage,
      labourCost,
      packagingLogisticsCost,
      fairProfitMargin,
      profitPercentage,
      aiSuggestedPrice: suggestedPrice,
      marketRange: { min: minRange, max: maxRange },
      recommendationReason,
      marketComparisonNote
    };
  }
}

export const pricingService = new PricingService();

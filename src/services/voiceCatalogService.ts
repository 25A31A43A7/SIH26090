import { ProductCategory } from '../types';

export type SupportedLanguage = 'Telugu' | 'Hindi' | 'Tamil' | 'English';

export interface StructuredCatalogOutput {
  title: string;
  category: ProductCategory;
  description: string;
  materials: string[];
  tags: string[];
  seoKeywords: string[];
  suggestedRawCost: number;
  suggestedLabourHours: number;
  detectedLanguage: SupportedLanguage;
  rawTranscript: string;
  englishTranslation: string;
}

export const LANGUAGE_METADATA: Record<
  SupportedLanguage,
  { code: string; label: string; nativeLabel: string; promptPlaceholder: string }
> = {
  Telugu: {
    code: 'te-IN',
    label: 'Telugu',
    nativeLabel: 'తెలుగు',
    promptPlaceholder: 'కొండపల్లి బొమ్మలు, చేనేత చీరలు లేదా మీ హస్తకళ గురించి మాట్లాడండి...'
  },
  Hindi: {
    code: 'hi-IN',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    promptPlaceholder: 'जयपुर की नीली मिट्टी, बनारसी साड़ी या अपने हस्तशिल्प के बारे में बोलें...'
  },
  Tamil: {
    code: 'ta-IN',
    label: 'Tamil',
    nativeLabel: 'தமிழ்',
    promptPlaceholder: 'தஞ்சாவூர் கலைத்தட்டு, காஞ்சிபுரம் பட்டு அல்லது உங்கள் கைவினைப்பொருள் பற்றி பேசுங்கள்...'
  },
  English: {
    code: 'en-IN',
    label: 'English',
    nativeLabel: 'English (India)',
    promptPlaceholder: 'Describe your handloom textile, pottery, bamboo craft, or wood carving...'
  }
};

export const PRESET_VOICE_SAMPLES: Record<
  SupportedLanguage,
  Array<{ title: string; transcript: string; translation: string; output: StructuredCatalogOutput }>
> = {
  Telugu: [
    {
      title: 'కొండపల్లి నృత్య బొమ్మ (Kondapalli Dancing Doll)',
      transcript: 'ఇది సంప్రదాయ కొండపల్లి నృత్య బొమ్మ. పొనికి చెక్కతో చెక్కి సహజమైన చింతగింజల రంగులతో వేశారు. తల ఊగుతూ అందంగా ఉంటుంది.',
      translation: 'This is a traditional Kondapalli dancing doll. Hand-carved from softwood and painted with natural tamarind seed dyes. The bobblehead balances with a brass spring.',
      output: {
        title: 'Kondapalli Handcrafted Traditional Dancing Bobblehead Doll',
        category: 'Wooden Crafts',
        description: 'Authentic Kondapalli dancing doll hand-chiseled from lightweight native Poniki softwood. Painted by master artisans using organic tamarind seed paste and eco-friendly vegetable pigments. Features a precision balanced brass spring mechanism.',
        materials: ['Poniki Softwood', 'Tamarind Seed Paste', 'Natural Mineral Dyes', 'Brass Spring Mechanism'],
        tags: ['Kondapalli', 'GI Tagged', 'Dancing Doll', 'Heritage Woodcraft', 'Eco-friendly'],
        seoKeywords: ['Kondapalli toys online', 'Telugu dancing doll', 'Handmade wooden bobblehead', 'Andhra GI craft'],
        suggestedRawCost: 280,
        suggestedLabourHours: 9,
        detectedLanguage: 'Telugu',
        rawTranscript: 'ఇది సంప్రదాయ కొండపల్లి నృత్య బొమ్మ. పొనికి చెక్కతో చెక్కి సహజమైన చింతగింజల రంగులతో వేశారు. తల ఊగుతూ అందంగా ఉంటుంది.',
        englishTranslation: 'This is a traditional Kondapalli dancing doll. Hand-carved from softwood and painted with natural tamarind seed dyes. The bobblehead balances with a brass spring.'
      }
    },
    {
      title: 'పోచంపల్లి పట్టు చీర (Pochampally Silk Saree)',
      transcript: 'ఇది పోచంపల్లి డబుల్ ఇక్కత్ స్వచ్ఛమైన పట్టు చీర. చేమగ్గంపై సహజ రంగులతో జ్యామితీయ నమూనాలతో నేయబడింది.',
      translation: 'This is a Pochampally double Ikat pure silk saree. Handwoven on traditional pit looms with natural dyes and geometric patterns.',
      output: {
        title: 'Pochampally Pure Mulberry Silk Double Ikat Saree',
        category: 'Traditional Textiles',
        description: 'Heritage handloom saree crafted with precision tie-and-dye Ikat patterns in Telangana. Woven using 100% pure certified mulberry silk and organic dyes.',
        materials: ['Pure Mulberry Silk', 'Natural Indigo Dye', 'Zari Border'],
        tags: ['Pochampally', 'Handloom Silk', 'Double Ikat', 'Telangana Heritage'],
        seoKeywords: ['Pochampally silk saree', 'Double ikat handloom', 'Indian traditional saree'],
        suggestedRawCost: 950,
        suggestedLabourHours: 24,
        detectedLanguage: 'Telugu',
        rawTranscript: 'ఇది పోచంపల్లి డబుల్ ఇక్కత్ స్వచ్ఛమైన పట్టు చీర. చేమగ్గంపై సహజ రంగులతో జ్యామితీయ నమూనాలతో నేయబడింది.',
        englishTranslation: 'This is a Pochampally double Ikat pure silk saree. Handwoven on traditional pit looms with natural dyes and geometric patterns.'
      }
    }
  ],
  Hindi: [
    {
      title: 'जयपुर नीली मिट्टी फूलदान (Jaipur Blue Pottery Vase)',
      transcript: 'यह जयपुर की पारंपरिक नीली मिट्टी का फूलदान है। क्वार्ट्ज और मुल्तानी मिट्टी से हाथ से बना है और इस पर फारसी नीले फूल चित्रित हैं।',
      translation: 'This is a traditional Jaipur blue pottery vase. Handmade from quartz and Multani clay and hand-painted with Persian floral motifs.',
      output: {
        title: 'Jaipur Heritage Cobalt Floral Blue Pottery Ceramic Vase',
        category: 'Pottery',
        description: 'Exquisite quartz ceramic vase hand-shaped and painted with iconic cobalt blue Persian flora. Fired at low temperatures with lead-free glazes for an heirloom luster.',
        materials: ['Quartz Powder', 'Multani Mitti', 'Natural Plant Gum', 'Cobalt Oxide Glaze'],
        tags: ['Blue Pottery', 'Jaipur Craft', 'Ceramic Tableware', 'Persian Floral'],
        seoKeywords: ['Jaipur blue pottery vase', 'Indian handmade pottery', 'Cobalt ceramic decor'],
        suggestedRawCost: 450,
        suggestedLabourHours: 12,
        detectedLanguage: 'Hindi',
        rawTranscript: 'यह जयपुर की पारंपरिक नीली मिट्टी का फूलदान है। क्वार्ट्ज और मुल्तानी मिट्टी से हाथ से बना है और इस पर फारसी नीले फूल चित्रित हैं।',
        englishTranslation: 'This is a traditional Jaipur blue pottery vase. Handmade from quartz and Multani clay and hand-painted with Persian floral motifs.'
      }
    },
    {
      title: 'मधुबनी पेंटिंग (Madhubani Canvas Art)',
      transcript: 'यह बिहार की पारंपरिक मधुबनी पेंटिंग है। बांस की तीली और प्राकृतिक रंगों से जीवन का वृक्ष चित्रित किया गया है।',
      translation: 'This is a traditional Madhubani painting from Bihar. Depicts the Tree of Life hand-drawn using bamboo twigs and natural organic colors.',
      output: {
        title: 'Madhubani Sacred Tree of Life Folk Canvas Painting',
        category: 'Paintings',
        description: 'Authentic Mithila folk painting crafted by rural artists depicting birds and aquatic life on handmade paper using nib pens and soot black.',
        materials: ['Handmade Cotton Paper', 'Natural Soot Black', 'Turmeric Pigments'],
        tags: ['Madhubani', 'Mithila Folk Art', 'Tree of Life', 'Bihar Heritage'],
        seoKeywords: ['Madhubani painting online', 'Indian folk canvas art', 'Mithila handmade decor'],
        suggestedRawCost: 400,
        suggestedLabourHours: 16,
        detectedLanguage: 'Hindi',
        rawTranscript: 'यह बिहार की पारंपरिक मधुबनी पेंटिंग है। बांस की तीली और प्राकृतिक रंगों से जीवन का वृक्ष चित्रित किया गया है।',
        englishTranslation: 'This is a traditional Madhubani painting from Bihar. Depicts the Tree of Life hand-drawn using bamboo twigs and natural organic colors.'
      }
    }
  ],
  Tamil: [
    {
      title: 'தஞ்சாவூர் மர வேலைப்பாடு (Thanjavur Teakwood Plate)',
      transcript: 'இது தஞ்சாவூர் பாரம்பரிய கைவினை மர செதுக்கல் தட்டு. தேக்கு மரத்தில் இயற்கையான தேன் மெழுகு பாலிஷ் செய்யப்பட்டு கோவில் கலை நுணுக்கத்துடன் செய்யப்பட்டது.',
      translation: 'This is a Thanjavur traditional wood-carved plate. Hand-chiseled on teakwood with natural beeswax polish inspired by temple architecture.',
      output: {
        title: 'Thanjavur Hand-Carved Teakwood Temple Relief Wall Plate',
        category: 'Wooden Crafts',
        description: 'Intricately chiseled decorative wooden plaque crafted from seasoned reclaimed teakwood with traditional temple mandala relief work.',
        materials: ['Seasoned Teakwood', 'Natural Beeswax Polish', 'Brass Mounting Bracket'],
        tags: ['Thanjavur Woodcraft', 'Tamil Nadu Heritage', 'Temple Relief Art'],
        seoKeywords: ['Thanjavur wood carving', 'Handmade teakwood decor', 'South Indian temple art'],
        suggestedRawCost: 520,
        suggestedLabourHours: 14,
        detectedLanguage: 'Tamil',
        rawTranscript: 'இது தஞ்சாவூர் பாரம்பரிய கைவினை மர செதுக்கல் தட்டு. தேக்கு மரத்தில் இயற்கையான தேன் மெழுகு பாலிஷ் செய்யப்பட்டு கோவில் கலை நுணுக்கத்துடன் செய்யப்பட்டது.',
        englishTranslation: 'This is a Thanjavur traditional wood-carved plate. Hand-chiseled on teakwood with natural beeswax polish inspired by temple architecture.'
      }
    }
  ],
  English: [
    {
      title: 'Assam Golden Bamboo Pendant Lamp',
      transcript: 'Handwoven eco-friendly golden river bamboo ceiling pendant lamp crafted by rural artisan women cooperative in Assam.',
      translation: 'Handwoven eco-friendly golden river bamboo ceiling pendant lamp crafted by rural artisan women cooperative in Assam.',
      output: {
        title: 'Assam Sustainable Handwoven Golden Bamboo Pendant Lamp',
        category: 'Bamboo Crafts',
        description: 'Contemporary eco-friendly pendant light hand-woven by rural artisan women. Crafted using matured golden river bamboo and natural cane weaves.',
        materials: ['Seasoned Assam Bamboo', 'Natural Cane Weave', 'Brass Fixture'],
        tags: ['Bamboo Craft', 'Eco Lighting', 'Assam Handicrafts', 'Sustainable Living'],
        seoKeywords: ['Handwoven bamboo lamp', 'Eco sustainable pendant light', 'Assam handicrafts'],
        suggestedRawCost: 340,
        suggestedLabourHours: 8,
        detectedLanguage: 'English',
        rawTranscript: 'Handwoven eco-friendly golden river bamboo ceiling pendant lamp crafted by rural artisan women cooperative in Assam.',
        englishTranslation: 'Handwoven eco-friendly golden river bamboo ceiling pendant lamp crafted by rural artisan women cooperative in Assam.'
      }
    }
  ]
};

class VoiceCatalogService {
  parseSpeechToCatalog(text: string, language: SupportedLanguage): StructuredCatalogOutput {
    if (!text || text.trim().length < 5) {
      return PRESET_VOICE_SAMPLES[language][0].output;
    }

    // Check if it matches any preset closely
    const presets = PRESET_VOICE_SAMPLES[language];
    const match = presets.find((p) => text.includes(p.transcript.substring(0, 15)));
    if (match) {
      return match.output;
    }

    // Dynamic keyword analysis
    const lower = text.toLowerCase();
    let category: ProductCategory = 'Wooden Crafts';
    let materials = ['Local Indigenous Materials', 'Organic Vegetable Colors'];
    let tags = ['Handmade', 'Artisan Direct', 'Indian Heritage'];

    if (lower.includes('pottery') || lower.includes('clay') || lower.includes('मिट्टी') || lower.includes('కుండ') || lower.includes('மண்')) {
      category = 'Pottery';
      materials = ['Natural River Clay', 'Organic Glaze', 'Wood-fired Finish'];
      tags.push('Pottery', 'Terracotta');
    } else if (lower.includes('saree') || lower.includes('silk') || lower.includes('ikat') || lower.includes('textile') || lower.includes('పట్టు') || lower.includes('पट्टू') || lower.includes('பட்டு')) {
      category = 'Traditional Textiles';
      materials = ['Pure Handloom Silk', 'Natural Indigo Dye', 'Zari Weave'];
      tags.push('Handloom', 'Pure Silk');
    } else if (lower.includes('bamboo') || lower.includes('cane') || lower.includes('వెదురు') || lower.includes('बांस') || lower.includes('மூங்கில்')) {
      category = 'Bamboo Crafts';
      materials = ['Matured Golden Bamboo', 'Cane Fibers', 'Natural Varnish'];
      tags.push('Bamboo Craft', 'Eco Friendly');
    } else if (lower.includes('painting') || lower.includes('art') || lower.includes('చిత్రం') || lower.includes('चित्र') || lower.includes('ஓவியம்')) {
      category = 'Paintings';
      materials = ['Handmade Cotton Paper', 'Vegetable Mineral Dyes', 'Bamboo Pen'];
      tags.push('Folk Painting', 'Mithila Art');
    }

    const titleWords = text.trim().split(/\s+/).slice(0, 6).join(' ');
    const generatedTitle = `${category} Masterpiece — Handcrafted Creation`;

    return {
      title: generatedTitle,
      category: category,
      description: `Authentic handcrafted artisan creation: "${text.trim()}". Prepared using generational knowledge, sustainable native materials, and fair-trade standards.`,
      materials: materials,
      tags: tags,
      seoKeywords: [`Handmade ${category}`, 'Indian artisan crafts', 'Buy directly from artisan'],
      suggestedRawCost: 350,
      suggestedLabourHours: 10,
      detectedLanguage: language,
      rawTranscript: text.trim(),
      englishTranslation: text.trim()
    };
  }

  getSamplesForLanguage(language: SupportedLanguage) {
    return PRESET_VOICE_SAMPLES[language] || PRESET_VOICE_SAMPLES['Telugu'];
  }
}

export const voiceCatalogService = new VoiceCatalogService();

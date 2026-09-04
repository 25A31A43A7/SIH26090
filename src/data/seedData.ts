import { User, Artisan, Product, Order, Delivery, TrackingEvent, ImpactStatistics, CommunityHub, Notification } from '../types';

export const SEED_USERS: Record<string, User> = {
  artisan: {
    userId: 'usr_artisan_1',
    name: 'Lakshmi Devi',
    role: 'artisan',
    phone: '+91 98480 12345',
    email: 'lakshmi.artisan@shilpsetual.in',
    generalLocation: 'Kondapalli, Krishna District, Andhra Pradesh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    stateBadge: 'National Master Craftsperson (Textiles & Wood)'
  },
  customer: {
    userId: 'usr_customer_1',
    name: 'Aarav Sharma',
    role: 'customer',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@gmail.com',
    generalLocation: 'Banjara Hills, Hyderabad, Telangana',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
  },
  delivery: {
    userId: 'usr_delivery_1',
    name: 'Rajesh Kumar',
    role: 'delivery',
    phone: '+91 91234 56789',
    email: 'rajesh.logistics@shilpsetual.in',
    generalLocation: 'Hub 04 (South Zone), Hyderabad, Telangana',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    stateBadge: 'Verified Logistics Partner'
  },
  government: {
    userId: 'usr_gov_1',
    name: 'Dr. Sunita Verma, IAS',
    role: 'government',
    phone: '+91 11 2306 1234',
    email: 'dr.sunita.verma@gov.textiles.in',
    generalLocation: 'Ministry of Textiles, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    stateBadge: 'Govt Verification Authority — DC (Handicrafts)'
  }
};

export const SEED_ARTISANS: Artisan[] = [
  {
    artisanId: 'art_1',
    userId: 'usr_artisan_1',
    name: 'Lakshmi Devi',
    craftType: 'Kondapalli Woodcraft & Toys',
    generalLocation: 'Kondapalli, Andhra Pradesh',
    story: 'Practicing the 400-year-old tradition of carving soft Poniki wood toys with natural vegetable dyes passed down through 4 generations.',
    verificationStatus: 'VERIFIED',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    joinedDate: '12 Jan 2024',
    specialties: ['Dancing Dolls', 'Mythological Figures', 'Rural Life Sets'],
    bankAccountVerified: true
  },
  {
    artisanId: 'art_2',
    userId: 'usr_artisan_2',
    name: 'Rameshwar Chhimpa',
    craftType: 'Jaipur Traditional Blue Pottery',
    generalLocation: 'Sanganer, Jaipur, Rajasthan',
    story: 'Preserving low-fire quartz and Multani mitti glazing techniques, creating lead-free heirloom ceramic tableware.',
    verificationStatus: 'VERIFIED',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
    joinedDate: '05 Feb 2024',
    specialties: ['Floral Ceramic Vases', 'Handmade Planters', 'Dinnerware'],
    bankAccountVerified: true
  },
  {
    artisanId: 'art_3',
    userId: 'usr_artisan_3',
    name: 'Anasuya Baishya',
    craftType: 'Assam Bamboo & Cane Weaving',
    generalLocation: 'Barpeta, Assam',
    story: 'Leading a 40-woman cooperative crafting eco-friendly home lights and sustainable bamboo lifestyle accessories.',
    verificationStatus: 'VERIFIED',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
    joinedDate: '28 Feb 2024',
    specialties: ['Pendant Lamps', 'Storage Baskets', 'Eco-Furniture'],
    bankAccountVerified: true
  },
  {
    artisanId: 'art_4',
    userId: 'usr_artisan_4',
    name: 'Devi Lal Kumhar',
    craftType: 'Terracotta & Earthenware',
    generalLocation: 'Gorakhpur, Uttar Pradesh',
    story: 'Third generation master potter specializing in hand-embossed clay vessels, water jugs, and traditional festive lamps.',
    verificationStatus: 'PENDING',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    joinedDate: '02 Sep 2026',
    specialties: ['Terracotta Cookware', 'Heritage Diyas', 'Water Pots'],
    bankAccountVerified: false
  }
];

export const SEED_PRODUCTS: Product[] = [
  {
    productId: 'prod_1',
    name: 'Kondapalli Hand-carved Traditional Dancing Doll',
    description: 'Authentic Kondapalli Bobblehead doll crafted from indigenous Poniki wood. Painted with non-toxic natural tamarind seed paste and organic pigments. A hallmark of Telugu heritage and festive Golu displays.',
    category: 'Wooden Crafts',
    artisanId: 'art_1',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Kondapalli, Andhra Pradesh',
    price: 850,
    quantity: 18,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    enhancedImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    materials: ['Poniki Softwood', 'Natural Tamarind Glue', 'Organic Mineral Pigments', 'Brass Balancing Spring'],
    tags: ['Kondapalli', 'GI Tagged', 'Handmade Toy', 'Heritage Decor', 'Eco-friendly'],
    status: 'APPROVED',
    createdAt: '2026-08-15T10:00:00Z',
    approvedAt: '2026-08-16T14:30:00Z',
    aiCatalogGenerated: true,
    voiceLanguageUsed: 'Telugu',
    rawCost: 280,
    labourHours: 9,
    aiSuggestedPrice: 850,
    priceRange: { min: 750, max: 950 },
    seoKeywords: ['Kondapalli Bommalu', 'Dancing Doll', 'GI Craft Andhra', 'Handmade Wooden Dolls']
  },
  {
    productId: 'prod_2',
    name: 'Jaipur Royal Cobalt Floral Blue Pottery Vase',
    description: 'Handcrafted Egyptian paste quartz ceramic vase hand-painted in timeless cobalt blue and Persian floral motifs. Fired at low temperatures to achieve the iconic glossy turquoise finish.',
    category: 'Pottery',
    artisanId: 'art_2',
    artisanName: 'Rameshwar Chhimpa',
    artisanLocation: 'Jaipur, Rajasthan',
    price: 1450,
    quantity: 12,
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=800'
    ],
    enhancedImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
    materials: ['Quartz Powder', 'Multani Mitti', 'Natural Resin', 'Cobalt Oxide Glaze'],
    tags: ['Blue Pottery', 'Jaipur Craft', 'Ceramic Vase', 'Floral Motif', 'Living Room Accent'],
    status: 'APPROVED',
    createdAt: '2026-08-18T11:20:00Z',
    approvedAt: '2026-08-19T09:15:00Z',
    aiCatalogGenerated: true,
    voiceLanguageUsed: 'Hindi',
    rawCost: 480,
    labourHours: 14,
    aiSuggestedPrice: 1450,
    priceRange: { min: 1350, max: 1650 },
    seoKeywords: ['Jaipur Blue Pottery', 'Handmade Ceramic Vase', 'Indian Heritage Tableware']
  },
  {
    productId: 'prod_3',
    name: 'Assam River Reed & Bamboo Weave Pendant Lamp',
    description: 'Minimalist sustainable ceiling pendant light hand-woven from matured golden bamboo strips. Diffuses a warm, serene ambient light suitable for dining rooms, cafes, and living areas.',
    category: 'Bamboo Crafts',
    artisanId: 'art_3',
    artisanName: 'Anasuya Baishya',
    artisanLocation: 'Barpeta, Assam',
    price: 1100,
    quantity: 15,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800'
    ],
    enhancedImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800',
    materials: ['Seasoned Assam Bamboo', 'Natural Cane Fibers', 'Brass Fitting Support'],
    tags: ['Bamboo Craft', 'Eco Lighting', 'Assam Handicrafts', 'Sustainable Living'],
    status: 'APPROVED',
    createdAt: '2026-08-20T14:10:00Z',
    approvedAt: '2026-08-21T16:00:00Z',
    aiCatalogGenerated: true,
    voiceLanguageUsed: 'English',
    rawCost: 320,
    labourHours: 8,
    aiSuggestedPrice: 1100,
    priceRange: { min: 980, max: 1250 },
    seoKeywords: ['Bamboo Lamp', 'Handwoven Pendant Light', 'Sustainable Home Decor']
  },
  {
    productId: 'prod_4',
    name: 'Pochampally Double Ikat Pure Silk Handloom Stole',
    description: 'Masterpiece geometric Ikat weave dyed with natural madder root and indigo. Handwoven on traditional pit looms in Telia Rumal heritage patterns.',
    category: 'Traditional Textiles',
    artisanId: 'art_1',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Pochampally, Telangana',
    price: 2400,
    quantity: 8,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'
    ],
    enhancedImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    materials: ['100% Mulberry Silk', 'Natural Indigo Dye', 'Madder Root Pigment'],
    tags: ['Pochampally Ikat', 'Handloom Silk', 'Telia Rumal', 'GI Certified'],
    status: 'APPROVED',
    createdAt: '2026-08-22T09:00:00Z',
    approvedAt: '2026-08-23T11:45:00Z',
    aiCatalogGenerated: true,
    voiceLanguageUsed: 'Telugu',
    rawCost: 950,
    labourHours: 22,
    aiSuggestedPrice: 2400,
    priceRange: { min: 2200, max: 2700 }
  },
  {
    productId: 'prod_5',
    name: 'Madhubani Tree of Life Handpainted Canvas Art',
    description: 'Traditional Mithila painting created using bamboo twigs, nib pens, and natural vegetable colors depicting the sacred Tree of Life with harmony birds and fish.',
    category: 'Paintings',
    artisanId: 'art_2',
    artisanName: 'Rameshwar Chhimpa',
    artisanLocation: 'Madhubani, Bihar',
    price: 1850,
    quantity: 5,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800'
    ],
    enhancedImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    materials: ['Handmade Cotton Paper', 'Natural Soot Black', 'Turmeric Yellow', 'Indigo Blue'],
    tags: ['Madhubani Painting', 'Folk Art', 'Tree of Life', 'Mithila Canvas'],
    status: 'APPROVED',
    createdAt: '2026-08-25T15:30:00Z',
    approvedAt: '2026-08-26T10:20:00Z',
    aiCatalogGenerated: true,
    voiceLanguageUsed: 'Hindi',
    rawCost: 400,
    labourHours: 18,
    aiSuggestedPrice: 1850,
    priceRange: { min: 1600, max: 2100 }
  },
  {
    productId: 'prod_6',
    name: 'Bastar Lost-Wax Dhokra Bell Metal Tribal Musician',
    description: 'Ancient 4000-year-old Harappan cire perdue lost-wax cast brass figurine crafted by tribal artisans in the deep forests of Bastar.',
    category: 'Home Decor',
    artisanId: 'art_3',
    artisanName: 'Anasuya Baishya',
    artisanLocation: 'Bastar, Chhattisgarh',
    price: 1650,
    quantity: 7,
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800'
    ],
    enhancedImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    materials: ['Recycled Bell Metal', 'Beeswax Thread Mold', 'River Clay Core'],
    tags: ['Dhokra Craft', 'Lost Wax Casting', 'Tribal Art', 'Brass Sculpture'],
    status: 'APPROVED',
    createdAt: '2026-08-28T12:00:00Z',
    approvedAt: '2026-08-29T13:10:00Z',
    aiCatalogGenerated: true,
    voiceLanguageUsed: 'Hindi',
    rawCost: 550,
    labourHours: 16,
    aiSuggestedPrice: 1650,
    priceRange: { min: 1500, max: 1850 }
  },
  // PENDING PRODUCT FOR GOVT VERIFICATION DEMO
  {
    productId: 'prod_pending_1',
    name: 'Hand-Carved Sacred Teakwood Elephant Figurine',
    description: 'Exquisitely detailed miniature elephant carving with ceremonial jhool tapestries and floral relief motifs, polished with pure organic beeswax.',
    category: 'Wooden Crafts',
    artisanId: 'art_1',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Kondapalli, Krishna District, AP',
    price: 920,
    quantity: 10,
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800'
    ],
    enhancedImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
    materials: ['Reclaimed Teakwood', 'Natural Beeswax Polish', 'Brass Inlay Eyes'],
    tags: ['Wood Carving', 'Heritage Elephant', 'Kondapalli Heritage', 'Organic Finish'],
    status: 'PENDING_APPROVAL',
    createdAt: '2026-09-04T08:30:00Z',
    aiCatalogGenerated: true,
    voiceLanguageUsed: 'Telugu',
    rawCost: 310,
    labourHours: 10,
    aiSuggestedPrice: 920,
    priceRange: { min: 850, max: 1050 },
    seoKeywords: ['Teakwood Elephant', 'Handmade Wooden Carving', 'Indian Artisan Decor']
  }
];

export const INITIAL_IMPACT_STATISTICS: ImpactStatistics = {
  artisanCount: 1420,
  approvedProductCount: 3850,
  orderedCount: 12450,
  deliveredCount: 11890,
  totalRevenueGenerated: 8450000,
  craftCategoriesCount: 8,
  statesReachedCount: 24
};

export const SEED_COMMUNITIES: CommunityHub[] = [
  {
    id: 'comm_1',
    craft: 'Kondapalli Toy Craft',
    region: 'Krishna Valley, Andhra Pradesh',
    state: 'Andhra Pradesh',
    artisanCount: 320,
    availableProductsCount: 145,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600',
    description: 'Centuries-old soft Poniki wood toy-making hub renowned for dancing dolls and rural vignettes.'
  },
  {
    id: 'comm_2',
    craft: 'Jaipur Blue Pottery',
    region: 'Sanganer & Kotjewar',
    state: 'Rajasthan',
    artisanCount: 280,
    availableProductsCount: 310,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600',
    description: 'World-famous quartz ceramic craft flourishing in artisan clusters around the Pink City.'
  },
  {
    id: 'comm_3',
    craft: 'Pochampally Handloom Ikat',
    region: 'Yadadri Bhuvanagiri Cluster',
    state: 'Telangana',
    artisanCount: 450,
    availableProductsCount: 520,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
    description: 'UN-recognized global craft village celebrated for precision tiedye silk weaving.'
  },
  {
    id: 'comm_4',
    craft: 'Bastar Lost-Wax Dhokra',
    region: 'Jagdalpur Forest Region',
    state: 'Chhattisgarh',
    artisanCount: 190,
    availableProductsCount: 85,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600',
    description: 'Tribal artisans transforming beeswax cords and brass scrap into primitive heirloom art.'
  }
];

// PRE-SEEDED ACTIVE DEMO ORDER (SHP-2026-7K29A4) IN "IN_TRANSIT" STATE
export const DEMO_TRACKING_ID = 'SHP-2026-7K29A4';
export const DEMO_ORDER_ID = 'ORD-98214';

export const SEED_DEMO_ORDER: Order = {
  orderId: DEMO_ORDER_ID,
  customerId: 'usr_customer_1',
  customerName: 'Aarav Sharma',
  customerPhone: '+91 98765 43210',
  shippingAddress: {
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Plot 42, Road No. 12, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    generalArea: 'Banjara Hills, Hyderabad'
  },
  artisanId: 'art_1',
  artisanName: 'Lakshmi Devi',
  artisanLocation: 'Kondapalli, Andhra Pradesh',
  deliveryId: 'del_7k29a4',
  products: [
    {
      product: SEED_PRODUCTS[0],
      quantity: 1,
      price: 850
    }
  ],
  subtotal: 850,
  deliveryFee: 50,
  totalAmount: 900,
  paymentStatus: 'COMPLETED',
  paymentMethod: 'UPI',
  orderStatus: 'IN_TRANSIT',
  trackingId: DEMO_TRACKING_ID,
  createdAt: '2026-09-03T11:15:00Z',
  updatedAt: '2026-09-04T09:30:00Z',
  artisanApprovedAt: '2026-09-03T11:45:00Z'
};

export const SEED_DEMO_DELIVERY: Delivery = {
  deliveryId: 'del_7k29a4',
  orderId: DEMO_ORDER_ID,
  trackingId: DEMO_TRACKING_ID,
  deliveryPartnerId: 'usr_delivery_1',
  deliveryPartnerName: 'Rajesh Kumar',
  deliveryPartnerPhone: '+91 91234 56789',
  status: 'IN_TRANSIT',
  pickupArea: 'Kondapalli Craft Cluster, AP',
  destinationArea: 'Banjara Hills, Hyderabad, TS',
  assignedAt: '2026-09-03T14:00:00Z',
  estimatedDeliveryDate: '2026-09-04T18:00:00Z',
  currentCheckpoint: 'Regional Sorting Hub 04, South Hyderabad',
  lastUpdated: '2026-09-04T09:30:00Z'
};

export const SEED_TRACKING_EVENTS: TrackingEvent[] = [
  {
    trackingEventId: 'trk_ev_1',
    trackingId: DEMO_TRACKING_ID,
    status: 'ORDER_PLACED',
    title: 'Order Placed & Confirmed',
    description: 'Customer placed order for Kondapalli Dancing Doll. Order verified by ShilpSetu gateway.',
    timestamp: '03 Sep 2026, 11:15 AM',
    actorRole: 'Customer',
    actorId: 'usr_customer_1',
    generalLocation: 'Hyderabad, Telangana',
    checkpointIndex: 0,
    isCompleted: true
  },
  {
    trackingEventId: 'trk_ev_2',
    trackingId: DEMO_TRACKING_ID,
    status: 'ARTISAN_APPROVED',
    title: 'Artisan Approved & Packaged',
    description: 'Artisan Lakshmi Devi accepted order via voice prompt and prepared handmade craft with certified seal.',
    timestamp: '03 Sep 2026, 11:45 AM',
    actorRole: 'Artisan',
    actorId: 'usr_artisan_1',
    generalLocation: 'Kondapalli Workshop, AP',
    checkpointIndex: 1,
    isCompleted: true
  },
  {
    trackingEventId: 'trk_ev_3',
    trackingId: DEMO_TRACKING_ID,
    status: 'PICKED_UP',
    title: 'Picked Up by Logistics Partner',
    description: 'Delivery Partner Rajesh Kumar scanned physical QR code and collected item from artisan village workshop.',
    timestamp: '03 Sep 2026, 04:30 PM',
    actorRole: 'Delivery Partner',
    actorId: 'usr_delivery_1',
    generalLocation: 'Krishna Valley Hub, Vijayawada',
    checkpointIndex: 2,
    isCompleted: true
  },
  {
    trackingEventId: 'trk_ev_4',
    trackingId: DEMO_TRACKING_ID,
    status: 'IN_TRANSIT',
    title: 'In Transit to Regional Hub',
    description: 'Consignment sorted at Regional Sorting Hub 04 (South Zone). En route to delivery center.',
    timestamp: '04 Sep 2026, 09:30 AM',
    actorRole: 'Delivery Partner',
    actorId: 'usr_delivery_1',
    generalLocation: 'Regional Sorting Hub 04, Hyderabad',
    checkpointIndex: 3,
    isCompleted: true
  }
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    notificationId: 'notif_1',
    recipientId: 'usr_gov_1',
    recipientRole: 'government',
    type: 'APPROVAL',
    title: 'New Product Pending Verification',
    message: 'Artisan Lakshmi Devi submitted "Hand-Carved Sacred Teakwood Elephant Figurine" for government certification.',
    timestamp: '04 Sep 2026, 08:30 AM',
    read: false,
    actionUrl: 'government'
  },
  {
    notificationId: 'notif_2',
    recipientId: 'usr_artisan_1',
    recipientRole: 'artisan',
    type: 'ORDER',
    title: 'Live Shipment Update',
    message: 'Order #ORD-98214 is in transit to Hyderabad. Delivery partner Rajesh Kumar is managing the route.',
    timestamp: '04 Sep 2026, 09:30 AM',
    read: false,
    relatedOrderId: DEMO_ORDER_ID
  },
  {
    notificationId: 'notif_3',
    recipientId: 'usr_customer_1',
    recipientRole: 'customer',
    type: 'DELIVERY',
    title: 'Order SHP-2026-7K29A4 In Transit',
    message: 'Your Kondapalli Dancing Doll has arrived at South Hyderabad sorting hub and is progressing smoothly.',
    timestamp: '04 Sep 2026, 09:30 AM',
    read: false,
    relatedTrackingId: DEMO_TRACKING_ID
  }
];

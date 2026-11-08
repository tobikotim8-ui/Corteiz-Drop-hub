export interface Product {
  id: string;
  name: string;
  category: 'Hoodies & Tops' | 'Jackets' | 'Pants & Shorts' | 'Headwear';
  image: string;
  availableSizes: string[];
  availableColours: string[];
  dropStatus: string;
  pricingNotice: string;
  overview: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'alcatraz-hoodie',
    name: 'Alcatraz Hoodie',
    category: 'Hoodies & Tops',
    image: '/src/assets/images/crtz_alcatraz_hoodie_1794180108851.jpg',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColours: ['Black', 'Grey Marl', 'Navy'],
    dropStatus: 'Drop Hub Registration Open',
    pricingNotice: 'Price confirmed on drop',
    overview: 'The signature Corteiz Alcatraz heavyweight hooded sweatshirt featuring the landmark silhouette front print.',
  },
  {
    id: 'crtz-cargo-pants',
    name: 'CRTZ Cargo Pants',
    category: 'Pants & Shorts',
    image: '/src/assets/images/crtz_cargo_pants_1794180110499.jpg',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColours: ['Military Olive', 'Triple Black', 'Stone Grey'],
    dropStatus: 'Drop Hub Registration Open',
    pricingNotice: 'Price confirmed on drop',
    overview: 'Signature CRTZ utility cargo pants with multiple tactical bellow pockets and adjustable cuff straps.',
  },
  {
    id: 'corteiz-graphic-tshirt',
    name: 'Corteiz Graphic T-Shirt',
    category: 'Hoodies & Tops',
    image: '/src/assets/images/crtz_graphic_tee_1794180110698.jpg',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColours: ['Vintage Washed Black', 'Chalk White', 'Forest Green'],
    dropStatus: 'Drop Hub Registration Open',
    pricingNotice: 'Price confirmed on drop',
    overview: 'Relaxed boxy cut cotton t-shirt with classic Corteiz front graphic typography.',
  },
  {
    id: 'corteiz-alcatraz-puffer-jacket',
    name: 'Corteiz Alcatraz Puffer Jacket',
    category: 'Jackets',
    image: '/src/assets/images/crtz_puffer_jacket_1794180110977.jpg',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColours: ['Matte Black', 'Stealth Navy'],
    dropStatus: 'Drop Hub Registration Open',
    pricingNotice: 'Price confirmed on drop',
    overview: 'High-volume insulated puffer jacket engineered with high funnel collar and zip enclosures.',
  },
  {
    id: 'corteiz-guerillaz-cargo-shorts',
    name: 'Corteiz Guerillaz Cargo Shorts',
    category: 'Pants & Shorts',
    image: '/src/assets/images/crtz_cargo_shorts_1794180112233.jpg',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColours: ['Dark Stone Grey', 'Desert Sand', 'Black'],
    dropStatus: 'Drop Hub Registration Open',
    pricingNotice: 'Price confirmed on drop',
    overview: 'Rugged Guerillaz cargo shorts with utility flap pockets and tactical buckle detailing.',
  },
  {
    id: 'corteiz-4starz-cap',
    name: 'Corteiz 4Starz Cap',
    category: 'Headwear',
    image: '/src/assets/images/crtz_4starz_cap_1794180111663.jpg',
    availableSizes: ['One Size'],
    availableColours: ['Black', 'Navy', 'Olive Green'],
    dropStatus: 'Drop Hub Registration Open',
    pricingNotice: 'Price confirmed on drop',
    overview: 'Structured 6-panel cotton twill cap featuring embroidered Corteiz 4Starz motif.',
  },
];

export interface RegistrationRecord {
  id: string;
  productId: string;
  productName: string;
  size: string;
  colour: string;
  customerName: string;
  customerEmail: string;
  registeredAt: string;
  confirmationCode: string;
  notifyOnDrop: boolean;
}

export const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Visit Corteiz Drop Hub',
    description: 'Enter the student project hub to preview all items featured for the upcoming drop release.',
  },
  {
    step: '02',
    title: 'Explore Available Products',
    description: 'Browse the 6 curated products across hoodies, cargo pants, tees, puffers, shorts and caps.',
  },
  {
    step: '03',
    title: 'Choose Your Product',
    description: 'Click into any item to inspect details, available colorways, and full sizing options.',
  },
  {
    step: '04',
    title: 'Select Size & Colour',
    description: 'Customize your exact preference from available sizes (S to XXL or One Size) and colourways.',
  },
  {
    step: '05',
    title: 'Click "Register My Interest"',
    description: 'Submit your interest registration to secure your priority drop dispatch notification record.',
  },
  {
    step: '06',
    title: 'Receive Confirmation',
    description: 'Get an instant verified registration reference code confirming your entry has been logged.',
  },
  {
    step: '07',
    title: 'Receive Drop Notification',
    description: 'Receive an alert the moment confirmed drop details and dates become available.',
  },
];

export const image = (id, width = 1200) => `/images/${id}-${width <= 500 ? 480 : width <= 1100 ? 960 : 1800}.jpg`;
export const photos = {
  skyline: 'photo-1512453979798-5ea266f8880c',
  dusk: 'photo-1518684079-3c830dcef090',
  villa: 'photo-1613490493576-7fde63acd811',
  apartment: 'photo-1600210492486-724fe5c67fb0',
  terrace: 'photo-1600607687920-4e2a09cf159d',
  interior: 'photo-1600607687939-ce8a6c25118c',
  town: 'photo-1600047509807-ba8f99d2cdde',
  penthouse: 'photo-1600566753086-00f18fb6b3ea',
  commercial: 'photo-1497366754035-f200968a6e72',
  palm: 'photo-1582672060674-bc2bd808a8b5',
  architecture: 'photo-1518684079-3c830dcef090',
};
export const locations = ['Downtown Dubai', 'Palm Jumeirah', 'Dubai Marina', 'Emirates Hills', 'Dubai Creek Harbour', 'Dubai Harbour'];
export const types = ['Villa', 'Apartment', 'Townhouse', 'Penthouse', 'Commercial'];
const base = [
  ['palm-jumeirah-villa', 'Palm Jumeirah Villa', 'Palm Jumeirah', 'Villa', 28000000, 5, 6, 7800, photos.villa, 'Buy'],
  ['downtown-luxury-apartment', 'Downtown Luxury Apartment', 'Downtown Dubai', 'Apartment', 6800000, 3, 4, 2150, photos.skyline, 'Buy'],
  ['waterfront-residence', 'Waterfront Residence', 'Dubai Harbour', 'Apartment', 12500000, 4, 5, 3900, photos.terrace, 'Buy'],
  ['emirates-signature-villa', 'Emirates Signature Villa', 'Emirates Hills', 'Villa', 34000000, 6, 7, 9200, photos.town, 'Buy'],
  ['marina-sky-penthouse', 'Marina Sky Penthouse', 'Dubai Marina', 'Penthouse', 18500000, 4, 5, 4800, photos.penthouse, 'Buy'],
  ['creekside-townhouse', 'Creekside Townhouse', 'Dubai Creek Harbour', 'Townhouse', 4200000, 3, 4, 2800, photos.town, 'Buy'],
  ['marina-park-apartment', 'Marina Park Apartment', 'Dubai Marina', 'Apartment', 185000, 2, 3, 1450, photos.apartment, 'Rent'],
  ['palm-garden-villa', 'Palm Garden Villa', 'Palm Jumeirah', 'Villa', 950000, 5, 6, 6500, photos.villa, 'Rent'],
  ['downtown-skyline-suite', 'Downtown Skyline Suite', 'Downtown Dubai', 'Apartment', 260000, 3, 4, 2100, photos.interior, 'Rent'],
  ['creek-horizon-residences', 'Creek Horizon Residences', 'Dubai Creek Harbour', 'Apartment', 2400000, 2, 3, 1600, photos.terrace, 'Off-Plan'],
  ['palm-horizon-villa', 'Palm Horizon Villa', 'Palm Jumeirah', 'Villa', 22000000, 5, 6, 7200, photos.villa, 'Off-Plan'],
  ['downtown-business-address', 'Downtown Business Address', 'Downtown Dubai', 'Commercial', 5200000, 0, 2, 2400, photos.commercial, 'Commercial'],
  ['marina-executive-office', 'Marina Executive Office', 'Dubai Marina', 'Commercial', 3900000, 0, 2, 1800, photos.commercial, 'Commercial'],
  ['downtown-garden-townhouse', 'Downtown Garden Townhouse', 'Downtown Dubai', 'Townhouse', 7300000, 4, 5, 3400, photos.town, 'Buy'],
  ['creek-view-penthouse', 'Creek View Penthouse', 'Dubai Creek Harbour', 'Penthouse', 9400000, 4, 5, 3800, photos.penthouse, 'Buy'],
];
export const properties = base.map(([id, title, location, type, price, beds, baths, area, photo, purpose], i) => ({
  id, title, location, type, price, beds, baths, area, photo, purpose,
  featured: i < 3,
  date: `2026-09-${String(30 - i).padStart(2, '0')}`,
  description: `An exceptional ${type.toLowerCase()} in ${location}, thoughtfully designed around light, space, and a distinctly Dubai way of life. Generous living spaces flow into beautifully appointed interiors, with refined materials and architectural details throughout. Enjoy effortless access to the city's finest dining, cultural destinations, and waterfront experiences.`,
  gallery: [photo, photos.interior, photos.apartment, photos.terrace],
  amenities: type === 'Villa' ? ['Private Pool', 'Smart Home', 'Parking', 'Gym', '24/7 Security', 'Garden'] : ['Smart Home', 'Parking', 'Gym', 'Sea View', '24/7 Security', 'Concierge'],
}));
export const money = (value) => `AED ${value.toLocaleString('en-US')}`;
export const categories = [
  { name: 'Villas', type: 'Villa', caption: 'Refined living spaces', photo: photos.villa },
  { name: 'Apartments', type: 'Apartment', caption: 'Urban living redefined', photo: photos.dusk },
  { name: 'Townhouses', type: 'Townhouse', caption: 'Space for every story', photo: photos.town },
  { name: 'Penthouses', type: 'Penthouse', caption: 'Elevated experiences', photo: photos.penthouse },
  { name: 'Commercial', type: 'Commercial', caption: 'Spaces for growth', photo: photos.commercial },
];
export const testimonials = [
  { name: 'James Carter', origin: 'Investor from the UK', quote: 'Dubai House made our investment journey seamless. Their team was professional, transparent, and truly understood our goals.', photo: 'photo-1500648767791-00dcc994a43e' },
  { name: 'Sofia Laurent', origin: 'Homeowner from France', quote: 'From our first conversation to the keys in our hands, every detail was considered. We found not just a beautiful home, but a place to belong.', photo: 'photo-1580489944761-15a19d654956' },
  { name: 'Daniel Chen', origin: 'Investor from Singapore', quote: 'Clear advice, a thoughtful selection of properties, and genuine attention to our long-term plans. An exceptional experience from start to finish.', photo: 'photo-1506794778202-cad84cf45f1d' },
];
export const articles = [
  { slug: 'dubai-property-market-guide', category: 'Dubai Market', title: 'Dubai real estate: a city looking forward', excerpt: 'The fundamentals behind one of the world’s most dynamic property markets.', date: 'September 24, 2026', photo: photos.skyline },
  { slug: 'understanding-rental-yields', category: 'Investment', title: 'Beyond the address: understanding rental yield', excerpt: 'A considered approach to income, costs, and long-term property performance.', date: 'September 18, 2026', photo: photos.terrace },
  { slug: 'life-on-palm-jumeirah', category: 'Lifestyle', title: 'The art of living on Palm Jumeirah', excerpt: 'Waterfront mornings, architectural homes, and a lifestyle like no other.', date: 'September 12, 2026', photo: photos.villa },
  { slug: 'buying-your-first-dubai-property', category: 'Property Guide', title: 'Your first Dubai property, thoughtfully planned', excerpt: 'From choosing a community to understanding the purchase process.', date: 'September 5, 2026', photo: photos.apartment },
  { slug: 'the-next-generation-of-dubai', category: 'New Developments', title: 'The next generation of Dubai living', excerpt: 'Discover the principles shaping the city’s new waterfront communities.', date: 'August 28, 2026', photo: photos.dusk },
];
export const articleSections = [
  ['Start with a long-term perspective', 'The best property decisions begin with a clear understanding of your priorities. Consider whether you are looking for a home, recurring rental income, or a long-term investment. Each goal calls for a different balance of location, property type, and time horizon. Dubai offers a broad range of established neighborhoods and evolving communities, each with its own character.'],
  ['Look beyond the headline', 'A considered investment looks at more than the asking price. Service charges, maintenance, financing costs, occupancy, and transaction fees all influence the complete picture. Visit the community at different times of day, compare similar homes, and ask for documented information rather than relying on forecasts.'],
  ['Choose your neighborhood with intention', 'Downtown Dubai brings urban energy and cultural destinations. Palm Jumeirah offers distinctive waterfront living. Dubai Marina combines walkability with an established rental market, while Dubai Creek Harbour presents a different rhythm along the water. The right address is the one that supports your plans.'],
  ['Make an informed next move', 'Property markets change, and no outcome is guaranteed. Seek independent legal, financial, and tax advice where appropriate, verify developer and brokerage credentials, and review every document before committing. A thoughtful property journey is built on transparency, patience, and a clear understanding of the details.'],
];

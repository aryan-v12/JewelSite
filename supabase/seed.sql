-- =============================================
-- SAMPLE DATA FOR SHREERATNA
-- Run this after schema.sql
-- Includes products for all 10 regional traditions
-- =============================================

-- Diamond Jewelry
INSERT INTO public.products (name, description, category, subcategory, region, price, original_price, metal_purity, weight, stock_quantity, images, featured, bestseller, tags, specifications) VALUES

-- Diamond Necklaces
('Royal Solitaire Diamond Necklace', 
'Exquisite solitaire diamond pendant set in 18K white gold. This stunning piece features a brilliant-cut 1.5 carat diamond with exceptional clarity. Perfect for special occasions and as an heirloom piece.',
'diamond', 'necklace', 'Pan-Indian', 
245000.00, 275000.00, '18K White Gold', 8.5, 5,
ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'],
TRUE, TRUE,
ARRAY['solitaire', 'wedding', 'luxury', 'white-gold'],
'{"diamond_carat": "1.5", "diamond_clarity": "VVS1", "diamond_color": "D", "chain_length": "18 inches"}'::jsonb),

('Maharani Diamond Choker',
'Traditional Indian diamond choker inspired by royal Mughal designs. Features over 200 diamonds set in 22K gold with intricate craftsmanship.',
'diamond', 'necklace', 'Maharashtrian',
485000.00, 520000.00, '22K Gold', 45.0, 3,
ARRAY['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'],
TRUE, FALSE,
ARRAY['choker', 'bridal', 'traditional', 'royal'],
'{"total_diamond_weight": "8.5 carats", "setting": "Kundan", "clasp": "Safety lock"}'::jsonb),

-- Diamond Rings
('Eternal Love Diamond Ring',
'Classic diamond engagement ring featuring a 0.75 carat princess-cut diamond surrounded by a halo of smaller diamonds. Set in platinum for lasting beauty.',
'diamond', 'ring', 'Pan-Indian',
125000.00, 145000.00, 'Platinum', 4.2, 10,
ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800', 'https://images.unsplash.com/photo-1586104237886-6d4b8db9f7d2?w=800'],
TRUE, TRUE,
ARRAY['engagement', 'halo', 'platinum', 'princess-cut'],
'{"center_stone": "0.75 carat", "side_stones": "0.35 carat total", "ring_size": "Adjustable"}'::jsonb),

('Three Stone Anniversary Ring',
'Stunning three-stone diamond ring symbolizing past, present, and future. Features three round brilliant diamonds in 18K rose gold.',
'diamond', 'ring', 'Pan-Indian',
98000.00, 115000.00, '18K Rose Gold', 3.8, 8,
ARRAY['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800'],
FALSE, TRUE,
ARRAY['anniversary', 'three-stone', 'rose-gold'],
'{"total_carat": "1.5", "diamond_quality": "VS1, F color"}'::jsonb),

-- Diamond Earrings
('Celestial Diamond Studs',
'Timeless diamond stud earrings featuring matched pair of 0.5 carat each round brilliant diamonds. Set in 18K white gold with secure screw-back posts.',
'diamond', 'earrings', 'Pan-Indian',
78000.00, 85000.00, '18K White Gold', 2.4, 15,
ARRAY['https://images.unsplash.com/photo-1589207212797-cfd578c00985?w=800'],
FALSE, TRUE,
ARRAY['studs', 'classic', 'everyday', 'white-gold'],
'{"each_stone": "0.5 carat", "backing": "Screw-back", "certification": "IGI Certified"}'::jsonb),

('Chandelier Diamond Earrings',
'Spectacular chandelier earrings with cascading diamonds. Over 3 carats of diamonds set in 18K white gold. Perfect for weddings and gala events.',
'diamond', 'earrings', 'South Indian',
165000.00, 185000.00, '18K White Gold', 12.5, 4,
ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
TRUE, FALSE,
ARRAY['chandelier', 'bridal', 'statement', 'south-indian'],
'{"total_diamonds": "3.2 carats", "length": "2.5 inches", "style": "Jhumka inspired"}'::jsonb),

-- Diamond Bracelet
('Tennis Diamond Bracelet',
'Classic tennis bracelet featuring 45 round brilliant diamonds totaling 5 carats. Set in 18K white gold with secure box clasp.',
'diamond', 'bracelet', 'Pan-Indian',
295000.00, 325000.00, '18K White Gold', 15.0, 6,
ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
TRUE, TRUE,
ARRAY['tennis', 'classic', 'luxury', 'white-gold'],
'{"total_carat": "5.0", "number_of_diamonds": 45, "length": "7 inches"}'::jsonb),

-- Gold Jewelry
-- Gold Necklaces
('Lakshmi Temple Gold Necklace',
'Traditional South Indian temple jewelry featuring Goddess Lakshmi motifs. Crafted in 22K gold with antique finish and ruby accents.',
'gold', 'necklace', 'South Indian',
185000.00, 195000.00, '22K Gold', 65.0, 4,
ARRAY['https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=800', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800'],
TRUE, TRUE,
ARRAY['temple', 'traditional', 'lakshmi', 'bridal', 'south-indian'],
'{"design": "Temple", "finish": "Antique", "gemstones": "Ruby, Emerald"}'::jsonb),

('Rajasthani Aad Necklace',
'Stunning traditional Aad necklace from Rajasthan. Features intricate meenakari work on 22K gold with uncut diamonds (polki).',
'gold', 'necklace', 'Rajasthani',
245000.00, 275000.00, '22K Gold', 85.0, 3,
ARRAY['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'],
TRUE, FALSE,
ARRAY['aad', 'meenakari', 'polki', 'rajasthani', 'traditional'],
'{"work": "Meenakari", "stones": "Polki diamonds", "style": "Choker with pendant"}'::jsonb),

('Bengali Haar Gold Necklace',
'Elegant Bengali-style long gold haar with delicate filigree work. Traditional design passed down through generations.',
'gold', 'necklace', 'Bengali',
125000.00, 135000.00, '22K Gold', 45.0, 6,
ARRAY['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800'],
FALSE, TRUE,
ARRAY['haar', 'filigree', 'bengali', 'traditional', 'wedding'],
'{"length": "26 inches", "work": "Filigree", "occasion": "Wedding, Festivals"}'::jsonb),

('Maharashtrian Thushi Necklace',
'Traditional Maharashtrian Thushi necklace - a symbol of married women. Crafted in 22K gold with traditional black beads.',
'gold', 'necklace', 'Maharashtrian',
85000.00, 92000.00, '22K Gold', 28.0, 8,
ARRAY['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800'],
FALSE, TRUE,
ARRAY['thushi', 'mangalsutra', 'maharashtrian', 'traditional', 'married'],
'{"beads": "Black glass beads", "style": "Traditional", "significance": "Marital symbol"}'::jsonb),

-- Gold Earrings
('Jhumka Earrings Gold',
'Classic South Indian jhumka earrings with intricate temple work. Features dancing peacock motifs and ruby drops.',
'gold', 'earrings', 'South Indian',
45000.00, 52000.00, '22K Gold', 18.0, 12,
ARRAY['https://images.unsplash.com/photo-1590736704728-f4e505e96b5a?w=800'],
TRUE, TRUE,
ARRAY['jhumka', 'temple', 'peacock', 'traditional', 'south-indian'],
'{"drop_length": "2 inches", "design": "Peacock", "stones": "Ruby"}'::jsonb),

('Chandbali Gold Earrings',
'Mughal-inspired Chandbali earrings with crescent moon design. Features kundan work and pearl drops.',
'gold', 'earrings', 'Maharashtrian',
65000.00, 72000.00, '22K Gold', 25.0, 7,
ARRAY['https://images.unsplash.com/photo-1576096943228-6e5e4a8d6e9d?w=800'],
TRUE, FALSE,
ARRAY['chandbali', 'kundan', 'mughal', 'pearl', 'bridal'],
'{"style": "Crescent moon", "work": "Kundan", "drops": "Freshwater pearls"}'::jsonb),

-- Gold Bangles
('Traditional Gold Bangles Set',
'Set of 4 traditional gold bangles with intricate floral patterns. Perfect for everyday wear and special occasions.',
'gold', 'bracelet', 'Pan-Indian',
95000.00, 105000.00, '22K Gold', 32.0, 10,
ARRAY['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800'],
FALSE, TRUE,
ARRAY['bangles', 'set', 'floral', 'traditional', 'everyday'],
'{"quantity": 4, "pattern": "Floral", "size": "2.6 inches diameter"}'::jsonb),

('Rajasthani Kada Bangle',
'Bold Rajasthani kada (thick bangle) with colorful meenakari work. Statement piece for festive occasions.',
'gold', 'bracelet', 'Rajasthani',
78000.00, 85000.00, '22K Gold', 42.0, 5,
ARRAY['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800'],
TRUE, FALSE,
ARRAY['kada', 'meenakari', 'rajasthani', 'statement', 'festive'],
'{"width": "1.5 inches", "work": "Meenakari", "colors": "Red, Green, Blue"}'::jsonb),

-- Gold Rings
('Classic Gold Band',
'Simple yet elegant 22K gold band for everyday wear. Comfortable fit with subtle texture.',
'gold', 'ring', 'Pan-Indian',
28000.00, 32000.00, '22K Gold', 8.5, 20,
ARRAY['https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800'],
FALSE, TRUE,
ARRAY['band', 'classic', 'everyday', 'simple', 'unisex'],
'{"width": "4mm", "finish": "Satin", "comfort_fit": true}'::jsonb),

('Peacock Motif Gold Ring',
'Artistic gold ring featuring detailed peacock motif with meenakari. Unique piece for traditional wear.',
'gold', 'ring', 'Rajasthani',
35000.00, 40000.00, '22K Gold', 10.0, 8,
ARRAY['https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800'],
FALSE, FALSE,
ARRAY['peacock', 'meenakari', 'artistic', 'traditional', 'statement'],
'{"design": "Peacock", "work": "Meenakari", "adjustable": true}'::jsonb),

-- Silver Jewelry
-- Silver Necklaces
('Oxidized Silver Tribal Necklace',
'Stunning oxidized silver necklace with tribal motifs. Features intricate hand-carved designs inspired by ancient Indian art.',
'silver', 'necklace', 'Rajasthani',
12500.00, 15000.00, '925 Silver', 85.0, 15,
ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
TRUE, TRUE,
ARRAY['oxidized', 'tribal', 'statement', 'boho', 'handcrafted'],
'{"finish": "Oxidized", "style": "Tribal", "length": "18 inches"}'::jsonb),

('Silver Temple Necklace',
'Traditional temple-style silver necklace with Goddess Durga pendant. Gold-plated finish for a rich appearance.',
'silver', 'necklace', 'South Indian',
18500.00, 22000.00, '925 Silver', 95.0, 8,
ARRAY['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800'],
FALSE, TRUE,
ARRAY['temple', 'durga', 'gold-plated', 'traditional', 'festive'],
'{"plating": "Gold", "pendant": "Durga", "occasion": "Navratri, Durga Puja"}'::jsonb),

-- Silver Earrings
('Silver Jhumka Earrings',
'Beautiful silver jhumkas with traditional ghungroo (bells) design. Lightweight and comfortable for all-day wear.',
'silver', 'earrings', 'South Indian',
4500.00, 5500.00, '925 Silver', 22.0, 25,
ARRAY['https://images.unsplash.com/photo-1590736704728-f4e505e96b5a?w=800'],
FALSE, TRUE,
ARRAY['jhumka', 'ghungroo', 'lightweight', 'traditional', 'everyday'],
'{"drop_length": "1.5 inches", "bells": true, "weight": "Light"}'::jsonb),

('Chandbali Silver Earrings',
'Elegant crescent moon design silver earrings with kundan work and pearl drops. Perfect for ethnic wear.',
'silver', 'earrings', 'Pan-Indian',
6500.00, 7500.00, '925 Silver', 28.0, 18,
ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
TRUE, FALSE,
ARRAY['chandbali', 'kundan', 'pearl', 'ethnic', 'elegant'],
'{"design": "Crescent moon", "stones": "Kundan, Pearl", "occasion": "Wedding, Festival"}'::jsonb),

-- Silver Bangles
('Silver Filigree Bangles Set',
'Set of 6 delicate silver bangles with traditional filigree work. Handcrafted by artisans from Odisha.',
'silver', 'bracelet', 'Bengali',
8500.00, 10000.00, '925 Silver', 45.0, 12,
ARRAY['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800'],
FALSE, TRUE,
ARRAY['filigree', 'set', 'handcrafted', 'odisha', 'delicate'],
'{"quantity": 6, "work": "Filigree", "origin": "Cuttack, Odisha"}'::jsonb),

('Tribal Silver Kada',
'Bold tribal silver kada with intricate carving. Inspired by ancient Rajasthani jewelry traditions.',
'silver', 'bracelet', 'Rajasthani',
5500.00, 6500.00, '925 Silver', 65.0, 15,
ARRAY['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800'],
TRUE, FALSE,
ARRAY['kada', 'tribal', 'carved', 'bold', 'statement'],
'{"width": "1 inch", "style": "Tribal", "unisex": true}'::jsonb),

-- Silver Rings
('Silver Toe Rings Set',
'Set of 4 traditional silver toe rings with different designs. Adjustable size for comfortable fit.',
'silver', 'ring', 'South Indian',
2500.00, 3000.00, '925 Silver', 12.0, 30,
ARRAY['https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800'],
FALSE, TRUE,
ARRAY['toe-ring', 'set', 'traditional', 'adjustable', 'bridal'],
'{"quantity": 4, "designs": "Mixed", "adjustable": true}'::jsonb),

('Oxidized Silver Statement Ring',
'Bold oxidized silver ring with tribal motifs. Adjustable size makes it a perfect gift.',
'silver', 'ring', 'Rajasthani',
3500.00, 4200.00, '925 Silver', 18.0, 20,
ARRAY['https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800'],
FALSE, FALSE,
ARRAY['oxidized', 'statement', 'tribal', 'adjustable', 'unisex'],
'{"finish": "Oxidized", "style": "Statement", "adjustable": true}'::jsonb),

-- Silver Anklets
('Silver Payal with Bells',
'Traditional silver anklets with melodious bells. A must-have for Indian brides and classical dancers.',
'silver', 'anklet', 'Pan-Indian',
7500.00, 8500.00, '925 Silver', 55.0, 15,
ARRAY['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800'],
TRUE, TRUE,
ARRAY['payal', 'bells', 'bridal', 'dancer', 'traditional'],
'{"pair": true, "bells": "50+", "length": "10 inches each"}'::jsonb),

('Minimalist Silver Anklet',
'Modern minimalist silver anklet with delicate chain design. Perfect for contemporary fashion.',
'silver', 'anklet', 'Pan-Indian',
3200.00, 3800.00, '925 Silver', 15.0, 25,
ARRAY['https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800'],
FALSE, FALSE,
ARRAY['minimalist', 'modern', 'chain', 'everyday', 'contemporary'],
'{"style": "Minimalist", "chain": "Box chain", "adjustable": true}'::jsonb),

-- =============================================
-- PUNJABI REGIONAL JEWELRY
-- =============================================

('Punjabi Jadau Bridal Set',
'Magnificent Jadau bridal set featuring intricate Polki diamonds and emeralds. Traditional Punjabi craftsmanship at its finest.',
'gold', 'necklace', 'Punjabi',
685000.00, 750000.00, '22K Gold', 125.0, 2,
ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'],
TRUE, TRUE,
ARRAY['jadau', 'polki', 'bridal', 'punjabi', 'emerald'],
'{"style": "Jadau", "stones": "Polki, Emerald", "includes": "Necklace, Earrings, Tikka"}'::jsonb),

('Punjabi Gold Kaintha',
'Traditional Punjabi gold chain necklace with intricate link design. A staple in Punjabi bridal jewelry.',
'gold', 'necklace', 'Punjabi',
185000.00, 210000.00, '22K Gold', 55.0, 5,
ARRAY['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800'],
FALSE, TRUE,
ARRAY['kaintha', 'chain', 'traditional', 'punjabi', 'bridal'],
'{"length": "24 inches", "style": "Traditional Punjabi", "weight": "55 grams"}'::jsonb),

('Punjabi Jhumka Earrings',
'Bold Punjabi style jhumka earrings with colorful meenakari work and pearl drops.',
'gold', 'earrings', 'Punjabi',
45000.00, 52000.00, '22K Gold', 22.0, 10,
ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
TRUE, FALSE,
ARRAY['jhumka', 'meenakari', 'pearl', 'punjabi', 'colorful'],
'{"style": "Jhumka", "work": "Meenakari", "drops": "Pearl"}'::jsonb),

-- =============================================
-- GUJARATI REGIONAL JEWELRY
-- =============================================

('Gujarati Bandhani Necklace',
'Colorful Gujarati necklace inspired by traditional Bandhani patterns. Features enamel work in vibrant colors.',
'gold', 'necklace', 'Gujarati',
125000.00, 145000.00, '22K Gold', 38.0, 6,
ARRAY['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800'],
TRUE, FALSE,
ARRAY['bandhani', 'colorful', 'enamel', 'gujarati', 'traditional'],
'{"style": "Bandhani inspired", "work": "Enamel", "colors": "Multi-color"}'::jsonb),

('Gujarati Kundan Choker',
'Traditional Gujarati kundan choker with intricate stone setting and pearl border.',
'gold', 'necklace', 'Gujarati',
165000.00, 185000.00, '22K Gold', 48.0, 4,
ARRAY['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800'],
FALSE, TRUE,
ARRAY['kundan', 'choker', 'pearl', 'gujarati', 'bridal'],
'{"style": "Choker", "work": "Kundan", "border": "Pearl"}'::jsonb),

('Gujarati Kada Set',
'Set of 4 traditional Gujarati gold kadas with intricate carving and enamel work.',
'gold', 'bracelet', 'Gujarati',
95000.00, 110000.00, '22K Gold', 65.0, 8,
ARRAY['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800'],
FALSE, FALSE,
ARRAY['kada', 'set', 'enamel', 'gujarati', 'traditional'],
'{"quantity": 4, "work": "Enamel carving", "style": "Traditional"}'::jsonb),

-- =============================================
-- KASHMIRI REGIONAL JEWELRY
-- =============================================

('Kashmiri Silver Jhumka',
'Exquisite Kashmiri silver jhumka earrings with intricate filigree work. Handcrafted by Kashmiri artisans.',
'silver', 'earrings', 'Kashmiri',
8500.00, 10000.00, '925 Silver', 35.0, 12,
ARRAY['https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800'],
TRUE, TRUE,
ARRAY['jhumka', 'filigree', 'kashmiri', 'handcrafted', 'silver'],
'{"style": "Jhumka", "work": "Filigree", "origin": "Kashmir"}'::jsonb),

('Kashmiri Dejhoor Necklace',
'Traditional Kashmiri Dejhoor (pendant necklace) with intricate silver work and turquoise stones.',
'silver', 'necklace', 'Kashmiri',
15000.00, 18000.00, '925 Silver', 55.0, 8,
ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
FALSE, FALSE,
ARRAY['dejhoor', 'turquoise', 'kashmiri', 'pendant', 'traditional'],
'{"style": "Dejhoor", "stones": "Turquoise", "chain": "Silver"}'::jsonb),

('Kashmiri Athoor Earrings',
'Traditional Kashmiri Athoor (ear ornament) with delicate chain work and small bells.',
'silver', 'earrings', 'Kashmiri',
6500.00, 7800.00, '925 Silver', 25.0, 15,
ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
FALSE, TRUE,
ARRAY['athoor', 'chain', 'bells', 'kashmiri', 'traditional'],
'{"style": "Athoor", "features": "Chain, Bells", "origin": "Kashmir"}'::jsonb),

-- =============================================
-- ASSAMESE REGIONAL JEWELRY
-- =============================================

('Assamese Jonbiri Necklace',
'Traditional Assamese Jonbiri necklace with crescent moon pendant. A symbol of Assamese culture and heritage.',
'gold', 'necklace', 'Assamese',
145000.00, 165000.00, '22K Gold', 42.0, 5,
ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'],
TRUE, TRUE,
ARRAY['jonbiri', 'crescent', 'assamese', 'traditional', 'heritage'],
'{"style": "Jonbiri", "pendant": "Crescent moon", "origin": "Assam"}'::jsonb),

('Assamese Gamkharu Bangles',
'Set of traditional Assamese Gamkharu bangles with intricate floral patterns. Worn during Bihu celebrations.',
'gold', 'bracelet', 'Assamese',
85000.00, 98000.00, '22K Gold', 48.0, 7,
ARRAY['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800'],
FALSE, FALSE,
ARRAY['gamkharu', 'bangles', 'floral', 'assamese', 'bihu'],
'{"quantity": 2, "pattern": "Floral", "occasion": "Bihu, Wedding"}'::jsonb),

('Assamese Lokaparo Earrings',
'Traditional Assamese Lokaparo earrings with leaf-shaped design. Handcrafted by local artisans.',
'gold', 'earrings', 'Assamese',
35000.00, 42000.00, '22K Gold', 18.0, 10,
ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
FALSE, TRUE,
ARRAY['lokaparo', 'leaf', 'assamese', 'handcrafted', 'traditional'],
'{"style": "Lokaparo", "design": "Leaf-shaped", "origin": "Assam"}'::jsonb),

-- =============================================
-- ODIA REGIONAL JEWELRY
-- =============================================

('Odia Tarakasi Necklace',
'Exquisite Odia Tarakasi (silver filigree) necklace. This intricate art form from Cuttack is a UNESCO recognized craft.',
'silver', 'necklace', 'Odia',
18000.00, 22000.00, '925 Silver', 65.0, 6,
ARRAY['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800'],
TRUE, TRUE,
ARRAY['tarakasi', 'filigree', 'odia', 'cuttack', 'heritage'],
'{"style": "Tarakasi", "work": "Filigree", "origin": "Cuttack, Odisha"}'::jsonb),

('Odia Temple Necklace',
'Traditional Odia temple jewelry necklace with Lord Jagannath motifs. Sacred and auspicious design.',
'gold', 'necklace', 'Odia',
175000.00, 195000.00, '22K Gold', 52.0, 4,
ARRAY['https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=800'],
FALSE, FALSE,
ARRAY['temple', 'jagannath', 'odia', 'sacred', 'traditional'],
'{"style": "Temple", "motif": "Lord Jagannath", "origin": "Odisha"}'::jsonb),

('Odia Filigree Earrings',
'Delicate Odia filigree earrings with traditional patterns. Lightweight and elegant.',
'silver', 'earrings', 'Odia',
5500.00, 6800.00, '925 Silver', 18.0, 20,
ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
FALSE, TRUE,
ARRAY['filigree', 'lightweight', 'odia', 'elegant', 'traditional'],
'{"style": "Filigree", "weight": "Light", "origin": "Cuttack"}'::jsonb),

-- =============================================
-- KERALA REGIONAL JEWELRY
-- =============================================

('Kerala Nagapadam Necklace',
'Traditional Kerala Nagapadam (snake hood) necklace. An essential piece in Kerala bridal jewelry.',
'gold', 'necklace', 'Kerala',
225000.00, 255000.00, '22K Gold', 68.0, 4,
ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'],
TRUE, TRUE,
ARRAY['nagapadam', 'snake', 'kerala', 'bridal', 'traditional'],
'{"style": "Nagapadam", "design": "Snake hood", "origin": "Kerala"}'::jsonb),

('Kerala Palakka Necklace',
'Iconic Kerala Palakka necklace with green palakka (leaf) motifs set in gold. A symbol of Kerala heritage.',
'gold', 'necklace', 'Kerala',
185000.00, 210000.00, '22K Gold', 55.0, 5,
ARRAY['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800'],
TRUE, FALSE,
ARRAY['palakka', 'leaf', 'green', 'kerala', 'heritage'],
'{"style": "Palakka", "motif": "Leaf", "stones": "Green enamel"}'::jsonb),

('Kerala Manga Mala',
'Traditional Kerala Manga Mala (mango necklace) with mango-shaped gold beads. Classic Kerala design.',
'gold', 'necklace', 'Kerala',
165000.00, 185000.00, '22K Gold', 48.0, 6,
ARRAY['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800'],
FALSE, TRUE,
ARRAY['manga-mala', 'mango', 'beads', 'kerala', 'classic'],
'{"style": "Manga Mala", "beads": "Mango-shaped", "origin": "Kerala"}'::jsonb),

('Kerala Jimikki Kammal',
'Famous Kerala Jimikki Kammal (bell earrings) with intricate gold work. Made popular by traditional dance forms.',
'gold', 'earrings', 'Kerala',
42000.00, 48000.00, '22K Gold', 20.0, 12,
ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'],
TRUE, TRUE,
ARRAY['jimikki', 'kammal', 'bell', 'kerala', 'dance'],
'{"style": "Jimikki Kammal", "design": "Bell", "occasion": "Dance, Wedding"}'::jsonb);

-- =============================================
-- SAMPLE REVIEWS
-- =============================================

-- Note: Reviews require actual user IDs, so these are placeholder examples
-- In production, reviews will be created by actual users

-- Insert some placeholder reviews (you can modify user_id after users sign up)
-- INSERT INTO public.reviews (product_id, user_name, rating, comment, is_verified_purchase)
-- SELECT
--     id,
--     'Priya Sharma',
--     5,
--     'Absolutely stunning! The craftsmanship is exquisite and it looks even better in person.',
--     TRUE
-- FROM public.products
-- WHERE name = 'Royal Solitaire Diamond Necklace';

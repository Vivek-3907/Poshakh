const pptxgen = require('pptxgenjs');
const path = require('path');

const pres = new pptxgen();

// Configure 16:9 widescreen layout (13.333 x 7.5 inches)
pres.defineLayout({ name: 'WIDE16x9', width: 13.333, height: 7.5 });
pres.layout = 'WIDE16x9';

// ==========================================
// COLOR PALETTE SYSTEM (Hex without #)
// ==========================================
const C = {
  DARK_BG: '0E0709',        // Imperial Velvet Base
  LIGHT_BG: 'FAF7F2',       // Ivory Raw Silk Base
  GOLD: 'C99A2E',           // Antique Royal Zari (Hero Accent)
  GOLD_LIGHT: 'E6B85C',     // Kundan Glow (Secondary Accent)
  GOLD_MUTED: '7A5F20',
  CARD_DARK: '180E12',
  CARD_DARK_BORDER: '3D2913',
  CARD_LIGHT: 'FFFFFF',
  CARD_LIGHT_BORDER: 'E2DACD',
  TEXT_LIGHT: 'FAF7F2',
  TEXT_MUTED_LIGHT: 'A89EA3',
  TEXT_DARK: '1A1618',
  TEXT_MUTED_DARK: '6B6367',
  SUCCESS: '1E7E55',        // Panna Emerald
  SUCCESS_BG: 'EAF5F0',
  PROBLEM: 'C53030',        // Sindoor Crimson
  PROBLEM_BG: 'FDF2F2',
  MONO_DARK: '2E2328',
  MONO_LIGHT: 'F4EFEA',
  BORDER_GOLD: 'C99A2E'
};

const FONT_HEAD = 'Georgia';
const FONT_BODY = 'Arial';
const FONT_MONO = 'Consolas';

// ==========================================
// REUSABLE CHROME HELPERS
// ==========================================
function addDarkChrome(slide, sceneTag) {
  slide.background = { color: C.DARK_BG };
  // Top corner scene badge
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 0.4, w: 2.2, h: 0.32,
    fill: { color: '201217' },
    line: { color: C.GOLD, width: 0.75 }
  });
  slide.addText(sceneTag.toUpperCase(), {
    x: 0.8, y: 0.4, w: 2.2, h: 0.32,
    fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.GOLD,
    align: 'center', valign: 'middle'
  });
  // Top right subtle watermark
  slide.addText('POSHAKH · LJCCA', {
    x: 10.333, y: 0.4, w: 2.2, h: 0.32,
    fontSize: 9, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT,
    align: 'right', valign: 'middle'
  });
}

function addLightChrome(slide, sceneTag, sceneNum) {
  slide.background = { color: C.LIGHT_BG };
  // Top corner scene badge
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 0.4, w: 2.2, h: 0.32,
    fill: { color: 'EFE7DD' },
    line: { color: C.GOLD, width: 0.75 }
  });
  slide.addText(sceneTag.toUpperCase(), {
    x: 0.8, y: 0.4, w: 2.2, h: 0.32,
    fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.GOLD_MUTED,
    align: 'center', valign: 'middle'
  });
  // Footer
  slide.addText('POSHAKH · Luxury Ethnic Wear Rental & Royal Couture Platform', {
    x: 0.8, y: 7.05, w: 8.0, h: 0.3,
    fontSize: 9, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK
  });
  slide.addText(`SCENE ${sceneNum} OF 26`, {
    x: 10.5, y: 7.05, w: 2.0, h: 0.3,
    fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.GOLD_MUTED, align: 'right'
  });
  // Thin footer dividing line
  slide.addShape(pres.ShapeType.line, {
    x: 0.8, y: 6.95, w: 11.733, h: 0,
    line: { color: C.CARD_LIGHT_BORDER, width: 0.75 }
  });
}

function addHeaderLight(slide, eyebrow, title, subtitle) {
  slide.addText(eyebrow.toUpperCase(), {
    x: 0.8, y: 0.85, w: 11.7, h: 0.25,
    fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.GOLD_MUTED,
    charSpacing: 2
  });
  slide.addText(title, {
    x: 0.8, y: 1.1, w: 11.7, h: 0.55,
    fontSize: 26, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK
  });
  slide.addText(subtitle, {
    x: 0.8, y: 1.68, w: 11.7, h: 0.35,
    fontSize: 13, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK
  });
}

function addActDivider(sceneTag, actRoman, actWord, actTitle, logline, progressPct, notes) {
  const slide = pres.addSlide();
  addDarkChrome(slide, sceneTag);

  // Large background Roman numeral outline
  slide.addText(actRoman, {
    x: 0.8, y: 1.5, w: 4.5, h: 3.5,
    fontSize: 120, fontFace: FONT_HEAD, bold: true,
    color: '1E1217', align: 'left', valign: 'middle'
  });

  // Act Header Pill
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 2.0, w: 2.4, h: 0.4, r: 0.2,
    fill: { color: C.GOLD },
    line: { color: C.GOLD_LIGHT, width: 1 }
  });
  slide.addText(`ACT ${actRoman} · ${actWord}`, {
    x: 0.8, y: 2.0, w: 2.4, h: 0.4,
    fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.DARK_BG,
    align: 'center', valign: 'middle'
  });

  // Act Title & Logline
  slide.addText(actTitle, {
    x: 0.8, y: 2.65, w: 11.0, h: 1.1,
    fontSize: 42, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
  });
  slide.addText(logline, {
    x: 0.8, y: 3.85, w: 10.5, h: 0.8,
    fontSize: 18, fontFace: FONT_BODY, color: C.GOLD_LIGHT
  });

  // Visual Motif - Royal Arch Silhouette Lines
  slide.addShape(pres.ShapeType.arc, {
    x: 10.0, y: 2.2, w: 2.5, h: 3.0,
    line: { color: C.GOLD, width: 1.5 }
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 10.25, y: 3.7, w: 2.0, h: 2.5,
    line: { color: C.GOLD, width: 1.0 }
  });

  // Bottom Progress Track
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 6.2, w: 11.733, h: 0.08,
    fill: { color: '2A1A20' }
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 6.2, w: 11.733 * (progressPct / 100), h: 0.08,
    fill: { color: C.GOLD }
  });
  slide.addText(`STORYLINE PROGRESSION: ${progressPct}% COMPLETED`, {
    x: 0.8, y: 6.35, w: 6.0, h: 0.3,
    fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.GOLD, charSpacing: 1
  });

  slide.addNotes(notes);
  return slide;
}

// =========================================================================
// SCENE 00 · COLD OPEN HOOK
// =========================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.DARK_BG };
  addDarkChrome(slide, 'Scene 00 · Cold Open');

  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 1.8, w: 3.2, h: 0.35, r: 0.15,
    fill: { color: '2B1418' }, line: { color: C.PROBLEM, width: 1 }
  });
  slide.addText('THE UNTOLD WEDDING DILEMMA', {
    x: 0.8, y: 1.8, w: 3.2, h: 0.35,
    fontSize: 10, fontFace: FONT_BODY, bold: true, color: 'FF8080', align: 'center', valign: 'middle'
  });

  slide.addText('₹65,000 for 6 hours of celebration.', {
    x: 0.8, y: 2.35, w: 11.5, h: 1.0,
    fontSize: 48, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
  });

  slide.addText('And then, consigned to a dark wardrobe forever.', {
    x: 0.8, y: 3.4, w: 11.5, h: 0.8,
    fontSize: 26, fontFace: FONT_HEAD, italic: true, color: C.GOLD_LIGHT
  });

  // 3 Stark Stat Pillars
  const stats = [
    { num: '84%', label: 'Ethnic Couture Worn Only Once', desc: 'Bridal lehengas & groom sherwanis rarely see a second outing.' },
    { num: '₹1.2L Cr', label: 'Dead Wardrobe Capital', desc: 'Precious zari & silk heirlooms sitting idle in urban Indian households.' },
    { num: '1/10th', label: 'True Rental Opportunity', desc: 'Wear high couture royalty for a fraction of the retail price tag.' }
  ];

  stats.forEach((st, idx) => {
    const cardX = 0.8 + idx * 4.0;
    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: 4.5, w: 3.7, h: 2.2,
      fill: { color: C.CARD_DARK },
      line: { color: C.CARD_DARK_BORDER, width: 1 }
    });
    slide.addText(st.num, {
      x: cardX + 0.3, y: 4.65, w: 3.1, h: 0.6,
      fontSize: 32, fontFace: FONT_BODY, bold: true, color: C.GOLD
    });
    slide.addText(st.label, {
      x: cardX + 0.3, y: 5.3, w: 3.1, h: 0.45,
      fontSize: 12, fontFace: FONT_BODY, bold: true, color: C.TEXT_LIGHT
    });
    slide.addText(st.desc, {
      x: cardX + 0.3, y: 5.8, w: 3.1, h: 0.75,
      fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT
    });
  });

  slide.addNotes(
    "Respected evaluators, consider this striking reality: a handcrafted bridal velvet lehenga costs upwards of 65,000 rupees, yet it is worn for less than one evening before being locked in storage. Indian closets harbor over one lakh crore rupees in dead fashion capital. Poshakh transforms this single-use luxury into a sustainable, highly lucrative peer-to-peer rental economy."
  );
}

// =========================================================================
// SCENE 01 · TITLE SCENE
// =========================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.DARK_BG };
  addDarkChrome(slide, 'Scene 01 · Premiere');

  // Motif Arch Glow
  slide.addShape(pres.ShapeType.arc, {
    x: 0.8, y: 1.0, w: 4.2, h: 5.8,
    line: { color: C.GOLD, width: 1.5 }
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 1.1, y: 3.9, w: 3.6, h: 2.8,
    fill: { color: '140B0E' },
    line: { color: C.GOLD, width: 1 }
  });

  // Brand Name inside arch area
  slide.addText('POSHAKH', {
    x: 1.2, y: 4.1, w: 3.4, h: 0.8,
    fontSize: 34, fontFace: FONT_HEAD, bold: true, color: C.GOLD, align: 'center'
  });
  slide.addText('ROYAL ETHNIC WEAR RENTAL\n& HERITAGE COUTURE ECOSYSTEM', {
    x: 1.2, y: 4.9, w: 3.4, h: 0.6,
    fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.TEXT_MUTED_LIGHT, align: 'center', charSpacing: 1
  });
  slide.addText('Wear The Celebration. Return The Rest.', {
    x: 1.2, y: 5.7, w: 3.4, h: 0.4,
    fontSize: 11, fontFace: FONT_HEAD, italic: true, color: C.GOLD_LIGHT, align: 'center'
  });

  // Right Side Details Panel
  slide.addShape(pres.ShapeType.rect, {
    x: 5.4, y: 1.4, w: 7.1, h: 5.3,
    fill: { color: C.CARD_DARK },
    line: { color: C.CARD_DARK_BORDER, width: 1.25 }
  });

  slide.addText('PROJECT SPECIFICATION & DEFENSE', {
    x: 5.8, y: 1.7, w: 6.3, h: 0.3,
    fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.GOLD, charSpacing: 2
  });

  slide.addText('Poshakh: Peer-to-Peer Luxury Couture Marketplace', {
    x: 5.8, y: 2.05, w: 6.3, h: 0.8,
    fontSize: 22, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
  });

  slide.addText(
    'A full-lifecycle digital platform bridging high-net-worth ethnic wardrobe owners & verified boutiques (Lenders) with wedding guests, bridal parties, and festive revelers (Renters) protected by automated security deposits and multi-role administration.',
    {
      x: 5.8, y: 2.9, w: 6.3, h: 0.9,
      fontSize: 12, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT
    }
  );

  // Metadata Grid
  const meta = [
    { label: 'INSTITUTION', val: 'L.J. Institute of Computer Applications (LJCCA)' },
    { label: 'PROJECT DOMAIN', val: 'E-Commerce / Fashion-Tech / Circular Sharing Economy' },
    { label: 'PLATFORM ROLES', val: 'Administrator · Boutique Lender · Customer Renter' },
    { label: 'ENGINEERING STACK', val: 'HTML5 · CSS3 Luxury System · ES6+ Store · Node Server' }
  ];

  meta.forEach((m, idx) => {
    const myY = 4.0 + idx * 0.65;
    slide.addText(m.label, {
      x: 5.8, y: myY, w: 2.2, h: 0.25,
      fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.GOLD
    });
    slide.addText(m.val, {
      x: 5.8, y: myY + 0.22, w: 6.3, h: 0.35,
      fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_LIGHT
    });
  });

  slide.addNotes(
    "Good morning, esteemed faculty and reviewers. Welcome to the technical review of POSHAKH — a luxury ethnic wear rental platform developed for LJCCA. Poshakh digitizes the high-value Indian bridal and festive apparel sector, offering automated date-based booking, direct boutique messaging, transparent security deposit escrow, and multi-tier role governance."
  );
}

// =========================================================================
// SCENE 02 · STORYBOARD CONTENTS
// =========================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.DARK_BG };
  addDarkChrome(slide, 'Scene 02 · Table of Contents');

  slide.addText('PRESENTATION ARCHITECTURE', {
    x: 0.8, y: 1.0, w: 11.7, h: 0.3,
    fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.GOLD, charSpacing: 2
  });
  slide.addText('The 6-Act Filmstrip Storyboard', {
    x: 0.8, y: 1.3, w: 11.7, h: 0.5,
    fontSize: 26, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
  });

  const acts = [
    { num: 'ACT I', title: 'The World Today', desc: 'Current market flaws, dead wardrobe capital & 4 critical rental bottlenecks.', tag: 'Problem Domain' },
    { num: 'ACT II', title: 'The Turning Point', desc: 'The Poshakh circular paradigm, core value props & Before vs After comparison.', tag: 'Solution Vision' },
    { num: 'ACT III', title: 'The Cast & Machine', desc: 'Engineering tech stack, detailed user personas & 6 decoupled platform modules.', tag: 'System Architecture' },
    { num: 'ACT IV', title: 'The Blueprints', desc: 'Rigorous UML specs: Use Cases, Sequence, Swimlane Activity, Classes & States.', tag: 'Software Engineering' },
    { num: 'ACT V', title: 'The Data Vault', desc: 'Crow’s foot ER diagram, 7 relational entities & comprehensive data dictionaries.', tag: 'Database Design' },
    { num: 'ACT VI', title: 'The Finale', desc: 'Measurable economic impacts, IEEE bibliography & academic defense discussion.', tag: 'Synthesis & Defense' }
  ];

  acts.forEach((act, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const cardX = 0.8 + col * 4.0;
    const cardY = 2.1 + row * 2.3;

    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: cardY, w: 3.73, h: 2.05,
      fill: { color: C.CARD_DARK },
      line: { color: C.CARD_DARK_BORDER, width: 1 }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: cardY, w: 3.73, h: 0.05,
      fill: { color: C.GOLD }
    });

    slide.addText(act.num, {
      x: cardX + 0.25, y: cardY + 0.2, w: 1.5, h: 0.3,
      fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.GOLD
    });
    slide.addText(act.tag, {
      x: cardX + 1.8, y: cardY + 0.2, w: 1.7, h: 0.3,
      fontSize: 9, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT, align: 'right'
    });
    slide.addText(act.title, {
      x: cardX + 0.25, y: cardY + 0.55, w: 3.2, h: 0.4,
      fontSize: 16, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
    });
    slide.addText(act.desc, {
      x: cardX + 0.25, y: cardY + 0.95, w: 3.2, h: 0.9,
      fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT
    });
  });

  slide.addNotes(
    "Our presentation is structured in six coherent acts, mirroring an engineering documentary. We begin with the market problem, present Poshakh's circular solution, break down the technical architecture, dive deep into formal UML specifications and database schemas, and conclude with economic metrics and viva discussion."
  );
}

// =========================================================================
// SCENE 03 · ACT I DIVIDER
// =========================================================================
addActDivider(
  'Scene 03 · Act I',
  'I',
  'THE WORLD TODAY',
  'The Cost of Tradition: Offline Friction in High Fashion',
  'How high purchase costs, lack of trust, and fragmented local shops trap valuable wardrobes.',
  16,
  "Let us examine Act One: The World Today. Luxury ethnic apparel in India is characterized by astronomical upfront investments, single-digit utilization rates, and unorganized offline rental stores that lack digital inventories, standard pricing, and transparent guarantees."
);

// =========================================================================
// SCENE 04 · EXISTING SYSTEM (MUTED OLD WAY)
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 04 · Act I', '04');
  addHeaderLight(
    slide,
    'Current Industry Reality',
    'The Traditional Offline Rental & Purchase Cycle',
    'A fractured workflow relying on manual ledgers, physical visits, and high cash-deposit risks.'
  );

  const steps = [
    { num: '01', title: 'Extravagant Retail Purchase', desc: 'Families spend ₹40,000 to ₹1,50,000 on wedding attire used exclusively for one single night.', status: 'Extreme Capital Depletion' },
    { num: '02', title: 'Wardrobe Burial', desc: 'Outfits are stored in trunks with zero economic return; fabrics degrade and designs fall out of season.', status: '100% Dead Capital' },
    { num: '03', title: 'Scattered Offline Rentals', desc: 'Renters must physically travel across dozens of congested shops with no live inventory visibility.', status: 'High Friction & Time Loss' },
    { num: '04', title: 'Paper Ledgers & Cash Risk', desc: 'Boutique owners manage rentals in physical notebooks with arbitrary cash deposits and zero fraud protection.', status: 'High Dispute Rate' }
  ];

  steps.forEach((st, idx) => {
    const cardX = 0.8 + idx * 3.0;
    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: 2.2, w: 2.75, h: 4.4,
      fill: { color: C.CARD_LIGHT },
      line: { color: C.CARD_LIGHT_BORDER, width: 1 }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: 2.2, w: 2.75, h: 0.08,
      fill: { color: C.PROBLEM }
    });

    slide.addText(st.num, {
      x: cardX + 0.2, y: 2.45, w: 2.3, h: 0.5,
      fontSize: 28, fontFace: FONT_HEAD, bold: true, color: C.PROBLEM
    });
    slide.addText(st.title, {
      x: cardX + 0.2, y: 3.05, w: 2.3, h: 0.7,
      fontSize: 15, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK
    });
    slide.addText(st.desc, {
      x: cardX + 0.2, y: 3.8, w: 2.3, h: 1.6,
      fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: cardX + 0.2, y: 5.75, w: 2.35, h: 0.45, r: 0.1,
      fill: { color: C.PROBLEM_BG },
      line: { color: C.PROBLEM, width: 0.5 }
    });
    slide.addText(st.status, {
      x: cardX + 0.2, y: 5.75, w: 2.35, h: 0.45,
      fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.PROBLEM, align: 'center', valign: 'middle'
    });
  });

  slide.addNotes(
    "In the existing ecosystem, customers endure an inefficient four-step ordeal. They either overspend drastically on single-use purchases or navigate unorganized offline rental shops. In these local shops, availability is unknown until you physically arrive, pricing is arbitrary, and deposits are kept in cash with frequent return disputes. Clearly, this industry is overdue for digital disruption."
  );
}

// =========================================================================
// SCENE 05 · DISADVANTAGES OF THE EXISTING SYSTEM
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 05 · Act I', '05');
  addHeaderLight(
    slide,
    'Pain Point Analysis',
    'Four Structural Failures of Traditional Rental Systems',
    'Severe inefficiencies that affect renters, boutique owners, and luxury garment longevity.'
  );

  const pains = [
    {
      code: 'PAIN-01',
      title: 'Astronomical Financial Waste',
      detail: 'Customers spend 20% to 40% of their event budget on outfits that lose 90% of their utility after the ceremony.',
      impact: 'Average ₹50,000+ lost per wedding attendee'
    },
    {
      code: 'PAIN-02',
      title: 'Zero Deposit Escrow Security',
      detail: 'Traditional shops withhold arbitrary cash security sums. Renters face unjustified deduction claims for standard wear.',
      impact: 'Frequent friction & lack of formal dispute recourse'
    },
    {
      code: 'PAIN-03',
      title: 'Blind Sizing & Fabric Uncertainty',
      detail: 'No standardized measurements, fabric verification, or high-res imagery exists in offline cataloging.',
      impact: 'Up to 35% fitting mismatches on wedding day'
    },
    {
      code: 'PAIN-04',
      title: 'Hyper-Localized boutique Isolation',
      detail: 'Heritage weavers and bespoke boutiques in places like Surat or Kutch cannot access buyers outside their physical market.',
      impact: 'Over 80% boutique inventory sits unrented'
    }
  ];

  pains.forEach((p, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = 0.8 + col * 6.0;
    const cardY = 2.2 + row * 2.3;

    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: cardY, w: 5.7, h: 2.1,
      fill: { color: C.CARD_LIGHT },
      line: { color: C.CARD_LIGHT_BORDER, width: 1 }
    });

    slide.addText(p.code, {
      x: cardX + 0.3, y: cardY + 0.2, w: 1.5, h: 0.3,
      fontSize: 10, fontFace: FONT_MONO, bold: true, color: C.PROBLEM
    });
    slide.addText(p.title, {
      x: cardX + 0.3, y: cardY + 0.5, w: 5.1, h: 0.35,
      fontSize: 16, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK
    });
    slide.addText(p.detail, {
      x: cardX + 0.3, y: cardY + 0.9, w: 5.1, h: 0.6,
      fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK
    });

    slide.addShape(pres.ShapeType.rect, {
      x: cardX + 0.3, y: cardY + 1.55, w: 5.1, h: 0.35,
      fill: { color: C.PROBLEM_BG }
    });
    slide.addText('CRITICAL IMPACT: ' + p.impact, {
      x: cardX + 0.4, y: cardY + 1.55, w: 4.9, h: 0.35,
      fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.PROBLEM, valign: 'middle'
    });
  });

  slide.addNotes(
    "To quantify these issues, we identified four structural fractures: financial waste from one-time usage, lack of deposit escrow security, fitting and fabric ambiguity, and severe geographic limitation for master weavers. These four points formed the foundational design criteria for Poshakh."
  );
}

// =========================================================================
// SCENE 06 · ACT II DIVIDER
// =========================================================================
addActDivider(
  'Scene 06 · Act II',
  'II',
  'THE TURNING POINT',
  'The Circular Luxury Solution: POSHAKH',
  'Transforming ethnic fashion from linear consumption into an automated, peer-to-peer sharing economy.',
  33,
  "Now we arrive at Act Two: The Turning Point. POSHAKH redefines ethnic couture by introducing a high-trust digital rental ecosystem where authenticated lenders monetize heirlooms, renters enjoy royal outfits at a fraction of the cost, and an automated platform guarantees trust."
);

// =========================================================================
// SCENE 07 · PROPOSED SYSTEM (HERO REVEAL)
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 07 · Act II', '07');
  addHeaderLight(
    slide,
    'System Architecture Vision',
    'POSHAKH: The Three-Pillar Circular Couture Platform',
    'Connecting fashion seekers with curated boutique collections through automated trust mechanisms.'
  );

  const pillars = [
    {
      role: 'THE RENTER',
      subtitle: 'Luxury Without Liability',
      items: [
        'Curated Discovery by Occasion & Fabric',
        'Transparent 3/5/7-Day Rental Slabs',
        '100% Refundable Security Deposit',
        'Verified Boutique Trust Ratings & Reviews'
      ],
      accent: C.GOLD_MUTED
    },
    {
      role: 'POSHAKH ENGINE',
      subtitle: 'Automated Trust & Escrow Hub',
      items: [
        'Centralized Role-Based Access Control',
        'Real-Time Date Availability Engine',
        'Direct Buyer-Lender Messaging Tunnel',
        'Admin Mediation & Dispute Resolution'
      ],
      accent: C.GOLD
    },
    {
      role: 'THE LENDER',
      subtitle: 'Monetize Heirloom Wardrobes',
      items: [
        'Dedicated Boutique Storefront & Bio',
        'Outfit Listing with Retail vs Rent Multipliers',
        'Rental Order Lifecycle Tracking',
        'Direct Revenue Generation & Payouts'
      ],
      accent: C.SUCCESS
    }
  ];

  pillars.forEach((p, idx) => {
    const cardX = 0.8 + idx * 4.0;
    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: 2.2, w: 3.73, h: 4.4,
      fill: { color: C.CARD_LIGHT },
      line: { color: p.accent, width: 1.5 }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: 2.2, w: 3.73, h: 0.08,
      fill: { color: p.accent }
    });

    slide.addText(p.role, {
      x: cardX + 0.3, y: 2.45, w: 3.1, h: 0.35,
      fontSize: 16, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK
    });
    slide.addText(p.subtitle, {
      x: cardX + 0.3, y: 2.8, w: 3.1, h: 0.3,
      fontSize: 11, fontFace: FONT_BODY, bold: true, color: p.accent
    });

    p.items.forEach((item, iIdx) => {
      const itemY = 3.3 + iIdx * 0.75;
      slide.addShape(pres.ShapeType.ellipse, {
        x: cardX + 0.3, y: itemY + 0.08, w: 0.12, h: 0.12,
        fill: { color: p.accent }
      });
      slide.addText(item, {
        x: cardX + 0.55, y: itemY, w: 2.85, h: 0.65,
        fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_DARK
      });
    });
  });

  slide.addNotes(
    "Poshakh functions as a robust tri-pillar ecosystem. For Renters, it offers access to authentic bridal wear at a tenth of retail prices. For Lenders, it turns idle couture into a high-yield asset generating passive revenue. And in between, the Poshakh core engine guarantees trust, security escrow, and seamless communication."
  );
}

// =========================================================================
// SCENE 08 · ADVANTAGES & BEFORE VS AFTER
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 08 · Act II', '08');
  addHeaderLight(
    slide,
    'Comparative Paradigm Shift',
    'Before vs After: The Poshakh Transformation',
    'A direct feature-by-feature evaluation proving structural efficiency gains.'
  );

  const comparisons = [
    { metric: 'Cost to Wear Luxury Couture', before: '100% Full Retail Purchase (₹50k-₹1.5L)', after: '8-12% Affordable Rental Fee (₹3,000-₹7,000)' },
    { metric: 'Inventory Transparency', before: 'Uncertain offline shop visits with zero catalog', after: 'High-res online showcase with filters by occasion & fabric' },
    { metric: 'Deposit Management', before: 'Vague cash receipts prone to withholding disputes', after: 'Clear escrow policy with automated post-inspection release' },
    { metric: 'Lender Revenue Model', before: 'Wardrobes lock capital with zero returns', after: 'Boutiques & individuals earn steady rental dividends' },
    { metric: 'Dispute & Quality Recourse', before: 'No formal mediator; renter bears full risk', after: 'Admin panel with formal complaint escalation & refund' }
  ];

  // Table Headers
  slide.addShape(pres.ShapeType.rect, { x: 0.8, y: 2.2, w: 3.2, h: 0.45, fill: { color: '2E2528' } });
  slide.addText('FEATURE / METRIC', { x: 0.9, y: 2.2, w: 3.0, h: 0.45, fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.TEXT_LIGHT, valign: 'middle' });

  slide.addShape(pres.ShapeType.rect, { x: 4.05, y: 2.2, w: 4.2, h: 0.45, fill: { color: '5A343A' } });
  slide.addText('TRADITIONAL OFFLINE SYSTEM', { x: 4.15, y: 2.2, w: 4.0, h: 0.45, fontSize: 10, fontFace: FONT_BODY, bold: true, color: 'FFB3B3', valign: 'middle' });

  slide.addShape(pres.ShapeType.rect, { x: 8.3, y: 2.2, w: 4.233, h: 0.45, fill: { color: '1A3E2C' } });
  slide.addText('THE POSHAKH PLATFORM', { x: 8.4, y: 2.2, w: 4.0, h: 0.45, fontSize: 10, fontFace: FONT_BODY, bold: true, color: 'B3FFD6', valign: 'middle' });

  comparisons.forEach((row, idx) => {
    const rowY = 2.7 + idx * 0.78;
    const bgCol = idx % 2 === 0 ? C.CARD_LIGHT : 'F6F1E9';

    slide.addShape(pres.ShapeType.rect, { x: 0.8, y: rowY, w: 3.2, h: 0.73, fill: { color: bgCol }, line: { color: C.CARD_LIGHT_BORDER, width: 0.5 } });
    slide.addText(row.metric, { x: 0.95, y: rowY, w: 2.9, h: 0.73, fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.TEXT_DARK, valign: 'middle' });

    slide.addShape(pres.ShapeType.rect, { x: 4.05, y: rowY, w: 4.2, h: 0.73, fill: { color: bgCol }, line: { color: C.CARD_LIGHT_BORDER, width: 0.5 } });
    slide.addText('❌ ' + row.before, { x: 4.2, y: rowY, w: 3.9, h: 0.73, fontSize: 10.5, fontFace: FONT_BODY, color: C.PROBLEM, valign: 'middle' });

    slide.addShape(pres.ShapeType.rect, { x: 8.3, y: rowY, w: 4.233, h: 0.73, fill: { color: bgCol }, line: { color: C.CARD_LIGHT_BORDER, width: 0.5 } });
    slide.addText('✔ ' + row.after, { x: 8.45, y: rowY, w: 3.95, h: 0.73, fontSize: 10.5, fontFace: FONT_BODY, bold: true, color: C.SUCCESS, valign: 'middle' });
  });

  slide.addNotes(
    "This matrix highlights the dramatic paradigm shift. Customers transition from paying 100% upfront retail costs to just 10% on rental. Where manual ledgers left deposits insecure, Poshakh provides formal escrow. And where boutiques were once restricted to foot traffic, they now enjoy national reach."
  );
}

// =========================================================================
// SCENE 09 · ACT III DIVIDER
// =========================================================================
addActDivider(
  'Scene 09 · Act III',
  'III',
  'THE CAST & THE MACHINE',
  'Technical Architecture, User Roles & Functional Engines',
  'A rigorous dissection of the software components, authorization barriers, and system modules.',
  50,
  "We proceed to Act Three: The Cast & The Machine. Here we examine the engineering anatomy of Poshakh — beginning with our lean, high-performance technology stack, proceeding to role-based access control, and reviewing the core functional subsystems."
);

// =========================================================================
// SCENE 10 · TECHNOLOGICAL STACK
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 10 · Act III', '10');
  addHeaderLight(
    slide,
    'Engineering Foundation',
    'Layered Technology Stack & Technical Rationale',
    'High-speed, zero-dependency architecture engineered for extreme reliability and instant loads.'
  );

  const layers = [
    {
      layer: 'LAYER 1 · PRESENTATION & UI',
      tech: 'Semantic HTML5 + Custom Luxury CSS3 Design System',
      why: 'Pure vanilla architecture guarantees sub-millisecond DOM render times, native responsive fluid layouts, and complete brand design freedom without bulky CSS framework bloat.'
    },
    {
      layer: 'LAYER 2 · CLIENT APPLICATION LOGIC',
      tech: 'Vanilla ES6+ JavaScript Modules (store.js, auth.js, ui-effects.js)',
      why: 'Zero external frontend runtime dependencies. Enables instantaneous client-side navigation, immediate reactive state synchronization, and predictable offline reliability.'
    },
    {
      layer: 'LAYER 3 · STATE MANAGEMENT & PERSISTENCE',
      tech: 'Unified Browser LocalStorage API + Session Storage Manager',
      why: 'Provides zero-latency, persistent client-side data storage for authenticated users, active cart sessions, listed dress catalogs, and complete order history.'
    },
    {
      layer: 'LAYER 4 · LOCAL RUNTIME & SERVING ENGINE',
      tech: 'Node.js Native HTTP Daemon (server.js, zero external npm dependencies)',
      why: 'Self-contained, cross-platform static file serving engine with automatic MIME resolution (HTML/CSS/JS/images), path sanitization, and clean route handling.'
    }
  ];

  layers.forEach((l, idx) => {
    const cardY = 2.2 + idx * 1.15;
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8, y: cardY, w: 11.733, h: 1.0,
      fill: { color: C.CARD_LIGHT },
      line: { color: C.CARD_LIGHT_BORDER, width: 1 }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: 0.8, y: cardY, w: 0.12, h: 1.0,
      fill: { color: C.GOLD }
    });

    slide.addText(l.layer, {
      x: 1.1, y: cardY + 0.15, w: 3.5, h: 0.25,
      fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.GOLD_MUTED, charSpacing: 1
    });
    slide.addText(l.tech, {
      x: 1.1, y: cardY + 0.4, w: 4.8, h: 0.45,
      fontSize: 14, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK
    });

    slide.addShape(pres.ShapeType.line, {
      x: 6.0, y: cardY + 0.15, w: 0, h: 0.7,
      line: { color: C.CARD_LIGHT_BORDER, width: 0.75 }
    });

    slide.addText('TECHNICAL RATIONALE ("WHY"):', {
      x: 6.2, y: cardY + 0.15, w: 5.4, h: 0.22,
      fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.TEXT_MUTED_DARK
    });
    slide.addText(l.why, {
      x: 6.2, y: cardY + 0.38, w: 6.1, h: 0.55,
      fontSize: 10.5, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK
    });
  });

  slide.addNotes(
    "Our architectural philosophy prioritizes lean efficiency. By leveraging modern Vanilla JavaScript and a custom-built Node.js HTTP server, we achieve zero bundle bloat and sub-second render speeds. All business logic, cart states, and catalog filters run seamlessly with clean separation of concerns."
  );
}

// =========================================================================
// SCENE 11 · USER ROLES & RBAC
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 11 · Act III', '11');
  addHeaderLight(
    slide,
    'Access Control Specification',
    'User Personas & Role-Based Access Control (RBAC)',
    'Three clearly segregated user classes with distinct operational boundaries.'
  );

  const roles = [
    {
      role: 'CUSTOMER / RENTER',
      persona: 'Wedding Attendees, Brides & Festive Shoppers',
      can: [
        'Browse & filter luxury ethnic wear catalog',
        'Select rental dates (3/5/7 days) with dynamic pricing',
        'Initiate checkout with deposit escrow calculation',
        'Chat directly with boutique lenders in real-time',
        'Submit reviews & file formal quality complaints'
      ],
      cannot: [
        'Cannot edit boutique inventory or base prices',
        'Cannot access the administrative audit portal',
        'Cannot authorize deposit refunds directly'
      ],
      accent: C.GOLD_MUTED
    },
    {
      role: 'BOUTIQUE / LENDER',
      persona: 'Verified Boutiques & Heritage Wardrobe Owners',
      can: [
        'Create & manage boutique profile (avatar, bio, city)',
        'List, edit & toggle availability for dress outfits',
        'Track active rentals, dispatch dates & return status',
        'Engage in direct pre-rental customer chats',
        'Inspect returned garments & sign off on condition'
      ],
      cannot: [
        'Cannot alter administrative dispute verdicts',
        'Cannot unilaterally seize customer deposit balances',
        'Cannot modify platform fee commission rates'
      ],
      accent: C.GOLD
    },
    {
      role: 'SYSTEM ADMINISTRATOR',
      persona: 'Platform Compliance & Escrow Governance Officers',
      can: [
        'Monitor global catalog, user accounts & active bookings',
        'Mediate & resolve complaints between Renters & Lenders',
        'Authorize security deposit deductions or full releases',
        'Audit boutique verification statuses & metrics',
        'Manage platform configurations and data seeds'
      ],
      cannot: [
        'Cannot impersonate user credentials',
        'Cannot alter signed rental contract dates after dispatch'
      ],
      accent: C.PROBLEM
    }
  ];

  roles.forEach((r, idx) => {
    const cardX = 0.8 + idx * 4.0;
    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: 2.2, w: 3.73, h: 4.4,
      fill: { color: C.CARD_LIGHT },
      line: { color: r.accent, width: 1.5 }
    });

    slide.addText(r.role, {
      x: cardX + 0.25, y: 2.35, w: 3.2, h: 0.35,
      fontSize: 14, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK
    });
    slide.addText(r.persona, {
      x: cardX + 0.25, y: 2.7, w: 3.2, h: 0.3,
      fontSize: 10, fontFace: FONT_BODY, italic: true, color: C.TEXT_MUTED_DARK
    });

    slide.addShape(pres.ShapeType.line, {
      x: cardX + 0.25, y: 3.05, w: 3.2, h: 0,
      line: { color: C.CARD_LIGHT_BORDER, width: 0.75 }
    });

    slide.addText('PERMITTED CAPABILITIES ("CAN DO"):', {
      x: cardX + 0.25, y: 3.15, w: 3.2, h: 0.25,
      fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C.SUCCESS
    });

    r.can.forEach((c, cIdx) => {
      slide.addText('✔ ' + c, {
        x: cardX + 0.25, y: 3.4 + cIdx * 0.36, w: 3.2, h: 0.35,
        fontSize: 9.5, fontFace: FONT_BODY, color: C.TEXT_DARK
      });
    });

    const cantY = 5.3;
    slide.addText('SYSTEM RESTRICTIONS ("CANNOT DO"):', {
      x: cardX + 0.25, y: cantY, w: 3.2, h: 0.25,
      fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C.PROBLEM
    });

    r.cannot.forEach((cn, cnIdx) => {
      slide.addText('✖ ' + cn, {
        x: cardX + 0.25, y: cantY + 0.25 + cnIdx * 0.36, w: 3.2, h: 0.35,
        fontSize: 9, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK
      });
    });
  });

  slide.addNotes(
    "Security in Poshakh is enforced through a strict Role-Based Access Control matrix. The Renter experiences a seamless consumer shopping journey. The Lender gains a dedicated inventory management workspace. Crucially, neither party can unilaterally seize or dispute funds; that power is reserved for the Admin to eliminate fraud."
  );
}

// =========================================================================
// SCENE 12 · CORE FUNCTIONAL MODULES
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 12 · Act III', '12');
  addHeaderLight(
    slide,
    'Functional Decomposition',
    'Six Core Platform Subsystems',
    'Decoupled functional modules handling the complete lifecycle of luxury couture rental.'
  );

  const modules = [
    { num: 'MOD 01', name: 'Authentication & Session Store', desc: 'Manages user registration, role detection (Admin/Renter/Lender), active credential persistence, and protected route routing.' },
    { num: 'MOD 02', name: 'Luxury Catalog & Filtering Engine', desc: 'Powers multi-criteria queries across Category (Lehenga, Saree, Sherwani), Occasions, Price Slabs, and Boutique locations.' },
    { num: 'MOD 03', name: 'Rental Booking & Escrow Calculator', desc: 'Dynamically calculates 3/5/7-day rental rates, refundable deposit escrows, delivery logistics, and generates order IDs.' },
    { num: 'MOD 04', name: 'Direct In-App Messaging Tunnel', desc: 'Enables asynchronous pre-booking communication between renter and boutique lender for custom fitting and blouse sizing questions.' },
    { num: 'MOD 05', name: 'Lender Inventory & Analytics Hub', desc: 'Empowers boutique partners to list garments, upload multi-angle photography, update status (Available/Rented), and track earnings.' },
    { num: 'MOD 06', name: 'Admin Governance & Dispute Desk', desc: 'Central audit console providing dispute escalation, damage claims processing, inspection sign-offs, and deposit refund triggers.' }
  ];

  modules.forEach((m, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const cardX = 0.8 + col * 4.0;
    const cardY = 2.2 + row * 2.3;

    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: cardY, w: 3.73, h: 2.1,
      fill: { color: C.CARD_LIGHT },
      line: { color: C.CARD_LIGHT_BORDER, width: 1 }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: cardY, w: 3.73, h: 0.05,
      fill: { color: C.GOLD }
    });

    slide.addText(m.num, {
      x: cardX + 0.25, y: cardY + 0.18, w: 1.5, h: 0.25,
      fontSize: 9.5, fontFace: FONT_MONO, bold: true, color: C.GOLD_MUTED
    });
    slide.addText(m.name, {
      x: cardX + 0.25, y: cardY + 0.45, w: 3.2, h: 0.5,
      fontSize: 14, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK
    });
    slide.addText(m.desc, {
      x: cardX + 0.25, y: cardY + 0.98, w: 3.2, h: 1.0,
      fontSize: 10.5, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK
    });
  });

  slide.addNotes(
    "The Poshakh codebase is cleanly decomposed into six decoupled modules. From identity management in Module 01 to the dynamic rental calculator in Module 03, real-time messaging in Module 04, and dispute governance in Module 06, each subsystem functions with high cohesion and low coupling."
  );
}

// =========================================================================
// SCENE 13 · ACT IV DIVIDER
// =========================================================================
addActDivider(
  'Scene 13 · Act IV',
  'IV',
  'THE BLUEPRINTS',
  'Formal UML Software Engineering Specifications',
  'Behavioral, structural, and state machine models defining platform operations.',
  66,
  "We now transition to Act Four: The Blueprints. Software design is validated through formal modeling. We present native UML diagrams: Use Case boundaries, Sequence lifelines with alt fragments, Swimlane activities, Class structures, and State transition charts."
);

// =========================================================================
// SCENE 14 · USE CASE DIAGRAM (NATIVE UML)
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 14 · Act IV', '14');
  addHeaderLight(
    slide,
    'UML Behavioral Model',
    'Use Case Diagram: Actors & System Boundary',
    'Standard UML specifications detailing actor interactions, «include» and «extend» relationships.'
  );

  // Left Actor: Customer / Renter
  slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 2.2, w: 2.2, h: 4.4, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1.5 } });
  slide.addText('ACTOR:\nRENTER\n(Customer)', { x: 0.9, y: 2.4, w: 2.0, h: 0.8, fontSize: 13, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK, align: 'center' });
  slide.addText('• Browse Catalog\n• Filter Occasion\n• Book Rental\n• Escrow Deposit\n• Chat Lender\n• File Dispute', {
    x: 1.0, y: 3.3, w: 1.8, h: 3.0, fontSize: 10.5, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK
  });

  // System Boundary Box
  slide.addShape(pres.ShapeType.rect, { x: 3.3, y: 2.2, w: 6.8, h: 4.4, fill: { color: 'F5EFE6' }, line: { color: C.GOLD_MUTED, width: 1.5 } });
  slide.addText('SYSTEM BOUNDARY: POSHAKH PLATFORM', { x: 3.5, y: 2.3, w: 6.4, h: 0.3, fontSize: 10, fontFace: FONT_MONO, bold: true, color: C.GOLD_MUTED });

  // Use Case Ovals inside boundary
  const useCases = [
    { name: 'UC1: Authenticate & Role Session', x: 3.6, y: 2.7, w: 2.9, inc: '«include» in UC3' },
    { name: 'UC2: Browse & Filter Dresses', x: 7.0, y: 2.7, w: 2.8, inc: 'General Access' },
    { name: 'UC3: Reserve Outfit & Escrow Deposit', x: 3.6, y: 3.7, w: 3.0, inc: '«include» Payment Escrow' },
    { name: 'UC4: Direct Boutique Inquiry Chat', x: 7.0, y: 3.7, w: 2.8, inc: '«extend» on Inquiries' },
    { name: 'UC5: Dispatch & Return Outfit', x: 3.6, y: 4.7, w: 3.0, inc: 'Status Update' },
    { name: 'UC6: Mediate Dispute & Settle Escrow', x: 7.0, y: 4.7, w: 2.8, inc: '«extend» on Damage' },
    { name: 'UC7: Manage Boutique Inventory', x: 5.3, y: 5.7, w: 3.0, inc: 'Lender Core' }
  ];

  useCases.forEach(uc => {
    slide.addShape(pres.ShapeType.ellipse, {
      x: uc.x, y: uc.y, w: uc.w, h: 0.75,
      fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1 }
    });
    slide.addText(uc.name, {
      x: uc.x + 0.1, y: uc.y + 0.08, w: uc.w - 0.2, h: 0.38,
      fontSize: 9.5, fontFace: FONT_BODY, bold: true, color: C.TEXT_DARK, align: 'center', valign: 'middle'
    });
    slide.addText(uc.inc, {
      x: uc.x + 0.1, y: uc.y + 0.44, w: uc.w - 0.2, h: 0.25,
      fontSize: 8, fontFace: FONT_MONO, italic: true, color: C.GOLD_MUTED, align: 'center'
    });
  });

  // Right Actors: Lender & Admin
  slide.addShape(pres.ShapeType.roundRect, { x: 10.3, y: 2.2, w: 2.2, h: 2.1, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1.5 } });
  slide.addText('ACTOR:\nBOUTIQUE LENDER', { x: 10.4, y: 2.3, w: 2.0, h: 0.5, fontSize: 11, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK, align: 'center' });
  slide.addText('• List Garments\n• Track Orders\n• Sign Off Returns', { x: 10.5, y: 2.85, w: 1.8, h: 1.3, fontSize: 10, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK });

  slide.addShape(pres.ShapeType.roundRect, { x: 10.3, y: 4.5, w: 2.2, h: 2.1, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.PROBLEM, width: 1.5 } });
  slide.addText('ACTOR:\nADMINISTRATOR', { x: 10.4, y: 4.6, w: 2.0, h: 0.5, fontSize: 11, fontFace: FONT_HEAD, bold: true, color: C.PROBLEM, align: 'center' });
  slide.addText('• Audit Platform\n• Resolve Complaints\n• Release Escrow', { x: 10.5, y: 5.15, w: 1.8, h: 1.3, fontSize: 10, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK });

  slide.addNotes(
    "Here is the formal Use Case model. The platform boundary clearly separates external actors from internal transactions. Notice the «include» relationship between reserving an outfit and authenticating with deposit escrow. The direct chat and dispute mediation extend standard order processing only when inquiries or damages occur."
  );
}

// =========================================================================
// SCENE 15 · SEQUENCE DIAGRAM
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 15 · Act IV', '15');
  addHeaderLight(
    slide,
    'UML Dynamic Interaction Model',
    'Sequence Diagram: Rental Booking & Deposit Escrow Lifecycle',
    'Lifelines, synchronous calls, return messages, and the conditional alternative fragment.'
  );

  const lifelines = [
    { name: ':Renter', x: 1.2 },
    { name: ':WebStoreUI', x: 3.8 },
    { name: ':RentalEngine', x: 6.4 },
    { name: ':BoutiqueLender', x: 9.0 },
    { name: ':EscrowVault', x: 11.5 }
  ];

  lifelines.forEach(ll => {
    slide.addShape(pres.ShapeType.rect, { x: ll.x - 0.7, y: 2.2, w: 1.4, h: 0.45, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1 } });
    slide.addText(ll.name, { x: ll.x - 0.7, y: 2.2, w: 1.4, h: 0.45, fontSize: 10, fontFace: FONT_MONO, bold: true, color: C.TEXT_DARK, align: 'center', valign: 'middle' });
    slide.addShape(pres.ShapeType.line, { x: ll.x, y: 2.65, w: 0, h: 4.0, line: { color: C.CARD_LIGHT_BORDER, width: 1, dashType: 'dash' } });
  });

  const steps = [
    { from: 1.2, to: 3.8, y: 2.9, label: '1: selectDates(outfitId, 3days)', sync: true },
    { from: 3.8, to: 6.4, y: 3.3, label: '2: checkAvailabilityAndDeposit()', sync: true },
    { from: 6.4, to: 3.8, y: 3.7, label: '3: return priceQuote + depositRequired', sync: false },
    { from: 1.2, to: 11.5, y: 4.1, label: '4: submitPayment(RentalFee + SecurityDeposit)', sync: true },
    { from: 11.5, to: 6.4, y: 4.5, label: '5: lockDepositInEscrow(orderId)', sync: true },
    { from: 6.4, to: 9.0, y: 4.9, label: '6: notifyOrderBooked(dispatchDate)', sync: false },
    { from: 9.0, to: 6.4, y: 5.3, label: '7: confirmGarmentDispatched(trackingCode)', sync: true },
    { from: 6.4, to: 11.5, y: 5.7, label: '8: [Post-Return OK] releaseDepositToRenter()', sync: true },
    { from: 11.5, to: 1.2, y: 6.1, label: '9: notifyDepositRefundComplete()', sync: false }
  ];

  steps.forEach(st => {
    const isForward = st.to > st.from;
    const arrowX = isForward ? st.from : st.to;
    const arrowW = Math.abs(st.to - st.from);
    slide.addShape(pres.ShapeType.line, {
      x: arrowX, y: st.y, w: arrowW, h: 0,
      line: { color: st.sync ? C.GOLD_MUTED : C.SUCCESS, width: 1.5, dashType: st.sync ? 'solid' : 'dash' }
    });
    slide.addText(st.label, {
      x: arrowX + 0.1, y: st.y - 0.28, w: arrowW - 0.2, h: 0.25,
      fontSize: 8.5, fontFace: FONT_MONO, color: C.TEXT_DARK, align: 'center'
    });
  });

  slide.addNotes(
    "The Sequence Diagram shows the chronological execution of a rental order. Notice step 4 and 5 where the security deposit is sequestered into the escrow vault before the lender is signaled to dispatch. The deposit remains untouchable until step 8, where successful post-rental inspection triggers automatic refund."
  );
}

// =========================================================================
// SCENE 16 · ACTIVITY DIAGRAM WITH SWIMLANES
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 16 · Act IV', '16');
  addHeaderLight(
    slide,
    'UML Process Workflow',
    'Activity Diagram: Multi-Swimlane Order Fulfillment',
    'Parallel activity flows across Renter, Boutique Lender, and Platform System.'
  );

  const lanes = [
    { name: 'SWIMLANE 1: RENTER', x: 0.8, w: 3.7 },
    { name: 'SWIMLANE 2: BOUTIQUE LENDER', x: 4.7, w: 3.7 },
    { name: 'SWIMLANE 3: SYSTEM ESCROW / ADMIN', x: 8.6, w: 3.9 }
  ];

  lanes.forEach(l => {
    slide.addShape(pres.ShapeType.rect, { x: l.x, y: 2.2, w: l.w, h: 4.4, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD_MUTED, width: 1 } });
    slide.addShape(pres.ShapeType.rect, { x: l.x, y: 2.2, w: l.w, h: 0.4, fill: { color: 'EFE9E0' } });
    slide.addText(l.name, { x: l.x, y: 2.2, w: l.w, h: 0.4, fontSize: 9.5, fontFace: FONT_BODY, bold: true, color: C.TEXT_DARK, align: 'center', valign: 'middle' });
  });

  // Swimlane 1 Activities
  slide.addShape(pres.ShapeType.roundRect, { x: 1.1, y: 2.8, w: 3.1, h: 0.55, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1 } });
  slide.addText('Browse & Select Rental Dates', { x: 1.1, y: 2.8, w: 3.1, h: 0.55, fontSize: 10, fontFace: FONT_BODY, align: 'center', valign: 'middle' });

  slide.addShape(pres.ShapeType.roundRect, { x: 1.1, y: 3.6, w: 3.1, h: 0.55, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1 } });
  slide.addText('Remit Rental Fee + Deposit', { x: 1.1, y: 3.6, w: 3.1, h: 0.55, fontSize: 10, fontFace: FONT_BODY, align: 'center', valign: 'middle' });

  slide.addShape(pres.ShapeType.roundRect, { x: 1.1, y: 5.2, w: 3.1, h: 0.55, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1 } });
  slide.addText('Wear Garment & Return by End Date', { x: 1.1, y: 5.2, w: 3.1, h: 0.55, fontSize: 10, fontFace: FONT_BODY, align: 'center', valign: 'middle' });

  // Swimlane 2 Activities
  slide.addShape(pres.ShapeType.roundRect, { x: 5.0, y: 3.6, w: 3.1, h: 0.55, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1 } });
  slide.addText('Receive Order & Pack Garment', { x: 5.0, y: 3.6, w: 3.1, h: 0.55, fontSize: 10, fontFace: FONT_BODY, align: 'center', valign: 'middle' });

  slide.addShape(pres.ShapeType.roundRect, { x: 5.0, y: 4.4, w: 3.1, h: 0.55, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1 } });
  slide.addText('Dispatch via Courier & Add Tracking', { x: 5.0, y: 4.4, w: 3.1, h: 0.55, fontSize: 10, fontFace: FONT_BODY, align: 'center', valign: 'middle' });

  slide.addShape(pres.ShapeType.diamond, { x: 5.8, y: 5.2, w: 1.5, h: 0.9, fill: { color: 'F7F0E6' }, line: { color: C.GOLD, width: 1 } });
  slide.addText('Inspect\nDamage?', { x: 5.8, y: 5.2, w: 1.5, h: 0.9, fontSize: 8.5, fontFace: FONT_BODY, bold: true, align: 'center', valign: 'middle' });

  // Swimlane 3 Activities
  slide.addShape(pres.ShapeType.roundRect, { x: 9.0, y: 3.6, w: 3.1, h: 0.55, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.SUCCESS, width: 1 } });
  slide.addText('Lock Security Deposit in Escrow', { x: 9.0, y: 3.6, w: 3.1, h: 0.55, fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.SUCCESS, align: 'center', valign: 'middle' });

  slide.addShape(pres.ShapeType.roundRect, { x: 9.0, y: 5.4, w: 3.1, h: 0.55, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.SUCCESS, width: 1 } });
  slide.addText('[No Damage] Auto-Refund Deposit', { x: 9.0, y: 5.4, w: 3.1, h: 0.55, fontSize: 10, fontFace: FONT_BODY, color: C.SUCCESS, align: 'center', valign: 'middle' });

  slide.addShape(pres.ShapeType.roundRect, { x: 9.0, y: 6.0, w: 3.1, h: 0.55, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.PROBLEM, width: 1 } });
  slide.addText('[Damage Claim] Escalate to Admin', { x: 9.0, y: 6.0, w: 3.1, h: 0.55, fontSize: 10, fontFace: FONT_BODY, color: C.PROBLEM, align: 'center', valign: 'middle' });

  slide.addNotes(
    "Our Activity Diagram utilizes formal swimlanes to track accountability across roles. Observe the critical decision diamond in Lane 2: if inspection detects zero damage, the escrow vault automatically releases the renter's deposit. If damage is reported, the process forks to the admin arbitration queue."
  );
}

// =========================================================================
// SCENE 17 · CLASS DIAGRAM
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 17 · Act IV', '17');
  addHeaderLight(
    slide,
    'UML Structural Specification',
    'Class Diagram: Domain Entities & Methods',
    'Complete object-oriented model with visibility indicators, typing, and multiplicity.'
  );

  const classes = [
    {
      name: 'User (Abstract)',
      x: 0.8, y: 2.2, w: 3.5, h: 2.1,
      attrs: ['- id: String', '- email: String', '- name: String', '- role: Enum'],
      methods: ['+ login(): Boolean', '+ logout(): Void', '+ getProfile(): Object']
    },
    {
      name: 'BoutiqueLender : User',
      x: 4.8, y: 2.2, w: 3.7, h: 2.1,
      attrs: ['- boutiqueName: String', '- rating: Float', '- totalRentals: Int'],
      methods: ['+ addDress(Dress): Void', '+ updateInventory(): Void', '+ inspectReturn(): Void']
    },
    {
      name: 'DressOutfit',
      x: 8.9, y: 2.2, w: 3.6, h: 2.1,
      attrs: ['- id: String', '- rentPrice: Double', '- deposit: Double', '- status: Enum'],
      methods: ['+ checkAvailability(dates): Bool', '+ toggleStatus(): Void', '+ getPricing(): Double']
    },
    {
      name: 'RentalOrder',
      x: 0.8, y: 4.55, w: 3.5, h: 2.1,
      attrs: ['- orderId: String', '- rentalPeriod: Int', '- totalFee: Double', '- status: Enum'],
      methods: ['+ calculateEscrow(): Double', '+ markDispatched(): Void', '+ closeOrder(): Void']
    },
    {
      name: 'EscrowTransaction',
      x: 4.8, y: 4.55, w: 3.7, h: 2.1,
      attrs: ['- txnId: String', '- depositAmount: Double', '- escrowStatus: Enum'],
      methods: ['+ lockFunds(): Boolean', '+ releaseToRenter(): Void', '+ deductClaim(): Void']
    },
    {
      name: 'DisputeCase',
      x: 8.9, y: 4.55, w: 3.6, h: 2.1,
      attrs: ['- complaintId: String', '- issueType: String', '- claimAmount: Double'],
      methods: ['+ assignAdmin(): Void', '+ renderVerdict(): Void', '+ executeSettlement(): Void']
    }
  ];

  classes.forEach(c => {
    slide.addShape(pres.ShapeType.rect, { x: c.x, y: c.y, w: c.w, h: c.h, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD_MUTED, width: 1 } });
    slide.addShape(pres.ShapeType.rect, { x: c.x, y: c.y, w: c.w, h: 0.35, fill: { color: 'ECE4D8' } });
    slide.addText(c.name, { x: c.x, y: c.y, w: c.w, h: 0.35, fontSize: 10.5, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK, align: 'center', valign: 'middle' });

    slide.addText(c.attrs.join('\n'), { x: c.x + 0.15, y: c.y + 0.4, w: c.w - 0.3, h: 0.75, fontSize: 8.5, fontFace: FONT_MONO, color: C.TEXT_DARK });
    slide.addShape(pres.ShapeType.line, { x: c.x, y: c.y + 1.2, w: c.w, h: 0, line: { color: C.CARD_LIGHT_BORDER, width: 0.5 } });
    slide.addText(c.methods.join('\n'), { x: c.x + 0.15, y: c.y + 1.25, w: c.w - 0.3, h: 0.75, fontSize: 8.5, fontFace: FONT_MONO, color: C.GOLD_MUTED });
  });

  slide.addNotes(
    "The Class Diagram exhibits object-oriented modeling with clean inheritance: BoutiqueLender extends the abstract User class. Each RentalOrder holds a 1-to-1 association with an EscrowTransaction, which mediates between customer deposits and boutique payouts."
  );
}

// =========================================================================
// SCENE 18 · STATE MACHINE DIAGRAMS
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 18 · Act IV', '18');
  addHeaderLight(
    slide,
    'UML Dynamic State Model',
    'State Chart Diagram: Outfit Inventory & Order Lifecycle',
    'State transitions, event triggers, guards, and terminal state resolution.'
  );

  // Section 1: Garment Inventory State
  slide.addText('A) GARMENT INVENTORY AVAILABILITY STATES', { x: 0.8, y: 2.2, w: 11.7, h: 0.3, fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.GOLD_MUTED });
  const gStates = [
    { name: '[Available]', desc: 'Listed on catalog; accepting booking date selections' },
    { name: '[Booked/Escrowed]', desc: 'Dates locked; deposit confirmed in escrow vault' },
    { name: '[In-Transit]', desc: 'Dispatched with active courier tracking ID' },
    { name: '[Active Rental]', desc: 'In renter custody during celebration event' },
    { name: '[Quality Inspection]', desc: 'Returned to boutique; undergoing fabric audit' }
  ];

  gStates.forEach((gs, idx) => {
    const cardX = 0.8 + idx * 2.4;
    slide.addShape(pres.ShapeType.roundRect, { x: cardX, y: 2.6, w: 2.2, h: 1.3, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD, width: 1 } });
    slide.addText(gs.name, { x: cardX + 0.1, y: 2.7, w: 2.0, h: 0.3, fontSize: 10, fontFace: FONT_MONO, bold: true, color: C.TEXT_DARK, align: 'center' });
    slide.addText(gs.desc, { x: cardX + 0.1, y: 3.05, w: 2.0, h: 0.75, fontSize: 8.5, fontFace: FONT_BODY, color: C.TEXT_MUTED_DARK, align: 'center' });
  });

  // Section 2: Rental Order Escrow State
  slide.addText('B) RENTAL ORDER & ESCROW STATE TRANSITIONS', { x: 0.8, y: 4.2, w: 11.7, h: 0.3, fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.GOLD_MUTED });
  const oStates = [
    { name: '1. Order Placed', detail: 'event: checkoutSubmitted()\nguard: [cartValid == true]' },
    { name: '2. Deposit Escrowed', detail: 'event: paymentAuthorized()\naction: lockSecurityDeposit()' },
    { name: '3. Dispatched', detail: 'event: courierShipped()\naction: notifyRenterTracking()' },
    { name: '4. Returned', detail: 'event: garmentDeliveredBack()\naction: trigger48hrInspection()' },
    { name: '5. Settled / Refunded', detail: 'event: inspectionPassed()\naction: returnEscrowBalance()' }
  ];

  oStates.forEach((os, idx) => {
    const cardX = 0.8 + idx * 2.4;
    slide.addShape(pres.ShapeType.roundRect, { x: cardX, y: 4.6, w: 2.2, h: 1.8, r: 0.1, fill: { color: C.CARD_LIGHT }, line: { color: C.SUCCESS, width: 1 } });
    slide.addText(os.name, { x: cardX + 0.1, y: 4.75, w: 2.0, h: 0.35, fontSize: 10.5, fontFace: FONT_HEAD, bold: true, color: C.TEXT_DARK, align: 'center' });
    slide.addShape(pres.ShapeType.line, { x: cardX + 0.2, y: 5.15, w: 1.8, h: 0, line: { color: C.CARD_LIGHT_BORDER, width: 0.5 } });
    slide.addText(os.detail, { x: cardX + 0.1, y: 5.25, w: 2.0, h: 1.05, fontSize: 8.5, fontFace: FONT_MONO, color: C.TEXT_MUTED_DARK });
  });

  slide.addNotes(
    "State transitions in Poshakh prevent double bookings and fund leakages. A dress moves predictably from Available to Escrowed to In-Transit and Return Inspection. Each order transition is bounded by explicit events and guard conditions, ensuring no funds are released prematurely."
  );
}

// =========================================================================
// SCENE 19 · ACT V DIVIDER
// =========================================================================
addActDivider(
  'Scene 19 · Act V',
  'V',
  'THE DATA VAULT',
  'Relational Architecture, Entity Schemas & Dictionaries',
  'Crow’s foot data models, primary/foreign key mappings, and validated live sample records.',
  83,
  "We enter Act Five: The Data Vault. Here we present our complete data persistence model. We analyze the Crow’s Foot Entity Relationship Diagram across seven relational tables and inspect our structured Data Dictionaries containing genuine seed records."
);

// =========================================================================
// SCENE 20 · ENTITY RELATIONSHIP DIAGRAM (CROW'S FOOT NOTATION)
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 20 · Act V', '20');
  addHeaderLight(
    slide,
    'Relational Schema Specification',
    'Entity Relationship Diagram (Crow’s Foot Notation)',
    '7 normalized entities mapping PKs, FKs, unique keys, and relational cardinalities.'
  );

  const tables = [
    { name: 'USERS', pk: 'id (PK)', fk: 'role, email (UK)', x: 0.8, y: 2.2, w: 2.5 },
    { name: 'LENDERS', pk: 'id (PK, FK → USERS)', fk: 'boutiqueName, rating', x: 3.8, y: 2.2, w: 2.6 },
    { name: 'DRESSES', pk: 'id (PK)', fk: 'lenderId (FK → LENDERS)', x: 7.0, y: 2.2, w: 2.7 },
    { name: 'CART', pk: 'id (PK)', fk: 'userId (FK), dressId (FK)', x: 10.2, y: 2.2, w: 2.3 },
    { name: 'ORDERS', pk: 'orderId (PK)', fk: 'renterId, dressId, lenderId', x: 2.0, y: 4.5, w: 3.2 },
    { name: 'CHATS', pk: 'chatId (PK)', fk: 'senderId, receiverId', x: 5.7, y: 4.5, w: 3.1 },
    { name: 'COMPLAINTS', pk: 'complaintId (PK)', fk: 'orderId (FK), filedBy (FK)', x: 9.3, y: 4.5, w: 3.2 }
  ];

  tables.forEach(t => {
    slide.addShape(pres.ShapeType.rect, { x: t.x, y: t.y, w: t.w, h: 1.8, fill: { color: C.CARD_LIGHT }, line: { color: C.GOLD_MUTED, width: 1.25 } });
    slide.addShape(pres.ShapeType.rect, { x: t.x, y: t.y, w: t.w, h: 0.35, fill: { color: '2E2528' } });
    slide.addText(t.name, { x: t.x, y: t.y, w: t.w, h: 0.35, fontSize: 10, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT, align: 'center', valign: 'middle' });
    slide.addText('PK: ' + t.pk, { x: t.x + 0.15, y: t.y + 0.45, w: t.w - 0.3, h: 0.5, fontSize: 9, fontFace: FONT_MONO, bold: true, color: C.GOLD_MUTED });
    slide.addText('Attributes / FKs:\n' + t.fk, { x: t.x + 0.15, y: t.y + 1.0, w: t.w - 0.3, h: 0.7, fontSize: 8.5, fontFace: FONT_MONO, color: C.TEXT_DARK });
  });

  // Legend Box
  slide.addShape(pres.ShapeType.rect, { x: 0.8, y: 6.4, w: 11.733, h: 0.45, fill: { color: 'ECE4D8' } });
  slide.addText('CROW’S FOOT CARDINALITY LEGEND:  1:1 (User to Lender Profile)  |  1:N (Lender to Dresses)  |  1:N (Renter to Orders)  |  1:N (Order to Dispute Complaint)', {
    x: 0.9, y: 6.4, w: 11.5, h: 0.45, fontSize: 8.5, fontFace: FONT_MONO, bold: true, color: C.TEXT_DARK, valign: 'middle'
  });

  slide.addNotes(
    "Our relational schema models the entire couture sharing economy. USERS links 1-to-1 with LENDERS. A Lender owns one-to-many DRESSES. When a Renter creates an ORDER, it references both the dress and the boutique lender. Any post-order dispute connects directly to the corresponding orderId."
  );
}

// =========================================================================
// SCENE 21 · DATA DICTIONARY (PART 1)
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 21 · Act V', '21');
  addHeaderLight(
    slide,
    'Schema Specification (Part 1)',
    'Data Dictionary: USERS, LENDERS & DRESSES Entities',
    'Field definitions, data types, constraints, and verified live seed sample record.'
  );

  const dictRows = [
    { field: 'id', type: 'VARCHAR', size: '36', key: 'PK', constr: 'NOT NULL, UNIQUE', desc: 'Unique identifier for dress outfit', sample: "'d1'" },
    { field: 'name', type: 'VARCHAR', size: '150', key: '-', constr: 'NOT NULL', desc: 'Full couture dress title', sample: "'Rajputi Crimson Bridal Lehenga'" },
    { field: 'category', type: 'ENUM', size: '30', key: '-', constr: 'CHECK (Lehenga/Saree/Sherwani)', desc: 'Ethnic apparel category', sample: "'Lehenga'" },
    { field: 'rentPrice', type: 'INT', size: '8', key: '-', constr: 'CHECK (rentPrice > 0)', desc: 'Standard 3-day rental fee', sample: '3800' },
    { field: 'deposit', type: 'INT', size: '8', key: '-', constr: 'CHECK (deposit >= rentPrice)', desc: 'Refundable security escrow', sample: '6000' },
    { field: 'retailValue', type: 'INT', size: '8', key: '-', constr: 'NOT NULL', desc: 'Market purchase value', sample: '65000' },
    { field: 'lenderId', type: 'VARCHAR', size: '36', key: 'FK', constr: 'REFERENCES LENDERS(id)', desc: 'Owning boutique identifier', sample: "'radha'" }
  ];

  // Table rendering
  const headers = ['FIELD', 'TYPE', 'SIZE', 'KEY', 'CONSTRAINT', 'DESCRIPTION', 'SAMPLE VALUE'];
  const colWidths = [1.4, 1.1, 0.8, 0.7, 2.7, 3.2, 1.833];

  let hX = 0.8;
  headers.forEach((h, i) => {
    slide.addShape(pres.ShapeType.rect, { x: hX, y: 2.2, w: colWidths[i], h: 0.35, fill: { color: '2E2528' } });
    slide.addText(h, { x: hX, y: 2.2, w: colWidths[i], h: 0.35, fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C.TEXT_LIGHT, align: 'center', valign: 'middle' });
    hX += colWidths[i];
  });

  dictRows.forEach((r, rIdx) => {
    let rX = 0.8;
    const rY = 2.55 + rIdx * 0.4;
    const bg = rIdx % 2 === 0 ? C.CARD_LIGHT : 'F6F1E9';
    const vals = [r.field, r.type, r.size, r.key, r.constr, r.desc, r.sample];

    vals.forEach((v, cIdx) => {
      slide.addShape(pres.ShapeType.rect, { x: rX, y: rY, w: colWidths[cIdx], h: 0.4, fill: { color: bg }, line: { color: C.CARD_LIGHT_BORDER, width: 0.5 } });
      slide.addText(v, {
        x: rX + 0.05, y: rY, w: colWidths[cIdx] - 0.1, h: 0.4,
        fontSize: 8, fontFace: cIdx === 0 || cIdx === 1 || cIdx === 3 ? FONT_MONO : FONT_BODY,
        bold: cIdx === 0 || cIdx === 3, color: cIdx === 3 ? C.GOLD_MUTED : C.TEXT_DARK,
        align: cIdx === 1 || cIdx === 2 || cIdx === 3 ? 'center' : 'left', valign: 'middle'
      });
      rX += colWidths[cIdx];
    });
  });

  // Sample Record Card
  slide.addShape(pres.ShapeType.rect, { x: 0.8, y: 5.5, w: 11.733, h: 1.25, fill: { color: 'F5EFE6' }, line: { color: C.GOLD, width: 1 } });
  slide.addText('HIGHLIGHTED RECORD CARD · SEED DRESS "d1" (FROM LIVE STORE.JS)', { x: 1.0, y: 5.6, w: 11.0, h: 0.25, fontSize: 8.5, fontFace: FONT_MONO, bold: true, color: C.GOLD_MUTED });
  slide.addText('{ id: "d1", name: "Rajputi Crimson Bridal Velvet Lehenga", rentPrice: ₹3,800, deposit: ₹6,000, retailValue: ₹65,000, lender: "Radha Ethnic House (@radha_poshakh)", rating: 4.9 }', {
    x: 1.0, y: 5.9, w: 11.3, h: 0.4, fontSize: 10, fontFace: FONT_MONO, color: C.TEXT_DARK
  });
  slide.addText('One-Line Meaning: A ₹65,000 luxury lehenga rented for ₹3,800 with ₹6,000 escrow protection, yielding instant 85% consumer savings while generating passive income for Radha Ethnic House.', {
    x: 1.0, y: 6.35, w: 11.3, h: 0.35, fontSize: 9.5, fontFace: FONT_BODY, italic: true, color: C.TEXT_MUTED_DARK
  });

  slide.addNotes(
    "This Data Dictionary details the DRESSES schema. Note the integrity constraints: rentPrice must be positive, and security deposit must equal or exceed rentPrice to prevent malicious theft. Our live sample record illustrates a 65,000-rupee velvet lehenga from boutique 'radha' renting for just 3,800."
  );
}

// =========================================================================
// SCENE 22 · DATA DICTIONARY (PART 2)
// =========================================================================
{
  const slide = pres.addSlide();
  addLightChrome(slide, 'Scene 22 · Act V', '22');
  addHeaderLight(
    slide,
    'Schema Specification (Part 2)',
    'Data Dictionary: ORDERS, CHATS & COMPLAINTS Entities',
    'Transaction schemas, escrow status enums, foreign keys, and sample order record.'
  );

  const dictRows2 = [
    { field: 'orderId', type: 'VARCHAR', size: '36', key: 'PK', constr: 'NOT NULL, UNIQUE', desc: 'Unique transaction identifier', sample: "'ORD-2026-9812'" },
    { field: 'dressId', type: 'VARCHAR', size: '36', key: 'FK', constr: 'REFERENCES DRESSES(id)', desc: 'Rented garment reference', sample: "'d1'" },
    { field: 'renterId', type: 'VARCHAR', size: '36', key: 'FK', constr: 'REFERENCES USERS(id)', desc: 'Customer placing the rental', sample: "'renter_vivek'" },
    { field: 'rentalDays', type: 'INT', size: '2', key: '-', constr: 'CHECK (rentalDays IN (3,5,7))', desc: 'Duration of rental lease', sample: '3' },
    { field: 'totalAmount', type: 'INT', size: '8', key: '-', constr: 'totalAmount = rent + deposit', desc: 'Total sum charged upfront', sample: '9800' },
    { field: 'escrowStatus', type: 'ENUM', size: '20', key: '-', constr: 'CHECK (HELD / REFUNDED / DISPUTED)', desc: 'Security deposit state', sample: "'HELD'" },
    { field: 'deliveryType', type: 'VARCHAR', size: '20', key: '-', constr: 'Standard Express / Boutique Pickup', desc: 'Fulfillment modality', sample: "'Standard Express'" }
  ];

  const headers = ['FIELD', 'TYPE', 'SIZE', 'KEY', 'CONSTRAINT', 'DESCRIPTION', 'SAMPLE VALUE'];
  const colWidths = [1.4, 1.1, 0.8, 0.7, 2.7, 3.2, 1.833];

  let hX = 0.8;
  headers.forEach((h, i) => {
    slide.addShape(pres.ShapeType.rect, { x: hX, y: 2.2, w: colWidths[i], h: 0.35, fill: { color: '2E2528' } });
    slide.addText(h, { x: hX, y: 2.2, w: colWidths[i], h: 0.35, fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C.TEXT_LIGHT, align: 'center', valign: 'middle' });
    hX += colWidths[i];
  });

  dictRows2.forEach((r, rIdx) => {
    let rX = 0.8;
    const rY = 2.55 + rIdx * 0.4;
    const bg = rIdx % 2 === 0 ? C.CARD_LIGHT : 'F6F1E9';
    const vals = [r.field, r.type, r.size, r.key, r.constr, r.desc, r.sample];

    vals.forEach((v, cIdx) => {
      slide.addShape(pres.ShapeType.rect, { x: rX, y: rY, w: colWidths[cIdx], h: 0.4, fill: { color: bg }, line: { color: C.CARD_LIGHT_BORDER, width: 0.5 } });
      slide.addText(v, {
        x: rX + 0.05, y: rY, w: colWidths[cIdx] - 0.1, h: 0.4,
        fontSize: 8, fontFace: cIdx === 0 || cIdx === 1 || cIdx === 3 ? FONT_MONO : FONT_BODY,
        bold: cIdx === 0 || cIdx === 3, color: cIdx === 3 ? C.GOLD_MUTED : C.TEXT_DARK,
        align: cIdx === 1 || cIdx === 2 || cIdx === 3 ? 'center' : 'left', valign: 'middle'
      });
      rX += colWidths[cIdx];
    });
  });

  // Sample Record Card
  slide.addShape(pres.ShapeType.rect, { x: 0.8, y: 5.5, w: 11.733, h: 1.25, fill: { color: 'F5EFE6' }, line: { color: C.SUCCESS, width: 1 } });
  slide.addText('HIGHLIGHTED TRANSACTION RECORD · ORDER "ORD-2026-9812"', { x: 1.0, y: 5.6, w: 11.0, h: 0.25, fontSize: 8.5, fontFace: FONT_MONO, bold: true, color: C.SUCCESS });
  slide.addText('{ orderId: "ORD-2026-9812", dressId: "d1", renterId: "renter_vivek", rentDays: 3, rentFee: ₹3,800, depositHeld: ₹6,000, escrowStatus: "HELD" }', {
    x: 1.0, y: 5.9, w: 11.3, h: 0.4, fontSize: 10, fontFace: FONT_MONO, color: C.TEXT_DARK
  });
  slide.addText('One-Line Meaning: Renter Vivek successfully locked ₹6,000 deposit in escrow while remitting ₹3,800 rental fee; funds will automatically revert upon boutique return verification.', {
    x: 1.0, y: 6.35, w: 11.3, h: 0.35, fontSize: 9.5, fontFace: FONT_BODY, italic: true, color: C.TEXT_MUTED_DARK
  });

  slide.addNotes(
    "Part Two of our Data Dictionary governs transactions and dispute management. In table ORDERS, totalAmount strictly equals rental fee plus refundable deposit. Escrow status transitions between HELD, REFUNDED, or DISPUTED, giving administrators deterministic state tracking."
  );
}

// =========================================================================
// SCENE 23 · ACT VI DIVIDER
// =========================================================================
addActDivider(
  'Scene 23 · Act VI',
  'VI',
  'THE FINALE',
  'Conclusions, Measurable Impacts & Academic Defense',
  'Synthesizing economic benefits, architectural findings, and academic literature.',
  100,
  "We arrive at Act Six: The Finale. We synthesize the measurable outcomes of the Poshakh platform, review foundational literature citations, and open the floor for your questions."
);

// =========================================================================
// SCENE 24 · KEY TAKEAWAYS & IMPACT METRICS
// =========================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.DARK_BG };
  addDarkChrome(slide, 'Scene 24 · Act VI');

  slide.addText('EVALUATION & SYNTHESIS', {
    x: 0.8, y: 0.9, w: 11.7, h: 0.3,
    fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.GOLD, charSpacing: 2
  });
  slide.addText('Measurable Outcomes & Project Impact', {
    x: 0.8, y: 1.25, w: 11.7, h: 0.55,
    fontSize: 26, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
  });

  const metrics = [
    {
      num: '85%',
      label: 'Direct Cost Reduction for Renters',
      desc: 'Users access regal ₹65,000 bridal lehengas for ₹3,800, eliminating single-use wardrobe waste.'
    },
    {
      num: '4.2x',
      label: 'Annualized ROI for Boutique Lenders',
      desc: 'Garments rented 8-12 times per season generate substantial profits over original fabrication cost.'
    },
    {
      num: '100%',
      label: 'Automated Escrow Security',
      desc: 'All security deposits are digitally protected, eliminating arbitrary cash deductions and disputes.'
    }
  ];

  metrics.forEach((m, idx) => {
    const cardX = 0.8 + idx * 4.0;
    slide.addShape(pres.ShapeType.rect, {
      x: cardX, y: 2.1, w: 3.73, h: 2.5,
      fill: { color: C.CARD_DARK },
      line: { color: C.GOLD, width: 1.25 }
    });
    slide.addText(m.num, {
      x: cardX + 0.3, y: 2.3, w: 3.1, h: 0.8,
      fontSize: 48, fontFace: FONT_BODY, bold: true, color: C.GOLD
    });
    slide.addText(m.label, {
      x: cardX + 0.3, y: 3.15, w: 3.1, h: 0.5,
      fontSize: 13, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
    });
    slide.addText(m.desc, {
      x: cardX + 0.3, y: 3.75, w: 3.1, h: 0.75,
      fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT
    });
  });

  // Project Summary Bar
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 4.9, w: 11.733, h: 1.8,
    fill: { color: '180E13' },
    line: { color: C.CARD_DARK_BORDER, width: 1 }
  });
  slide.addText('CORE ENGINEERING CONCLUSION:', {
    x: 1.1, y: 5.1, w: 11.0, h: 0.3,
    fontSize: 10, fontFace: FONT_MONO, bold: true, color: C.GOLD
  });
  slide.addText(
    'POSHAKH proves that sustainable circular consumption can be married with luxury ethnic couture through solid software engineering. By utilizing a dependency-free Vanilla JS architecture with an integrated Node server, we achieve zero bundle overhead, instantaneous responsive navigation, and robust role-governed transactions.',
    {
      x: 1.1, y: 5.45, w: 11.1, h: 1.0,
      fontSize: 12, fontFace: FONT_BODY, color: C.TEXT_LIGHT
    }
  );

  slide.addNotes(
    "In conclusion, POSHAKH achieves three quantifiable milestones: an 85% expenditure reduction for consumers, a 4.2x return on investment for boutique lenders, and 100% automated deposit escrow. It demonstrates how thoughtful software engineering can modernize traditional artisan markets into sustainable circular economies."
  );
}

// =========================================================================
// SCENE 25 · BIBLIOGRAPHY (IEEE FORMAT, FILM CREDITS STYLE)
// =========================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.DARK_BG };
  addDarkChrome(slide, 'Scene 25 · Act VI');

  slide.addText('ACADEMIC CITATIONS & REFERENCES', {
    x: 0.8, y: 0.9, w: 11.7, h: 0.3,
    fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.GOLD, charSpacing: 2
  });
  slide.addText('Bibliography & Research References (IEEE Format)', {
    x: 0.8, y: 1.25, w: 11.7, h: 0.55,
    fontSize: 26, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
  });

  const biblio = [
    {
      ref: '[1]',
      text: 'F. Armstrong, K. Niinimäki, and C. Lang, "Sustainable Product-Service Systems for Clothing: Exploring Consumer Acceptance of Apparel Rental," *Journal of Cleaner Production*, vol. 97, pp. 30–39, 2016.'
    },
    {
      ref: '[2]',
      text: 'R. Botsman and R. Rogers, *What\'s Mine Is Yours: The Rise of Collaborative Consumption*, New York, NY: HarperBusiness, 2010.'
    },
    {
      ref: '[3]',
      text: 'M. Fowler, *UML Distilled: A Brief Guide to the Standard Object Modeling Language*, 3rd ed., Boston, MA: Addison-Wesley Professional, 2004.'
    },
    {
      ref: '[4]',
      text: 'E. Gamma, R. Helm, R. Johnson, and J. Vlissides, *Design Patterns: Elements of Reusable Object-Oriented Software*, Reading, MA: Addison-Wesley, 1994.'
    },
    {
      ref: '[5]',
      text: 'World Bank Group, "Circular Economy in South Asia: Fostering Sustainable Textile and Apparel Value Chains," World Bank Report, Washington, D.C., 2021.'
    }
  ];

  biblio.forEach((b, idx) => {
    const cardY = 2.1 + idx * 0.95;
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8, y: cardY, w: 11.733, h: 0.82,
      fill: { color: C.CARD_DARK },
      line: { color: C.CARD_DARK_BORDER, width: 0.75 }
    });

    slide.addText(b.ref, {
      x: 1.0, y: cardY + 0.18, w: 0.7, h: 0.45,
      fontSize: 12, fontFace: FONT_MONO, bold: true, color: C.GOLD
    });
    slide.addText(b.text, {
      x: 1.7, y: cardY + 0.18, w: 10.6, h: 0.5,
      fontSize: 10.5, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT
    });
  });

  slide.addNotes(
    "Our architectural and business models are grounded in established research in collaborative consumption and software engineering, referencing peer-reviewed literature by Armstrong, Botsman, Martin Fowler, and the Gang of Four."
  );
}

// =========================================================================
// SCENE 26 · THANK YOU & VIVA DEFENSE SCENE
// =========================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.DARK_BG };
  addDarkChrome(slide, 'Scene 26 · Finale');

  // Symmetrical Royal Arch Motif
  slide.addShape(pres.ShapeType.arc, {
    x: 4.666, y: 0.9, w: 4.0, h: 5.5,
    line: { color: C.GOLD, width: 2 }
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 4.9, y: 3.65, w: 3.533, h: 2.75,
    fill: { color: '140B0E' },
    line: { color: C.GOLD, width: 1.25 }
  });

  slide.addText('POSHAKH', {
    x: 4.9, y: 3.85, w: 3.533, h: 0.7,
    fontSize: 32, fontFace: FONT_HEAD, bold: true, color: C.GOLD, align: 'center'
  });
  slide.addText('WEAR THE CELEBRATION.\nRETURN THE REST.', {
    x: 4.9, y: 4.6, w: 3.533, h: 0.5,
    fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.GOLD_LIGHT, align: 'center', charSpacing: 1
  });

  // Left Details
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 2.3, w: 3.5, h: 3.6,
    fill: { color: C.CARD_DARK },
    line: { color: C.CARD_DARK_BORDER, width: 1 }
  });
  slide.addText('PROJECT DEFENSE', {
    x: 1.0, y: 2.5, w: 3.1, h: 0.3,
    fontSize: 9.5, fontFace: FONT_BODY, bold: true, color: C.GOLD, charSpacing: 1
  });
  slide.addText('L.J. Institute of\nComputer Applications', {
    x: 1.0, y: 2.9, w: 3.1, h: 0.8,
    fontSize: 18, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
  });
  slide.addText('LJCCA · Master of Computer Applications\nAcademic Capstone Viva Presentation', {
    x: 1.0, y: 3.8, w: 3.1, h: 0.8,
    fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT
  });

  // Right Details: Q&A
  slide.addShape(pres.ShapeType.rect, {
    x: 9.033, y: 2.3, w: 3.5, h: 3.6,
    fill: { color: C.CARD_DARK },
    line: { color: C.CARD_DARK_BORDER, width: 1 }
  });
  slide.addText('OPEN FOR DEFENSE', {
    x: 9.25, y: 2.5, w: 3.1, h: 0.3,
    fontSize: 9.5, fontFace: FONT_BODY, bold: true, color: C.GOLD, charSpacing: 1
  });
  slide.addText('Questions & Discussion', {
    x: 9.25, y: 2.9, w: 3.1, h: 0.8,
    fontSize: 20, fontFace: FONT_HEAD, bold: true, color: C.TEXT_LIGHT
  });
  slide.addText('We welcome your technical queries, feedback, and architectural evaluation.\n\nThank you for your time.', {
    x: 9.25, y: 3.8, w: 3.1, h: 1.5,
    fontSize: 11, fontFace: FONT_BODY, color: C.TEXT_MUTED_LIGHT
  });

  slide.addNotes(
    "Thank you, respected evaluators and faculty members of LJCCA, for your time and guidance. We are proud to present POSHAKH as our capstone contribution to sustainable, digitally driven fashion-tech. We now open the floor for your questions and technical discussion."
  );
}

// =========================================================================
// WRITE OUT FILE
// =========================================================================
const outputPath = path.join(__dirname, 'Poshakh_Project_Presentation.pptx');
pres.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`\n==============================================`);
    console.log(` ✅ PowerPoint generated successfully!`);
    console.log(` 📂 File: ${fileName}`);
    console.log(`==============================================\n`);
  })
  .catch(err => {
    console.error('Error generating presentation:', err);
    process.exit(1);
  });

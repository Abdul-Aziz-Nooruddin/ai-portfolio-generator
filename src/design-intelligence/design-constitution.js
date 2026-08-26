/**
 * Design Constitution & Visual Grammar Engine
 * 
 * Establishes the overarching Portfolio Design Constitution and Visual Grammar.
 * Enforces the core rule:
 * "ONE DESIGN LANGUAGE -> ONE ART DIRECTION -> MULTIPLE COHERENT PROJECT INTERPRETATIONS"
 * 
 * Separates Global DNA (invariant) from Local Variation (composition & rhythm).
 */

const { DESIGN_FAMILIES } = require('./design-families');

class DesignConstitution {
  /**
   * Synthesize a comprehensive Design Constitution from a Design Family
   */
  static formulate(family = DESIGN_FAMILIES.EDITORIAL, secondaryFamily = null, userProfile = {}) {
    const primary = typeof family === 'string' ? (DESIGN_FAMILIES[family] || DESIGN_FAMILIES.EDITORIAL) : family;
    const secondary = secondaryFamily && DESIGN_FAMILIES[secondaryFamily] && primary.allowedSecondaries.includes(secondaryFamily)
      ? DESIGN_FAMILIES[secondaryFamily]
      : null;

    const constitution = {
      familyId: primary.id,
      familyName: primary.name,
      secondaryInfluence: secondary ? secondary.name : 'Pure Uncompromised Vision',
      visualEra: primary.description,
      compositionPhilosophy: this.getCompositionPhilosophy(primary.id),
      typographyPersonality: this.getTypographyPersonality(primary.id),
      spacingPhilosophy: this.getSpacingPhilosophy(primary.id),
      density: primary.density,
      shapeLanguage: this.getShapeLanguage(primary.id),
      borderLanguage: primary.borderPhilosophy,
      colorPhilosophy: primary.colorPhilosophy,
      imageTreatment: this.getImageTreatment(primary.id),
      decorativeLanguage: this.getDecorativeLanguage(primary.id),
      motionLanguage: this.getMotionLanguage(primary.id),
      interactionPhilosophy: this.getInteractionPhilosophy(primary.id),
      alignmentPhilosophy: this.getAlignmentPhilosophy(primary.id),
      visualHierarchy: this.getVisualHierarchy(primary.id),
      materialLanguage: this.getMaterialLanguage(primary.id),
      textureLanguage: this.getTextureLanguage(primary.id)
    };

    const visualGrammar = this.deriveVisualGrammar(constitution, primary);

    return {
      constitution,
      visualGrammar,
      globalDNA: this.extractGlobalDNA(constitution, visualGrammar),
      projectVariationRules: this.defineProjectVariationRules(constitution, visualGrammar)
    };
  }

  static getCompositionPhilosophy(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Chunky modular blocks with hard-edged horizontal and vertical division rules';
      case 'MINIMAL': return 'Radical negative space, strict single-column editorial axes, and monastic breathing room';
      case 'LUXURY': return 'Haute horlogerie pacing, generous margins, restrained focal centers, and gold-ratio framing';
      case 'TECHNICAL': return 'Information-dense multi-column telemetry, monospaced data streams, and matrix precision';
      case 'FUTURISTIC': return 'Layered spatial depth, floating luminous z-planes, and volumetric 3D refractions';
      case 'ORGANIC': return 'Flowing natural cadence, unforced asymmetry, and contemplative Japanese wabi-sabi balance';
      case 'ARCHITECTURAL': return 'Rigid Swiss modular grid, structural hairline divisions, and Bauhaus rhythm';
      case 'PLAYFUL': return 'Bouncy offset card clusters, tactile toy-like touch targets, and celebratory badges';
      case 'EXPERIMENTAL': return 'Deconstructed non-linear layouts, multi-directional typographic tension, and glitch offsets';
      case 'EDITORIAL':
      default:
        return 'Dramatic asymmetric editorial spreads, prominent lead-in statements, and magazine-style columns';
    }
  }

  static getTypographyPersonality(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Raw monospaced metadata paired with aggressive, hyper-extended grotesque display';
      case 'MINIMAL': return 'Whisper-quiet neutral sans-serif with disciplined weight hierarchy and generous tracking';
      case 'LUXURY': return 'Chiseled high-contrast luxury serif headlines with refined geometric sans body';
      case 'TECHNICAL': return 'Pure monospace code telemetry with high-legibility tabular figures and CLI prompts';
      case 'FUTURISTIC': return 'Geometric neo-grotesque display with wide tracking and spatial typography';
      case 'ORGANIC': return 'Warm humanist serif with lyrical italics and tactile natural texture';
      case 'ARCHITECTURAL': return 'Monumental uppercase display with chiseled geometric body hierarchy';
      case 'PLAYFUL': return 'Friendly rounded display sans with expressive punctuation and punchy weights';
      case 'EXPERIMENTAL': return 'High-tension display fonts with deconstructed glyphs and kinetic shifts';
      case 'EDITORIAL':
      default:
        return 'Dramatic editorial serif display paired with restrained, crisp modernist grotesque metadata';
    }
  }

  static getSpacingPhilosophy(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Dense, compact vertical rhythm with punchy 12px-24px gutters';
      case 'MINIMAL': return 'Expansive 100px-180px section padding with monastic breathing space';
      case 'LUXURY': return 'Cinematic 120px-200px breathing room with deliberate pacing';
      case 'TECHNICAL': return 'Modular 8px base grid with dense, structured telemetry spacing';
      case 'FUTURISTIC': return 'Floating spatial margins with 40px-80px depth padding';
      case 'ORGANIC': return 'Natural unforced spacing with subtle rhythmic breathing room';
      case 'ARCHITECTURAL': return 'Mathematical 24px/48px/96px geometric modular spacing';
      case 'PLAYFUL': return 'Dynamic bouncing margins with tight card gaps';
      case 'EXPERIMENTAL': return 'Unconventional asymmetric negative space with deliberate focal clashes';
      case 'EDITORIAL':
      default:
        return 'Generous 80px-140px editorial margins with dramatic whitespace intervals';
    }
  }

  static getShapeLanguage(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Hard 0px sharp corners with 4px offset rectangular drops';
      case 'MINIMAL': return 'Pure sharp 0px to subtle 4px micro-radii with zero decoration';
      case 'LUXURY': return 'Disciplined 4px-8px chiseled geometry with gold-ratio bevels';
      case 'TECHNICAL': return 'Precision 0px sharp edges with chamfered or bracketed corners';
      case 'FUTURISTIC': return 'Volumetric 20px-32px rounded frosted glass lozenges';
      case 'ORGANIC': return 'Soft 12px-18px natural radii with flowing pebble silhouettes';
      case 'ARCHITECTURAL': return 'Stark 0px architectural rectangular planes';
      case 'PLAYFUL': return 'Chunky 24px rounded corners and 9999px tactile pill buttons';
      case 'EXPERIMENTAL': return 'Asymmetric variable radii (e.g. 24px 0px 24px 0px)';
      case 'EDITORIAL':
      default:
        return 'Refined 4px-8px subtle rectangular frames with hairline borders';
    }
  }

  static getImageTreatment(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Raw high-contrast halftone or duotone with 3px solid black borders';
      case 'MINIMAL': return 'Natural unmanipulated color grading with edge-to-edge flush alignment';
      case 'LUXURY': return 'Desaturated monochrome or warm sepia with cinematic letterboxing';
      case 'TECHNICAL': return 'CRT scanline filter, dark blueprint overlay, or wireframe telemetry crop';
      case 'FUTURISTIC': return 'Floating glass refraction with ambient chromatic specular sheen';
      case 'ORGANIC': return 'Tactile film grain with warm earthy tone curve and soft vignette';
      case 'ARCHITECTURAL': return 'Monumental geometric crops with architectural vanishing points';
      case 'PLAYFUL': return 'Vibrant saturated pop tints with offset sticker outlines';
      case 'EXPERIMENTAL': return 'Procedural displacement shaders, glitch slicing, or RGB split';
      case 'EDITORIAL':
      default:
        return 'High-fashion editorial photographic crops with elegant matte finish';
    }
  }

  static getDecorativeLanguage(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Heavy black asterisk symbols (*), marquee tapes, and chunky tags';
      case 'MINIMAL': return 'Strictly none. Zero gratuitous decoration; pure typographic power';
      case 'LUXURY': return 'Subtle Roman numerals, hairline gold rules, and colophon timestamps';
      case 'TECHNICAL': return 'Live blinking CLI cursors, latency counters, and hex memory addresses';
      case 'FUTURISTIC': return 'Subtle ambient volumetric glow, specular glass edges, and 3D depth';
      case 'ORGANIC': return 'Subtle handcrafted dividers and wabi-sabi balance marks';
      case 'ARCHITECTURAL': return 'Architectural grid lines, axis marks (+), and dimension callouts';
      case 'PLAYFUL': return 'Tactile badge chips, celebratory sparkle icons, and bounce triggers';
      case 'EXPERIMENTAL': return 'Generative cursor distortion, coordinate streams, and raw glyphs';
      case 'EDITORIAL':
      default:
        return 'Hairline structural rules, editorial pull-quotes, and section index numbers';
    }
  }

  static getMotionLanguage(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'brutalist-instant';
      case 'MINIMAL': return 'minimal-quiet';
      case 'LUXURY': return 'cinematic-pan';
      case 'TECHNICAL': return 'mechanical-snapping';
      case 'FUTURISTIC': return 'fluid-spring';
      case 'ORGANIC': return 'smooth-inertia';
      case 'ARCHITECTURAL': return 'mechanical-snapping';
      case 'PLAYFUL': return 'playful-elastic';
      case 'EXPERIMENTAL': return 'experimental-glitch';
      case 'EDITORIAL':
      default:
        return 'editorial-reveal';
    }
  }

  static getInteractionPhilosophy(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Direct, high-tactile clicks with immediate visual feedback';
      case 'MINIMAL': return 'Whisper-quiet interactions with subtle opacity transitions';
      case 'LUXURY': return 'Slow, weighted inertia interactions with silky ease-out curves';
      case 'TECHNICAL': return 'Instantaneous keyboard shortcuts, terminal commands, and telemetry tooltips';
      case 'FUTURISTIC': return 'Parallax spatial tilt, magnetic hover physics, and 3D mesh interaction';
      case 'ORGANIC': return 'Gentle fluid ripples and contemplative page transitions';
      case 'ARCHITECTURAL': return 'Structured snap-to-grid hover alignments and clean drawer reveals';
      case 'PLAYFUL': return 'Elastic spring hover bounces and confetti triggers';
      case 'EXPERIMENTAL': return 'Interactive cursor displacement and generative procedural distortion';
      case 'EDITORIAL':
      default:
        return 'Smooth editorial image reveals, text curtain lifts, and refined tab switches';
    }
  }

  static getAlignmentPhilosophy(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Hard left alignment with abrupt centered punch-outs';
      case 'MINIMAL': return 'Strict single vertical axis with deliberate left-anchoring';
      case 'LUXURY': return 'Refined centered titles with disciplined left-aligned narrative';
      case 'TECHNICAL': return 'Strict tabular monospace grid alignment';
      case 'FUTURISTIC': return 'Multi-planar spatial floating alignment';
      case 'ORGANIC': return 'Natural unforced wabi-sabi balance';
      case 'ARCHITECTURAL': return 'Strict 12-column Swiss modular grid alignment';
      case 'PLAYFUL': return 'Deliberately staggered playful offset alignment';
      case 'EXPERIMENTAL': return 'Deconstructed multi-axis typographic tension';
      case 'EDITORIAL':
      default:
        return 'Strong asymmetric editorial left axis with wide column spans';
    }
  }

  static getVisualHierarchy(familyId) {
    return `H1 Display (Primary Anchor) -> Section Tag (Contextual Identifier) -> Project Narrative (Storytelling) -> Metadata/Tech (Secondary Verification)`;
  }

  static getMaterialLanguage(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Raw matte cardboard, heavy opaque ink, and solid metal';
      case 'MINIMAL': return 'Fine unbleached cotton paper, matte slate, and stone';
      case 'LUXURY': return 'Obsidian glass, brushed champagne metal, and matte black velvet';
      case 'TECHNICAL': return 'Anodized aluminum, CRT phosphor glow, and matte silicone';
      case 'FUTURISTIC': return 'Frosted aerogel glass, specular liquid crystal, and luminous depth';
      case 'ORGANIC': return 'Handmade washi paper, natural cedar wood, and volcanic clay';
      case 'ARCHITECTURAL': return 'Cast architectural concrete, frosted plexiglass, and brushed steel';
      case 'PLAYFUL': return 'Glossy vinyl stickers, bouncy rubber silicone, and bright plastic';
      case 'EXPERIMENTAL': return 'Generative digital noise, chromatic refraction, and wireframe mesh';
      case 'EDITORIAL':
      default:
        return 'Heavyweight editorial magazine print, matte coated stock, and crisp black ink';
    }
  }

  static getTextureLanguage(familyId) {
    switch (familyId) {
      case 'BRUTALIST': return 'Heavy grain, dither pattern, and solid contrast';
      case 'MINIMAL': return 'Zero artificial noise; pure clean surface';
      case 'LUXURY': return 'Micro-fine silk grain and deep light absorptive matte';
      case 'TECHNICAL': return 'Subtle phosphor scanlines and matrix dot-grid';
      case 'FUTURISTIC': return 'Subtle glass blur (backdrop-filter: blur(24px))';
      case 'ORGANIC': return 'Natural paper grain and subtle fiber texture';
      case 'ARCHITECTURAL': return 'Subtle architectural grid guidelines';
      case 'PLAYFUL': return 'Vibrant chromatic clean surfaces';
      case 'EXPERIMENTAL': return 'Procedural noise and chromatic aberration';
      case 'EDITORIAL':
      default:
        return 'Subtle 1% analog paper noise for authentic print warmth';
    }
  }

  /**
   * Derive concrete Visual Grammar rules from the Design Constitution
   */
  static deriveVisualGrammar(constitution, primaryFamily) {
    const isBrutalist = primaryFamily.id === 'BRUTALIST';
    const isTechnical = primaryFamily.id === 'TECHNICAL';
    const isMinimal = primaryFamily.id === 'MINIMAL';
    const isLuxury = primaryFamily.id === 'LUXURY';
    const isPlayful = primaryFamily.id === 'PLAYFUL';

    return {
      headingsCase: (isBrutalist || isTechnical) ? 'uppercase' : (isMinimal ? 'sentencecase' : 'titlecase'),
      textStyle: isTechnical ? 'technical-monospace' : (isLuxury ? 'restrained-editorial' : 'contemporary-standard'),
      dividerStyle: isMinimal ? 'none' : (isBrutalist ? 'thick-solid-black' : 'hairline-rule'),
      imageTreatment: isBrutalist ? 'halftone-duotone' : (isMinimal ? 'contained-clean' : 'edge-to-edge-editorial'),
      numberingStyle: isLuxury ? 'roman-numeral' : (isTechnical ? 'hex-code' : 'padded-decimal-01'),
      alignmentAxis: isMinimal ? 'left-single-axis' : (isBrutalist ? 'modular-grid' : 'asymmetric-editorial'),
      cornerStyle: isBrutalist ? 'sharp-0px' : (isPlayful ? 'pill-9999px' : (isMinimal ? 'subtle-4px' : 'rounded-12px')),
      motionPhysics: isBrutalist ? 'instant-snappy' : (isPlayful ? 'elastic-bounce' : 'smooth-inertia'),
      decorationVocabulary: isMinimal ? 'none-pure' : (isTechnical ? 'telemetry-grid' : (isBrutalist ? 'black-asterisks' : 'editorial-rules')),
      borderRadius: isBrutalist ? '0px' : (isPlayful ? '24px' : (isMinimal ? '4px' : (primaryFamily.id === 'FUTURISTIC' ? '20px' : '10px'))),
      borderWidth: isBrutalist ? '2.5px' : (isMinimal ? '0.5px' : '1px'),
      buttonTransform: isBrutalist ? 'translate(-2px, -2px)' : (isPlayful ? 'scale(1.03)' : 'translateY(-1px)')
    };
  }

  /**
   * Extract Global DNA that MUST remain invariant across all sections
   */
  static extractGlobalDNA(constitution, visualGrammar) {
    return {
      familyId: constitution.familyId,
      familyName: constitution.familyName,
      visualEra: constitution.visualEra,
      colorPhilosophy: constitution.colorPhilosophy,
      typographyPersonality: constitution.typographyPersonality,
      shapeLanguage: constitution.shapeLanguage,
      borderLanguage: constitution.borderLanguage,
      motionLanguage: constitution.motionLanguage,
      spacingPhilosophy: constitution.spacingPhilosophy,
      visualGrammar
    };
  }

  /**
   * Define how projects are allowed to vary locally without breaking the Global DNA
   */
  static defineProjectVariationRules(constitution, visualGrammar) {
    return {
      invariableRules: [
        'Must use the exact same primary and secondary font pairings',
        'Must use the exact same color palette tokens and theme background',
        'Must use the exact same corner radius system',
        'Must use the exact same border weight and line color',
        'Must follow the exact same headings case and numbering style'
      ],
      allowedLocalVariations: [
        'Project composition layout (e.g. Hero spread vs Asymmetric columns vs Architectural grid)',
        'Focal visual scale (e.g. Large full-width visual vs Side-by-side compact visual)',
        'Content ordering and metadata placement (e.g. Tags on top vs Tags beneath description)',
        'Storytelling model (e.g. Deep case study narrative vs Rapid technical spec breakdown)',
        'Visual rhythm and spatial emphasis'
      ]
    };
  }

  /**
   * "Why Does This Element Exist?" Justification Filter
   * Removes visual elements that cannot be justified by the Design Constitution.
   */
  static justifyElement(elementType, constitution) {
    const family = constitution.familyId;

    const justifiedMap = {
      glassmorphism: ['FUTURISTIC', 'EXPERIMENTAL'],
      neonGlow: ['TECHNICAL', 'FUTURISTIC', 'EXPERIMENTAL'],
      chunkyShadows: ['BRUTALIST', 'PLAYFUL'],
      thickBorders: ['BRUTALIST'],
      monospacedTelemetry: ['TECHNICAL', 'ARCHITECTURAL', 'EXPERIMENTAL'],
      floating3DRefraction: ['FUTURISTIC', 'LUXURY', 'EXPERIMENTAL'],
      goldHairlines: ['LUXURY', 'EDITORIAL'],
      bouncyPhysics: ['PLAYFUL', 'BRUTALIST'],
      monasticWhitespace: ['MINIMAL', 'LUXURY', 'EDITORIAL']
    };

    const allowedFamilies = justifiedMap[elementType];
    if (!allowedFamilies) return true; // Standard core elements are always justified
    return allowedFamilies.includes(family);
  }
}

module.exports = { DesignConstitution };

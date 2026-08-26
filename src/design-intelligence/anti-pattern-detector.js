/**
 * Design Anti-Pattern Detector
 * Detects stereotypical AI portfolio clichés and prevents repetitive sameness.
 */

class AntiPatternDetector {
  constructor() {
    this.clicheThreshold = 4.0; // Score >= 4 triggers automatic rejection & redesign
  }

  /**
   * Analyze a Design DNA and Layout composition for over-used AI clichés
   */
  evaluate(designDNA, composition) {
    let score = 0;
    const detectedPatterns = [];

    const isDark = designDNA.colorSystem.theme === 'dark' || designDNA.colorSystem.background.toLowerCase().includes('#0') || designDNA.colorSystem.background.toLowerCase().includes('#1');
    const isPurpleBlueGradient = (
      (designDNA.colorSystem.primary?.toLowerCase().includes('#38bdf8') || designDNA.colorSystem.primary?.toLowerCase().includes('#6366f1') || designDNA.colorSystem.primary?.toLowerCase().includes('#818cf8') || designDNA.colorSystem.primary?.toLowerCase().includes('#7aa2f7')) &&
      (designDNA.colorSystem.secondary?.toLowerCase().includes('#818cf8') || designDNA.colorSystem.secondary?.toLowerCase().includes('#bb9af7') || designDNA.colorSystem.secondary?.toLowerCase().includes('#cba6f7') || designDNA.colorSystem.secondary?.toLowerCase().includes('#ec4899'))
    );
    const isCenteredHero = designDNA.heroComposition === 'centered-hero' || designDNA.heroComposition === 'centered-minimal';
    const isGenericGreeting = composition?.heroText?.toLowerCase().includes("hi, i'm") || composition?.heroText?.toLowerCase().includes("hello, i am");
    const isInterFont = designDNA.typographySystem.heading_font === 'Inter' && designDNA.typographySystem.body_font === 'Inter';
    const isStandard3ColGrid = designDNA.projectPresentation === '3-column-grid' && designDNA.layoutArchitecture === 'standard-vertical';
    const isStandardSectionOrder = JSON.stringify(designDNA.informationArchitecture) === JSON.stringify(['hero', 'about', 'skills', 'projects', 'experience', 'contact']);

    if (isDark) {
      score += 0.8;
      detectedPatterns.push('Dark Background Base (+0.8)');
    }
    if (isPurpleBlueGradient) {
      score += 1.5;
      detectedPatterns.push('Purple/Cyan/Blue Gradient Cliché (+1.5)');
    }
    if (isCenteredHero) {
      score += 1.0;
      detectedPatterns.push('Generic Centered Hero (+1.0)');
    }
    if (isGenericGreeting) {
      score += 1.2;
      detectedPatterns.push("Cliche 'Hi, I'm...' Greeting (+1.2)");
    }
    if (isInterFont) {
      score += 1.0;
      detectedPatterns.push('Inter/Inter Default Font Pairing (+1.0)');
    }
    if (isStandard3ColGrid) {
      score += 1.0;
      detectedPatterns.push('Repetitive 3-Column Glass Card Grid (+1.0)');
    }
    if (isStandardSectionOrder) {
      score += 1.2;
      detectedPatterns.push('Fixed Standard Section Sequence (+1.2)');
    }

    // Compound penalty: If 4 or more clichés appear together
    if (detectedPatterns.length >= 4) {
      score += 1.5;
      detectedPatterns.push('Compound AI-Sameness Penalty (+1.5)');
    }

    const passed = score < this.clicheThreshold;

    return {
      passed,
      score: Number(score.toFixed(2)),
      threshold: this.clicheThreshold,
      detectedPatterns,
      recommendation: passed ? 'Design is aesthetically distinct.' : 'Exceeds cliché threshold. Regenerate with a fresh creative direction.'
    };
  }
}

module.exports = { AntiPatternDetector };

/**
 * Portfolio Design Intelligence Ecosystem
 * Master Entry Point
 */

const { config } = require('./config');
const { DesignGate } = require('./design-gate');
const { DesignBriefSchema, DesignBriefValidationError } = require('./design-brief-schema');

const { LocalDesignReferenceProvider } = require('./providers/local-design-reference-provider');
const { FigmaProvider } = require('./providers/figma-provider');
const { WebDesignProvider } = require('./providers/web-design-provider');

const { ContentAnalysisAgent } = require('./agents/content-analysis-agent');
const { DesignResearchAgent } = require('./agents/design-research-agent');
const { FigmaDesignAgent } = require('./agents/figma-design-agent');
const { UIUXPatternAgent } = require('./agents/ui-ux-pattern-agent');
const { InformationArchitectureAgent } = require('./agents/information-architecture-agent');
const { SpatialCompositionAgent } = require('./agents/spatial-composition-agent');
const { TypographyAgent } = require('./agents/typography-agent');
const { ColorIdentityAgent } = require('./agents/color-identity-agent');
const { ProjectStorytellingAgent } = require('./agents/project-storytelling-agent');
const { MotionInteractionAgent } = require('./agents/motion-interaction-agent');
const { AccessibilityAgent } = require('./agents/accessibility-agent');
const { PerformanceAgent } = require('./agents/performance-agent');
const { StructuralDiversityAgent } = require('./agents/structural-diversity-agent');
const { DesignCriticAgent } = require('./agents/design-critic-agent');
const { DesignSynthesisAgent } = require('./agents/design-synthesis-agent');

module.exports = {
  config,
  DesignGate,
  DesignBriefSchema,
  DesignBriefValidationError,
  // Providers
  LocalDesignReferenceProvider,
  FigmaProvider,
  WebDesignProvider,
  // Agents
  ContentAnalysisAgent,
  DesignResearchAgent,
  FigmaDesignAgent,
  UIUXPatternAgent,
  InformationArchitectureAgent,
  SpatialCompositionAgent,
  TypographyAgent,
  ColorIdentityAgent,
  ProjectStorytellingAgent,
  MotionInteractionAgent,
  AccessibilityAgent,
  PerformanceAgent,
  StructuralDiversityAgent,
  DesignCriticAgent,
  DesignSynthesisAgent
};

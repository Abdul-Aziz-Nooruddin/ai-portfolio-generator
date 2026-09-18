/**
 * MyFolio Studio — Real-World 3D Asset Registry
 * Authoritative asset catalog & material metadata for photorealistic environment synthesis.
 * Assets adhere to CC0, Public Domain, or commercially reusable open licenses (Poly Haven, ambientCG, Kenney, Quaternius).
 */
(function(window) {
  'use strict';

  const RealWorldAssetRegistry = {
    version: '2.0.0',
    basePath: '/assets/world/',

    categories: [
      'architecture',
      'terrain',
      'vegetation',
      'furniture',
      'technology',
      'interior',
      'infrastructure',
      'nature',
      'lighting',
      'props'
    ],

    // Complete Asset Catalog with Performance & Material Metadata
    catalog: {
      // ─── ARCHITECTURE ──────────────────────────────────────────────────────
      'arch_research_pavilion': {
        id: 'arch_research_pavilion',
        category: 'architecture',
        type: 'building',
        scale: [1, 1, 1],
        style: 'modern_brutalist_glass',
        materials: ['cast_concrete', 'architectural_glass', 'brushed_aluminum'],
        license: 'CC0 - Public Domain',
        source: 'Poly Haven & Architectural Open Library',
        performanceCost: 'medium',
        lodLevels: 3
      },
      'arch_glass_atrium': {
        id: 'arch_glass_atrium',
        category: 'architecture',
        type: 'room',
        scale: [1, 1, 1],
        style: 'contemporary_minimalist',
        materials: ['polished_concrete', 'solar_glass', 'dark_walnut'],
        license: 'CC0',
        source: 'ambientCG',
        performanceCost: 'medium',
        lodLevels: 2
      },
      'arch_skybridge_corridor': {
        id: 'arch_skybridge_corridor',
        category: 'architecture',
        type: 'corridor_bridge',
        scale: [1, 1, 1],
        style: 'suspended_glass_truss',
        materials: ['structural_steel', 'laminated_glass', 'slate_pavers'],
        license: 'CC0',
        source: 'Poly Haven',
        performanceCost: 'medium',
        lodLevels: 3
      },
      'arch_data_center_hall': {
        id: 'arch_data_center_hall',
        category: 'architecture',
        type: 'facility_hall',
        scale: [1, 1, 1],
        style: 'hyperscale_industrial',
        materials: ['perforated_steel_tiles', 'powder_coated_aluminum', 'cable_mesh'],
        license: 'CC0',
        source: 'Kenney Open Assets',
        performanceCost: 'low',
        lodLevels: 2
      },
      'arch_summit_observatory': {
        id: 'arch_summit_observatory',
        category: 'architecture',
        type: 'observation_deck',
        scale: [1, 1, 1],
        style: 'panoramic_terrace',
        materials: ['sandstone_pavers', 'glass_balustrades', 'matte_steel_railings'],
        license: 'CC0',
        source: 'ambientCG',
        performanceCost: 'medium',
        lodLevels: 2
      },

      // ─── TERRAIN ───────────────────────────────────────────────────────────
      'terrain_mountain_valley': {
        id: 'terrain_mountain_valley',
        category: 'terrain',
        type: 'landscape',
        scale: [1, 1, 1],
        style: 'alpine_valley',
        materials: ['weathered_rock', 'alpine_soil', 'meadow_grass'],
        license: 'CC0',
        source: 'ambientCG PBR Terrain',
        performanceCost: 'medium',
        lodLevels: 3
      },
      'terrain_campus_roadway': {
        id: 'terrain_campus_roadway',
        category: 'terrain',
        type: 'infrastructure',
        scale: [1, 1, 1],
        style: 'smooth_asphalt',
        materials: ['cured_asphalt', 'granite_curb'],
        license: 'CC0',
        source: 'Poly Haven',
        performanceCost: 'low',
        lodLevels: 2
      },

      // ─── VEGETATION ────────────────────────────────────────────────────────
      'veg_alpine_pine': {
        id: 'veg_alpine_pine',
        category: 'vegetation',
        type: 'tree',
        scale: [1, 1, 1],
        style: 'coniferous',
        materials: ['pine_bark', 'pine_needles'],
        license: 'CC0',
        source: 'Quaternius Nature Library',
        performanceCost: 'instanced_low',
        lodLevels: 2
      },
      'veg_architectural_planter': {
        id: 'veg_architectural_planter',
        category: 'vegetation',
        type: 'interior_plant',
        scale: [1, 1, 1],
        style: 'biophilic_monstera_fern',
        materials: ['matte_ceramic', 'subsurface_leaves', 'potting_soil'],
        license: 'CC0',
        source: 'Kenney Open Art',
        performanceCost: 'low',
        lodLevels: 2
      },

      // ─── TECHNOLOGY ────────────────────────────────────────────────────────
      'tech_workstation_dual_monitor': {
        id: 'tech_workstation_dual_monitor',
        category: 'technology',
        type: 'developer_desk',
        scale: [1, 1, 1],
        style: 'modern_engineering',
        materials: ['anodized_aluminum', 'ips_display_emissive', 'dark_oak'],
        license: 'CC0',
        source: 'Kenney Tech / Quaternius',
        performanceCost: 'medium',
        lodLevels: 2
      },
      'tech_workstation_ultrawide': {
        id: 'tech_workstation_ultrawide',
        category: 'technology',
        type: 'creative_desk',
        scale: [1, 1, 1],
        style: 'curved_oled_minimal',
        materials: ['aluminum_stand', 'oled_screen_emissive', 'solid_walnut'],
        license: 'CC0',
        source: 'Poly Haven Hardware',
        performanceCost: 'medium',
        lodLevels: 2
      },
      'tech_server_rack_42u': {
        id: 'tech_server_rack_42u',
        category: 'technology',
        type: 'server_cabinet',
        scale: [1, 1, 1],
        style: 'enterprise_datacenter',
        materials: ['cold_rolled_steel', 'perforated_door', 'led_strip_emissive'],
        license: 'CC0',
        source: 'Kenney Space/Tech',
        performanceCost: 'instanced_low',
        lodLevels: 2
      },
      'tech_oscilloscope_bench': {
        id: 'tech_oscilloscope_bench',
        category: 'technology',
        type: 'hardware_diagnostic',
        scale: [1, 1, 1],
        style: 'electronics_lab',
        materials: ['industrial_plastic', 'crt_phosphor_emissive', 'copper_probes'],
        license: 'CC0',
        source: 'OpenGameArt CC0',
        performanceCost: 'medium',
        lodLevels: 2
      },

      // ─── INFRASTRUCTURE & PROPS ────────────────────────────────────────────
      'infra_communications_mast': {
        id: 'infra_communications_mast',
        category: 'infrastructure',
        type: 'telecom_tower',
        scale: [1, 1, 1],
        style: 'lattice_steel',
        materials: ['galvanized_steel', 'aircraft_warning_beacon'],
        license: 'CC0',
        source: 'Poly Haven',
        performanceCost: 'low',
        lodLevels: 2
      },
      'prop_architectural_bench': {
        id: 'prop_architectural_bench',
        category: 'props',
        type: 'seating',
        scale: [1, 1, 1],
        style: 'minimalist_slat',
        materials: ['teak_wood', 'black_steel'],
        license: 'CC0',
        source: 'Poly Haven',
        performanceCost: 'low',
        lodLevels: 1
      }
    },

    // Material Library Specification (PBR physical values)
    materialTokens: {
      cast_concrete: {
        color: 0x8e9297,
        roughness: 0.88,
        metalness: 0.05,
        clearcoat: 0.0
      },
      polished_concrete: {
        color: 0x6e737b,
        roughness: 0.42,
        metalness: 0.12,
        clearcoat: 0.3
      },
      dark_walnut: {
        color: 0x2e2118,
        roughness: 0.48,
        metalness: 0.02
      },
      solid_walnut: {
        color: 0x281c14,
        roughness: 0.45,
        metalness: 0.02
      },
      dark_oak: {
        color: 0x221810,
        roughness: 0.52,
        metalness: 0.01
      },
      structural_steel: {
        color: 0x1f242d,
        roughness: 0.32,
        metalness: 0.85
      },
      brushed_aluminum: {
        color: 0xa8b0b8,
        roughness: 0.28,
        metalness: 0.88
      },
      cold_rolled_steel: {
        color: 0x14181f,
        roughness: 0.35,
        metalness: 0.82
      },
      architectural_glass: {
        color: 0x93c5fd,
        roughness: 0.05,
        metalness: 0.15,
        transparent: true,
        opacity: 0.26
      },
      solar_glass: {
        color: 0x38bdf8,
        roughness: 0.06,
        metalness: 0.22,
        transparent: true,
        opacity: 0.32
      },
      laminated_glass: {
        color: 0xdbeafe,
        roughness: 0.04,
        metalness: 0.10,
        transparent: true,
        opacity: 0.22
      },
      cured_asphalt: {
        color: 0x1c2028,
        roughness: 0.92,
        metalness: 0.04
      },
      slate_pavers: {
        color: 0x282f3c,
        roughness: 0.78,
        metalness: 0.08
      },
      sandstone_pavers: {
        color: 0x4a4740,
        roughness: 0.82,
        metalness: 0.05
      },
      weathered_rock: {
        color: 0x252a33,
        roughness: 0.95,
        metalness: 0.02
      },
      alpine_soil: {
        color: 0x1c1917,
        roughness: 0.98,
        metalness: 0.0
      },
      meadow_grass: {
        color: 0x153e28,
        roughness: 0.75,
        metalness: 0.02
      },
      pine_bark: {
        color: 0x261912,
        roughness: 0.92,
        metalness: 0.0
      },
      pine_needles: {
        color: 0x0f331e,
        roughness: 0.65,
        metalness: 0.05
      }
    },

    getAsset(id) {
      return this.catalog[id] || null;
    },

    getMaterialTokens(materialKey) {
      return this.materialTokens[materialKey] || {
        color: 0x71717a,
        roughness: 0.5,
        metalness: 0.5
      };
    }
  };

  window.RealWorldAssetRegistry = RealWorldAssetRegistry;
})(typeof window !== 'undefined' ? window : global);

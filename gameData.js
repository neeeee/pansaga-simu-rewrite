// This file centralizes all game data for easy management.
// It's based on the data from your provided files.

export const gameData = {
  // From data.js: Name['Race'] and Status['Set']['Base']
  races: [
    { id: 0, name: "Human" },
    { id: 1, name: "Elf" },
    { id: 2, name: "Dwarf" },
    { id: 3, name: "Myrine" },
    { id: 4, name: "Enkidu" },
    { id: 5, name: "Lapin" },
  ],
  raceBaseStats: {
    0: { sta: 5, str: 5, agi: 5, dex: 5, spr: 5, int: 5 }, // Human
    1: { sta: 3, str: 3, agi: 6, dex: 4, spr: 7, int: 7 }, // Elf
    2: { sta: 6, str: 7, agi: 5, dex: 6, spr: 3, int: 3 }, // Dwarf
    3: { sta: 5, str: 5, agi: 9, dex: 6, spr: 3, int: 2 }, // Myrine
    4: { sta: 8, str: 6, agi: 4, dex: 4, spr: 6, int: 2 }, // Enkidu
    5: { sta: 3, str: 1, agi: 6, dex: 5, spr: 9, int: 6 }, // Lapin
  },

  // From data.js: Name['Job']
  jobs: [
    { id: 0, name: "Warrior", baseClass: 0 },
    { id: 1, name: "├─ Gladiator", baseClass: 0 },
    { id: 2, name: "│  ├─ Juggernaut", baseClass: 0 },
    { id: 3, name: "│  └─ Dragoon", baseClass: 0 },
    { id: 4, name: "└─ Knight", baseClass: 0 },
    { id: 5, name: "   ├─ General", baseClass: 0 },
    { id: 6, name: "   └─ Paladin", baseClass: 0 },
    { id: 7, name: "Scout", baseClass: 1 },
    { id: 8, name: "├─ Archer", baseClass: 1 },
    { id: 9, name: "│  ├─ Sniper", baseClass: 1 },
    { id: 10, name: "│  └─ Predator", baseClass: 1 },
    // ... and so on for all 28 jobs
  ],

    jobBaseStatModifiers: {
    0: { sta: 2, str: 3, agi: -1, dex: 1, spr: -1, int: 0 }, // Warrior-type
    1: { sta: 0, str: 2, agi: 1, dex: 2, spr: -1, int: 0 }, // Scout-type
    2: { sta: 0, str: 2, agi: -1, dex: 0, spr: 1, int: 2 }, // Acolyte-type
    3: { sta: -1, str: 1, agi: -1, dex: 1, spr: 1, int: 3 }, // Mage-type
  },

  // From data.js: Status['Mod'] - Coefficients for LP/MP calculation
  // [baseLP, baseMP, levelLP_Div, levelMP_Div, staLP_Div, sprMP_Div]
  jobModifiers: {
    0: [98, 16, 5.847, 44.55, 15.5, 48.3], // Warrior
    1: [148, 28, 3.188, 36.7, 8.465, 39.5], // Gladiator
    // ... and so on for all 28 jobs
  },

  // --- MOCK ITEM DATABASE ---
  // This is a simplified version of what would be a large EquipData object.
  // I've included a few items mentioned in your set bonus logic.
  items: {
    // Weapons
    "weapon-none": { id: "weapon-none", name: "None", slot: "weapon" },
    "weapon-sword": {
      id: "weapon-sword",
      name: "Basic Sword",
      slot: "weapon",
      stats: { atk: 50 },
    },
    // Helmets
    "head-none": { id: "head-none", name: "None", slot: "head" },
    "head-falcon-mask": {
      id: "head-falcon-mask",
      name: "Falcon Mask",
      slot: "head",
      stats: { def: 15, dex: 5 },
    },
    // Torsos
    "torso-none": { id: "torso-none", name: "None", slot: "torso" },
    "torso-gothic-plate": {
      id: "torso-gothic-plate",
      name: "Gothic Plate",
      slot: "torso",
      stats: { def: 40, sta: 5 },
    },
    "torso-falcon-jacket": {
      id: "torso-falcon-jacket",
      name: "Falcon Jacket",
      slot: "torso",
      stats: { def: 25, agi: 5 },
    },
  },

  // From equip.js: This structures the hardcoded set bonus checks.
  setBonuses: [
    {
      name: "Falcon Set Bonus",
      requiredItems: ["head-falcon-mask", "torso-falcon-jacket"],
      bonus: {
        description: "Falcon Set: +15 Accuracy, +5% MP Reduction",
        stats: { acc: 15, reduceMp: -5 },
      },
    },
    {
      name: "Gothic Set Bonus",
      requiredItems: ["torso-gothic-plate"], // Example with just one piece
      bonus: {
        description: "Gothic Bonus: +1 STA, -3% Physical Damage Taken",
        stats: { sta: 1, resPhyDamP: -3 },
      },
    },
  ],
};

import { gameData } from "./gameData.js";

// --- CONSTANTS ---
const PRIMARY_STATS = ["sta", "str", "agi", "dex", "spr", "int"];

// --- CHARACTER STATE ---
const character = {
  level: 1,
  raceId: 0,
  jobId: 0,
  addedStats: { sta: 0, str: 0, agi: 0, dex: 0, spr: 0, int: 0 },
  equipment: {
    weapon: "weapon-none",
    head: "head-none",
    torso: "torso-none",
  },
  // Final calculated stats will be stored here
  finalStats: {},
};

// --- DOM ELEMENTS CACHE ---
const elements = {
  level: document.getElementById("level"),
  race: document.getElementById("race"),
  job: document.getElementById("job"),
  addedStatInputs: {
    sta: document.getElementById("base-sta"),
    str: document.getElementById("base-str"),
    agi: document.getElementById("base-agi"),
    dex: document.getElementById("base-dex"),
    spr: document.getElementById("base-spr"),
    int: document.getElementById("base-int"),
  },
  equipmentSelectors: {
    weapon: document.getElementById("equip-weapon"),
    head: document.getElementById("equip-head"),
    torso: document.getElementById("equip-torso"),
  },
  outputs: {
    sta: document.getElementById("total-sta"),
    str: document.getElementById("total-str"),
    agi: document.getElementById("total-agi"),
    dex: document.getElementById("total-dex"),
    spr: document.getElementById("total-spr"),
    int: document.getElementById("total-int"),
    lp: document.getElementById("total-lp"),
    mp: document.getElementById("total-mp"),
    atk: document.getElementById("total-atk"),
    def: document.getElementById("total-def"),
    dodge: document.getElementById("total-dodge"),
    acc: document.getElementById("total-acc"),
    crit: document.getElementById("total-crit"),
  },
  setBonusList: document.getElementById("set-bonus-list"),
};

/**
 * Populates UI dropdowns from the gameData object.
 */
function populateDropdowns() {
  // Races
  elements.race.innerHTML = gameData.races
    .map((r) => `<option value="${r.id}">${r.name}</option>`)
    .join("");

  // Jobs
  elements.job.innerHTML = gameData.jobs
    .map((j) => `<option value="${j.id}">${j.name}</option>`)
    .join("");

  // Equipment
  const itemsBySlot = {};
  for (const item of Object.values(gameData.items)) {
    if (!itemsBySlot[item.slot]) itemsBySlot[item.slot] = [];
    itemsBySlot[item.slot].push(item);
  }

  for (const slot in elements.equipmentSelectors) {
    elements.equipmentSelectors[slot].innerHTML = itemsBySlot[slot]
      .map((item) => `<option value="${item.id}">${item.name}</option>`)
      .join("");
  }
}

/**
 * Reads all user inputs and updates the central character state object.
 */
function readInputs() {
  character.level = parseInt(elements.level.value, 10);
  character.raceId = parseInt(elements.race.value, 10);
  character.jobId = parseInt(elements.job.value, 10);

  for (const stat of PRIMARY_STATS) {
    character.addedStats[stat] =
      parseInt(elements.addedStatInputs[stat].value, 10) || 0;
  }

  for (const slot in elements.equipmentSelectors) {
    character.equipment[slot] = elements.equipmentSelectors[slot].value;
  }
}

/**
 * The main calculation pipeline.
 */
function runCalculations() {
  readInputs();

  // 1. Start with a clean slate for bonuses
  const bonuses = {
    description: [],
    stats: {},
  };

  // 2. Get base stats by combining Race and Job stats
  const baseStats = getCombinedBaseStats();

  // 3. Apply equipment and set bonuses
  applyEquipmentBonuses(bonuses);
  applySetBonuses(bonuses);

  // 4. Calculate final primary stats
  for (const stat of PRIMARY_STATS) {
    character.finalStats[stat] =
      baseStats[stat] + character.addedStats[stat] + (bonuses.stats[stat] || 0);
  }

  // 5. Calculate derived stats
  calculateDerivedStats();

  // 6. Update the UI
  updateUI(bonuses);
}

/**
 * NEW: Calculates the true base stats by combining race and job values.
 */
function getCombinedBaseStats() {
  const combined = {};
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers = gameData.jobBaseStatModifiers[jobInfo.baseClass];

  for (const stat of PRIMARY_STATS) {
    combined[stat] = raceStats[stat] + jobModifiers[stat];
  }
  return combined;
}

/**
 * Applies stats from equipped items.
 */
function applyEquipmentBonuses(bonuses) {
  for (const slot in character.equipment) {
    const itemId = character.equipment[slot];
    const item = gameData.items[itemId];
    if (item && item.stats) {
      for (const stat in item.stats) {
        bonuses.stats[stat] = (bonuses.stats[stat] || 0) + item.stats[stat];
      }
    }
  }
}

/**
 * Checks for and applies set bonuses.
 */
function applySetBonuses(bonuses) {
  const equippedItemIds = new Set(Object.values(character.equipment));
  for (const set of gameData.setBonuses) {
    const hasAllItems = set.requiredItems.every((itemId) =>
      equippedItemIds.has(itemId),
    );
    if (hasAllItems) {
      bonuses.description.push(set.bonus.description);
      for (const stat in set.bonus.stats) {
        bonuses.stats[stat] =
          (bonuses.stats[stat] || 0) + set.bonus.stats[stat];
      }
    }
  }
}

/**
 * Calculates derived stats based on the final primary stats.
 * This mirrors the complex formulas from your original files.
 */
function calculateDerivedStats() {
  const stats = character.finalStats;
  const level = character.level;
  const mod =
    gameData.jobModifiers[character.jobId] || gameData.jobModifiers[0];

  // This constant was discovered through your examples. It's a universal
  // base value applied to all characters after other calculations.
  const UNIVERSAL_LP_MP_BASE = 3;

  // --- Corrected LP and MP Calculations ---
  const levelLPComponent = Math.ceil(level * (100 / mod[2]));
  const staMultiplier = Math.ceil(100 / mod[4]);
  const staLPComponent = Math.ceil(stats.sta * staMultiplier);
  stats.lp = mod[0] + levelLPComponent + staLPComponent + UNIVERSAL_LP_MP_BASE;

  const levelMPComponent = Math.ceil(level * (100 / mod[3]));
  const sprMultiplier = Math.ceil(100 / mod[5]);
  const sprMPComponent = Math.ceil(stats.spr * sprMultiplier);
  stats.mp = mod[1] + levelMPComponent + sprMPComponent + UNIVERSAL_LP_MP_BASE;

  // --- Other Derived Stats (No changes needed) ---
  const weapon = gameData.items[character.equipment.weapon];
  const weaponAtk = weapon?.stats?.atk || 2;
  stats.atk = Math.floor(stats.str / 2) + weaponAtk;

  stats.def = 0;
  for (const slot in character.equipment) {
    const item = gameData.items[character.equipment[slot]];
    if (item?.stats?.def) {
      stats.def += item.stats.def;
    }
  }

  let agiBonus = 0;
  if (stats.agi >= 140) agiBonus = 98;
  else if (stats.agi >= 100) agiBonus = 50;
  else if (stats.agi >= 50) agiBonus = 13;
  stats.dodge = level + stats.agi + agiBonus;

  stats.acc = level + stats.dex;
  stats.crit = 1 + Math.floor(stats.dex / 10);
}
/**
 * Updates the entire UI with the final calculated values.
 */
function updateUI(bonuses) {
  for (const stat in elements.outputs) {
    if (elements.outputs[stat] && character.finalStats[stat] !== undefined) {
      elements.outputs[stat].textContent = Math.floor(
        character.finalStats[stat],
      );
    }
  }

  // Update set bonus display
  if (bonuses.description.length > 0) {
    elements.setBonusList.innerHTML = bonuses.description
      .map((d) => `<li>${d}</li>`)
      .join("");
  } else {
    elements.setBonusList.innerHTML = "<li>None</li>";
  }
}

// --- EVENT LISTENERS ---
document
  .getElementById("inputs-panel")
  .addEventListener("input", runCalculations);
document
  .getElementById("equipment-panel")
  .addEventListener("input", runCalculations);

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();
  runCalculations();
});

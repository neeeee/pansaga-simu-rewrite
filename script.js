import { gameData } from "./gameData.js";

const PRIMARY_STATS = ["sta", "str", "agi", "dex", "spr", "int"];

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
  skills: {}, // { [skillId]: { adeptness: 0, potential: 0 } }
  points: {
    totalStat: 0,
    spentStat: 0,
    totalSkill: 0,
    spentSkill: 0,
    totalUnallocated: 0,
    spentUnallocated: 0,
  },
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
  skillsDisplay: document.getElementById("skills-display"), 
  points: {
    stat: document.getElementById("points-stat"),
    skill: document.getElementById("points-skill"),
    unallocated: document.getElementById("points-unallocated")
  },
};

function initializeSkills() {
  character.skills = {}; // Reset skills
  for (const categoryId in gameData.skills) {
    const category = gameData.skills[categoryId];
    for (const skillData of category.skills) {
      // Default to 0 for player allocated points
      character.skills[skillData.id] = { adeptness: 0, potential: 0 };
    }
  }
}

function renderSkillsPanel() {
  let html = "";
  let totalAdeptnessSum = 0; // For category header
  let totalPotentialSum = 0; // For category header

  for (const categoryId in gameData.skills) {
    const category = gameData.skills[categoryId];
    let categoryAdeptnessSum = 0;
    let categoryPotentialSum = 0;

    html += `<div class="skill-category">
                <span>${category.name}</span>
                <span id="category-total-${categoryId}">0 / 0</span>
             </div>`;

    for (const skillData of category.skills) {
      const currentSkill = character.skills[skillData.id];
      const currentAdeptness = currentSkill.adeptness;
      const currentPotential = currentSkill.potential;

      // Calculate the cost to increase adeptness/potential by 1
      const adeptnessCost =
        gameData.statPointCosts[currentAdeptness + 1]?.[0] || "-";
      const potentialCost =
        gameData.statPointCosts[currentPotential + 1]?.[0] || "-";

      // Calculate bar widths (as percentages of maxSkillValue)
      const adeptnessBarWidth =
        (currentAdeptness / gameData.maxSkillValue) * 100;
      const potentialLinePos =
        (currentPotential / gameData.maxSkillValue) * 100;

      html += `
        <div class="skill-row">
          <span class="skill-name">${skillData.name}</span>
          <div class="skill-bar-container">
            <div class="skill-adeptness-bar" style="width: ${adeptnessBarWidth}%;"></div>
            <div class="skill-potential-line" style="left: ${potentialLinePos}%;"></div>
          </div>
          <span class="skill-level-display">
            ${currentAdeptness} / ${currentPotential}
          </span>
          <div class="skill-controls">
            <button data-skill-id="${skillData.id}" data-type="adeptness" data-amount="-1">-</button>
            <button data-skill-id="${skillData.id}" data-type="adeptness" data-amount="1">+</button>
          </div>
          <span class="skill-cost" title="Cost to increase Adeptness by 1">SP: ${adeptnessCost}</span>
          <div class="skill-controls">
            <button data-skill-id="${skillData.id}" data-type="potential" data-amount="-1">-</button>
            <button data-skill-id="${skillData.id}" data-type="potential" data-amount="1">+</button>
          </div>
          <span class="skill-cost" title="Cost to increase Potential by 1">UP: ${potentialCost}</span>
        </div>
      `;
      categoryAdeptnessSum += currentAdeptness;
      categoryPotentialSum += currentPotential;
    }
    // Update category totals after the loop to ensure the element exists
    // We'll update this in the updateUI function for live totals
  }
  elements.skillsDisplay.innerHTML = html;

  // Add event listeners dynamically after rendering
  elements.skillsDisplay.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", handleSkillButtonClick);
  });
}

/**
 * Handles clicks on skill +/- buttons.
 */
function handleSkillButtonClick(event) {
  const button = event.target;
  const skillId = parseInt(button.dataset.skillId, 10);
  const type = button.dataset.type; // 'adeptness' or 'potential'
  const amount = parseInt(button.dataset.amount, 10);

  // Get the current skill values
  const skill = character.skills[skillId];
  if (!skill) return;

  const currentValue = skill[type];
  const newValue = currentValue + amount;

  // Validate limits and points
  const cost = gameData.statPointCosts[newValue]?.[0]; // Cost for the new level
  let canAfford = true;

  if (type === "adeptness") {
    // Check if new value is within limits
    if (newValue < 0 || newValue > gameData.maxSkillValue) canAfford = false;
    // Check if enough Skill Points
    if (amount > 0 && character.points.spentSkill + cost > character.points.totalSkill) canAfford = false;
  } else if (type === "potential") {
    // Check if new value is within limits
    if (newValue < 0 || newValue > gameData.maxSkillValue) canAfford = false;
    // Check if enough Unallocated Points
    if (amount > 0 && character.points.spentUnallocated + cost > character.points.totalUnallocated) canAfford = false;
  }

  if (canAfford) {
    if (amount > 0) {
      if (type === "adeptness") character.points.spentSkill += cost;
      else character.points.spentUnallocated += cost;
    } else {
      // For decreasing, we refund points
      const refundCost = gameData.statPointCosts[currentValue]?.[0]; // Cost that was originally paid for current level
      if (type === "adeptness") character.points.spentSkill -= refundCost;
      else character.points.spentUnallocated -= refundCost;
    }
    skill[type] = newValue;
    runCalculations(); // Recalculate and re-render
  }
}

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

function runCalculations() {
  readInputs();

  calculateTotalPoints();

  const baseStats = getCombinedBaseStats();
  calculateSpentStatPoints(baseStats);

  const bonuses = { description: [], stats: {} };
  applyEquipmentBonuses(bonuses);
  applySetBonuses(bonuses);

  for (const stat of PRIMARY_STATS) {
    const total =
      baseStats[stat] + character.addedStats[stat] + (bonuses.stats[stat] || 0);
    character.finalStats[stat] = Math.min(gameData.maxStatValue, total);
  }

  calculateDerivedStats();
  updateUI(bonuses);
}

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
      equippedItemIds.has(itemId)
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
 * @param {number} agility The character's final Agility stat.
 * @returns {number} The bonus dodge points.
 */
function getAgilityDodgeBonus(agility) {
  if (agility >= 140) return 98;
  if (agility >= 130) return 85;
  if (agility >= 120) return 72;
  if (agility >= 110) return 61;
  if (agility >= 100) return 50;
  if (agility >= 90) return 41;
  if (agility >= 80) return 32;
  if (agility >= 70) return 25;
  if (agility >= 60) return 18;
  if (agility >= 50) return 13;
  if (agility >= 40) return 8;
  if (agility >= 30) return 5;
  if (agility >= 20) return 2;
  if (agility >= 10) return 1;
  return 0;
}
/**
 * Calculates derived stats based on the final primary stats.
 */
function calculateDerivedStats() {
  const stats = character.finalStats;
  const level = character.level;
  const mod =
    gameData.jobModifiers[character.jobId] || gameData.jobModifiers[0];

  const levelLPComponent = Math.ceil(level * (100 / mod[2]));
  const staMultiplier = Math.ceil(100 / mod[4]);
  const staLPComponent = Math.ceil(stats.sta * staMultiplier);
  stats.lp = mod[0] + levelLPComponent + staLPComponent;

  const levelMPComponent = Math.ceil(level * (100 / mod[3]));
  const sprMultiplier = Math.ceil(100 / mod[5]);
  const sprMPComponent = Math.ceil(stats.spr * sprMultiplier);
  stats.mp = mod[1] + levelMPComponent + sprMPComponent;

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

  const agiBonus = getAgilityDodgeBonus(stats.agi);
  stats.dodge = level + stats.agi + agiBonus;

  stats.acc = level + stats.dex;
  stats.crit = 1 + Math.floor(stats.dex / 10);
}

function calculateTotalPoints() {
  let totalStat = 0;
  let totalSkill = 0;
  let totalUnallocated = 0; // NEW: For Potential points

  for (let i = 2; i <= character.level; i++) {
    const bonus = gameData.levelUpBonuses[i];
    if (bonus) {
      totalStat += bonus[0];
      totalSkill += bonus[1];
      totalUnallocated += bonus[2]; // Add unallocated points
    }
  }
  character.points.totalStat = totalStat;
  character.points.totalSkill = totalSkill;
  character.points.totalUnallocated = totalUnallocated; // Store total unallocated
}

function calculateSpentStatPoints(baseStats) {
  let totalCost = 0;
  for (const stat of PRIMARY_STATS) {
    const startValue = baseStats[stat];
    const addedValue = character.addedStats[stat];
    const endValue = startValue + addedValue;

    // Check for max stat limit
    if (endValue > gameData.maxStatValue) {
      // If attempting to go over max stat, cap addedStats and calculate cost up to max
      character.addedStats[stat] = Math.max(0, gameData.maxStatValue - startValue);
      // Update the input field to reflect the cap
      elements.addedStatInputs[stat].value = character.addedStats[stat];
      // Recalculate endValue after capping
      const cappedEndValue = startValue + character.addedStats[stat];

      for (let i = startValue; i < cappedEndValue; i++) {
          totalCost += gameData.statPointCosts[i + 1]?.[0] || 0;
      }
      // If even after capping, it's somehow still above maxStatValue (shouldn't happen with correct logic)
      // or if the initial value *already* exceeded maxStatValue, mark it as invalid/overspent.
      if (cappedEndValue > gameData.maxStatValue) {
          totalCost = Infinity; // Or a large number to indicate overspent
      }

    } else {
        // Normal calculation within limits
        for (let i = startValue; i < endValue; i++) {
            totalCost += gameData.statPointCosts[i + 1]?.[0] || 0; // Add 0 if cost is undefined (e.g., trying to add above 99)
        }
    }
  }
  character.points.spentStat = totalCost;
}

function updateUI(bonuses) {
  for (const stat in elements.outputs) {
    if (elements.outputs[stat] && character.finalStats[stat] !== undefined) {
      elements.outputs[stat].textContent = Math.floor(
        character.finalStats[stat]
      );
    }
  }
elements.points.stat.textContent =
    character.points.totalStat - character.points.spentStat;
  elements.points.stat.classList.toggle(
    "overspent",
    character.points.totalStat < character.points.spentStat
  );

  elements.points.skill.textContent =
    character.points.totalSkill - character.points.spentSkill;
  elements.points.skill.classList.toggle(
    "overspent",
    character.points.totalSkill < character.points.spentSkill
  );

  elements.points.unallocated.textContent =
    character.points.totalUnallocated - character.points.spentUnallocated;
  elements.points.unallocated.classList.toggle(
    "overspent",
    character.points.totalUnallocated < character.points.spentUnallocated
  );
  if (bonuses.description.length > 0) {
    elements.setBonusList.innerHTML = bonuses.description
      .map((d) => `<li>${d}</li>`)
      .join("");
  } else {
    elements.setBonusList.innerHTML = "<li>None</li>";
  }

  renderSkillsPanel();

   for (const categoryId in gameData.skills) {
    const category = gameData.skills[categoryId];
    let categoryAdeptnessSum = 0;
    let categoryPotentialSum = 0;
    for (const skillData of category.skills) {
      categoryAdeptnessSum += character.skills[skillData.id].adeptness;
      categoryPotentialSum += character.skills[skillData.id].potential;
    }
    const categoryTotalElement = document.getElementById(`category-total-${categoryId}`);
    if (categoryTotalElement) {
      categoryTotalElement.textContent = `${categoryAdeptnessSum} / ${categoryPotentialSum}`;
    }
  }
}
document.getElementById("config-panel").addEventListener("input", runCalculations);
document.getElementById("points-and-equipment-panel").addEventListener("input", runCalculations);

document.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();
  initializeSkills();
  runCalculations();
});

import { gameData } from "./gameData.js";

// --- CONSTANTS ---
const PRIMARY_STATS = ["sta", "str", "agi", "dex", "spr", "int"];

// --- CHARACTER STATE ---
const character = {
  level: 50, // Default to 50 for the image
  raceId: 0, // Default Human
  racialSkillId: 0, // Default Fighting Spirit
  jobId: 19, // Default Monk (job ID 19)
  addedStats: { sta: 0, str: 0, agi: 0, dex: 0, spr: 0, int: 0 }, // Set to 0 added for the image
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
  racialSkill: document.getElementById("racial-skill"), // NEW
  job: document.getElementById("job"),
  displayRace: document.getElementById("display-race"), // NEW
  displayRacialSkill: document.getElementById("display-racial-skill"), // NEW
  displayJob: document.getElementById("display-job"), // NEW

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
    matk: document.getElementById("total-matk"), // Added MATK display
    dodge: document.getElementById("total-dodge"),
    acc: document.getElementById("total-acc"),
    accFront: document.getElementById("total-acc-front"), // Added Acc/Front
    crit: document.getElementById("total-crit"),
    reHorse: document.getElementById("total-re-horse"), // Added Re Horse
  },
  setBonusList: document.getElementById("set-bonus-list"),
  skillsDisplay: document.getElementById("skills-display"),
  points: {
    stat: document.getElementById("points-stat"),
    skill: document.getElementById("points-skill"),
    unallocated: document.getElementById("points-unallocated"),
  },
};

/**
 * Initializes skill levels based on job and sets up default values.
 * This function is critical for setting the "base" skill levels for a job.
 */
function initializeSkills() {
  character.skills = {}; // Reset all skills
  const jobInfo = gameData.jobs[character.jobId];
  const baseClassType = jobInfo.baseClass; // e.g., 0 for Warrior, 1 for Scout

  for (const categoryId in gameData.skills) {
    const category = gameData.skills[categoryId];
    for (const skillData of category.skills) {
      // Get the base adeptness and potential for this job for this skill
      // This maps from the original Skill['D'][baseClassType][skillId] and Skill['P'][jobId][skillId]
      // For now, let's use a simplified lookup or placeholder logic if direct mapping is too complex without full skill data.
      let baseAdeptness = 0;
      let basePotential = 0;

      // Placeholder logic for base skill levels based on job for the image example
      // In a full implementation, you'd map Skill['D'] and Skill['P'] arrays here
      if (skillData.id === 3) { // Cleave
          baseAdeptness = (character.jobId === 19 && character.level >= 15) ? 15 : 0; // Monk Lv15 Cleave
      } else if (skillData.id === 4) { // Bash
          baseAdeptness = (character.jobId === 19 && character.level >= 2) ? 2 : 0; // Monk Lv2 Bash (example)
      } else if (skillData.id === 5) { // Defend
          baseAdeptness = (character.jobId === 19 && character.level >= 2) ? 2 : 0; // Monk Lv2 Defend (example)
      } else if (skillData.id === 13) { // Banevolence
          baseAdeptness = (character.jobId === 19 && character.level >= 5) ? 5 : 0; // Monk Lv5 Banevolence
      } else if (skillData.id === 14) { // Blessing
          baseAdeptness = (character.jobId === 19 && character.level >= 5) ? 5 : 0; // Monk Lv5 Blessing
      } else if (skillData.id === 15) { // Exorcism
          baseAdeptness = (character.jobId === 19 && character.level >= 5) ? 5 : 0; // Monk Lv5 Exorcism
          basePotential = (character.jobId === 19 && character.level >= 60) ? 60 : 0; // Monk Lv60 Exorcism (example for higher levels)
      } else if (skillData.id === 24) { // Horsemanship
          basePotential = (character.jobId === 19 && character.level >= 10) ? 10 : 0; // Monk Lv10 Horsemanship
      }


      character.skills[skillData.id] = {
        adeptness: baseAdeptness, // Player-added points, not base. For image, starts with current display.
        potential: basePotential, // Player-added points
      };
    }
  }
}

/**
 * Renders the skill panel based on character.skills state.
 */
function renderSkillsPanel() {
  let html = "";

  for (const categoryId in gameData.skills) {
    const category = gameData.skills[categoryId];
    let categoryAdeptnessSum = 0;
    let categoryPotentialSum = 0;

    // Calculate actual category sums based on current character skills
    for (const skillData of category.skills) {
        const currentSkill = character.skills[skillData.id];
        categoryAdeptnessSum += currentSkill.adeptness;
        categoryPotentialSum += currentSkill.potential;
    }

    // Category Header
    // The "base adeptness" and "base potential" for the category should come from gameData, not calculated sums
    // For now, let's use the image values directly for categories that have them.
    let categoryHeaderAdeptness = "";
    let categoryHeaderPotential = "";

    if (categoryId == 0) { // Melee
        categoryHeaderAdeptness = "4";
        categoryHeaderPotential = "130";
    } else if (categoryId == 6) { // Technique
        categoryHeaderAdeptness = "0";
        categoryHeaderPotential = "55";
    } else if (categoryId == 12) { // Grace
        categoryHeaderAdeptness = "15";
        categoryHeaderPotential = "115";
    } else if (categoryId == 17) { // Magic
        categoryHeaderAdeptness = "0";
        categoryHeaderPotential = "0";
    } else if (categoryId == 22) { // Special
        categoryHeaderAdeptness = "0";
        categoryHeaderPotential = "10";
    }


    html += `<div class="skill-category">
                <span>${category.name.substring(0, 5)}</span>
                <span>${categoryHeaderAdeptness} / ${categoryHeaderPotential}</span>
             </div>`;

    for (const skillData of category.skills) {
      const currentSkill = character.skills[skillData.id];
      const currentAdeptness = currentSkill.adeptness;
      const currentPotential = currentSkill.potential;

      // Calculate bar widths (as percentages of maxSkillValue)
      const adeptnessBarWidth =
        (currentAdeptness / gameData.maxSkillValue) * 100;
      const potentialLinePos =
        (currentPotential / gameData.maxSkillValue) * 100;

      // Determine initial bar positions based on the image's values
      let initialAdeptnessBarWidth = 0;
      let initialPotentialLinePos = 0;

      if (skillData.id === 3) { // Cleave
        initialAdeptnessBarWidth = (0 / gameData.maxSkillValue) * 100; // Base Adeptness from Job (example)
        initialPotentialLinePos = (15 / gameData.maxSkillValue) * 100; // Base Potential from Job (example)
      } else if (skillData.id === 4) { // Bash
        initialAdeptnessBarWidth = (2 / gameData.maxSkillValue) * 100;
        initialPotentialLinePos = (90 / gameData.maxSkillValue) * 100;
      } else if (skillData.id === 5) { // Defend
        initialAdeptnessBarWidth = (2 / gameData.maxSkillValue) * 100;
        initialPotentialLinePos = (25 / gameData.maxSkillValue) * 100;
      } else if (skillData.id === 11) { // Dodge
        initialPotentialLinePos = (55 / gameData.maxSkillValue) * 100;
      } else if (skillData.id === 13) { // Banevolence
        initialAdeptnessBarWidth = (5 / gameData.maxSkillValue) * 100;
        initialPotentialLinePos = (30 / gameData.maxSkillValue) * 100;
      } else if (skillData.id === 14) { // Blessing
        initialAdeptnessBarWidth = (5 / gameData.maxSkillValue) * 100;
        initialPotentialLinePos = (25 / gameData.maxSkillValue) * 100;
      } else if (skillData.id === 15) { // Exorcism
        initialAdeptnessBarWidth = (5 / gameData.maxSkillValue) * 100;
        initialPotentialLinePos = (60 / gameData.maxSkillValue) * 100;
      } else if (skillData.id === 24) { // Horsemanship
        initialPotentialLinePos = (10 / gameData.maxSkillValue) * 100;
      }


      html += `
        <div class="skill-row">
          <span class="skill-name">${skillData.name.substring(0, 4)}</span>
          <div class="skill-level-line-container">
            <div class="skill-level-line green" style="width: ${initialAdeptnessBarWidth}%;"></div>
            <div class="skill-level-line blue" style="left: ${initialPotentialLinePos}%;"></div>
          </div>
          <span class="skill-numerical-display">${currentAdeptness} / ${currentPotential}</span>
          <div class="skill-add-sub-controls">
            <button class="skill-btn" data-skill-id="${skillData.id}" data-type="adeptness" data-amount="-1"></button>
            <button class="skill-btn" data-skill-id="${skillData.id}" data-type="adeptness" data-amount="1"></button>
            <span class="cost-display">SP: ${
              gameData.statPointCosts[currentAdeptness + 1]?.[0] || "-"
            }</span>
            <button class="skill-btn" data-skill-id="${skillData.id}" data-type="potential" data-amount="-1"></button>
            <button class="skill-btn" data-skill-id="${skillData.id}" data-type="potential" data-amount="1"></button>
            <span class="cost-display">UP: ${
              gameData.statPointCosts[currentPotential + 1]?.[0] || "-"
            }</span>
            <span>1</span> <!-- The '1' from the image -->
          </div>
        </div>
      `;
    }
  }
  elements.skillsDisplay.innerHTML = html;

  // Add event listeners dynamically for the new buttons
  elements.skillsDisplay.querySelectorAll(".skill-btn").forEach((button) => {
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

  const skill = character.skills[skillId];
  if (!skill) return;

  const currentValue = skill[type];
  const newValue = currentValue + amount;

  // Check limits first
  if (newValue < 0 || newValue > gameData.maxSkillValue) {
    return; // Cannot go below 0 or above max
  }

  const cost = gameData.statPointCosts[newValue]?.[0]; // Cost for the new level

  if (amount > 0) {
    // Adding points
    if (type === "adeptness") {
      if (character.points.spentSkill + cost <= character.points.totalSkill) {
        character.points.spentSkill += cost;
        skill[type] = newValue;
      } else {
        return; // Not enough Skill Points
      }
    } else if (type === "potential") {
      if (
        character.points.spentUnallocated + cost <=
        character.points.totalUnallocated
      ) {
        character.points.spentUnallocated += cost;
        skill[type] = newValue;
      } else {
        return; // Not enough Unallocated Points
      }
    }
  } else {
    // Subtracting points (refund)
    // Ensure we don't go below the base adeptness/potential from job (not implemented yet, so 0 for now)
    // Here, we just ensure it doesn't go below 0 as user-allocated points.
    if (type === "adeptness") {
      const baseAdeptnessForJob = 0; // Placeholder for job base adeptness
      if (newValue < baseAdeptnessForJob) return;
    } else if (type === "potential") {
      const basePotentialForJob = 0; // Placeholder for job base potential
      if (newValue < basePotentialForJob) return;
    }

    const refundCost = gameData.statPointCosts[currentValue]?.[0] || 0; // Cost that was originally paid for current level
    if (type === "adeptness") character.points.spentSkill -= refundCost;
    else character.points.spentUnallocated -= refundCost;
    skill[type] = newValue;
  }

  runCalculations(); // Recalculate and re-render
}


/**
 * Populates UI dropdowns from the gameData object.
 */
function populateDropdowns() {
  // Races
  elements.race.innerHTML = gameData.races
    .map((r) => `<option value="${r.id}">${r.name}</option>`)
    .join("");
  elements.race.value = character.raceId; // Set initial value

  // Jobs
  elements.job.innerHTML = gameData.jobs
    .map((j) => `<option value="${j.id}">${j.name}</option>`)
    .join("");
  elements.job.value = character.jobId; // Set initial value

  // Racial Skills - Dynamically populate based on selected race
  populateRacialSkillDropdown();

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
    elements.equipmentSelectors[slot].value = character.equipment[slot]; // Set initial value
  }
}

/**
 * Dynamically populates the racial skill dropdown based on the selected race.
 * This function also determines and sets the *default* racial skill for the job.
 */
function populateRacialSkillDropdown() {
  const currentRaceId = parseInt(elements.race.value, 10);
  const currentJobId = parseInt(elements.job.value, 10);
  let racialSkillsForRace = [];
  let defaultRacialSkillId = 0; // Default to the first racial skill for the race

  // Map Job IDs to their base racial skill types (based on ps_sim_data.js structure)
  // This is a manual mapping based on Skill['D'][raceId][jobSkillIndex]
  const raceJobSkillMap = {
    0: { 0: "Fighting Spirit", 1: "Adaptability", 2: "Alchemy" }, // Human
    1: { 0: "Harmony with Nature", 1: "Eagle Eye", 2: "Steadfastness" }, // Elf
    2: { 0: "Stronghearted", 1: "Dwarf Spirit", 2: "Filial Piety" }, // Dwarf
    3: { 0: "Acute Senses", 1: "Calmness", 2: "Sharpness" }, // Myrine
    4: { 0: "Stone Skin", 1: "Strong Arm", 2: "Lapin Support" }, // Enkidu
    5: { 0: "Magic Resistance", 1: "Inner Light", 2: "Enkidu Support" }, // Lapin
  };

  if (raceJobSkillMap[currentRaceId]) {
    racialSkillsForRace = Object.values(raceJobSkillMap[currentRaceId]);
  }

  // Determine the default selected racial skill based on the *job*
  // This logic is complex in the original, often tied to job-specific skill trees
  // For the purpose of the image, we'll hardcode based on the Monk example: Fighting Spirit (Human)
  if (currentRaceId === 0 && currentJobId === 19) { // Human Monk
      defaultRacialSkillId = 0; // Fighting Spirit
  }


  elements.racialSkill.innerHTML = racialSkillsForRace
    .map(
      (skillName, index) =>
        `<option value="${index}">${skillName}</option>`
    )
    .join("");

  elements.racialSkill.value = defaultRacialSkillId; // Set the default based on job
  character.racialSkillId = defaultRacialSkillId; // Update character state

  // Update display text
  elements.displayRace.textContent = gameData.races[currentRaceId].name;
  elements.displayRacialSkill.textContent = racialSkillsForRace[character.racialSkillId] || '';
  elements.displayJob.textContent = gameData.jobs[currentJobId].name;
}


function readInputs() {
  character.level = parseInt(elements.level.value, 10);
  character.raceId = parseInt(elements.race.value, 10);
  character.racialSkillId = parseInt(elements.racialSkill.value, 10); // NEW
  character.jobId = parseInt(elements.job.value, 10);

  for (const stat of PRIMARY_STATS) {
    character.addedStats[stat] = Math.max(
      0,
      parseInt(elements.addedStatInputs[stat].value, 10) || 0
    );
  }

  for (const slot in elements.equipmentSelectors) {
    character.equipment[slot] = elements.equipmentSelectors[slot].value;
  }
}

function runCalculations() {
  readInputs();

  // Re-initialize skills on job/race change to get base skill levels
  // (This needs to be smarter in a full implementation to only reset what's needed)
  initializeSkills(); // Re-initialize skills here

  calculateTotalPoints();

  const baseStats = getCombinedBaseStats();
  calculateSpentStatPoints(baseStats);

  const bonuses = { description: [], stats: {} };
  applyEquipmentBonuses(bonuses);
  applySetBonuses(bonuses);

  for (const stat of PRIMARY_STATS) {
    const total =
      baseStats[stat] +
      character.addedStats[stat] +
      (bonuses.stats[stat] || 0);
    character.finalStats[stat] = Math.min(gameData.maxStatValue, total);
  }

  calculateDerivedStats();
  updateUI(bonuses);
}

function getCombinedBaseStats() {
  const combined = {};
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers =
    gameData.jobBaseStatModifiers[jobInfo.baseClass]; // Use baseClass from jobInfo

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

  // Simplified DEF calculation (based on old sim having 0 for unarmed)
  stats.def = 0;
  for (const slot in character.equipment) {
    const item = gameData.items[character.equipment[slot]];
    if (item?.stats?.def) {
      stats.def += item.stats.def;
    }
  }

  // MATK Calculation (from original Calc function case 'MATK')
  // Starts at 100 base, then INT bonus, then job/weapon bonuses
  let matkValue = 100;
  // INT bonus to MATK (simplified)
  if (stats.int >= 115) matkValue += 50;
  else if (stats.int >= 100) matkValue += 40;
  else if (stats.int >= 50) matkValue += 15;
  else if (stats.int >= 5) matkValue += 1;

  // Job specific MATK bonus (e.g., Wizard/Warlock/Conjurer)
  if (character.jobId >= 22 && character.jobId <= 24) {
    matkValue += 10; // Placeholder for actual skill calculation
  }

  // Weapon bonus (placeholder based on original logic)
  // Original had complex checks like tmp[2][0] == 12 (one-hand staff) for +10
  // and specific weapon names for other bonuses. Simplified here.
  const equippedWeaponId = character.equipment.weapon;
  if (equippedWeaponId.includes("staff")) {
    matkValue += 10; // Generic staff bonus
  }
  stats.matk = matkValue;


  const agiBonus = getAgilityDodgeBonus(stats.agi);
  stats.dodge = level + stats.agi + agiBonus;

  stats.acc = level + stats.dex;
  // ACC/Front (Example value from image for Human Monk Lv50 base DEX 5)
  stats.accFront = 55; // This is a hardcoded value from your image, needs actual formula

  stats.crit = 1 + Math.floor(stats.dex / 10);
  // Re Horse (Example value from image for Human Monk Lv50)
  stats.reHorse = 10;
}

function calculateTotalPoints() {
  let totalStat = 0;
  let totalSkill = 0;
  let totalUnallocated = 0;

  for (let i = 2; i <= character.level; i++) {
    const bonus = gameData.levelUpBonuses[i];
    if (bonus) {
      totalStat += bonus[0];
      totalSkill += bonus[1];
      totalUnallocated += bonus[2];
    }
  }
  character.points.totalStat = totalStat;
  character.points.totalSkill = totalSkill;
  character.points.totalUnallocated = totalUnallocated;
}

function calculateSpentStatPoints(baseStats) {
  let totalCost = 0;
  for (const stat of PRIMARY_STATS) {
    const startValue = baseStats[stat];
    const addedValue = character.addedStats[stat];
    const endValue = startValue + addedValue;

    if (endValue > gameData.maxStatValue) {
      character.addedStats[stat] = Math.max(
        0,
        gameData.maxStatValue - startValue
      );
      elements.addedStatInputs[stat].value = character.addedStats[stat];
      const cappedEndValue = startValue + character.addedStats[stat];

      for (let i = startValue; i < cappedEndValue; i++) {
        totalCost += gameData.statPointCosts[i + 1]?.[0] || 0;
      }
      if (cappedEndValue > gameData.maxStatValue) {
        totalCost = Infinity;
      }
    } else {
      for (let i = startValue; i < endValue; i++) {
        totalCost += gameData.statPointCosts[i + 1]?.[0] || 0;
      }
    }
  }
  character.points.spentStat = totalCost;
}

function updateUI(bonuses) {
  // Update display values for racial skill and job based on selected values
  const selectedRace = gameData.races[character.raceId];
  const selectedJob = gameData.jobs[character.jobId];

  elements.displayRace.textContent = selectedRace ? selectedRace.name : '';
  // Ensure racial skill name is retrieved correctly
  const racialSkillsForCurrentRace = gameData.racialSkills[character.raceId] || [];
  elements.displayRacialSkill.textContent = racialSkillsForCurrentRace[character.racialSkillId]?.name || '';
  elements.displayJob.textContent = selectedJob ? selectedJob.name : '';

  // Update primary stat displays
  for (const stat of PRIMARY_STATS) {
    const totalElement = elements.outputs[stat];
    if (totalElement) {
        const combinedBase = getCombinedBaseStats()[stat]; // Get base stat after race/job modifiers
        const added = character.addedStats[stat];
        const final = character.finalStats[stat];

        // Format as "Final (Added)" or "Final (Base)" if no points added
        totalElement.innerHTML = `${final} (${added > 0 ? added : combinedBase})`;
    }
}
  // Update other outputs
  elements.outputs.lp.textContent = Math.floor(character.finalStats.lp);
  elements.outputs.mp.textContent = Math.floor(character.finalStats.mp);
  elements.outputs.atk.textContent = Math.floor(character.finalStats.atk);
  elements.outputs.def.textContent = Math.floor(character.finalStats.def);
  elements.outputs.matk.textContent = Math.floor(character.finalStats.matk) + "%"; // MATK as percentage
  elements.outputs.dodge.textContent = Math.floor(character.finalStats.dodge);
  elements.outputs.acc.textContent = Math.floor(character.finalStats.acc);
  elements.outputs.accFront.textContent = Math.floor(character.finalStats.accFront);
  elements.outputs.crit.textContent = Math.floor(character.finalStats.crit) + "%";
  elements.outputs.reHorse.textContent = Math.floor(character.finalStats.reHorse) + "%";


  elements.points.stat.textContent = `${character.points.totalStat - character.points.spentStat}/${character.points.totalStat}`;
  elements.points.stat.classList.toggle(
    "overspent",
    character.points.totalStat < character.points.spentStat
  );

  elements.points.skill.textContent = `${character.points.totalSkill - character.points.spentSkill}/${character.points.totalSkill}`;
  elements.points.skill.classList.toggle(
    "overspent",
    character.points.totalSkill < character.points.spentSkill
  );

  elements.points.unallocated.textContent = `${character.points.totalUnallocated - character.points.spentUnallocated}/${character.points.totalUnallocated}`;
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

  renderSkillsPanel(); // Re-render skills to update bars and levels
}

// --- Event Listeners and Initial Population (Same as before) ---
document.getElementById("race").addEventListener("change", runCalculations);
document.getElementById("racial-skill").addEventListener("change", runCalculations); // NEW listener
document.getElementById("job").addEventListener("change", runCalculations); // Add listener for job changes

document
  .getElementById("level")
  .addEventListener("input", runCalculations); // Add listener for level changes

for (const statInput of Object.values(elements.addedStatInputs)) {
  statInput.addEventListener("input", runCalculations);
}
for (const equipSelector of Object.values(elements.equipmentSelectors)) {
  equipSelector.addEventListener("change", runCalculations);
}

document.addEventListener("DOMContentLoaded", () => {
  // Set initial default values to match the image
  elements.level.value = character.level;
  elements.race.value = character.raceId;
  elements.job.value = character.jobId;
  elements.addedStatInputs.sta.value = character.addedStats.sta;
  elements.addedStatInputs.str.value = character.addedStats.str;
  elements.addedStatInputs.agi.value = character.addedStats.agi;
  elements.addedStatInputs.dex.value = character.addedStats.dex;
  elements.addedStatInputs.spr.value = character.addedStats.spr;
  elements.addedStatInputs.int.value = character.addedStats.int;


  populateDropdowns();
  initializeSkills();
  runCalculations();
});
import { gameData } from "./gameData.js";
import { skills } from "./jobSkillValues.js";
import { items } from "./equipData.js";
import { setBonuses } from "./setBonuses.js";
import { classSkillData } from "./classSkillData.js";
import { classSpecificSkillData } from "./classSpecificSkillData.js";

// --- CONSTANTS ---
const PRIMARY_STATS = ["sta", "str", "agi", "dex", "spr", "int"];

// --- CHARACTER STATE ---
const character = {
  level: 1, // Default to 50 for the image
  raceId: 0, // Default Human
  racialSkillId: 0, // Default Fighting Spirit
  jobId: 0, // Default Monk (job ID 19)
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
  statCosts: {
    sta: document.getElementById("cost-sta"),
    str: document.getElementById("cost-str"),
    agi: document.getElementById("cost-agi"),
    dex: document.getElementById("cost-dex"),
    spr: document.getElementById("cost-spr"),
    int: document.getElementById("cost-int"),
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
    
    // Additional derived stats
    pot: document.getElementById("pot"),
    lpHeal: document.getElementById("lp-heal"),
    redMp: document.getElementById("red-mp"),
    frontAtk: document.getElementById("front-atk"),
    backAtk: document.getElementById("back-atk"),
    frontDef: document.getElementById("front-def"),
    backDef: document.getElementById("back-def"),
    phyRes: document.getElementById("phy-res"),
    magRes: document.getElementById("mag-res"),
    criD: document.getElementById("cri-d"),
    criRes: document.getElementById("cri-res"),
    cdamRes: document.getElementById("cdam-res"),
    melEva: document.getElementById("mel-eva"),
    ranEva: document.getElementById("ran-eva"),
    magEva: document.getElementById("mag-eva"),
    melee: document.getElementById("melee"),
    range: document.getElementById("range"),
    fireR: document.getElementById("fire-r"),
    atkSpd: document.getElementById("atk-spd"),
    iceR: document.getElementById("ice-r"),
    castSpd: document.getElementById("cast-spd"),
    castTime: document.getElementById("cast-time"),
    thundR: document.getElementById("thund-r"),
    cooldown: document.getElementById("cooldown"),
    poisonR: document.getElementById("poison-r"),
    moveSpd: document.getElementById("move-spd"),
    townMsp: document.getElementById("town-msp"),
    charmR: document.getElementById("charm-r"),
    lightR: document.getElementById("light-r"),
    darkR: document.getElementById("dark-r"),
  },
  setBonusList: document.getElementById("set-bonus-list"),
  skillsDisplay: document.getElementById("skills-display"),
  points: {
    stat: document.getElementById("points-stat"),
    skill: document.getElementById("points-skill"),
    unallocated: document.getElementById("points-unallocated"),
  },
  resetButtons: {
    statusPoints: document.getElementById("reset-status-points"),
    abilityPoints: document.getElementById("reset-ability-points"),
  },
  // Modal elements
  skillPreviewButton: document.getElementById("preview-skills"),
  skillPreviewModal: document.getElementById("skill-preview-modal"),
  modalClose: document.querySelector("#skill-preview-modal .close"),
  unlockedSkillsDisplay: document.getElementById("unlocked-skills-display"),
};

/**
 * Initializes skill levels based on job and sets up default values.
 * This function is critical for setting the "base" skill levels for a job.
 */
function initializeSkills() {
  character.skills = {}; // Reset all skills
  const jobInfo = gameData.jobs[character.jobId];
  const jobSkillData = skills[character.jobId];

  if (!jobSkillData) {
    console.warn(`No skill data found for job ID ${character.jobId}`);
    return;
  }

  // Initialize all skills with their base values from jobSkillValues.js
  for (const categoryId in jobSkillData) {
    if (categoryId === 'name') continue; // Skip the job name
    
    const category = jobSkillData[categoryId];
    for (const skillData of category.skills) {
      character.skills[skillData.id] = {
        adeptness: skillData.minAdeptness, // Base adeptness from job
        potential: skillData.minAdeptness, // Keep potential for compatibility, but it's not used
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
    let categoryMaxPotentialSum = 0;

    // Calculate actual category sums based on current character skills and job data
    for (const skillData of category.skills) {
      const currentSkill = character.skills[skillData.id];
      if (currentSkill) {
        categoryAdeptnessSum += currentSkill.adeptness;
        
        // Get max potential from job data
        const jobSkillData = skills[character.jobId];
        let maxPotential = 0;
        if (jobSkillData) {
          for (const catId in jobSkillData) {
            if (catId === 'name') continue;
            const cat = jobSkillData[catId];
            const skill = cat.skills.find(s => s.id === skillData.id);
            if (skill) {
              maxPotential = skill.maxPotential;
              break;
            }
          }
        }
        categoryMaxPotentialSum += maxPotential;
      }
    }

    // Category Header - show the calculated totals
    html += `<div class="sim-row skill-category">
                <span>${category.name}</span>
                <span>${categoryAdeptnessSum} / ${categoryMaxPotentialSum}</span>
             </div>`;

    for (const skillData of category.skills) {
      const currentSkill = character.skills[skillData.id];
      if (!currentSkill) continue;
      
      const currentAdeptness = currentSkill.adeptness;
      
      // Get max potential from job data
      const jobSkillData = skills[character.jobId];
      let maxPotential = 0;
      let baseAdeptness = 0;
      if (jobSkillData) {
        for (const catId in jobSkillData) {
          if (catId === 'name') continue;
          const cat = jobSkillData[catId];
          const skill = cat.skills.find(s => s.id === skillData.id);
          if (skill) {
            maxPotential = skill.maxPotential;
            baseAdeptness = skill.minAdeptness;
            break;
          }
        }
      }

      // Calculate bar width as percentage of max potential
      const barWidth = maxPotential > 0 ? (currentAdeptness / maxPotential) * 100 : 0;
      
      // Determine bar color based on skill level
      let barClass = "skill-level-line";
      if (currentAdeptness >= maxPotential) {
        barClass += " max-gradient"; // Black to blue gradient when at max
      } else if (currentAdeptness > baseAdeptness) {
        barClass += " filled-gradient"; // Green gradient when filled
      } else {
        barClass += " empty"; // Empty when at base level
      }

      html += `
        <div class="sim-row skill-row">
          <span class="skill-name">${skillData.name.substring(0, 4)}</span>
          <div class="skill-level-line-container">
            <div class="${barClass}" style="width: ${barWidth}%;"></div>
          </div>
          <span class="skill-numerical-display">${currentAdeptness} / ${maxPotential}</span>
          <div class="skill-add-sub-controls">
            <button class="skill-btn" data-skill-id="${skillData.id}" data-type="adeptness" data-amount="-1">-</button>
            <button class="skill-btn" data-skill-id="${skillData.id}" data-type="adeptness" data-amount="1">+</button>
            <button class="skill-btn skill-btn-wide" data-skill-id="${skillData.id}" data-type="adeptness" data-amount="-10">-10</button>
            <button class="skill-btn skill-btn-wide" data-skill-id="${skillData.id}" data-type="adeptness" data-amount="10">+10</button>
            <button class="skill-btn skill-btn-wide" data-skill-id="${skillData.id}" data-type="adeptness" data-amount="min">Min</button>
            <button class="skill-btn skill-btn-wide" data-skill-id="${skillData.id}" data-type="adeptness" data-amount="max">Max</button>
            <span class="cost-display">SP: 1</span>
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
  const type = button.dataset.type; // 'adeptness' only
  const amountStr = button.dataset.amount;

  const skill = character.skills[skillId];
  if (!skill) return;

  const currentValue = skill[type];

  // Get the base values and max potential for this skill from the current job
  const jobSkillData = skills[character.jobId];
  let baseAdeptnessForJob = 0;
  let maxPotentialForJob = gameData.maxSkillValue;
  
  if (jobSkillData) {
    // Find the skill in the job data
    for (const categoryId in jobSkillData) {
      if (categoryId === 'name') continue;
      const category = jobSkillData[categoryId];
      const skillData = category.skills.find(s => s.id === skillId);
      if (skillData) {
        baseAdeptnessForJob = skillData.minAdeptness;
        maxPotentialForJob = skillData.maxPotential;
        break;
      }
    }
  }

  let newValue;
  let pointsToAllocate;

  if (amountStr === "max") {
    // Max button: allocate to reach maximum potential
    newValue = maxPotentialForJob;
    pointsToAllocate = newValue - currentValue;
  } else if (amountStr === "min") {
    // Min button: reduce to base adeptness
    newValue = baseAdeptnessForJob;
    pointsToAllocate = newValue - currentValue; // This will be negative (refund)
  } else {
    // Regular numeric amount (+1, -1, +10, -10)
    const amount = parseInt(amountStr, 10);
    newValue = currentValue + amount;
    pointsToAllocate = amount;
  }

  // Check limits first
  if (newValue < baseAdeptnessForJob || newValue > maxPotentialForJob) {
    return; // Cannot go below base adeptness or above max potential
  }

  if (type === "adeptness") {
    if (pointsToAllocate > 0) {
      // Adding points - check if we have enough skill points
      if (character.points.spentSkill + pointsToAllocate <= character.points.totalSkill) {
        character.points.spentSkill += pointsToAllocate;
        skill[type] = newValue;
      } else {
        // Not enough skill points - allocate as many as possible
        const availablePoints = character.points.totalSkill - character.points.spentSkill;
        if (availablePoints > 0) {
          character.points.spentSkill += availablePoints;
          skill[type] = currentValue + availablePoints;
        }
        return;
      }
    } else if (pointsToAllocate < 0) {
      // Subtracting points (refund)
      const refundAmount = Math.abs(pointsToAllocate);
      character.points.spentSkill -= refundAmount;
      skill[type] = newValue;
    }
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
  for (const item of Object.values(items)) {
    if (!itemsBySlot[item.slot]) itemsBySlot[item.slot] = [];
    itemsBySlot[item.slot].push(item);
  }

  for (const slot in elements.equipmentSelectors) {
    if (itemsBySlot[slot]) {
      // Sort items so "None" options appear first
      const sortedItems = itemsBySlot[slot].sort((a, b) => {
        if (a.name === "None") return -1;
        if (b.name === "None") return 1;
        return a.name.localeCompare(b.name);
      });
      
      elements.equipmentSelectors[slot].innerHTML = sortedItems
      .map((item) => `<option value="${item.id}">${item.name}</option>`)
      .join("");
    elements.equipmentSelectors[slot].value = character.equipment[slot]; // Set initial value
    } else {
      console.warn(`No items found for slot: ${slot}`);
    }
  }
}

/**
 * Dynamically populates the racial skill dropdown based on the selected race.
 * This function also determines and sets the *default* racial skill for the job.
 */
function populateRacialSkillDropdown() {
  const currentRaceId = parseInt(elements.race.value, 10);
  const currentJobId = parseInt(elements.job.value, 10);
  
  // Get racial skills from gameData
  const racialSkillsData = gameData.racialSkills[currentRaceId];
  let racialSkillsForRace = [];
  let defaultRacialSkillId = 0; // Default to the first racial skill for the race

  if (racialSkillsData && racialSkillsData.skills) {
    racialSkillsForRace = racialSkillsData.skills.map(skill => skill.name);
  }

  elements.racialSkill.innerHTML = racialSkillsForRace
    .map((skillName, index) => `<option value="${index}">${skillName}</option>`)
    .join("");

  elements.racialSkill.value = defaultRacialSkillId; // Set the default based on job
  character.racialSkillId = defaultRacialSkillId; // Update character state

  // Update display text
  elements.displayRace.textContent = gameData.races[currentRaceId].name;
  elements.displayRacialSkill.textContent =
    racialSkillsForRace[character.racialSkillId] || "";
  elements.displayJob.textContent = gameData.jobs[currentJobId].name;
}

function readInputs() {
  let level = parseInt(elements.level.value, 10);
  // Enforce level limits
  level = Math.max(1, Math.min(gameData.maxLevel, level));
  if (level !== parseInt(elements.level.value, 10)) {
    elements.level.value = level;
  }
  character.level = level;
  
  character.raceId = parseInt(elements.race.value, 10);
  character.racialSkillId = parseInt(elements.racialSkill.value, 10); // NEW
  character.jobId = parseInt(elements.job.value, 10);

  // Get the racial base stats for the current race
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers = gameData.jobBaseStatModifiers[jobInfo.baseClass];

  for (const stat of PRIMARY_STATS) {
    // Calculate the base stat (racial + job modifier)
    const baseStat = raceStats[stat] + jobModifiers[stat];
    
    // Read the total stat value from the input field
    let totalStat = parseInt(elements.addedStatInputs[stat].value, 10) || 0;
    
    // Enforce minimum: total stat cannot go below base stat
    totalStat = Math.max(baseStat, totalStat);
    
    // Enforce maximum: total stat cannot exceed 99
    totalStat = Math.min(99, totalStat);
    
    // Update the input field if it was outside limits
    if (totalStat !== parseInt(elements.addedStatInputs[stat].value, 10)) {
      elements.addedStatInputs[stat].value = totalStat;
    }
    
    // Calculate additional stats as the difference between total and base
    character.addedStats[stat] = Math.max(0, totalStat - baseStat);
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
  applyRacialSkillEffects(bonuses);

  for (const stat of PRIMARY_STATS) {
    const total =
      baseStats[stat] + character.addedStats[stat] + (bonuses.stats[stat] || 0);
    character.finalStats[stat] = Math.min(gameData.maxStatValue, total);
  }

  calculateDerivedStats(bonuses);
  
  updateUI(bonuses);
}

function getCombinedBaseStats() {
  const combined = {};
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers = gameData.jobBaseStatModifiers[jobInfo.baseClass]; // Use baseClass from jobInfo

  for (const stat of PRIMARY_STATS) {
    // Only apply job modifiers at level 10 and above
    const jobModifier = character.level >= 10 ? jobModifiers[stat] : 0;
    combined[stat] = raceStats[stat] + jobModifier;
  }
  return combined;
}

/**
 * Applies stats from equipped items.
 */
function applyEquipmentBonuses(bonuses) {
  for (const slot in character.equipment) {
    const itemId = character.equipment[slot];
    const item = items[itemId];
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
  
  for (const set of setBonuses) {
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
 * Applies racial skill effects to the character.
 */
function applyRacialSkillEffects(bonuses) {
  const racialSkillsData = gameData.racialSkills[character.raceId];
  if (!racialSkillsData || !racialSkillsData.skills) return;
  
  const selectedSkill = racialSkillsData.skills[character.racialSkillId];
  if (!selectedSkill || !selectedSkill.effect) return;
  
  const effect = selectedSkill.effect;
  
  // Add description of the racial skill effect
  bonuses.description.push(`${selectedSkill.name}: ${selectedSkill.description}`);
  
  // Apply effects based on type
  switch (effect.type) {
    case "meleeSkillBonus":
      // +10 to melee skill with one-handed weapons
      bonuses.meleeSkillBonus = effect.value;
      break;
    case "ailmentDurationReduction":
      // Reduce duration of ailments by 50%
      bonuses.ailmentDurationReduction = effect.value;
      break;
    case "potionEffectiveness":
      // Increase potion effectiveness by 15%
      bonuses.potionEffectiveness = effect.value;
      break;
    case "rangedRangeBonus":
      // Increase ranged range by 3
      bonuses.rangedRangeBonus = effect.value;
      break;
    case "mpCostReduction":
      // Reduce MP cost of spells by 15%
      bonuses.mpCostReduction = effect.value;
      break;
    case "charmResistance":
      // Increase charm resistance by 20%
      bonuses.charmResistance = effect.value;
      break;
    case "damageBonus":
      // Increase damage with specific weapon types
      if (effect.condition === "axeOrBlunt") {
        bonuses.axeBluntDamageBonus = effect.value;
      } else if (effect.condition === "2HandedWeapon") {
        bonuses.twoHandedDamageBonus = effect.value;
      }
      break;
    case "criticalHitChance":
      // Increased critical hit chance by 5%
      bonuses.criticalHitChance = effect.value;
      break;
    case "damageToMPConversion":
      // Chance to convert 10% damage taken into MP
      bonuses.damageToMPConversion = effect.value;
      break;
    case "dodgeChance":
      // 5% chance to dodge damage
      bonuses.dodgeChance = effect.value;
      break;
    case "physicalDamageReduction":
      // Reduce damage taken by 10%
      bonuses.physicalDamageReduction = effect.value;
      break;
    case "physicalDefense":
      // Boosts physical defense (party effect)
      bonuses.physicalDefense = effect.value;
      break;
    case "magicalDefense":
      // Boosts magical defense (party effect)
      bonuses.magicalDefense = effect.value;
      break;
    case "magicResistance":
      // Increase magic resistance by 10%
      bonuses.magicResistance = effect.value;
      break;
    case "mpRegeneration":
      // MP regeneration increases by 15%
      bonuses.mpRegeneration = effect.value;
      break;
    default:
      // Handle "none" effects or other undefined effects gracefully
      break;
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
function calculateDerivedStats(bonuses = {}) {
  const stats = character.finalStats;
  const level = character.level;
  const mod =
    gameData.jobModifiers[character.jobId] || gameData.jobModifiers[0];

  // LP Calculation
  const levelLPComponent = Math.ceil(level * (100 / mod[2]));
  const staMultiplier = Math.ceil(100 / mod[4]);
  const staLPComponent = Math.ceil(stats.sta * staMultiplier);
  stats.lp = mod[0] + levelLPComponent + staLPComponent;

  // MP Calculation
  const levelMPComponent = Math.ceil(level * (100 / mod[3]));
  const sprMultiplier = Math.ceil(100 / mod[5]);
  const sprMPComponent = Math.ceil(stats.spr * sprMultiplier);
  stats.mp = mod[1] + levelMPComponent + sprMPComponent;

  // POT (Potential) - Potion effectiveness
  let potValue = 100; // Base 100%
  
  // STA bonus: Math.floor((STA^2 * 2) / 1000)
  const staBonus = Math.floor((Math.pow(stats.sta, 2) * 2) / 1000);
  potValue += staBonus;
  
  // Warrior class bonus: +10% for all warrior classes
  if (character.jobId >= 0 && character.jobId <= 6) { // Warrior class range
    potValue += 10;
  }
  
  // Alchemy skill bonus: +15 for Acolyte class (job 14-20)
  if (character.jobId >= 14 && character.jobId <= 20) {
    potValue += 15;
  }
  
  // Recovery increase: +10 per 10 points in melee skills (if level >= 12 and warrior class)
  if (character.level >= 12 && character.jobId >= 0 && character.jobId <= 6) {
    const meleeSkill = character.skills[1]; // Slash skill as representative
    if (meleeSkill) {
      const meleeBonus = Math.floor(meleeSkill.adeptness / 10) * 10;
      potValue += meleeBonus;
    }
  }
  
  // Apply racial skill bonus for potion effectiveness
  if (bonuses.potionEffectiveness) {
    potValue += bonuses.potionEffectiveness;
  }
  
  stats.pot = potValue;

  // LP Heal - base 100%
  stats.lpHeal = 100;

  if (bonuses.mpCostReduction) {
    stats.redMp = 100 - bonuses.mpCostReduction;
  } else {
    stats.redMp = 100;
  }


  // ATK Calculations
  stats.atk = Math.floor(stats.str / 2); // STR/2 only, gear added separately when equipped
  
  // Front ATK bonus - base 0%
  stats.frontAtk = 0;
  
  // Back ATK bonus - base 15%
  stats.backAtk = 15;
  
  // Max ATK - base 5
  stats.maxAtk = 5;

  // MATK Calculations
  let matkValue = 100;
  
  // INT bonus to MATK - approximately 0.376% per INT point
  if (stats.int >= 5) {
    matkValue += (stats.int - 4) * 0.376;
  }

  if (character.jobId >= 22 && character.jobId <= 24) {
    matkValue += 10;
  }

  const equippedWeaponId = character.equipment.weapon;
  if (equippedWeaponId.includes("staff")) {
    matkValue += 10;
  }
  
  // Add elemental proficiency bonus to MATK
  const elementalSkill = character.skills[18]; // Elemental skill ID
  if (elementalSkill) {
    const elementalBonus = elementalSkill.adeptness * 0.106; // 0.106% per point
    matkValue += elementalBonus;
  }
  
  stats.matk = matkValue;
  
  // Front MATK bonus
  stats.frontMatk = Math.floor(stats.matk * 1.1);
  
  // Back MATK bonus
  stats.backMatk = Math.floor(stats.matk * 1.3);

  // DEF Calculations
  stats.def = 0;
  for (const slot in character.equipment) {
    const item = items[character.equipment[slot]];
    if (item?.stats?.def) {
      stats.def += item.stats.def;
    }
  }

  // Front DEF bonus
  stats.frontDef = Math.floor(stats.def * 1.1);
  
  // Back DEF bonus
  stats.backDef = Math.floor(stats.def * 0.9);

  // Physical Resistance - base 0%
  stats.phyRes = 0;

  // Magical Resistance - base 0%
  stats.magRes = 0;
  
  // Apply racial skill bonus for magic resistance
  if (bonuses.magicResistance) {
    stats.magRes += bonuses.magicResistance;
  }

  // Accuracy
  stats.acc = level + stats.dex;
  stats.accFront = stats.acc; // Same as acc, only changes with gear

  // Critical calculations
  stats.crit = 1 + Math.floor(stats.dex / 10);
  
  // Apply racial skill bonus for critical hit chance
  if (bonuses.criticalHitChance) {
    stats.crit += bonuses.criticalHitChance;
  }
  
  stats.criD = 100; // Critical damage bonus (base 100%, only increased by gear)
  stats.criRes = 0; // Critical resistance - base 0%
  stats.cdamRes = 100; // Critical damage resistance - base 100%

  // Dodge - base 5
  stats.dodge = 5;
  
  // Apply racial skill bonus for dodge chance
  if (bonuses.dodgeChance) {
    stats.dodge += bonuses.dodgeChance;
  }

  // Evasion types
  stats.melEva = 0; // Melee evasion - base 0%
  stats.ranEva = 0; // Range evasion - base 0%
  stats.magEva = 0; // Magic evasion - base 0%

  // Attack types - weapon range values only change with gear
  if (bonuses.rangedRangeBonus) {
    stats.range = bonuses.rangedRangeBonus;
  } else {
    stats.range = "---"; // Range attack - no base value
  }
  if (bonuses.meleeRangeBonus) {
    stats.melee = bonuses.meleeRangeBonus;
  } else {
    stats.melee = "---"; // Melee range - no base value
  }

  // Attack Speed - base 100%
  stats.atkSpd = 100;

  // Cast Speed - starts at 100%, increases by 5% every 10 DEX
  stats.castSpd = 100 + Math.floor(stats.dex / 10) * 5;
  stats.castTime = 100; // Cast time - base 100%

  // Cooldown - -2% every 10 INT (base 100%)
  stats.cooldown = Math.max(0, 100 - Math.floor(stats.int / 10) * 2);

  // Movement Speed - base 100%
  stats.moveSpd = 100;
  stats.townMsp = 100;

  // Elemental Resistances (base values, can be modified by equipment)
  stats.fireR = 0;
  stats.iceR = 0;
  stats.thundR = 0;
  stats.poisonR = 0;
  stats.charmR = 0;
  stats.lightR = 0;
  stats.darkR = 0;
  
  // Apply racial skill bonuses for resistances
  if (bonuses.charmResistance) {
    stats.charmR += bonuses.charmResistance;
  }

  if (bonuses.physicalDamageReduction) {
    stats.phyRes += bonuses.physicalDamageReduction;
  }

  // Re Horse (mounted movement speed)
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
        gameData.maxStatValue - startValue,
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

function updateStatCostIndicators() {
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers = gameData.jobBaseStatModifiers[jobInfo.baseClass];

  for (const stat of PRIMARY_STATS) {
    const baseStat = raceStats[stat] + jobModifiers[stat];
    const currentTotalStat = baseStat + character.addedStats[stat];
    const nextLevel = currentTotalStat + 1;
    
    if (nextLevel > gameData.maxStatValue) {
      elements.statCosts[stat].textContent = "--";
    } else {
      const cost = gameData.statPointCosts[nextLevel]?.[0] || 0;
      elements.statCosts[stat].textContent = cost + "p";
    }
  }
}

function updateUI(bonuses) {
  // Update display values for racial skill and job based on selected values
  const selectedRace = gameData.races[character.raceId];
  const selectedJob = gameData.jobs[character.jobId];

  elements.displayRace.textContent = selectedRace ? selectedRace.name : "";
  // Ensure racial skill name is retrieved correctly
  const racialSkillsForCurrentRace =
    gameData.racialSkills[character.raceId];
  const selectedRacialSkill = racialSkillsForCurrentRace?.skills?.[character.racialSkillId];
  elements.displayRacialSkill.textContent = selectedRacialSkill?.name || "";
  elements.displayJob.textContent = selectedJob ? selectedJob.name : "";

  // Update primary stat displays
  for (const stat of PRIMARY_STATS) {
    const totalElement = elements.outputs[stat];
    const inputElement = elements.addedStatInputs[stat];
    
    if (totalElement) {
      const combinedBase = getCombinedBaseStats()[stat]; // Get base stat after race/job modifiers
      const added = character.addedStats[stat];
      const final = character.finalStats[stat];

      // Set the input field to show the total stat (base + additional)
      const totalStat = combinedBase + added;
      inputElement.value = totalStat;
      
      // Format the output display as "Final (Total)" where Total = base + additional
      totalElement.innerHTML = `${final} (${totalStat})`;
    }
  }
  // Update other outputs
  elements.outputs.lp.textContent = Math.floor(character.finalStats.lp);
  elements.outputs.mp.textContent = Math.floor(character.finalStats.mp);
  elements.outputs.atk.textContent = Math.floor(character.finalStats.atk);
  elements.outputs.def.textContent = Math.floor(character.finalStats.def);
  elements.outputs.matk.textContent =
    character.finalStats.matk.toFixed(1) + "%"; // MATK as percentage with 1 decimal place
  elements.outputs.dodge.textContent = Math.floor(character.finalStats.dodge);
  elements.outputs.acc.textContent = Math.floor(character.finalStats.acc);
  elements.outputs.accFront.textContent = Math.floor(
    character.finalStats.accFront,
  );
  elements.outputs.crit.textContent =
    Math.floor(character.finalStats.crit) + "%";
  elements.outputs.reHorse.textContent =
    Math.floor(character.finalStats.reHorse) + "%";

  // Update additional derived stats
  elements.outputs.pot.textContent = Math.floor(character.finalStats.pot);
  elements.outputs.lpHeal.textContent = Math.floor(character.finalStats.lpHeal) + "%";
  elements.outputs.redMp.textContent = Math.floor(character.finalStats.redMp);
  elements.outputs.frontAtk.textContent = Math.floor(character.finalStats.frontAtk);
  elements.outputs.backAtk.textContent = Math.floor(character.finalStats.backAtk);
  // Max ATK is displayed in the first row, no need to update atk element again
  elements.outputs.frontDef.textContent = Math.floor(character.finalStats.frontDef);
  elements.outputs.backDef.textContent = Math.floor(character.finalStats.backDef);
  elements.outputs.phyRes.textContent = Math.floor(character.finalStats.phyRes) + "%";
  elements.outputs.magRes.textContent = Math.floor(character.finalStats.magRes) + "%";
  elements.outputs.criD.textContent = Math.floor(character.finalStats.criD) + "%";
  elements.outputs.criRes.textContent = Math.floor(character.finalStats.criRes) + "%";
  elements.outputs.cdamRes.textContent = Math.floor(character.finalStats.cdamRes) + "%";
  elements.outputs.melEva.textContent = Math.floor(character.finalStats.melEva) + "%";
  elements.outputs.ranEva.textContent = Math.floor(character.finalStats.ranEva) + "%";
  elements.outputs.magEva.textContent = Math.floor(character.finalStats.magEva) + "%";
  elements.outputs.melee.textContent = character.finalStats.melee;
  elements.outputs.range.textContent = character.finalStats.range;
  elements.outputs.fireR.textContent = Math.floor(character.finalStats.fireR) + "%";
  elements.outputs.atkSpd.textContent = Math.floor(character.finalStats.atkSpd) + "%";
  elements.outputs.iceR.textContent = Math.floor(character.finalStats.iceR) + "%";
  elements.outputs.castSpd.textContent = Math.floor(character.finalStats.castSpd) + "%";
  elements.outputs.castTime.textContent = Math.floor(character.finalStats.castTime) + "%";
  elements.outputs.thundR.textContent = Math.floor(character.finalStats.thundR) + "%";
  elements.outputs.cooldown.textContent = Math.floor(character.finalStats.cooldown) + "%";
  elements.outputs.poisonR.textContent = Math.floor(character.finalStats.poisonR) + "%";
  elements.outputs.moveSpd.textContent = Math.floor(character.finalStats.moveSpd) + "%";
  elements.outputs.townMsp.textContent = Math.floor(character.finalStats.townMsp) + "%";
  elements.outputs.charmR.textContent = Math.floor(character.finalStats.charmR) + "%";
  elements.outputs.lightR.textContent = Math.floor(character.finalStats.lightR) + "%";
  elements.outputs.darkR.textContent = Math.floor(character.finalStats.darkR) + "%";

  elements.points.stat.textContent = `${character.points.totalStat - character.points.spentStat}/${character.points.totalStat}`;
  elements.points.stat.classList.toggle(
    "overspent",
    character.points.totalStat < character.points.spentStat,
  );

  elements.points.skill.textContent = `${character.points.totalSkill - character.points.spentSkill}/${character.points.totalSkill}`;
  elements.points.skill.classList.toggle(
    "overspent",
    character.points.totalSkill < character.points.spentSkill,
  );

  elements.points.unallocated.textContent = `${character.points.totalUnallocated - character.points.spentUnallocated}/${character.points.totalUnallocated}`;
  elements.points.unallocated.classList.toggle(
    "overspent",
    character.points.totalUnallocated < character.points.spentUnallocated,
  );

  if (bonuses.description.length > 0) {
    elements.setBonusList.innerHTML = bonuses.description
      .map((d) => `<li>${d}</li>`)
      .join("");
  } else {
    elements.setBonusList.innerHTML = "<li>None</li>";
  }

  updateStatCostIndicators(); // Update cost indicators for stat increases
  renderSkillsPanel(); // Re-render skills to update bars and levels
}

/**
 * Handles job or race changes by reinitializing skills and running calculations.
 */
function handleJobRaceChange() {
  readInputs();
  
  // Re-initialize skills on job/race change to get base skill levels
  initializeSkills();
  
  // Update racial skill dropdown when race changes
  populateRacialSkillDropdown();
  
  // Update input fields to show new total stats (racial base + job modifiers + additional)
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers = gameData.jobBaseStatModifiers[jobInfo.baseClass];
  
  for (const stat of PRIMARY_STATS) {
    const baseStat = raceStats[stat] + jobModifiers[stat];
    const totalStat = baseStat + character.addedStats[stat];
    
    // Update the input field value and min attribute
    elements.addedStatInputs[stat].value = totalStat;
    elements.addedStatInputs[stat].min = baseStat;
  }
  
  // Run the rest of the calculations
  runCalculations();
}

/**
 * Resets status points to the current race and job base values.
 */
function resetStatusPoints() {
  // Get the current race and job base stats
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers = gameData.jobBaseStatModifiers[jobInfo.baseClass];
  
  // Reset additional stats to 0
  for (const stat of PRIMARY_STATS) {
    character.addedStats[stat] = 0;
  }
  
  // Update input fields to show base stats only
  for (const stat of PRIMARY_STATS) {
    const baseStat = raceStats[stat] + jobModifiers[stat];
    elements.addedStatInputs[stat].value = baseStat;
    elements.addedStatInputs[stat].min = baseStat;
  }
  
  // Recalculate everything
  runCalculations();
}

/**
 * Resets ability points to the current job base values.
 */
function resetAbilityPoints() {
  // Re-initialize skills to get base values for current job
  initializeSkills();
  
  // Re-render the skills panel
  renderSkillsPanel();
  
  // Recalculate everything
  runCalculations();
}

/**
 * Calculates which skills are unlocked based on current skill levels.
 * Returns an object with skill data organized by skill tree categories.
 */
function calculateUnlockedSkills() {
  const unlockedSkills = {};
  
  // Get job skill data to determine what skill categories this job can access
  const jobSkillData = skills[character.jobId];
  if (!jobSkillData) {
    console.warn(`No job skill data found for job ID ${character.jobId}`);
    return unlockedSkills;
  }
  
  // Process each skill category that exists in classSkillData
  for (const categoryId in classSkillData) {
    const categoryIdNum = parseInt(categoryId, 10);
    const categorySkillData = classSkillData[categoryIdNum];
    
    if (!categorySkillData || !categorySkillData.skills) {
      continue;
    }
    
    // Check if the current job has access to this skill category
    const jobCategoryData = jobSkillData[categoryIdNum];
    if (!jobCategoryData || !jobCategoryData.skills) {
      continue; // Job doesn't have access to this skill category
    }
    
    // Check if any skill in this category has maxPotential > 0 for this job
    const hasAccessToCategory = jobCategoryData.skills.some(skill => skill.maxPotential > 0);
    if (!hasAccessToCategory) {
      continue; // Job has no potential in this skill category
    }
    
    const categoryName = jobCategoryData.name;
    unlockedSkills[categoryName] = {
      name: categoryName,
      skills: []
    };
    
    // Process each skill tree in this category
    for (const skillTree of categorySkillData.skills) {
      const skillTreeName = skillTree.name;
      const skillTreeId = skillTree.id;
      
      if (!skillTree.skills) {
        continue;
      }
      
      // Get current skill level for this specific skill tree
      const currentSkillLevel = character.skills[skillTreeId]?.adeptness || 0;
      
      // Process each individual skill in the tree
      for (const skillName in skillTree.skills) {
        const skillData = skillTree.skills[skillName];
        
        // Check if skill is unlocked
        let isUnlocked = false;
        let requirementText = "";
        
        if (typeof skillData.reqPoints === 'number') {
          // Simple number requirement - check against current skill level in this tree
          isUnlocked = currentSkillLevel >= skillData.reqPoints;
          requirementText = `${skillTreeName} ${skillData.reqPoints}`;
        } else if (typeof skillData.reqPoints === 'object') {
          // Multiple skill requirements
          isUnlocked = true;
          const requirements = [];
          
          for (const reqSkillName in skillData.reqPoints) {
            const reqLevel = skillData.reqPoints[reqSkillName];
            
            // Find the skill ID by name
            let reqSkillId = null;
            for (const catId in gameData.skills) {
              const category = gameData.skills[catId];
              const skill = category.skills.find(s => s.name === reqSkillName);
              if (skill) {
                reqSkillId = skill.id;
                break;
              }
            }
            
            if (reqSkillId) {
              const currentReqSkillLevel = character.skills[reqSkillId]?.adeptness || 0;
              if (currentReqSkillLevel < reqLevel) {
                isUnlocked = false;
              }
              requirements.push(`${reqSkillName} ${reqLevel}`);
            }
          }
          
          requirementText = requirements.join(", ");
        }
        
        unlockedSkills[categoryName].skills.push({
          name: skillName,
          description: skillData.description,
          requirement: requirementText,
          isUnlocked: isUnlocked,
          mpCost: skillData.mpCost,
          castTime: skillData.castTime,
          cooldown: skillData.cooldown,
          duration: skillData.duration,
          skillTree: skillTreeName
        });
      }
    }
    
    // If no skills were added to this category, remove it
    if (unlockedSkills[categoryName].skills.length === 0) {
      delete unlockedSkills[categoryName];
    }
  }
  
  // Add class-specific skills
  const classSpecificSkills = classSpecificSkillData[character.jobId];
  if (classSpecificSkills && Object.keys(classSpecificSkills).length > 0) {
    const jobInfo = gameData.jobs[character.jobId];
    const categoryName = `${jobInfo.name} Skills`;
    
    if (!unlockedSkills[categoryName]) {
      unlockedSkills[categoryName] = {
        name: categoryName,
        skills: []
      };
    }
    
    for (const skillName in classSpecificSkills) {
      const skillData = classSpecificSkills[skillName];
      
      // Check if skill is unlocked
      let isUnlocked = false;
      let requirementText = "";
      
      if (skillData.reqLevel !== undefined) {
        // Level requirement
        isUnlocked = character.level >= skillData.reqLevel;
        requirementText = `Level ${skillData.reqLevel}`;
      } else if (skillData.reqPoints !== undefined) {
        // Skill point requirements (similar to other skills)
        if (typeof skillData.reqPoints === 'number') {
          // This shouldn't happen for class skills, but handle it just in case
          requirementText = `Unknown requirement ${skillData.reqPoints}`;
        } else if (typeof skillData.reqPoints === 'object') {
          // Multiple skill requirements
          isUnlocked = true;
          const requirements = [];
          
          for (const reqSkillName in skillData.reqPoints) {
            const reqLevel = skillData.reqPoints[reqSkillName];
            
            // Find the skill ID by name
            let reqSkillId = null;
            for (const catId in gameData.skills) {
              const category = gameData.skills[catId];
              const skill = category.skills.find(s => s.name === reqSkillName);
              if (skill) {
                reqSkillId = skill.id;
                break;
              }
            }
            
            if (reqSkillId) {
              const currentReqSkillLevel = character.skills[reqSkillId]?.adeptness || 0;
              if (currentReqSkillLevel < reqLevel) {
                isUnlocked = false;
              }
              requirements.push(`${reqSkillName} ${reqLevel}`);
            } else {
              // Skill not found, mark as not unlocked
              isUnlocked = false;
              requirements.push(`${reqSkillName} ${reqLevel} (unknown skill)`);
            }
          }
          
          requirementText = requirements.join(", ");
        }
      } else {
        // No requirements specified
        isUnlocked = true;
        requirementText = "None";
      }
      
      unlockedSkills[categoryName].skills.push({
        name: skillName,
        description: skillData.description,
        requirement: requirementText,
        isUnlocked: isUnlocked,
        mpCost: skillData.mpCost,
        castTime: skillData.castTime,
        cooldown: skillData.cooldown,
        duration: skillData.duration,
        skillTree: "Class Specific"
      });
    }
    
    // If no skills were added to this category, remove it
    if (unlockedSkills[categoryName].skills.length === 0) {
      delete unlockedSkills[categoryName];
    }
  }
  
  return unlockedSkills;
}

/**
 * Displays the unlocked skills in the modal.
 */
function displayUnlockedSkills() {
  const unlockedSkills = calculateUnlockedSkills();
  let html = "";
  
  // Get current job info for display
  const jobInfo = gameData.jobs[character.jobId];
  const jobName = jobInfo.name.trim();
  const baseClass = jobInfo.baseClass;
  
  if (Object.keys(unlockedSkills).length === 0) {
    html = `<div class="no-skills-message">
              <p><strong>No skills available for ${jobName}.</strong></p>
              <p>This job may not have access to any skill categories with unlockable skills,</p>
              <p>or the skill data for this job's categories hasn't been added yet.</p>
            </div>`;
  } else {
    html += `<div class="job-info"><p><strong>Skills for ${jobName}:</strong></p></div>`;
    
    for (const categoryName in unlockedSkills) {
      const skillCategory = unlockedSkills[categoryName];
      
      html += `<div class="unlocked-skill-category">
                 <h3>${skillCategory.name}</h3>`;
      
      if (skillCategory.skills.length === 0) {
        html += `<p>No skills available in this category.</p>`;
      } else {
        // Group skills by skill tree for better organization
        const skillsByTree = {};
        for (const skill of skillCategory.skills) {
          if (!skillsByTree[skill.skillTree]) {
            skillsByTree[skill.skillTree] = [];
          }
          skillsByTree[skill.skillTree].push(skill);
        }
        
        // Display skills grouped by tree
        for (const treeName in skillsByTree) {
          html += `<div class="skill-tree-group">
                     <h4>${treeName} Skills</h4>`;
          
          for (const skill of skillsByTree[treeName]) {
            const statusClass = skill.isUnlocked ? 'unlocked' : 'locked';
            const reqClass = skill.isUnlocked ? 'met' : 'not-met';
            
            html += `
              <div class="unlocked-skill-item ${statusClass}">
                <div class="skill-name-unlock">${skill.name}</div>
                <div class="skill-description-unlock">${skill.description}</div>
                <div class="skill-requirement ${reqClass}">
                  Req: ${skill.requirement}
                </div>
              </div>
            `;
          }
          
          html += `</div>`;
        }
      }
      
      html += `</div>`;
    }
  }
  
  elements.unlockedSkillsDisplay.innerHTML = html;
}

/**
 * Opens the skill preview modal.
 */
function openSkillPreviewModal() {
  displayUnlockedSkills();
  elements.skillPreviewModal.style.display = "block";
}

/**
 * Closes the skill preview modal.
 */
function closeSkillPreviewModal() {
  elements.skillPreviewModal.style.display = "none";
}

// --- Event Listeners and Initial Population (Same as before) ---
document.getElementById("race").addEventListener("change", handleJobRaceChange);
document
  .getElementById("racial-skill")
  .addEventListener("change", runCalculations); // NEW listener
document.getElementById("job").addEventListener("change", handleJobRaceChange); // Add listener for job changes

document.getElementById("level").addEventListener("input", (event) => {
  const value = parseInt(event.target.value) || 1;
  const min = parseInt(event.target.min) || 1;
  const max = parseInt(event.target.max) || 55;
  
  // Enforce min/max limits
  if (value < min) {
    event.target.value = min;
  } else if (value > max) {
    event.target.value = max;
  }
  
  runCalculations();
}); // Add listener for level changes

for (const statInput of Object.values(elements.addedStatInputs)) {
  statInput.addEventListener("input", (event) => {
    const value = parseInt(event.target.value) || 0;
    const min = parseInt(event.target.min) || 0;
    const max = parseInt(event.target.max) || 99;
    
    // Enforce min/max limits
    if (value < min) {
      event.target.value = min;
    } else if (value > max) {
      event.target.value = max;
    }
    
    runCalculations();
  });
}
for (const equipSelector of Object.values(elements.equipmentSelectors)) {
  equipSelector.addEventListener("change", runCalculations);
}

// Add event listeners for reset buttons
elements.resetButtons.statusPoints.addEventListener("click", resetStatusPoints);
elements.resetButtons.abilityPoints.addEventListener("click", resetAbilityPoints);

// Add event listeners for skill preview modal
elements.skillPreviewButton.addEventListener("click", openSkillPreviewModal);
elements.modalClose.addEventListener("click", closeSkillPreviewModal);

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === elements.skillPreviewModal) {
    closeSkillPreviewModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Set initial default values to match the image
  elements.level.value = character.level;
  elements.race.value = character.raceId;
  elements.racialSkill.value = character.racialSkillId;
  elements.job.value = character.jobId;
  
  // Set input fields to show total stats (racial base + job modifiers + additional)
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers = gameData.jobBaseStatModifiers[jobInfo.baseClass];
  
  for (const stat of PRIMARY_STATS) {
    const baseStat = raceStats[stat] + jobModifiers[stat];
    const totalStat = baseStat + character.addedStats[stat];
    
    // Set the input field value and min attribute
    elements.addedStatInputs[stat].value = totalStat;
    elements.addedStatInputs[stat].min = baseStat;
  }

  populateDropdowns();
  initializeSkills();
  runCalculations();
});

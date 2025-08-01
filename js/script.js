import { gameData } from "./gameData.js";
import { skills } from "./skills/jobSkillValues.js";
import { items } from "./items/equipData.js";
import { setBonuses } from "./items/setBonuses.js";
import { classSkillData, proficiencySkills } from "./skills/classSkillData.js";
import { classSpecificSkillData } from "./skills/classSpecificSkillData.js";

// --- CONSTANTS ---
const PRIMARY_STATS = ["sta", "str", "agi", "dex", "spi", "int"];

// --- CHARACTER STATE ---
const character = {
  level: 1, // Default to 50 for the image
  raceId: 0, // Default Human
  racialSkillId: 0, // Default Fighting Spirit
  jobId: 0, // Default Monk (job ID 19)
      addedStats: { sta: 0, str: 0, agi: 0, dex: 0, spi: 0, int: 0 }, // Set to 0 added for the image
  equipment: {
    weapon: "weapon-none",
    shield: "shield-none", 
    head: "head-none",
    torso: "torso-none",
    gloves: "gloves-none",
    pants: "pants-none", 
    boots: "boots-none",
    cape: "cape-none",
    earring1: "earring1-none",
    earring2: "earring2-none",
    necklace: "necklace-none",
    belt: "belt-none",
    ring1: "ring1-none",
    ring2: "ring2-none",
  },
  buffs: {
    // Skill buffs will be dynamically added
  },
      enchanterSpi: {
        // SPI values for enchanter-cast buffs (Prayer category)
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
    spi: document.getElementById("base-spi"),
    int: document.getElementById("base-int"),
  },
  statCosts: {
    sta: document.getElementById("cost-sta"),
    str: document.getElementById("cost-str"),
    agi: document.getElementById("cost-agi"),
    dex: document.getElementById("cost-dex"),
    spi: document.getElementById("cost-spi"),
    int: document.getElementById("cost-int"),
  },
  buffBonuses: {
    sta: document.getElementById("buff-bonus-sta"),
    str: document.getElementById("buff-bonus-str"),
    agi: document.getElementById("buff-bonus-agi"),
    dex: document.getElementById("buff-bonus-dex"),
    spi: document.getElementById("buff-bonus-spi"),
    int: document.getElementById("buff-bonus-int"),
  },
  equipmentSelectors: {
    weapon: document.getElementById("equip-weapon"),
    shield: document.getElementById("equip-shield"),
    head: document.getElementById("equip-head"),
    torso: document.getElementById("equip-torso"),
    gloves: document.getElementById("equip-gloves"),
    pants: document.getElementById("equip-pants"),
    boots: document.getElementById("equip-boots"),
    cape: document.getElementById("equip-cape"),
    earring1: document.getElementById("equip-earring1"),
    earring2: document.getElementById("equip-earring2"),
    necklace: document.getElementById("equip-necklace"),
    belt: document.getElementById("equip-belt"),
    ring1: document.getElementById("equip-ring1"),
    ring2: document.getElementById("equip-ring2"),
  },
  outputs: {
    sta: document.getElementById("total-sta"),
    str: document.getElementById("total-str"),
    agi: document.getElementById("total-agi"),
    dex: document.getElementById("total-dex"),
    spi: document.getElementById("total-spi"),
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
  
  // New modal elements
  buffsModalButton: document.getElementById("buffs-modal-btn"),
  buffsModal: document.getElementById("buffs-modal"),
  equipmentModalButton: document.getElementById("equipment-modal-btn"),
  equipmentModal: document.getElementById("equipment-modal"),
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

  // Initialize skill buffs
  initializeSkillBuffs();
}

/**
 * Renders the skill panel based on character.skills state.
 */
/**
 * Calculates the total proficiency (adeptness) for each skill category
 */
function calculateCategoryProficiencies() {
  const proficiencies = {
    melee: 0,
    technique: 0,
    prayer: 0,
    magic: 0,
    special: 0
  };

  // Map category IDs to proficiency names
  const categoryMapping = {
    0: 'melee',      // Melee category
    6: 'technique',  // Technique category  
    12: 'prayer',    // Prayer category
    17: 'magic',     // Magic category
    22: 'special'    // Special category
  };

  for (const categoryId in gameData.skills) {
    const category = gameData.skills[categoryId];
    const proficiencyKey = categoryMapping[categoryId];
    
    if (proficiencyKey) {
      // Calculate category sum based on current character skills
      for (const skillData of category.skills) {
        const currentSkill = character.skills[skillData.id];
        if (currentSkill) {
          proficiencies[proficiencyKey] += currentSkill.adeptness;
        }
      }
    }
  }

  return proficiencies;
}

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
    if (amount < 0) {
      // For negative amounts, only allow if currentValue is above the minimum
      if (currentValue > baseAdeptnessForJob) {
        // Don't allow to go below the minimum
        newValue = Math.max(currentValue + amount, baseAdeptnessForJob);
        pointsToAllocate = newValue - currentValue;
      } else {
        // Already at minimum, do nothing
        newValue = currentValue;
        pointsToAllocate = 0;
      }
    } else {
      // For positive amounts, proceed as normal
      newValue = currentValue + amount;
      pointsToAllocate = amount;
    }
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
 * Populates equipment selectors in the equipment modal.
 */
function populateEquipmentSelectors() {
  const itemsBySlot = {};
  for (const item of Object.values(items)) {
    if (!itemsBySlot[item.slot]) itemsBySlot[item.slot] = [];
    itemsBySlot[item.slot].push(item);
  }

  for (const slot in elements.equipmentSelectors) {
    const selector = elements.equipmentSelectors[slot];
    if (!selector) continue; // Skip if element doesn't exist
    
    if (itemsBySlot[slot]) {
      // Sort items so "None" options appear first
      const sortedItems = itemsBySlot[slot].sort((a, b) => {
        if (a.name === "None") return -1;
        if (b.name === "None") return 1;
        return a.name.localeCompare(b.name);
      });
      
      selector.innerHTML = sortedItems
        .map((item) => `<option value="${item.id}">${item.name}</option>`)
        .join("");
      selector.value = character.equipment[slot] || `${slot}-none`; // Set initial value
    } else {
      // Create a "None" option for empty slots
      selector.innerHTML = `<option value="${slot}-none">None</option>`;
      selector.value = `${slot}-none`;
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
  applySkillBuffEffects(bonuses);

  for (const stat of PRIMARY_STATS) {
    const total =
      baseStats[stat] + character.addedStats[stat] + (bonuses.stats[stat] || 0);
    character.finalStats[stat] = Math.min(gameData.maxStatValue, total);
  }

      // Apply SPI-based buff effects after final stats are calculated
    if (bonuses.spiBasedEffects) {
            for (const effect of bonuses.spiBasedEffects) {
            // Use enchanter SPI instead of current character SPI
            const enchanterSpi = character.enchanterSpi[effect.buffId] || effect.data[0]?.value || 33;
            applySpiBasedBuffEffects(effect.skillName, effect.data, bonuses, enchanterSpi);
    }
  }

  calculateDerivedStats(bonuses);
  
  updateStatCostIndicators(); // Update cost indicators for stat increases
  updateUI(bonuses);
}

function getCombinedBaseStats() {
  const combined = {};
  const raceStats = gameData.raceBaseStats[character.raceId];
  const jobInfo = gameData.jobs[character.jobId];
  const jobModifiers = gameData.jobBaseStatModifiers[jobInfo.baseClass]; // Use baseClass from jobInfo

  for (const stat of PRIMARY_STATS) {
    // Job modifiers are always applied to base stats
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
 * Collects all skills with buffEffectTable from both skill data files.
 * Returns an array of {name, buffId, buffEffectTable, description} objects.
 */
function getAllSkillBuffs() {
  const skillBuffs = [];
  
  // Helper function to extract buffs from a skill category
  function extractBuffsFromCategory(skills, categoryName) {
    for (const [skillName, skillData] of Object.entries(skills)) {
      if (skillData.buffEffectTable) {
        const buffId = `skill-${categoryName}-${skillName}`.toLowerCase().replace(/\s+/g, '-');
        skillBuffs.push({
          name: skillName,
          buffId: buffId,
          buffEffectTable: skillData.buffEffectTable,
          description: skillData.description || `${skillName} buff effect`,
          category: categoryName
        });
      }
    }
  }
  
  // Search through classSkillData
  for (const [classId, classData] of Object.entries(classSkillData)) {
    if (classData.skills) {
      for (const category of classData.skills) {
        if (category.skills) {
          extractBuffsFromCategory(category.skills, category.name);
        }
      }
    }
  }
  
  // Search through classSpecificSkillData
  for (const [classId, skillsData] of Object.entries(classSpecificSkillData)) {
    // classSpecificSkillData has skills directly under job ID, not under a .skills property
    if (skillsData && typeof skillsData === 'object') {
      const jobName = gameData.jobs[parseInt(classId)]?.name || `Job ${classId}`;
      extractBuffsFromCategory(skillsData, `${jobName} Specific`);
    }
  }
  
  return skillBuffs;
}

/**
 * Initializes skill buffs in the character.buffs object.
 */
function initializeSkillBuffs() {
  const skillBuffs = getAllSkillBuffs();
  
  // Add each skill buff to character.buffs if not already present
  for (const skillBuff of skillBuffs) {
    if (!(skillBuff.buffId in character.buffs)) {
      character.buffs[skillBuff.buffId] = false;
    }
  }
}

/**
 * Looks up detailed skill data from classSkillData and classSpecificSkillData.
 * Returns null if not found.
 */
function getDetailedSkillData(skillName) {
  // Search through classSkillData
  for (const [classId, classData] of Object.entries(classSkillData)) {
    if (classData.skills) {
      for (const category of classData.skills) {
        if (category.skills && category.skills[skillName]) {
          return category.skills[skillName];
        }
      }
    }
  }
  
  // Search through classSpecificSkillData
  for (const [classId, skillsData] of Object.entries(classSpecificSkillData)) {
    // classSpecificSkillData has skills directly under job ID, not under a .skills property
    if (skillsData && skillsData[skillName]) {
      return skillsData[skillName];
    }
  }
  
  return null;
}

/**
 * Calculates the effective MP cost for a skill based on character stats and bonuses.
 */
function calculateEffectiveMpCost(baseMpCost, bonuses) {
  if (!baseMpCost) return 0;
  
  let effectiveCost = baseMpCost;
  
  // Apply MP cost reduction from racial skills
  if (bonuses.mpCostReduction) {
    effectiveCost = Math.ceil(effectiveCost * (100 - bonuses.mpCostReduction) / 100);
  }
  
  // Apply MP cost reduction from set bonuses
  if (bonuses.stats.redMp) {
    const reduction = Math.abs(bonuses.stats.redMp);
    effectiveCost = Math.ceil(effectiveCost * (100 - reduction) / 100);
  }
  
  return Math.max(1, effectiveCost); // Minimum 1 MP
}

/**
 * Calculates the effective cast time for a skill based on character stats and bonuses.
 */
function calculateEffectiveCastTime(baseCastTime, bonuses) {
  if (!baseCastTime) return 0;
  
  let effectiveTime = baseCastTime;
  
  // Apply cast speed bonus from DEX (from finalStats.castSpd)
  const castSpeedBonus = character.finalStats.castSpd || 100;
  effectiveTime = effectiveTime * (100 / castSpeedBonus);
  
  // Apply cast time reduction from skill buffs (like Saltio)
  if (bonuses.castTimeReduction) {
    effectiveTime = effectiveTime * (100 - bonuses.castTimeReduction) / 100;
  }
  
  return Math.max(0.1, effectiveTime); // Minimum 0.1 seconds
}

/**
 * Calculates the effective cooldown for a skill based on character stats and bonuses.
 */
function calculateEffectiveCooldown(baseCooldown, bonuses) {
  if (!baseCooldown) return 0;
  
  let effectiveCooldown = baseCooldown;
  
  // Apply cooldown reduction from INT (from finalStats.cooldown)
  const cooldownReduction = character.finalStats.cooldown || 100;
  effectiveCooldown = effectiveCooldown * (cooldownReduction / 100);
  
  return Math.max(0.1, effectiveCooldown); // Minimum 0.1 seconds
}

/**
 * Applies SPI-based buff effects like Lapis Mediow.
 * This function should be called after final stats are calculated.
 */
function applySpiBasedBuffEffects(skillName, spiData, bonuses, enchanterSpi) {
      // Find the appropriate SPI tier
  let selectedTier = null;
      for (const tier of spiData) {
        if (enchanterSpi >= tier.value) {
      selectedTier = tier;
    }
  }
  
  if (!selectedTier || !selectedTier.Blessing) return;
  
  // For now, use the highest tier blessing (could be made configurable)
  const blessing = selectedTier.Blessing[selectedTier.Blessing.length - 1];
  
  if (blessing && blessing.def) {
    bonuses.stats.def = (bonuses.stats.def || 0) + blessing.def;
  }
  
  if (blessing && blessing.dodgeChance) {
    bonuses.dodgeChance = (bonuses.dodgeChance || 0) + blessing.dodgeChance;
  }
}

/**
 * Applies active skill buff effects to the bonuses object.
 */
function applySkillBuffEffects(bonuses) {
  const skillBuffs = getAllSkillBuffs();
  
  for (const skillBuff of skillBuffs) {
    const isActive = character.buffs[skillBuff.buffId];
    if (!isActive) continue;
    
    const effects = skillBuff.buffEffectTable;
    
    // Add description
    bonuses.description.push(`${skillBuff.name}: ${skillBuff.description}`);
    
    // Apply stat bonuses
    for (const [stat, value] of Object.entries(effects)) {
      if (PRIMARY_STATS.includes(stat)) {
        // Direct stat bonus (e.g., str: 9)
        if (!bonuses.stats[stat]) bonuses.stats[stat] = 0;
        bonuses.stats[stat] += value;
      } else if (stat === 'castTime') {
        // Cast time reduction (e.g., castTime: -50)
        bonuses.castTimeReduction = (bonuses.castTimeReduction || 0) + Math.abs(value);
      } else if (stat === 'lp') {
        // LP bonus handling
        if (typeof value === 'string' && value.includes('+')) {
          // Complex LP formula like "15.00 + 250"
          const parts = value.split('+').map(p => parseFloat(p.trim()));
          if (parts.length === 2) {
            bonuses.lpBuff = (bonuses.lpBuff || 0) + parts[1]; // Add flat amount
            bonuses.lpPercentBuff = (bonuses.lpPercentBuff || 0) + (parts[0] / 100); // Add percentage
          }
        } else if (typeof value === 'number') {
          // Simple numeric LP bonus
          bonuses.lpBuff = (bonuses.lpBuff || 0) + value;
        } else {
          bonuses.lpBuff = (bonuses.lpBuff || 0) + value;
        }
              } else if (stat === 'spiValues') {
            // Complex SPI-based effects (like Lapis Mediow)
        // Store for later processing after final stats are calculated
                        bonuses.spiBasedEffects = bonuses.spiBasedEffects || [];
                bonuses.spiBasedEffects.push({
          skillName: skillBuff.name,
          buffId: skillBuff.buffId,
          data: value
        });
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
  let totalLp = mod[0] + levelLPComponent + staLPComponent;
  
  // Apply LP buff from skills (e.g., Divine Aid)
  if (bonuses.lpPercentBuff) {
    // Apply percentage increase first
    totalLp = Math.floor(totalLp * (1 + bonuses.lpPercentBuff));
  }
  
  if (bonuses.lpBuff) {
    // Apply flat increase
    totalLp += bonuses.lpBuff;
  }
  
  stats.lp = totalLp;

  // MP Calculation
  const levelMPComponent = Math.ceil(level * (100 / mod[3]));
          const spiMultiplier = Math.ceil(100 / mod[5]);
        const spiMPComponent = Math.ceil(stats.spi * spiMultiplier);
        stats.mp = mod[1] + levelMPComponent + spiMPComponent;

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

  // Calculate MP cost reduction from both racial skills and set bonuses
  let totalMpReduction = 0;
  
  if (bonuses.mpCostReduction) {
    totalMpReduction += bonuses.mpCostReduction;
  }
  
  if (bonuses.stats.redMp) {
    // Set bonus redMp is negative for reduction (e.g., -5 means 5% reduction)
    totalMpReduction += Math.abs(bonuses.stats.redMp);
  }
  
  stats.redMp = 100 - totalMpReduction;


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
  
  // Apply DEF bonus from buffs
  if (bonuses.stats.def) {
    stats.def += bonuses.stats.def;
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
  
  // Cast time - base 100%, reduced by skill buffs
  let baseCastTime = 100;
  if (bonuses.castTimeReduction) {
    baseCastTime = Math.floor(baseCastTime * (100 - bonuses.castTimeReduction) / 100);
  }
  stats.castTime = baseCastTime;

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

  // Update primary stat displays and buff bonuses
  for (const stat of PRIMARY_STATS) {
    const totalElement = elements.outputs[stat];
    const inputElement = elements.addedStatInputs[stat];
    const buffBonusElement = elements.buffBonuses[stat];
    
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
    
    // Update buff bonus display
    if (buffBonusElement) {
      const buffBonus = bonuses.stats[stat] || 0;
      if (buffBonus > 0) {
        buffBonusElement.textContent = `+${buffBonus}`;
        buffBonusElement.style.display = 'inline';
      } else {
        buffBonusElement.textContent = '';
        buffBonusElement.style.display = 'none';
      }
    }
  }
  
  // Update skill preview modal if it's open
  updateSkillPreviewModal();
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
  // Reset spent skill points to 0
  character.points.spentSkill = 0;
  
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
  
  // Add proficiency-based skills
  const proficiencies = calculateCategoryProficiencies();
  
  for (const categoryName in proficiencySkills) {
    const categorySkills = proficiencySkills[categoryName];
    const currentProficiency = proficiencies[categoryName] || 0;
    
    // Only add category if there are skills to show
    const availableSkills = [];
    
    for (const skillData of categorySkills) {
      const isUnlocked = currentProficiency >= skillData.requiredProficiency;
      const requirementText = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Proficiency ${skillData.requiredProficiency}`;
      
      availableSkills.push({
        name: skillData.name,
        description: skillData.description,
        requirement: requirementText,
        isUnlocked: isUnlocked,
        mpCost: skillData.mpCost,
        castTime: skillData.castTime,
        cooldown: skillData.cooldown,
        duration: skillData.duration,
        skillTree: "Proficiency",
        currentProficiency: currentProficiency,
        requiredProficiency: skillData.requiredProficiency
      });
    }
    
    if (availableSkills.length > 0) {
      const displayCategoryName = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Mastery`;
      unlockedSkills[displayCategoryName] = {
        name: displayCategoryName,
        skills: availableSkills
      };
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
            
            // Get detailed skill data for stats calculation
            const detailedSkillData = getDetailedSkillData(skill.name);
            let skillStatsHtml = '';
            
            if (detailedSkillData) {
              // Build base stats (always show for all skills)
              let baseStatsParts = [];
              if (detailedSkillData.mpCost > 0) baseStatsParts.push(`MP: ${detailedSkillData.mpCost}`);
              if (detailedSkillData.castTime > 0) baseStatsParts.push(`Cast: ${detailedSkillData.castTime.toFixed(1)}s`);
              if (detailedSkillData.cooldown > 0) baseStatsParts.push(`Cooldown: ${detailedSkillData.cooldown.toFixed(1)}s`);
              if (detailedSkillData.duration > 0) baseStatsParts.push(`Duration: ${detailedSkillData.duration}s`);
              
              let baseStatsHtml = '';
              if (baseStatsParts.length > 0) {
                baseStatsHtml = `<div class="skill-modal-stats-base">Base: ${baseStatsParts.join(' | ')}</div>`;
              }
              
              // For unlocked skills, also show modified stats
              let modifiedStatsHtml = '';
              if (skill.isUnlocked) {
                // Calculate bonuses for this skill calculation
                const bonuses = { description: [], stats: {} };
                applyEquipmentBonuses(bonuses);
                applySetBonuses(bonuses);
                applyRacialSkillEffects(bonuses);
                applySkillBuffEffects(bonuses);
                
                // Calculate effective values
                const effectiveMp = calculateEffectiveMpCost(detailedSkillData.mpCost, bonuses);
                const effectiveCastTime = calculateEffectiveCastTime(detailedSkillData.castTime, bonuses);
                const effectiveCooldown = calculateEffectiveCooldown(detailedSkillData.cooldown, bonuses);
                const duration = detailedSkillData.duration || 0;
                
                // Build modified stats string (only if different from base)
                let modifiedStatsParts = [];
                if (detailedSkillData.mpCost > 0 && effectiveMp !== detailedSkillData.mpCost) {
                  modifiedStatsParts.push(`MP: ${effectiveMp}`);
                }
                if (detailedSkillData.castTime > 0 && Math.abs(effectiveCastTime - detailedSkillData.castTime) > 0.01) {
                  modifiedStatsParts.push(`Cast: ${effectiveCastTime.toFixed(1)}s`);
                }
                if (detailedSkillData.cooldown > 0 && Math.abs(effectiveCooldown - detailedSkillData.cooldown) > 0.01) {
                  modifiedStatsParts.push(`Cooldown: ${effectiveCooldown.toFixed(1)}s`);
                }
                
                if (modifiedStatsParts.length > 0) {
                  modifiedStatsHtml = `<div class="skill-modal-stats">Modified: ${modifiedStatsParts.join(' | ')}</div>`;
                }
              }
              
              skillStatsHtml = baseStatsHtml + modifiedStatsHtml;
            }
            
            // Add proficiency progress for proficiency-based skills
            let proficiencyProgressHtml = '';
            if (skill.skillTree === 'Proficiency' && skill.currentProficiency !== undefined && skill.requiredProficiency !== undefined) {
              const progressPercent = Math.min(100, (skill.currentProficiency / skill.requiredProficiency) * 100);
              const progressClass = skill.isUnlocked ? 'completed' : 'incomplete';
              proficiencyProgressHtml = `
                <div class="proficiency-progress">
                  <div class="proficiency-progress-text">
                    Progress: ${skill.currentProficiency} / ${skill.requiredProficiency} (${progressPercent.toFixed(1)}%)
                  </div>
                  <div class="proficiency-progress-bar">
                    <div class="proficiency-progress-fill ${progressClass}" style="width: ${progressPercent}%"></div>
                  </div>
                </div>
              `;
            }

            html += `
              <div class="unlocked-skill-item ${statusClass}">
                <div class="skill-name-unlock">${skill.name}</div>
                <div class="skill-description-unlock">${skill.description}</div>
                ${skillStatsHtml}
                ${proficiencyProgressHtml}
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
 * Updates the skill preview modal if it's open.
 */
function updateSkillPreviewModal() {
  if (elements.skillPreviewModal.style.display === "block") {
    displayUnlockedSkills();
  }
}

/**
 * Closes the skill preview modal.
 */
function closeSkillPreviewModal() {
  elements.skillPreviewModal.style.display = "none";
}

/**
 * Gets the SPI breakpoints for a skill with spiValues.
 */
function getSpiBreakpoints(spiData) {
    return spiData.map(tier => tier.value).sort((a, b) => a - b);
}

/**
 * Populates the buffs modal with skill buffs.
 */
function populateBuffsModal() {
  const buffsDisplay = document.getElementById('buffs-display');
  const skillBuffs = getAllSkillBuffs();
  
  let html = '';
  
  // Skill buffs section
  if (skillBuffs.length > 0) {
    html += '<div class="buff-section">';
    html += '<h3>Skill Buffs</h3>';
    html += '<div class="buff-grid">';
    
    for (const skillBuff of skillBuffs) {
      const isChecked = character.buffs[skillBuff.buffId] ? 'checked' : '';
      const hasSpiValues = skillBuff.buffEffectTable.spiValues;
      
      const effectsText = Object.entries(skillBuff.buffEffectTable)
        .map(([stat, value]) => {
          if (PRIMARY_STATS.includes(stat)) {
            return `+${value} ${stat.toUpperCase()}`;
          } else if (stat === 'castTime') {
            return `${value}% Cast Time`;
          } else if (stat === 'lp') {
            if (typeof value === 'string' && value.includes('+')) {
              return `LP: ${value}`;
            } else {
              return `+${value} LP`;
            }
          } else if (stat === 'spiValues') {
            return `(SPI-based)`;
          }
          return `${stat}: ${value}`;
        })
        .join(', ');
      
      html += `
        <div class="buff-item-container">
          <label class="buff-item">
            <input type="checkbox" id="buff-${skillBuff.buffId}" data-buff="${skillBuff.buffId}" ${isChecked}>
            <span>${skillBuff.name} (${effectsText})</span>
          </label>
      `;
      
      // Add SPI dropdown for skills with spiValues (Prayer category skills)
      if (hasSpiValues && (skillBuff.category === 'Blessing' || skillBuff.category === 'Hymn')) {
        const spiBreakpoints = getSpiBreakpoints(skillBuff.buffEffectTable.spiValues);
        const currentSpi = character.enchanterSpi[skillBuff.buffId] || spiBreakpoints[0];
        
        html += `
          <div class="enchanter-spi-controls" style="margin-left: 20px; margin-top: 5px;">
            <label for="spi-${skillBuff.buffId}">Enchanter SPI:</label>
            <select id="spi-${skillBuff.buffId}" data-buff-id="${skillBuff.buffId}">
        `;
        
        for (const spiValue of spiBreakpoints) {
          const selected = spiValue === currentSpi ? 'selected' : '';
          html += `<option value="${spiValue}" ${selected}>${spiValue}</option>`;
        }
        
        html += `
            </select>
          </div>
        `;
      }
      
      html += '</div>';
    }
    
    html += '</div></div>';
  }
  
  buffsDisplay.innerHTML = html;
  
  // Add event listeners for all buff checkboxes
  buffsDisplay.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', handleBuffChange);
  });
  
      // Add event listeners for SPI dropdowns
    buffsDisplay.querySelectorAll('select[id^="spi-"]').forEach(dropdown => {
      dropdown.addEventListener('change', handleEnchanterSpiChange);
  });
}

/**
 * Handles buff checkbox changes.
 */
function handleBuffChange(event) {
  const buffId = event.target.dataset.buff;
  const isChecked = event.target.checked;
  
  character.buffs[buffId] = isChecked;
  runCalculations();
  updateSkillPreviewModal(); // Update skill stats in modal
}

/**
 * Handles enchanter SPI dropdown changes.
 */
function handleEnchanterSpiChange(event) {
  const buffId = event.target.dataset.buffId;
  const spiValue = parseInt(event.target.value);
  
  character.enchanterSpi[buffId] = spiValue;
  runCalculations();
  updateSkillPreviewModal(); // Update skill stats in modal
}

/**
 * Opens the buffs modal.
 */
function openBuffsModal() {
  populateBuffsModal();
  elements.buffsModal.style.display = "block";
}

/**
 * Closes the buffs modal.
 */
function closeBuffsModal() {
  elements.buffsModal.style.display = "none";
}

/**
 * Opens the equipment modal.
 */
function openEquipmentModal() {
  populateEquipmentSelectors();
  elements.equipmentModal.style.display = "block";
}

/**
 * Closes the equipment modal.
 */
function closeEquipmentModal() {
  elements.equipmentModal.style.display = "none";
}

/**
 * Exports character data to JSON format and downloads it as a file.
 */
function exportCharacter() {
  // Read current inputs to ensure we have the latest data
  readInputs();
  
  // Get current derived stats
  const bonuses = { description: [], stats: {} };
  applyEquipmentBonuses(bonuses);
  applySetBonuses(bonuses);
  applyRacialSkillEffects(bonuses);
  applySkillBuffEffects(bonuses);
  
  const baseStats = getCombinedBaseStats();
  calculateDerivedStats(bonuses); // This modifies character.finalStats
  
  // Create export object matching the structure of exportExample.json
  const exportData = {
    level: character.level,
    race: gameData.races[character.raceId]?.name || "Unknown",
    job: gameData.jobs[character.jobId]?.name || "Unknown",
    racialSkill: gameData.racialSkills[character.raceId]?.skills?.[character.racialSkillId]?.name || "Unknown",
    statusPoints: {
      sta: character.finalStats.sta,
      str: character.finalStats.str,
      agi: character.finalStats.agi,
      dex: character.finalStats.dex,
      spi: character.finalStats.spi,
      int: character.finalStats.int
    },
    equipment: {
      weapon: character.equipment.weapon,
      shield: character.equipment.shield,
      head: character.equipment.head,
      torso: character.equipment.torso,
      gloves: character.equipment.gloves,
      pants: character.equipment.pants,
      boots: character.equipment.boots,
      cape: character.equipment.cape,
      earring1: character.equipment.earring1,
      earring2: character.equipment.earring2,
      necklace: character.equipment.necklace,
      belt: character.equipment.belt,
      ring1: character.equipment.ring1,
      ring2: character.equipment.ring2
    },
    abilityPoints: {},
    derivedStats: {
      hp: Math.round(character.finalStats.lp || 0),
      mp: Math.round(character.finalStats.mp || 0),
      acc: Math.round(character.finalStats.acc || 0),
      accFront: Math.round(character.finalStats.accFront || 0),
      atk: Math.round(character.finalStats.atk || 0),
      dodge: Math.round(character.finalStats.dodge || 0),
      def: Math.round(character.finalStats.def || 0),
      crit: Math.round(character.finalStats.crit || 0),
      critDamage: Math.round(character.finalStats.criD || 0),
      critChance: Math.round(character.finalStats.criRes || 0),
      reducedMpCost: Math.round(character.finalStats.redMp || 0),
      frontDamageIncrease: Math.round(character.finalStats.frontAtk || 0),
      backDamageIncrease: Math.round(character.finalStats.backAtk || 0),
      magicAttack: Math.round(character.finalStats.matk || 0),
      frontDamageResistance: Math.round(character.finalStats.frontDef || 0),
      backDamageResistance: Math.round(character.finalStats.backDef || 0),
      critDamageResistance: Math.round(character.finalStats.cdamRes || 0),
      meleeEvasion: Math.round(character.finalStats.melEva || 0),
      rangedEvasion: Math.round(character.finalStats.ranEva || 0),
      magicEvasion: Math.round(character.finalStats.magEva || 0),
      magicResistance: Math.round(character.finalStats.magRes || 0),
      fireResistance: Math.round(character.finalStats.fireR || 0),
      iceResistance: Math.round(character.finalStats.iceR || 0),
      lightningResistance: Math.round(character.finalStats.thundR || 0),
      poisonResistance: Math.round(character.finalStats.poisonR || 0),
      charmResistance: Math.round(character.finalStats.charmR || 0),
      lightResistance: Math.round(character.finalStats.lightR || 0),
      darkResistance: Math.round(character.finalStats.darkR || 0),
      atkSpeed: Math.round(character.finalStats.atkSpd || 0),
      castSpeed: Math.round(character.finalStats.castSpd || 0),
      castTime: Math.round(character.finalStats.castTime || 0),
      cooldown: Math.round(character.finalStats.cooldown || 0),
      lpHealPercent: Math.round(character.finalStats.lpHeal || 0),
      potionEfficiency: Math.round(character.finalStats.pot || 0)
    },
    skills: {}
  };
  
  // Populate ability points with actual skill names and adeptness levels
  const jobSkillData = skills[character.jobId];
  if (jobSkillData) {
    for (const categoryId in jobSkillData) {
      if (categoryId === 'name') continue;
      
      const category = jobSkillData[categoryId];
      for (const skillData of category.skills) {
        const skillId = skillData.id;
        const skillLevel = character.skills[skillId]?.adeptness || 0;
        // Use skill name as the key (lowercase, no spaces)
        const skillName = (skillData.name || skillId).toLowerCase().replace(/\s+/g, '');
        exportData.abilityPoints[skillName] = skillLevel;
      }
    }
  }
  
  // Populate skills array with actual unlocked skill names
  const unlockedSkills = calculateUnlockedSkills();
  
  // Collect all unlocked skill names
  const unlockedSkillNames = [];
  for (const categoryName in unlockedSkills) {
    const category = unlockedSkills[categoryName];
    for (const skill of category.skills) {
      if (skill.isUnlocked) {
        unlockedSkillNames.push(skill.name);
      }
    }
  }
  
  // Fill the skills array with unlocked skill names or "skillX-none"
  for (let i = 1; i <= 31; i++) {
    if (i <= unlockedSkillNames.length) {
      exportData.skills[`skill${i}`] = unlockedSkillNames[i - 1];
    } else {
      exportData.skills[`skill${i}`] = `skill${i}-none`;
    }
  }
  
  // Convert to JSON string
  const jsonString = JSON.stringify(exportData, null, 4);
  
  // Create and download the file
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `character_export_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
  updateSkillPreviewModal(); // Update skill stats in modal
}); // Add listener for level changes

for (const statInput of Object.values(elements.addedStatInputs)) {
  let inputTimeout;
  
  // Select all text when input is focused (allows easy replacement)
  statInput.addEventListener("focus", (event) => {
    event.target.select();
  });
  
  // Handle input changes with debounced validation
  statInput.addEventListener("input", (event) => {
    // Clear any existing timeout
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }
    
    // Don't run calculations immediately while typing
    // Only validate for extremely high values that would break things
    const inputValue = event.target.value.trim();
    if (inputValue !== '' && !isNaN(parseInt(inputValue))) {
      const value = parseInt(inputValue);
      // Only enforce a reasonable upper limit to prevent extreme values
      if (value > 999) {
        event.target.value = 99;
        runCalculations();
        updateSkillPreviewModal();
        return;
      }
    }
    
    // Debounce the calculations - only run after user stops typing for 300ms
    inputTimeout = setTimeout(() => {
      const finalValue = event.target.value.trim();
      
      if (finalValue === '' || isNaN(parseInt(finalValue))) {
        // Don't run calculations for empty/invalid values
        return;
      }
      
      runCalculations();
      updateSkillPreviewModal();
    }, 300);
  });
  
  // Handle when user finishes editing (loses focus)
  statInput.addEventListener("blur", (event) => {
    // Clear any pending timeout since we're handling this immediately
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }
    
    const inputValue = event.target.value.trim();
    
    // If empty or invalid, reset to minimum
    if (inputValue === '' || isNaN(parseInt(inputValue))) {
      const min = parseInt(event.target.min) || 0;
      event.target.value = min;
      runCalculations();
      updateSkillPreviewModal();
      return;
    }
    
    const value = parseInt(inputValue);
    const min = parseInt(event.target.min) || 0;
    const max = parseInt(event.target.max) || 99;
    
    // Enforce both min/max limits when user finishes editing
    if (value < min) {
      event.target.value = min;
    } else if (value > max) {
      event.target.value = max;
    }
    
    runCalculations();
    updateSkillPreviewModal(); // Update skill stats in modal
  });
}
for (const equipSelector of Object.values(elements.equipmentSelectors)) {
  equipSelector.addEventListener("change", () => {
    runCalculations();
    updateSkillPreviewModal(); // Update skill stats in modal
  });
}

// Add event listeners for reset buttons
elements.resetButtons.statusPoints.addEventListener("click", resetStatusPoints);
elements.resetButtons.abilityPoints.addEventListener("click", resetAbilityPoints);

// Add event listeners for modals
elements.skillPreviewButton.addEventListener("click", openSkillPreviewModal);
elements.modalClose.addEventListener("click", closeSkillPreviewModal);
elements.buffsModalButton.addEventListener("click", openBuffsModal);
elements.equipmentModalButton.addEventListener("click", openEquipmentModal);

// Add event listener for export button
document.getElementById("export-character").addEventListener("click", exportCharacter);

// Close modal when clicking outside of it or on close button
window.addEventListener("click", (event) => {
  if (event.target === elements.skillPreviewModal) {
    closeSkillPreviewModal();
  }
  if (event.target === elements.buffsModal) {
    closeBuffsModal();
  }
  if (event.target === elements.equipmentModal) {
    closeEquipmentModal();
  }
});

// Add close button listeners for new modals
document.querySelectorAll(".modal .close").forEach(closeButton => {
  closeButton.addEventListener("click", (event) => {
    const modal = event.target.closest(".modal");
    modal.style.display = "none";
  });
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

const classSpecificSkillData = {
   // use job IDs from gameData.js
   0: {
        // Warrior
        "Provoke": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 1,
            description: "Provoke target to attack you"
        },
        "Brewer (Passive)": {
            reqLevel: 12,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "12% more potion effectiveness"
        },
        "Lunge": {
            reqLevel: 15,
            mpCost: 25,
            castTime: 0,
            cooldown: 30,
            duration: 120,
            description: "Increased attack speed with melee weapons"
        }
        
    },
    1: {
        // Gladiator
         "Provoke": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 1,
            description: "Provoke target to attack you"
        },
        "Brewer (Passive)": {
            reqLevel: 12,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "12% more potion effectiveness"
        },
        "Lunge": {
            reqLevel: 15,
            mpCost: 25,
            castTime: 0,
            cooldown: 30,
            duration: 120,
            description: "Increased attack speed with melee weapons"
        },
        "Empower (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase attack power of melee weapons"
        },
        "Leg Sweep": {
            reqLevel: 20,
            mpCost: 21,
            castTime: 0,
            cooldown: 10,
            duration: 5,
            description: "Attack and reduce target's movement speed" 
        },
        "War Cry": {
            reqLevel: 28,
            mpCost: 35,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Increase attack power of all allies"
        },
        "Raging Soul": {
            reqLevel: 35,
            mpCost: 35,
            castTime: 0,
            cooldown: 60,
            duration: 30,
            description: "Increase attack power of next attack"  
        }
    },
    2: {
        // Juggernaut
          "Provoke": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 1,
            description: "Provoke target to attack you"
        },
        "Brewer (Passive)": {
            reqLevel: 12,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "12% more potion effectiveness"
        },
        "Lunge": {
            reqLevel: 15,
            mpCost: 25,
            castTime: 0,
            cooldown: 30,
            duration: 120,
            description: "Increased attack speed with melee weapons"
        },
        "Empower (Passive)": {
            reqLevel: 18,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase attack power of melee weapons"
        },
        "Leg Sweep": {
            reqLevel: 20,
            mpCost: 21,
            castTime: 0,
            cooldown: 10,
            duration: 5,
            description: "Attack and reduce target's movement speed" 
        },
        "War Cry": {
            reqLevel: 28,
            mpCost: 35,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Increase attack power of all allies"
        },
        "Raging Soul": {
            reqLevel: 35,
            mpCost: 35,
            castTime: 0,
            cooldown: 60,
            duration: 30,
            description: "Increase attack power of next attack"  
        },
        "Desperado": {
            reqLevel: 45,
            mpCost: 39,
            castTime: 0,
            cooldown: 35,
            duration: 60,
            description: "Attack Power increased, damage taken increased"  
        },
        "Skill Focus": {
            reqLevel: 50,
            mpCost: 3,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Sacrifice 30% of your current HP to cut CDs by 50%"  
        }
    },
    3: {
        // Dragoon
        "Provoke": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 1,
            description: "Provoke target to attack you"
        },
        "Brewer (Passive)": {
            reqLevel: 12,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "12% more potion effectiveness"
        },
        "Lunge": {
            reqLevel: 15,
            mpCost: 25,
            castTime: 0,
            cooldown: 30,
            duration: 120,
            description: "Increased attack speed with melee weapons"
        },
        "Empower (Passive)": {
            reqLevel: 18,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase attack power of melee weapons"
        },
        "Leg Sweep": {
            reqLevel: 20,
            mpCost: 21,
            castTime: 0,
            cooldown: 10,
            duration: 5,
            description: "Attack and reduce target's movement speed" 
        },
        "War Cry": {
            reqLevel: 28,
            mpCost: 35,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Increase attack power of all allies"
        },
        "Raging Soul": {
            reqLevel: 35,
            mpCost: 35,
            castTime: 0,
            cooldown: 60,
            duration: 30,
            description: "Increase attack power of next attack"  
        },
        "Equine Charge": {
            reqLevel: 45,
            mpCost: 19,
            castTime: 0,
            cooldown: 9,
            duration: 0,
            description: "Charge at target with your spear"  
        },
        "Jousting (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Can use skills and charge on horseback"  
        },
        "Charge": {
            reqLevel: 50,
            mpCost: 41,
            castTime: 0,
            cooldown: 20,
            duration: 0,
            description: "Mounted Charge/Dash/Rush (Spear)"  
        }   
    },
    4: {
        // Knight
        "Provoke": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 1,
            description: "Provoke target to attack you"
        },
        "Brewer (Passive)": {
            reqLevel: 12,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "12% more potion effectiveness"
        },
        "Lunge": {
            reqLevel: 15,
            mpCost: 25,
            castTime: 0,
            cooldown: 30,
            duration: 120,
            description: "Increased attack speed with melee weapons"
        },
        "Obscene Gesture": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 10,
            description: "Provoke target to attack you"
        
        },
        "Providence": {
            reqLevel: 28,
            mpCost: 62,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "+25 magic resistance for yourself and party"
        },

    },
    5: {
        // Warlord 
        "Provoke": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 1,
            description: "Provoke target to attack you"
        },
        "Brewer (Passive)": {
            reqLevel: 12,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "12% more potion effectiveness"
        },
        "Lunge": {
            reqLevel: 15,
            mpCost: 25,
            castTime: 0,
            cooldown: 30,
            duration: 120,
            description: "Increased attack speed with melee weapons"
        },
         "Obscene Gesture": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 10,
            description: "Provoke target to attack you"       
        },
        "Providence": {
            reqLevel: 28,
            mpCost: 62,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "+25 magic resistance for yourself and party"
        },
        "Deflect (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Automatically deflects charge damage when blocking (Shield)"  
        },
        "Jousting (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Can use skills and charge on horseback"  
        },
        "Bore Brunt": {
            reqLevel: 50,
            reqPoints: {
                "Defend": 54
            },
            mpCost: 16,
            castTime: 4,
            cooldown: 1,
            duration: 300,
            description: "Take damage for up to three party members"  
        }
    },
    6: {
        // Paladin
        "Provoke": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 1,
            description: "Provoke target to attack you"
        },
        "Brewer (Passive)": {
            reqLevel: 12,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "12% more potion effectiveness"
        },
        "Lunge": {
            reqLevel: 15,
            mpCost: 25,
            castTime: 0,
            cooldown: 30,
            duration: 120,
            description: "Increased attack speed with melee weapons"
        },
          "Obscene Gesture": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 15,
            duration: 10,
            description: "Provoke target to attack you"      
        },
        "Providence": {
            reqLevel: 28,
            mpCost: 62,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "+25 magic resistance for yourself and party"
        },
        "Strong Stance (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Can use shield to block magic"
        },
        "Jousting (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Can use skills and charge on horseback"  
        },
        "Defensive Attack (Passive)": {
            reqLevel: 50,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Can use offensive skills while blocking"  
        },
    },
    7: {
        // Scout
       "Invigorate": {
            reqLevel: 5,
            mpCost: 16,
            castTime: 0,
            cooldown: 10,
            duration: 180,
            description: "Increase movement speed"
        },
        "Hide": {
            reqLevel: 18,
            mpCost: 24,
            castTime: 0,
            cooldown: 3,
            duration: 0,
            description: "Stationary invisibility (2MP per second)"
        },
    },
    8: {
        // Archer
        "Invigorate": {
            reqLevel: 5,
            mpCost: 16,
            castTime: 0,
            cooldown: 10,
            duration: 180,
            description: "Increase movement speed"
        },
        "Hide": {
            reqLevel: 18,
            mpCost: 24,
            castTime: 0,
            cooldown: 3,
            duration: 0,
            description: "Stationary invisibility (2MP per second)"
        },       
        "Hawkeye (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase accuracy"
        },
        "Accelerate": {
            reqLevel: 28,
            mpCost: 16,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Increase movement speed of target"
        },
        "Rapid Fire": {
            reqLevel: 35,
            mpCost: 45,
            castTime: 0,
            cooldown: 45,
            duration: 0,
            description: "Increase attack speed (crossbow)"
        }
    },
    9: {
        // Sniper
         "Invigorate": {
            reqLevel: 5,
            mpCost: 16,
            castTime: 0,
            cooldown: 10,
            duration: 180,
            description: "Increase movement speed"
        },
        "Hide": {
            reqLevel: 18,
            mpCost: 24,
            castTime: 0,
            cooldown: 3,
            duration: 0,
            description: "Stationary invisibility (2MP per second)"
        },      
        "Hawkeye (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase accuracy"
        },
        "Accelerate": {
            reqLevel: 28,
            mpCost: 16,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Increase movement speed of target"
        },
        "Rapid Fire": {
            reqLevel: 35,
            mpCost: 45,
            castTime: 0,
            cooldown: 45,
            duration: 0,
            description: "Increase attack speed (crossbow)"
        },
        "Snipers Nest": {
            reqLevel: 45,
            mpCost: 45,
            castTime: 2,
            cooldown: 5,
            duration: 0,
            description: "Attack Power, Accuracy, Range buff while stationary (Bow, Crossbow)" 
        },
        "Kindling Arrow": {
            reqLevel: 50,
            mpCost: 41,
            castTime: 1,
            cooldown: 15,
            duration: 0,
            description: "AOE fire field (bow)"
        }
    },
    10: {
        // Hunter
          "Invigorate": {
            reqLevel: 5,
            mpCost: 16,
            castTime: 0,
            cooldown: 10,
            duration: 180,
            description: "Increase movement speed"
        },
        "Hide": {
            reqLevel: 18,
            mpCost: 24,
            castTime: 0,
            cooldown: 3,
            duration: 0,
            description: "Stationary invisibility (2MP per second)"
        },     
        "Hawkeye (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase accuracy"
        },
        "Accelerate": {
            reqLevel: 28,
            mpCost: 16,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Increase movement speed of target"
        },
        "Rapid Fire": {
            reqLevel: 35,
            mpCost: 45,
            castTime: 0,
            cooldown: 45,
            duration: 0,
            description: "Increase attack speed (crossbow)"
        },
        "Watchful Eye": {
            reqLevel: 45,
            mpCost: 44,
            castTime: 2,
            cooldown: 20,
            duration: 0,
            description: "Become stationary to see and attack invisible targets"
        },
        "Horse Archer": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 90,
            duration: 0,
            description: "Allows you to use certain skills while mounted"
        },
        "Arrow Fusillade (Passive)": {
            reqLevel: 50,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "+2 range and double attack with crossbow"
        }
    },
    11: {
        // Provocateur
           "Invigorate": {
            reqLevel: 5,
            mpCost: 16,
            castTime: 0,
            cooldown: 10,
            duration: 180,
            description: "Increase movement speed"
        },
        "Hide": {
            reqLevel: 18,
            mpCost: 24,
            castTime: 0,
            cooldown: 3,
            duration: 0,
            description: "Stationary invisibility (2MP per second)"
        },    
        "Shifty (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Dodge rate buff"
        },
        "Cloak": {
            reqLevel: 20,
            mpCost: 45,
            castTime: 2,
            cooldown: 20,
            duration: 0,
            description: "Mobile invisibility (3MP per second)"
        },
        "Third Eye": {
            reqLevel: 28,
            mpCost: 48,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Accuracy buff"
        }
    },
    12: {
        // Assassin
        "Invigorate": {
            reqLevel: 5,
            mpCost: 16,
            castTime: 0,
            cooldown: 10,
            duration: 180,
            description: "Increase movement speed"
        },
        "Hide": {
            reqLevel: 18,
            mpCost: 24,
            castTime: 0,
            cooldown: 3,
            duration: 0,
            description: "Stationary invisibility (2MP per second)"
        },   
        "Shifty (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Dodge rate buff"
        },
        "Cloak": {
            reqLevel: 20,
            mpCost: 45,
            castTime: 2,
            cooldown: 20,
            duration: 0,
            description: "Mobile invisibility (3MP per second)"
        },
        "Third Eye": {
            reqLevel: 28,
            mpCost: 48,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Accuracy buff"
        },
        "Furtive Steps (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "No cloaked movement penalty, minor MP regen buff"
        },
        "Counterpunch": {
            reqLevel: 50,
            mpCost: 0,
            castTime: 0,
            cooldown: 90,
            duration: 0,
            description: "Weak counter attack with knuckles"
        }
    },
    13: {
        // Saboteur
             "Invigorate": {
            reqLevel: 5,
            mpCost: 16,
            castTime: 0,
            cooldown: 10,
            duration: 180,
            description: "Increase movement speed"
        },
        "Hide": {
            reqLevel: 18,
            mpCost: 24,
            castTime: 0,
            cooldown: 3,
            duration: 0,
            description: "Stationary invisibility (2MP per second)"
        },  
        "Shifty (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Dodge rate buff"
        },
        "Cloak": {
            reqLevel: 20,
            mpCost: 45,
            castTime: 2,
            cooldown: 20,
            duration: 0,
            description: "Mobile invisibility (3MP per second)"
        },
        "Third Eye": {
            reqLevel: 28,
            mpCost: 48,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Accuracy buff"
        },
        "Treachery (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Can remain cloaked while placing traps"
        }
    },
    14: {
        // Acolyte
       "Meditation": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase MP regen"
        },
        "Heal": {
            reqLevel: 18,
            mpCost: 62,
            castTime: 2,
            cooldown: 3,
            duration: 0,
            description: "Heal target"
        },

    },
    15: {
        // Priest
        "Meditation": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase MP regen"
        },
        "Heal": {
            reqLevel: 18,
            mpCost: 62,
            castTime: 2,
            cooldown: 3,
            duration: 0,
            description: "Heal target"
        },       
        "Inspiration (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase SPI based on Prayer proficiency"
        },
        "Tranquil Mind": {
            reqLevel: 20,
            mpCost: 50,
            castTime: 5,
            cooldown: 20,
            duration: 120,
            description: "Increase MP regen for party"
        },
        "Divine Aid": {
            reqLevel: 28,
            mpCost: 89,
            castTime: 4,
            cooldown: 1.54,
            duration: 480,
            description: "Increase LP for party"
        },
        "Revive": {
            reqLevel: 35,
            mpCost: 65,
            castTime: 5,
            cooldown: 30,
            duration: 0,
            description: "Revive target"
        }
    },
    16: {
        // Cleric
         "Meditation": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase MP regen"
        },
        "Heal": {
            reqLevel: 18,
            mpCost: 62,
            castTime: 2,
            cooldown: 3,
            duration: 0,
            description: "Heal target"
        },      
        "Inspiration (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase SPI based on Prayer proficiency"
        },
        "Tranquil Mind": {
            reqLevel: 20,
            mpCost: 50,
            castTime: 5,
            cooldown: 20,
            duration: 120,
            description: "Increase MP regen for party"
        },
        "Divine Aid": {
            reqLevel: 28,
            mpCost: 89,
            castTime: 4,
            cooldown: 1.54,
            duration: 480,
            description: "Increase LP for party"
        },
        "Revive": {
            reqLevel: 35,
            mpCost: 65,
            castTime: 5,
            cooldown: 30,
            duration: 0,
            description: "Revive target"
        },
        "Sanctuary": {
            reqLevel: 45,
            mpCost: 87,
            castTime: 5,
            cooldown: 60,
            duration: 0,
            description: "AOE LP regen"
        },
        "Merciful Blessing (Passive)": {
            reqLevel: 50,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase strength of heals, First Aid is instant cast"
        }
    },
    17: {
        // Enchanter
          "Meditation": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase MP regen"
        },
        "Heal": {
            reqLevel: 18,
            mpCost: 62,
            castTime: 2,
            cooldown: 3,
            duration: 0,
            description: "Heal target"
        },     
        "Inspiration (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase SPI based on Prayer proficiency"
        },
        "Tranquil Mind": {
            reqLevel: 20,
            mpCost: 50,
            castTime: 5,
            cooldown: 20,
            duration: 120,
            description: "Increase MP regen for party"
        },
        "Divine Aid": {
            reqLevel: 28,
            mpCost: 89,
            castTime: 4,
            cooldown: 1.54,
            duration: 480,
            description: "Increase LP for party"
        },
        "Revive": {
            reqLevel: 35,
            mpCost: 65,
            castTime: 5,
            cooldown: 30,
            duration: 0,
            description: "Revive target"
        },
        "Enchantment": {
            reqLevel: 45,
            mpCost: 68,
            castTime: 0.5,
            cooldown: 1.5,
            duration: 480,
            description: "Aura power buff and magical attack power buff"
        },  
        "Karmic Aura (Passive)": {
            reqLevel: 50,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Toggle to enable AOE buffs"
        }
    },
    18: {
        // Ascetic
           "Meditation": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase MP regen"
        },
        "Heal": {
            reqLevel: 18,
            mpCost: 62,
            castTime: 2,
            cooldown: 3,
            duration: 0,
            description: "Heal target"
        },    
        "Blessed Garments (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Poison, Charm, and Magic resistance increase when gear is enhanced with holy"
        },
        "Mana Restore": {
            reqLevel: 20,
            mpCost: 32,
            castTime: 1.5,
            cooldown: 10,
            duration: 210,
            description: "Restore MP over time"
        },
        "Speedy Gale": {
            reqLevel: 28,
            mpCost: 55,
            castTime: 0,
            cooldown: 1,
            duration: 480,
            description: "Increase dodge rate"
        },
    },
    19: {
        // Monk
            "Meditation": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase MP regen"
        },
        "Heal": {
            reqLevel: 18,
            mpCost: 62,
            castTime: 2,
            cooldown: 3,
            duration: 0,
            description: "Heal target"
        },   
        "Blessed Garments (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Poison, Charm, and Magic resistance increase when gear is enhanced with holy"
        },
        "Mana Restore": {
            reqLevel: 20,
            mpCost: 32,
            castTime: 1.5,
            cooldown: 10,
            duration: 210,
            description: "Restore MP over time"
        },
        "Speedy Gale": {
            reqLevel: 28,
            mpCost: 55,
            castTime: 0,
            cooldown: 1,
            duration: 480,
            description: "Increase dodge rate" 
        }, 
        "Sound Mind (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Reduce duration of magic debuffs"
        },
        "Paralyzing Bond": {
            reqLevel: 50,
            mpCost: 47,
            castTime: 0,
            cooldown: 30,
            duration: 10,
            description: "Root target in place. Both you and target are immobile"
        }
    },
    20: {
        // Exorcist
             "Meditation": {
            reqLevel: 5,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase MP regen"
        },
        "Heal": {
            reqLevel: 18,
            mpCost: 62,
            castTime: 2,
            cooldown: 3,
            duration: 0,
            description: "Heal target"
        },  
        "Blessed Garments (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Poison, Charm, and Magic resistance increase when gear is enhanced with holy"
        },
        "Mana Restore": {
            reqLevel: 20,
            mpCost: 32,
            castTime: 1.5,
            cooldown: 10,
            duration: 210,
            description: "Restore MP over time"
        },
        "Speedy Gale": {
            reqLevel: 28,
            mpCost: 55,
            castTime: 0,
            cooldown: 1,
            duration: 480,
            description: "Increase dodge rate"
        },
        "Mana Swap": {
            reqLevel: 45,
            mpCost: 16,
            castTime: 2,
            cooldown: 10,
            duration: 0,
            description: "Swap MP with target"
        },
        "Soul Swap": {
            reqLevel: 50,
            mpCost: 21,
            castTime: 1,
            cooldown: 10,
            duration: 0,
            description: "Swap buffs with target"
        }
    },
    21: {
        // Mage
       "Fire Bolt": {
            reqLevel: 1,
            mpCost: 28,
            castTime: 0.8,
            cooldown: 2,
            duration: 0,
            description: "Fire a bolt of fire at target"
       },
       "Shock": {
            reqLevel: 12,
            mpCost: 44,
            castTime: 0.5,
            cooldown: 20,
            duration: 0,
            description: "Trip the target with electricity"
       }
    },
    22: {
        // Wizard
       "Fire Bolt": {
            reqLevel: 1,
            mpCost: 28,
            castTime: 0.8,
            cooldown: 2,
            duration: 0,
            description: "Fire a bolt of fire at target"
       },
       "Shock": {
            reqLevel: 12,
            mpCost: 44,
            castTime: 0.5,
            cooldown: 20,
            duration: 0,
            description: "Trip the target with electricity"
       },
       "Scholar (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Elemental proficiency increases elemental damage"
       }, 
       "Thunder Crash": {
            reqLevel: 20,
            mpCost: 78,
            castTime: 3.5,
            cooldown: 12,
            duration: 0,
            description: "Strike the target with electricity"
       }
    },
    23: {
        // Warlock
       "Fire Bolt": {
            reqLevel: 1,
            mpCost: 28,
            castTime: 0.8,
            cooldown: 2,
            duration: 0,
            description: "Fire a bolt of fire at target"
       },
       "Shock": {
            reqLevel: 12,
            mpCost: 44,
            castTime: 0.5,
            cooldown: 20,
            duration: 0,
            description: "Trip the target with electricity"
       },
       "Scholar (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Elemental proficiency increases elemental damage"
       }, 
       "Thunder Crash": {
            reqLevel: 20,
            mpCost: 78,
            castTime: 3.5,
            cooldown: 12,
            duration: 0,
            description: "Strike the target with electricity"
       },
       "Magical Aid": {
            reqLevel: 45,
            mpCost: 56,
            castTime: 2.5,
            cooldown: 15,
            duration: 0,
            description: "Increase strength of next magical attack"
       }
    },
    24: {
        // Conjurer
        "Fire Bolt": {
            reqLevel: 1,
            mpCost: 28,
            castTime: 0.8,
            cooldown: 2,
            duration: 0,
            description: "Fire a bolt of fire at target"
       },
       "Shock": {
            reqLevel: 12,
            mpCost: 44,
            castTime: 0.5,
            cooldown: 20,
            duration: 0,
            description: "Trip the target with electricity"
       },
       "Scholar (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Elemental proficiency increases elemental damage"
       }, 
       "Thunder Crash": {
            reqLevel: 20,
            mpCost: 78,
            castTime: 3.5,
            cooldown: 12,
            duration: 0,
            description: "Strike the target with electricity"
       },       
       "Teleport": {
            reqLevel: 45,
            mpCost: 24,
            castTime: 2,
            cooldown: 300,
            duration: 0,
            description: "Create a portal to a memorized a location outside of town"
       },
       "Memorize": {
            reqLevel: 45,
            mpCost: 10,
            castTime: 1,
            cooldown: 5,
            duration: 0,
            description: "Memorize a location outside of town"
       },
       "Intelleto": {
            reqLevel: 50,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase number of locations that can be memorized"
       },
       "Supreme Mind (Passive)": {
            reqLevel: 50,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increases power and reduces cooldown of invocation spells, soul bright is a 5s debuff"
       }
    },
    25: {
        // Sorcerer
         "Fire Bolt": {
            reqLevel: 1,
            mpCost: 28,
            castTime: 0.8,
            cooldown: 2,
            duration: 0,
            description: "Fire a bolt of fire at target"
       },
       "Shock": {
            reqLevel: 12,
            mpCost: 44,
            castTime: 0.5,
            cooldown: 20,
            duration: 0,
            description: "Trip the target with electricity"
       },       
       "Shadow Garments (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Fire, Ice, and Lightning resistance increase when gear is enhanced with dark"
       }
    },
    26: {
        // Corruptor
          "Fire Bolt": {
            reqLevel: 1,
            mpCost: 28,
            castTime: 0.8,
            cooldown: 2,
            duration: 0,
            description: "Fire a bolt of fire at target"
       },
       "Shock": {
            reqLevel: 12,
            mpCost: 44,
            castTime: 0.5,
            cooldown: 20,
            duration: 0,
            description: "Trip the target with electricity"
       },      
       "Shadow Garments (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Fire, Ice, and Lightning resistance increase when gear is enhanced with dark"
       },
       "Discomfort (Passive)": {
            reqLevel: 60,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Increase debuff duration +5%"
       }
    },
    27: {
        // Shadowblade
           "Fire Bolt": {
            reqLevel: 1,
            mpCost: 28,
            castTime: 0.8,
            cooldown: 2,
            duration: 0,
            description: "Fire a bolt of fire at target"
       },
       "Shock": {
            reqLevel: 12,
            mpCost: 44,
            castTime: 0.5,
            cooldown: 20,
            duration: 0,
            description: "Trip the target with electricity"
       },     
       "Shadow Garments (Passive)": {
            reqLevel: 20,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Fire, Ice, and Lightning resistance increase when gear is enhanced with dark"
       },
       "Dark Shield (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Reduce recoil damage from Gloom"
       },
       "Median Riding (Passive)": {
            reqLevel: 45,
            mpCost: 0,
            castTime: 0,
            cooldown: 0,
            duration: 0,
            description: "Gain ability to cast spells while mounted"
       }
    },
}

export { classSpecificSkillData };
const classSkillData = {
    0: {
        skills: [
            { id: 1, name: "Slash", skills: {
                "Slice": {
                    reqPoints: 8,
                    mpCost: 15,
                    castTime: 0,
                    cooldown: 10,
                    duration: 0,
                    description: "Double attack (1H weapons)"
                },
                "Whirling Strike": {
                    reqPoints: 12,
                    mpCost: 28,
                    castTime: 0,
                    cooldown: 15,
                    duration: 0,
                    description: "360 AOE knockback melee attack (2H swords)"
                },
                "Parry": {
                    reqPoints: 21,
                    mpCost: 9,
                    castTime: 0,
                    cooldown: 10,
                    duration: 2,
                    description: "Block enemy attacks and stun target if blocked (2H weapons, dagger)"
                },
                "Concentration": {
                    reqPoints: 26,
                    mpCost: 18,
                    castTime: 0,
                    cooldown: 20,
                    duration: 120,
                    description: "Increased accuracy of next attack"
                },
                "Brutal Strike": {
                    reqPoints: 41,
                    mpCost: 14,
                    castTime: 0,
                    cooldown: 10,
                    duration: 0,
                    description: "100% chance to ignore armor (melee weapons)"
                },
                "Swing": {
                    reqPoints: {
                        "Slash": 60,
                        "Dodge": 15
                    },
                    mpCost: 16,
                    castTime: 0,
                    cooldown: 0,
                    description: "360 AOE melee attack (no knockback) that grants +100 dodge for a short duration (sword)"
                },
                "Sword Mastery (Passive)": {
                    reqPoints: 61,
                    mpCost: 0,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Increased damage with swords and daggers (sword, dagger)"
                },
                "Dice": {
                    reqPoints: 71,
                    mpCost: 15,
                    castTime: 0,
                    cooldown: 10,
                    duration: 0,
                    description: "Replaces Slice, dealing three swift strikes with a chance to bleed (1H weapons and 2H swords)"
                },
                "Maximum Shoot": {
                    reqPoints: 81,
                    mpCost: 14,
                    castTime: 0,
                    cooldown: 15,
                    duration: 0,
                    description: "Replaces Brutal Strike, higher damage with chance to knockdown (melee weapons)"
                },
                "True Whirling Strike": {
                    reqPoints: 81,
                    mpCost: 28,
                    castTime: 0,
                    cooldown: 15,
                    duration: 0,
                    description: "Replaces Whirling Strike, higher damage and wider range (2H swords)"
                },
                "Finish Detonate": {
                    reqPoints: 90,
                    mpCost: 94,
                    castTime: 0,
                    cooldown: 180,
                    duration: 0,
                    description: "Strong single-target attack with a long cooldown and high MP cost"
                }
            }},
            { id: 2, name: "Thrust", skills: {
            "Heave": {
                reqPoints: 8,
                mpCost: 16,
                castTime: 2,
                cooldown: 10,
                duration: 0,
                description: "Pierces through all enemies in front of you"
            },
            "Triple Stab": {
                reqPoints: 26,
                mpCost: 22,
                castTime: 0,
                cooldown: 30,
                duration: 0,
                description: "Triple attack (spear)"
            },
            "Dismounting Stab": {
                reqPoints: 35,
                mpCost: 28,
                castTime: 0,
                cooldown: 90,
                duration: 60,
                description: "Attack with a buff that gives a chance to dismount target"
            },
            "Spear Volley": {
                reqPoints: 41,
                mpCost: 24,
                castTime: 1,
                cooldown: 30,
                duration: 0,
                description: "Ranged attack with spear"
            },
            "Quadruple Stab": {
                reqPoints: 54,
                mpCost: 43,
                castTime: 0,
                cooldown: 16,
                duration: 0,
                description: "Quadruple attack (spear), bonus damage if comboed with Triple Stab"
            },
            "Sonic Sting": {
                reqPoints: {
                    "Thrust": 60,
                    "Ranged": 15
                },
                mpCost: 39,
                castTime: 1.5,
                cooldown: 31,
                duration: 0,
                description: "Ranged spear attack"
            },
            "Neck Press": {
                reqPoints: {
                    "Thrust": 60,
                    "Defend": 15
                },
                mpCost: 39,
                castTime: 0,
                cooldown: 30,
                duration: 0,
                description: "Interrupts enemy casting"
            },
            "Lance Mastery (Passive)": {
                reqPoints: 61,
                mpCost: 0,
                castTime: 0,
                cooldown: 0,
                duration: 0,
                description: "Increased attack range with spears"
            },
            "Horse Assault": {
                reqPoints: 71,
                mpCost: 13,
                castTime: 0,
                cooldown: 7,
                duration: 0,
                description: "Bonus damage vs mounted enemies and chance to dismount enemies (speaer)"
            },
            "Assault": {
                reqPoints: 81,
                mpCost: 24,
                castTime: 0,
                cooldown: 15,
                duration: 0,
                description: "Rush forward and deal multiple hits of damage in a frontal cone AOE"
            },
            "Godlike": {
                reqPoints: 90,
                mpCost: 52,
                castTime: 1.5,
                cooldown: 30,
                duration: 0,
                description: "Strong single target attack with knockback"
            }
            }},
            { id: 3, name: "Cleave", skills: {
            "Clobber": {
                reqPoints: 8,
                mpCost: 19,
                castTime: 0,
                cooldown: 25,
                duration: 0,    
                description: "Attack + increased chance of a critical hit (axe, unusable by ascetics)"
            },
            "Riposte": {
                reqPoints: 12,
                mpCost: 12,
                castTime: 0.5,
                cooldown: 10,
                duration: 2,
                description: "Immobile defensive stance that counter attacks if hit during the duration (2H weapons)"
        },
            "Roar": {
                reqPoints: 21,
                mpCost: 30,
                castTime: 0,
                cooldown: 120,
                duration: 60,
                description: "Increased critical hit rate (axe)"
            },
            "Split": {
                reqPoints: 41,
                mpCost: 22,
                castTime: 0,
                cooldown: 20,
                duration: 0,
                description: "Short range frontal AOE attack (axe)"
            },
            "Full Swing": {
                reqPoints: {
                    "Cleave": 60,
                    "Dodge": 15
                },
                mpCost: 16,
                castTime: 0,
                cooldown: 10,
                duration: 0,
                description: "360 AOE melee attack (no knockback) that grants +100 dodge for a short duration (axe)"
            },
            "Axe Mastery (Passive)": {
                reqPoints: 61,
                mpCost: 0,
                castTime: 0,
                cooldown: 0,
                duration: 0,
                description: "Increased critical damage with axes"
            },
            "Desperate Strike": {
                reqPoints: 71,
                mpCost: 36,
                castTime: 0,
                cooldown: 15,
                duration: 0,
                description: "Attack with a chance to stun target, stuns you on failure"
            },
            "Grand Quake": {
                reqPoints: {
                    "Cleave": 78,
                    "Bash": 26
                },
                mpCost: 198,
                castTime: 0,
                cooldown: 40,
                duration: 0,
                description: "Short ranged AOE attack with 100% chance to interrupt casting"
            },
            "Dragon Tail": {
                reqPoints: 81,
                mpCost: 120,
                castTime: 0,
                cooldown: 60,
                duration: 0,
                description: "Frontal AOE cleave that deals a small amount of damage as recoil"
            },
            "Fatal Scratch": {
                reqPoints: 90,
                mpCost: 175,
                castTime: 0,
                cooldown: 300,
                duration: 0,
                description: "A strong 360 AOE attack that deals damage as recoil if missed"
            }
            }},
            { id: 4, name: "Bash", skills: {
            "Stun": {
                reqPoints: 8,
                mpCost: 15,
                castTime: 0,
                cooldown: 8,
                duration: 0,
                description: "Attack + 30% chance to stun (blunt, 2H blunt, wand)"
            },
            "Ground Shock": {
                reqPoints: 26,
                mpCost: 38,
                castTime: 0,
                cooldown: 18,
                duration: 0,
                description: "Attack + chance to interrupt casting (blunt, axe, wand)"
            },
            "Stun Hammer": {
                reqPoints: {
                    "Bash": 41,
                    "Exorcism": 21
                },
                mpCost: 30,
                castTime: 0,
                cooldown: 15,
                duration: 0,
                description: "Attack and AOE stun (blunt, 2H blunt)"
            },
            "Shatter Armor": {
                reqPoints: 50,
                mpCost: 30,
                castTime: 0,
                cooldown: 15,
                duration: 0,
                description: "Attack with a chance to break enemy armor and interrupt casting (blunt, 2H blunt, wand)"
            },
            "Shield Break": {
                reqPoints: 61,
                mpCost: 22,
                castTime: 0,
                cooldown: 10,
                duration: 0,
                description: "Knock target out of blocking or defensive march"
            },
            "Subvert": {
                reqPoints: 71,
                mpCost: 69,
                castTime: 0.5,
                cooldown: 25,
                duration: 0,
                description: "Attack that scales with enemy defense"
            },
            "Rock Crash": {
                reqPoints: 81,
                mpCost: 120,
                castTime: 2.5,
                cooldown: 60,
                duration: 0,
                description: "Strong single target attack"
            },
            }},
            { id: 5, name: "Defend", skills: {
            "Blocking": {
                reqPoints: 8,
                mpCost: 5,
                castTime: 0,
                cooldown: 2,
                duration: 0,
                description: "Stationary blocking mode"
            },
            "Shield Bash": {
                reqPoints: 12,
                mpCost: 14,
                castTime: 0,
                cooldown: 10,
                duration: 2,
                description: "Trip enemies who attack you while blocking"
            },
            "Parapet": {
                reqPoints: 21,
                mpCost: 25,
                castTime: 2,
                cooldown: 30,
                duration: 120,
                description: "Increase critical hit resistance, lowers dodge"
            },
            "Auto-guard": {
                reqPoints: 26,
                mpCost: 20,
                castTime: 0,
                cooldown: 30,
                duration: 120,
                description: "Chance to reduce damage taken (shield)"    
            },
            "Shield Charge": {
                reqPoints: 31,
                mpCost: 18,
                castTime: 0,
                cooldown: 10,
                duration: 0,
                description: "Charge forward and knockdown enemies in your path"
            },
            "Defensive March": {
                reqPoints: 41,
                mpCost: 10,
                castTime: 0,
                cooldown: 5,
                duration: 0,
                description: "Move while blocking"
            },
            "Guardian": {
                reqPoints: 54,
                mpCost: 16,
                castTime: 4,
                cooldown: 10,
                duration: 300,
                description: "Take all damage for a party member"
            },
            "Eternal Dirge": {
                reqPoints: 61,
                mpCost: 74,
                castTime: 0,
                cooldown: 20,
                duration: 0,
                description: "AOE that prevents all skills from being used while active"
            },
        }},
        ]},
    6: {
        skills: [
            { id: 7, name: "Shot", skills: {
                "Flaming Arrow": {
                    reqPoints: 8,
                    mpCost: 12,
                    castTime: 0,
                    cooldown: 30,
                    duration: 0,
                    description: "Ranged attack with a chance to burn (bow, crossbow)"
                },
                "Cobra Arrow": {
                    reqPoints: 12,
                    mpCost: 12,
                    castTime: 0,
                    cooldown: 30,
                    duration: 0,
                    description: "Ranged attack with a chance to poison (bow, crossbow)"
                },
                "Arrow Rain": {
                    reqPoints: 26,
                    mpCost: 15,
                    castTime: 1,
                    cooldown: 5,
                    duration: 0,
                    description: "AOE attack over target (bow)"
                },
                "Multi Shot": {
                    reqPoints: {
                        "Shot": 41,
                        "Trap": 21
                    },
                    mpCost: 20,
                    castTime: 0,
                    cooldown: 30,
                    duration: 0,
                    description: "Fire five arrows at once (crossbow)"
                },
                "Charge Shot": {
                    reqPoints: {
                        "Shot": 50,
                        "Trap": 21
                    },
                    mpCost: 18,
                    castTime: 0,
                    cooldown: 30,
                    duration: 0,
                    description: "Deal damage and knockback target (bow, crossbow)"
                },
                "Silence Arrow": {
                    reqPoints: 54,
                    mpCost: 33,
                    castTime: 0,
                    cooldown: 10,
                    duration: 0,
                    description: "Silence target (bow)"
                },
                "Arrow Storm": {
                    reqPoints: 61,
                    mpCost: 15,
                    castTime: 1,
                    cooldown: 5,
                    duration: 0,
                    description: "AOE attack over target (bow), replaces Arrow Rain"
                },
                "Arrow Mastery (Passive)": {
                    reqPoints: 71,
                    mpCost: 49,
                    castTime: 0,
                    cooldown: 30,
                    duration: 0,
                    description: "Pin target in place if hit from the back (bow, crossbow)"
                },
                "Piercing Shot": {
                    reqPoints: 81,
                    mpCost: 22,
                    castTime: 0,
                    cooldown: 8,
                    duration: 0,
                    description: "Shoot an arrow that pierces the target"
                },
                "Cataract": {
                    reqPoints: 90,
                    mpCost: 54,
                    castTime: 0,
                    cooldown: 90,
                    duration: 0,
                    description: "Deal increased damage to the front of target, reduce damage taken from the front, but increase damage taken from the back. reduces movement speed"
                }
            }},
            { id: 8, name: "Alchemy", skills: {
                "Poison Making": {
                    reqPoints: 8,
                    mpCost: 3,
                    castTime: 1,
                    cooldown: 0,
                    duration: 0,
                    description: "Creates Poison vials (Deadly Nightshade x1, Container x1)"
                },
                "Toxify": {
                    reqPoints: 12,
                    mpCost: 15,
                    castTime: 2,
                    cooldown: 10,
                    duration: 120,
                    description: "Coat weapon with poison"
                },
                "Serum": {
                    reqPoints: 26,
                    mpCost: 3,
                    castTime: 1,
                    cooldown: 0,
                    duration: 0,
                    description: "Create an antidote to remove poison (Antidote Herb x1, Container x1)"
                },
                "Potion Crafting": {
                    reqPoints: 41,
                    mpCost: 3,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Create a mysterious potion to cure disease, silence, and burn (Moonlight Herb x1, Aquilegia x1, Container x1)"
                },
                "Befuddle": {
                    reqPoints: 50,
                    mpCost: 31,
                    castTime: 0,
                    cooldown: 0,
                    duration: 150,
                    description: "Strike to reduce target's casting speed"
                },
                "Toxic Aura (Passive)": {
                    reqPoints: 61,
                    mpCost: 0,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Increased damage with poison when using Toxify"
                },
                "Surveillance": {
                    reqPoints: 71,
                    mpCost: 44,
                    castTime: 0.5,
                    cooldown: 20,
                    duration: 10,
                    description: "See enemy traps for 10 seconds"
                },
                "Seudoro-ga": {
                    reqPoints: 81,
                    mpCost: 1,
                    castTime: 0,
                    cooldown: 60,
                    duration: 30,
                    description: "Drink a mysterious potion to gain a temporary buff, increase accuracy, prevent taking critical hits"
                },
                "Overdose": {
                    reqPoints: 90,
                    mpCost: 25,
                    castTime: 0,
                    cooldown: 45,
                    duration: 0,
                    description: "Drinking a potion will heal the party for a large amount"
                }
            }},
            { id: 9, name: "Assassination", skills: {
                "Backstab": {
                    reqPoints: 8,
                    mpCost: 15,
                    castTime: 0,
                    cooldown: 30,
                    duration: 0,
                    description: "Attack enemy from behind"
                },
                "Dagger Throw": {
                    reqPoints: 12,
                    mpCost: 10,
                    castTime: 0,
                    cooldown: 5,
                    duration: 0,
                    description: "Throw a dagger at target (dagger)"
                },
                "Rush": {
                    reqPoints: 26,
                    mpCost: 30,
                    castTime: 0,
                    cooldown: 90,
                    duration: 20,
                    description: "Each attack hits twice, caster takes more damage (dagger, knuckles)"
                },
                "Blindside": {
                    reqPoints: 41,
                    mpCost: 15,
                    castTime: 0,
                    cooldown: 10,
                    duration: 0,
                    description: "While cloaked, trips target, does not remove cloak"
                },
                "Pierce Armor": {
                    reqPoints: 54,
                    mpCost: 15,
                    castTime: 0,
                    cooldown: 10,
                    duration: 0,
                    description: "Attack that ignores armor, bonus damage against knocked down targets"
                },
                "Double-Cross": {
                    reqPoints: 71,
                    mpCost: 58,
                    castTime: 0,
                    cooldown: 55,
                    duration: 0,
                    description: "Attack back of target to reset all skill cooldowns (dagger, knuckles), only against other players"
                },
                "Killing Time": {
                    reqPoints: 81,
                    mpCost: 20,
                    castTime: 0,
                    cooldown: 15,
                    duration: 0,
                    description: "Can be used while hiding, deals a heavy blow from behind"
                },
                "Overkill": {
                    reqPoints: 90,
                    mpCost: 70,
                    castTime: 0,
                    cooldown: 60,
                    duration: 0,
                    description: "Killed target cannot be revived"
                }
            }},
            { id: 10, name: "Trap", skills: {
                "Disarm": {
                    reqPoints: 8,
                    mpCost: 10,
                    castTime: 1,
                    cooldown: 10,
                    duration: 0,
                    description: "Remove nearby traps"
                },
                "Tangled Legs": {
                    reqPoints: 16,
                    mpCost: 20,
                    castTime: 1.5,
                    cooldown: 3,
                    duration: 0,
                    description: "Root target for 3 seconds (Trap x1)"
                },
                "Plant Mine": {
                    reqPoints: 26,
                    mpCost: 30,
                    castTime: 1.5,
                    cooldown: 3,
                    duration: 0,
                    description: "Plant a mine that explodes on target (Trap x1)"
                },
                "Worm Bomb": {
                    reqPoints: 41,
                    mpCost: 33,
                    castTime: 3,
                    cooldown: 5, 
                    duration: 0,
                    description: "Trap that crawls forward and explodes on target (Trap x1)"
                },
                "Safe Zone": {
                    reqPoints: 50,
                    mpCost: 46,
                    castTime: 1.5,
                    cooldown: 8,
                    duration: 0,
                    description: "Create a field that prevents field spells from being used or doing damage"
                },
                "Stone Prison": {
                    reqPoints: 61,
                    mpCost: 48,
                    castTime: 1.5,
                    cooldown: 3,
                    duration: 0,
                    description: "Create a stone prison around mounted target (Trap x1)"
                },
                "Mind Warp": {
                    reqPoints: 71,
                    mpCost: 48,
                    castTime: 1.5,
                    cooldown: 3,
                    duration: 0,
                    description: "Trap that reduces target's MP (Trap x1)"
                },
                "Poison Bomb": {
                    reqPoints: 81,
                    mpCost: 48,
                    castTime: 8,
                    cooldown: 3,
                    duration: 0,
                    description: "Trap that explodes on target, deals damage and poisons (Trap x1)"
                },
                "Oil Bomb": {
                    reqPoints: 90,
                    mpCost: 62,
                    castTime: 6,
                    cooldown: 30,
                    duration: 0,
                    description: "Trap that moves forward and explodes on target, deals damage (Trap x1)"
                }
            }},
            { id: 11, name: "Dodge", skills: {
                "Backstep": {
                    reqPoints: 3,
                    mpCost: 5,
                    castTime: 0,
                    cooldown: 3,
                    duration: 1,
                    description: "Step back and increase dodge by 100 for 1 second"
                },
                "Dash": {
                    reqPoints: 8,
                    mpCost: 18,
                    castTime: 0,
                    cooldown: 30,
                    duration: 2,
                    description: "Dash forward"
                },
                "Quick Step": {
                    reqPoints: 16,
                    mpCost: 35,
                    castTime: 0.5,
                    cooldown: 90,
                    duration: 60,
                    description: "Increased dodge"
                },
                "Tangled Fingers": {
                    reqPoints: 21,
                    mpCost: 22,
                    castTime: 0.8,
                    cooldown: 30,
                    duration: 30,
                    description: "Reduce target's accuracy"
                },
                "Reinforce (Passive)": {
                    reqPoints: 26,
                    mpCost: 0,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Knockdown/Knockback/Freeze resistance"
                },
                "Avoidance": {
                    reqPoints: 41,
                    mpCost: 38,
                    castTime: 0.5,
                    cooldown: 30,
                    duration: 0,
                    description: "Increased dodge until hit by two physical attacks"
                },
                "Intuition (Passive)": {
                    reqPoints: 50,
                    mpCost: 0,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Chance to dodge magic"
                },
                "Bolster": {
                    reqPoints: 66,
                    mpCost: 29,
                    castTime: 1,
                    cooldown: 1.5,
                    duration: 2,
                    description: "Cast Dash on target"
                },
                "Move Stream": {
                    reqPoints: 81,
                    mpCost: 60,
                    castTime: 0,
                    cooldown: 25,
                    duration: 2,
                    description: "Cast Dash on all party members in range"
                },
                "Sprint": {
                    reqPoints: 90,
                    mpCost: 18,
                    castTime: 0,
                    cooldown: 30,
                    duration: 2,
                    description: "Dash forward"
                },
                "Spurt": {
                    reqPoints: 90,
                    mpCost: 18,
                    castTime: 0,
                    cooldown: 30,
                    duration: 2,
                    description: "Dash forward"
                }
            }},
        ]
    },
    12: {
        skills: [
            { id: 13, name: "Grace", skills: {
                "First Aid": {
                    reqPoints: 8,
                    mpCost: 28,
                    castTime: 1,
                    cooldown: 4,
                    duration: 0,
                    description: "Restore HP based on level, expertise, and INT"
                },
                "Cleanse": {
                    reqPoints: 12,
                    mpCost: 15,
                    castTime: 1,
                    cooldown: 3,
                    duration: 0,
                    description: "Cure Poison"
                },
                "Regenerate": {
                    reqPoints: 21,
                    mpCost: 40,
                    castTime: 1.5,
                    cooldown: 5,
                    duration: 120,
                    description: "Every few seconds, restore HP based on SPI and expertise"
                },
                "Vivify": {
                    reqPoints: 26,
                    mpCost: 18,
                    castTime: 1,
                    cooldown: 3,
                    duration: 0,
                    description: "Cure sleep/knock out/freeze"
                },
                "Restoration": {
                    reqPoints: 41,
                    mpCost: 90,
                    castTime: 3,
                    cooldown: 20,
                    duration: 120,
                    description: "Restore party HP over time based on level, expertise, and INT"
                },
                "Healing Aura": {
                    reqPoints: 54,
                    mpCost: 256,
                    castTime: 2,
                    cooldown: 30,
                    duration: 0,
                    description: "Heal party members in range"
                },
                "Purify": {
                    reqPoints: 71,
                    mpCost: 76,
                    castTime: 1.5,
                    cooldown: 35,
                    duration: 15,
                    description: "Cures all debuffs and increases resistance to debuffs for 15 seconds"
                },
                "Sacrifice": {
                    reqPoints: 81,
                    mpCost: 0,
                    castTime: 0,
                    cooldown: 300,
                    duration: 0,
                    description: "Sacrifice self to restore a party member's HP, consumes 5 Holy Waters"
                }
            }},
            { id: 14, name: "Blessing", skills: {
                "Velox": {
                    reqPoints: 8,
                    mpCost: 26,
                    castTime: 0.5,
                    cooldown: 1.5,
                    duration: 480,
                    description: "Increase player's attack speed"
                },
                "Lapis Mediow": {
                    reqPoints: 12,
                    mpCost: 22,
                    castTime: 0.5,
                    cooldown: 1.5,
                    duration: 480,
                    description: "Increase player's defense"
                },  
                "Impedimentia": {
                    reqPoints: 21,
                    mpCost: 33,
                    castTime: 1.5,
                    cooldown: 10,
                    duration: 10,
                    description: "Reduce target's movement speed"
                },
                "Group Barrier": {
                    reqPoints: 26,
                    mpCost: 70,
                    castTime: 1,
                    cooldown: 1.5,
                    duration: 120,
                    description: "Physical damage reduction on all party members in range"
                }, 
                "Aqua Elimus": {
                    reqPoints: 41,
                    mpCost: 4,
                    castTime: 1,
                    cooldown: 0,
                    duration: 0,
                    description: "Craft one Holy Water (Container x1)"
                },  
                "Saltio": {
                    reqPoints: 54,
                    mpCost: 37,
                    castTime: 0,
                    cooldown: 5,
                    duration: 90,
                    description: "Cure Poison"
                },  
                "Proelium": {
                    reqPoints: 61,
                    mpCost: 78,
                    castTime: 0.5,
                    cooldown: 1.5,
                    duration: 480,
                    description: "Increase player's STR, AGI, and INT"
                },  
                "Locomitigation": {
                    reqPoints: 81,
                    mpCost: 100,
                    castTime: 1,
                    cooldown: 10,
                    duration: 120,
                    description: "Reduce party members' critical damage taken"
                },  
                "Spirit Protection": {
                    reqPoints: 90,
                    mpCost: 143,
                    castTime: 1,
                    cooldown: 30,
                    duration: 90,
                    description: "Reduce party members' aura damage taken"
                },  
		}},
            { id: 15, name: "Exorcism", skills: {
                "Pure Arrow": {
                    reqPoints: 8,
                    mpCost: 18,
                    castTime: 1,
                    cooldown: 5,
                    duration: 0,
                    description: "Shoot a holy projectile"
                },
                "Elemental Absorption": {
                    reqPoints: 12,
                    mpCost: 60,
                    castTime: 0.8,
                    cooldown: 10,
                    duration: 1,
                    description: "Reduce elemental damage taken"
                },
                "Bless Weapon": {
                    reqPoints: 26,
                    mpCost: 30,
                    castTime: 1.5,
                    cooldown: 1.5,
                    duration: 480,
                    description: "Embue weapon with holy aura"
                },
                "Remedium": {
                    reqPoints: 41,
                    mpCost: 26,
                    castTime: 1,
                    cooldown: 5,
                    duration: 0,
                    description: "Dispel a single disorder"
                },
                "Holy Rays": {
                    reqPoints: 54,
                    mpCost: 132,
                    castTime: 6,
                    cooldown: 60,
                    duration: 0,
                    description: "Rain holy beams from above"
                },
                "Banish": {
                    reqPoints: 61,
                    mpCost: 0,
                    castTime: 5,
                    cooldown: 10,
                    duration: 0,
                    description: "Banish a summoned object or monster"
                },
                "Devotion": {
                    reqPoints: {
                        "Exorcism": 61,
                        "Blessing": 26
                    },
                    mpCost: 50,
                    castTime: 3,
                    cooldown: 0.5,
                    duration: 300,
                    description: "All MP costs of targeted party member are taken from your MP pool"
                },
                "Silent Void": {
                    reqPoints: 61,
                    mpCost: 93,
                    castTime: 5,
                    cooldown: 12,
                    duration: 120,
                    description: "Create a field that negates all field spells, targeted and non-targeted"
                },
                "Twinkle Extreme": {
                    reqPoints: 81,
                    mpCost: 110,
                    castTime: 3,
                    cooldown: 10,
                    duration: 0,
                    description: "Implant a holy bomb in target, delayed explosion does large damage based on INT"
                },
                "Abstention": {
                    reqPoints: 90,
                    mpCost: 77,
                    castTime: 3,
                    cooldown: 60,
                    duration: 0,
                    description: "Prevent target from using field spells until debuff expires"
                }
            }},
            { id: 16, name: "Hymn", skills: {
                "Green Song": {
                    reqPoints: 8,
                    mpCost: 30,
                    castTime: 0,
                    cooldown: 5,
                    duration: 0,
                    description: "Increase accuracy and dodge for those in song range"
                },
                "Luminous Chant (Passive)": {
                    reqPoints: 12,
                    mpCost: 0,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Gain ability to move while chanting"
                },
                "Blue Song": {
                    reqPoints: {
                        "Hymn": 30,
                        "Blessing": 71
                    },
                    mpCost: 33,
                    castTime: 0,
                    cooldown: 5,
                    duration: 0,
                    description: "Increase magical damage and decrease skill cooldowns for all in song range"
                },
                "Yellow Song": {
                    reqPoints: {
                        "Hymn": 20,
                        "Grace": 61
                    },
                    mpCost: 33,
                    castTime: 0,
                    cooldown: 5,
                    duration: 0,
                    description: "Players in song range gain immunity to damage below a certain threshold"
                },
                "Red Song": {
                    reqPoints: {
                        "Hymn": 30,
                        "Exorcism": 30
                    },
                    mpCost: 100,
                    castTime: 0,
                    cooldown: 6,
                    duration: 0,
                    description: "Damage LP and MP for all enemies in range"
                },
            }}
        ]
    },
    17: {
        skills: [
            { id: 18, name: "Elemental", skills: {
                "Hailstone": {
                    reqPoints: 8,
                    mpCost: 18,
                    castTime: 0.3,
                    cooldown: 2,
                    duration: 4,
                    description: "Hurl a ball of ice at the enemy, dealing ice damage"
                },
                "Thunder Ball": {
                    reqPoints: 12,
                    mpCost: 50,
                    castTime: 2,
                    cooldown: 5,
                    duration: 0,
                    description: "Launch a ball of lightning that damages all enemies in range"
                },
                "Ice Spear": {
                    reqPoints: 21,
                    mpCost: 59,
                    castTime: 1.5,
                    cooldown: 5,
                    duration: 0,
                    description: "Hurl a spear of ice at the enemy, dealing ice damage"
                },
                "Firestorm": {
                    reqPoints: 26,
                    mpCost: 100,
                    castTime: 6,
                    cooldown: 30,
                    duration: 5,
                    description: "Summon a firestorm that damages all enemies in range"
                },
                "Resist Fire": {
                    reqPoints: 33,
                    mpCost: 32,
                    castTime: 1.5,
                    cooldown: 3.5,
                    duration: 20,
                    description: "Reduce fire damage taken, increase ice and lightning damage taken"
                },
                "Resist Ice": {
                    reqPoints: 35,
                    mpCost: 32,
                    castTime: 1.5,
                    cooldown: 3.5,
                    duration: 20,
                    description: "Reduce ice damage taken, increase fire and lightning damage taken"
                },
                "Resist Lightning": {
                    reqPoints: 41,
                    mpCost: 32,
                    castTime: 1.5,
                    cooldown: 3.5,
                    duration: 20,
                    description: "Reduce lightning damage taken, increase fire and ice damage taken"
                },
                "Ice Storm": {
                    reqPoints: 54,
                    mpCost: 112,
                    castTime: 7.5,
                    cooldown: 20,
                    duration: 3,
                    description: "Summon a storm of ice that damages all enemies in range"
                },
                "Delay Bomb": {
                    reqPoints: 61,
                    mpCost: 61,
                    castTime: 2,
                    cooldown: 6,
                    duration: 0,
                    description: "Implant a bomb in target, delayed explosion does large damage based on INT"
                },
                "Thunderstorm": {
                    reqPoints: {
                        "Elemental": 61,
                        "Exorcism": 40
                    },
                    mpCost: 227,
                    castTime: 20,
                    cooldown: 20,
                    duration: 0,
                    description: "Call down a storm of lightning bolts in an area"
                },
                "Meteor Storm": {
                    reqPoints: {
                        "Elemental": 61,
                        "Invocation": 40
                    },
                    mpCost: 312,
                    castTime: 20,
                    cooldown: 20,
                    duration: 0,
                    description: "Unleash a massive meteor storm, dealing heavy damage to all enemies nearby"
                },
                "Despair Swamp": {
                    reqPoints: {
                        "Elemental": 61,
                        "Confusion": 40
                    },
                    mpCost: 256,
                    castTime: 21,
                    cooldown: 20,
                    duration: 0,
                    description: "Summon a swamp that damages, slows, and poisons all enemies in range"
                },
                "Ice Tempest": {
                    reqPoints: 71,
                    mpCost: 287,
                    castTime: 7.5,
                    cooldown: 20,
                    duration: 0,
                    description: "Summon a storm of ice that damages all enemies in range"
                },
                "Cremation": {
                    reqPoints: 81,
                    mpCost: 650,
                    castTime: 4,
                    cooldown: 50,
                    duration: 0,
                    description: "Big damage to all enemies in range"
                },
                "Glitter Discharge": {
                    reqPoints: 90,
                    mpCost: 132,
                    castTime: 1,
                    cooldown: 120,
                    duration: 0,
                    description: "Lightning shield on caster"
                }
            }},
            { id: 19, name: "Invocation", skills: {
                "Soul Bright": {
                    reqPoints: 8,
                    mpCost: 14,
                    castTime: 1,
                    cooldown: 6,
                    duration: 0,
                    description: "Reveal nearby invisible enemies"
                },
                "Mana Shield": {
                    reqPoints: 21,
                    mpCost: 24,
                    castTime: 3,
                    cooldown: 10,
                    duration: 0,
                    description: "Damage taken is reduced, taking some damage as MP"
                },
                "Clear Mind": {
                    reqPoints: 31,
                    mpCost: 59,
                    castTime: 5,
                    cooldown: 1.5,
                    duration: 80,
                    description: "Increased spell interrupt resistance"
                },
                "Psychic Blades": {
                    reqPoints: 41,
                    mpCost: 39,
                    castTime: 3.5,
                    cooldown: 10,
                    duration: 0,
                    description: "Release 3 blades of energy that damage all enemies in their path. Deals bonus damage based on enemy defense"
                },
                "Summon Wall": {
                    reqPoints: 50,
                    mpCost: 79,
                    castTime: 5,
                    cooldown: 90,
                    duration: 180,
                    description: "Create a wall that blocks all damage"
                },
                "Summon Sandman": {
                    reqPoints: 61,
                    mpCost: 58,
                    castTime: 7,
                    cooldown: 30,
                    duration: 10,
                    description: "Summon a sandstorm that knocks back enemies, sleeping, and damaging them"
                },
                "Summon Plant": {
                    reqPoints: 71,
                    mpCost: 192,
                    castTime: 2,
                    cooldown: 60,
                    duration: 180,
                    description: "Summon an elemental plant that damages all enemies in range. Element depends on weapon enhancement (+5 = 50, +8 = 70)"
                },
                "Regia Pureizu": {
                    reqPoints: {
                        "Invocation": 78,
                        "Elemental": 40
                    },
                    mpCost: 60,
                    castTime: 1.5,
                    cooldown: 1.5,
                    duration: 60,
                    description: "Revive a fallen ally"
                },
                "Summon Wyvern": {
                    reqPoints: 81,
                    mpCost: 520,
                    castTime: 10,
                    cooldown: 60,
                    duration: 60,
                    description: "Summon a wyvern that damages all enemies in range"
                },
                "Summon Turtle": {
                    reqPoints: 90,
                    mpCost: 700,
                    castTime: 15,
                    cooldown: 300,
                    duration: 0,
                    description: "Summon a turtle that damages all enemies in range"
                }
            }},
            { id: 20, name: "Darkness", skills: {
                "Poison": {
                    reqPoints: 8,
                    mpCost: 24,
                    castTime: 2,
                    cooldown: 5,
                    duration: 60,
                    description: "Poison the target, dealing damage over time"
                },
                "Gloom": {
                    reqPoints: 12,
                    mpCost: 38,
                    castTime: 2,
                    cooldown: 10,
                    duration: 120,
                    description: "Embue weapon with dark aura, damaging yourself with recoil"
                },
                "Blood Drain": {
                    reqPoints: 21,
                    mpCost: 32,
                    castTime: 1,
                    cooldown: 10,
                    duration: 0,
                    description: "Drain life from the target and heal yourself"
                },
                "Mind Venom": {
                    reqPoints: 26,
                    mpCost: 33,
                    castTime: 2.5,
                    cooldown: 10,
                    duration: 0,
                    description: "Poison the target's mind, dealing damage over time"
                },
                "Dispel": {
                    reqPoints: 33,
                    mpCost: 26,
                    castTime: 1,
                    cooldown: 15,
                    duration: 0,
                    description: "Dispel a buff from target"
                },
                "Resist Malice": {
                    reqPoints: 35,
                    mpCost: 32,
                    castTime: 1.5,
                    cooldown: 3.5,
                    duration: 20,
                    description: "Reduce dark damage taken, greatly reducing charm resistance"
                },
                "Undermine": {
                    reqPoints: 41,
                    mpCost: 26,
                    castTime: 0.5,
                    cooldown: 10,
                    duration: 0,
                    description: "Increase damage of the next attack on target"
                },
                "Pestilence": {
                    reqPoints: 54,
                    mpCost: 62,
                    castTime: 1,
                    cooldown: 10,
                    duration: 0,
                    description: "Deal poison damage to all enemies in range"
                },
                "Equalize (Passive)": {
                    reqPoints: 61,
                    mpCost: 0,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Chance to remove a buff from target on hit"
                },
                "Dark Frenzy": {
                    reqPoints: 71,
                    mpCost: 122,
                    castTime: 3,
                    cooldown: 10,
                    duration: 6,
                    description: "Summon darkness from the abyss to damage all enemies in range"
                },
                "Ramkyado": {
                    reqPoints: {
                        "Darkness": 78,
                        "Slash": 26
                    },
                    mpCost: 15,
                    castTime: 0,
                    cooldown: 8,
                    duration: 0,
                    description: "Slice enemy with weapon"
                },
                "Bind Criminal": {
                    reqPoints: 81,
                    mpCost: 30,
                    castTime: 0,
                    cooldown: 90,
                    duration: 0,
                    description: "Bind targets in large AOE, preventing them from moving"
                },
                "Sins Genocide": {
                    reqPoints: 90,
                    mpCost: 48,
                    castTime: 0,
                    cooldown: 30,
                    duration: 0,
                    description: "Use the magic sword called from the abyss to skewer your opponent"
                }
            }},
            { id: 21, name: "Confusion", skills: {
                "Weakness": {
                    reqPoints: 8,
                    mpCost: 18,
                    castTime: 1,
                    cooldown: 5,
                    duration: 120,
                    description: "Reduce target's attack"
                },
                "Sandstorm": {
                    reqPoints: 12,
                    mpCost: 51,
                    castTime: 2,
                    cooldown: 20,
                    duration: 20,
                    description: "Summon a sandstorm that puts target to sleep"
                },
                "Psionic Blast": {
                    reqPoints: 21,
                    mpCost: 25,
                    castTime: 1.5,
                    cooldown: 5,
                    duration: 0,
                    description: "Deal damage to target's MP"
                },
                "Weaken": {
                    reqPoints: 26,
                    mpCost: 18,
                    castTime: 1,
                    cooldown: 5,
                    duration: 120,
                    description: "Reduce target's defense"
                },
                "Impede": {
                    reqPoints: 33,
                    mpCost: 28,
                    castTime: 2,
                    cooldown: 5,
                    duration: 120,
                    description: "Reduce target's dodge"
                },
                "Resist Charm": {
                    reqPoints: 35,
                    mpCost: 32,
                    castTime: 1.5,
                    cooldown: 3.5,
                    duration: 7,
                    description: "Increase charm resistance, greatly reducing dark resistance"
                },
                "Icy Strike": {
                    reqPoints: 41,
                    mpCost: 44,
                    castTime: 0.3,
                    cooldown: 12,
                    duration: 15,
                    description: "Freeze target, slowing them"
                },
                "Wasteland": {
                    reqPoints: 54,
                    mpCost: 44,
                    castTime: 0.5,
                    cooldown: 30,
                    duration: 30,
                    description: "Summon a poion wasteland that damages and slows all enemies in range"
                },
                "Siren Storm": {
                    reqPoints: 61,
                    mpCost: 87,
                    castTime: 4.5,
                    cooldown: 15,
                    duration: 0,
                    description: "Damage MP of all enemies in AOE"
                },
                "Cursed Bolt": {
                    reqPoints: 71,
                    mpCost: 69,
                    castTime: 2,
                    cooldown: 20,
                    duration: 0,
                    description: "Curse target, preventing resurrection"
                },
                "Hallucination": {
                    reqPoints: 90,
                    mpCost: 65,
                    castTime: 1,
                    cooldown: 60,
                    duration: 0,
                    description: "AOE fear, forcefully sending enemies running"
                }
            }}
        ]},
    22: {
        skills: [
            { id: 23, name: "Racial", skills: {}},
            { id: 24, name: "Horsemanship", skills: {
                "Summon Horse": {
                    reqPoints: 20,
                    mpCost: 22,
                    castTime: 3,
                    cooldown: 180,
                    duration: 0,
                    description: "Summon a horse"
                },
                "Horse Guardian": {
                    reqPoints: 31,
                    mpCost: 5,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Take damage for your horse"
                },
                "Horse Charge (Passive)": {
                    reqPoints: 40,
                    mpCost: 0,
                    castTime: 0,
                    cooldown: 0,
                    duration: 0,
                    description: "Charge at target, dealing damage"
                }
            }}
        ]
    }
}

export { classSkillData };

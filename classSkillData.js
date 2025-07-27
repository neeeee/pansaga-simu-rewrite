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
            }
    },
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
        }}
    ]},
    6: {

    },
    12: {

    },
    17: {

    },
    22: {

    }
}
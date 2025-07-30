export const setBonuses = [
  {
    name: "Falcon Set Bonus",
    requiredItems: ["head-falcon-mask", "torso-falcon-jacket"],
    bonus: {
      description: "Falcon Set: +15 Accuracy, +5% MP Reduction",
      stats: { acc: 15, redMp: -5 },
    },
  },
  {
    name: "Gothic Set Bonus",
    requiredItems: ["torso-gothic-plate"],
    bonus: {
      description: "Gothic Bonus: +1 STA, -3% Physical Damage Taken",
      stats: { sta: 1, resPhyDamP: -3 },
    },
  },
];

export const missions = [
  {
    category: "Responsabilitate & Organizare 🧹",
    desc: "Questuri de ordine și responsabilitate. Mic efort → timp curat.",
    items: [
      { title: "Gardianul Patului 🛏️", reward: "+5 min", penalty: "Praful Dezordinii 🕸️ (Scratch Damage 🟡)" },
      { title: "Stăpânul Ghiozdanului 🎒", reward: "+5 min", penalty: "Haos Școlar 📉 (No Reward ⚪)" },
      { title: "Eroul Curățeniei 🧼", reward: "+10 min", penalty: "Zona Murdară ☣️ (Penalty Zone 🟠)" },
      { title: "Maestrul Ordinii 📦", reward: "+5 min", penalty: "Debuff: Dezordine 🟠 (Penalty Zone 🟠)" },
      { title: "Check-up Rapid ⚡", reward: "+3 min", penalty: "Time Leak ⏳ (Scratch Damage 🟡)" },
      { title: "Scutul Rucsacului 🛡️", reward: "+5 XP", penalty: "XP Freeze ❄️ (No Reward ⚪)" }
    ]
  },

  {
    category: "Comportament Sănătos 🧠",
    desc: "Reguli de respect, calm și autocontrol. Aici se câștigă maturitate.",
    items: [
      { title: "Ninja Calm 🥷", reward: "+5 XP", penalty: "Penalty Zone 🟠 (victimizare/cerșit)" },
      { title: "Vorbe Curate 🗣️✨", reward: "+5 min", penalty: "Scratch Damage 🟡 (neatenție)" },
      { title: "Respect Mode 🤝", reward: "+10 XP", penalty: "Daily Ban 🔴 (refuz reguli)" },
      { title: "Nu întrerup când vorbim 🧏", reward: "+5 XP", penalty: "Scratch Damage 🟡" },
      { title: "Fără țipete 🎚️", reward: "+5 XP", penalty: "Penalty Zone 🟠" },
      { title: "True Talk 🧠✅", reward: "+5 min", penalty: "Daily Ban 🔴 (minciună)" }
    ]
  },

  {
    category: "Școală 📚",
    desc: "Boss-ul principal al zilei. Școala = timp garantat, dacă e făcută corect.",
    items: [
      { title: "Eroul Temelor ✏️", reward: "+20 min", penalty: "Daily Ban 🔴 (refuz școală)" },
      { title: "Pregătit de Școală ⏰", reward: "+5 min", penalty: "No Reward ⚪ (uitare)" },
      { title: "Maestrul Limbilor 🌍", reward: "+15 min", penalty: "Penalty Zone 🟠" },
      { title: "Cititorul Suprem 📖", reward: "+10 min", penalty: "XP Freeze ❄️ (No Reward ⚪)" },
      { title: "Focus Mode 🧠", reward: "+10 XP", penalty: "Scratch Damage 🟡" },
      { title: "Mini-Test Win 🧪🏆", reward: "+10 XP", penalty: "Penalty Zone 🟠" },

      // --- Deblocare acces Roblox / condiții de timp ---
      { title: "3 Exerciții la Mate 🔓🧮", reward: "Deblocare Roblox: +5 min", penalty: "Access Lock 🔒 (Daily Ban 🔴)", unlock: "Roblox", notes: "Deblocare acces" },
      { title: "5 Exerciții Perfecte la Mate 🏆🧮", reward: "Deblocare Roblox: +20 min", penalty: "Access Lock 🔒 (Daily Ban 🔴)", unlock: "Roblox", notes: "Deblocare acces" },
      { title: "10 Exerciții Ușoare (Culegere Clasa 3/4) 📘", reward: "Deblocare Roblox: +5 min", penalty: "Access Lock 🔒 (Daily Ban 🔴)", unlock: "Roblox", notes: "Deblocare acces" },
      { title: "20 Exerciții Ușoare Perfecte (Culegere 3/4) 📘✨", reward: "Deblocare Roblox: +20 min", penalty: "Access Lock 🔒 (Daily Ban 🔴)", unlock: "Roblox", notes: "Deblocare acces" },
      { title: "10 Pagini (Caietul Elevului 3/4) 📗🖊️", reward: "Deblocare Roblox: +2h", penalty: "Access Lock 🔒 (Daily Ban 🔴)", unlock: "Roblox", notes: "Deblocare acces" },
      { title: "1 Oră Lecție Învățată ⏳🧠", reward: "Deblocare Roblox: +20 min", penalty: "Access Lock 🔒 (Daily Ban 🔴)", unlock: "Roblox", notes: "Deblocare acces" },

      { title: "10 Cuvinte Încercuite + 10 Sublin. + Traduse 🔍📝", reward: "+5 min", penalty: "No Reward ⚪ (timp neblocat)" },
      { title: "10 Cuvinte Noi + Propoziție cu Fiecare 🧠🗣️", reward: "+5 min", penalty: "Access Lock 🔒 (No Reward ⚪)", notes: "Condiție deblocare timp" },
      { title: "Exercițiu de Completat (Limbă Străină) 🧩🌍", reward: "+10 min", penalty: "No Reward ⚪ (timp neblocat)" },

      { title: "Conjugă un Verb (Spaniolă) în 3 Timpuri 🇪🇸⏱️", reward: "+5 min", penalty: "No Reward ⚪" },
      { title: "Conjugă un Verb (Spaniolă) în Toate Timpurile 🇪🇸🔥", reward: "+20 min", penalty: "Penalty Zone 🟠 (neatenție/încercare superficială)" },

      { title: "Lecție Gramatică + Exercițiu (Limbă Străină) 📚✅", reward: "+15 min", penalty: "No Reward ⚪" },
      { title: "20 Cuvinte dintr-un Desen Animat 🎬🧠", reward: "+5 min", penalty: "No Reward ⚪" },
      { title: "50 Cuvinte dintr-un Desen Animat 🎬🏆", reward: "+15 min", penalty: "No Reward ⚪" },

      { title: "Scris Caligrafic: Text 100 Cuvinte ✍️📄", reward: "+5 min", penalty: "Scratch Damage 🟡 (grabă/neglijență)" },
      { title: "Tradus Text (Limbă Străină) 🌍📝", reward: "+10 min", penalty: "No Reward ⚪" },
      { title: "Exercițiu Gramatică (Română) 🇷🇴📘", reward: "+10 min", penalty: "No Reward ⚪" },

      // --- Misiuni obligatorii (neexecutare = oprire acces) ---
      { title: "Mimo Daily Lesson (Obligatoriu) 🧠📱", reward: "Condiție deblocare: acces ON ✅", penalty: "Access Lock 🔒 (Daily Ban 🔴)", mandatory: true, notes: "Misiune obligatorie" },
      { title: "Duolingo Spanish (Obligatoriu) 🦉🇪🇸", reward: "Condiție deblocare: acces ON ✅", penalty: "Access Lock 🔒 (Daily Ban 🔴)", mandatory: true, notes: "Misiune obligatorie" },

      { title: "Pregătire Program Ziua Următoare (Obligatoriu) 📅✅", reward: "Condiție deblocare: acces ON ✅", penalty: "Access Lock 🔒 (Daily Ban 🔴)", mandatory: true, notes: "Misiune obligatorie" },
      { title: "Pregătire Ghiozdan Ziua Următoare (Obligatoriu) 🎒✅", reward: "Condiție deblocare: acces ON ✅", penalty: "Access Lock 🔒 (Daily Ban 🔴)", mandatory: true, notes: "Misiune obligatorie" },
      { title: "Pregătire pe Fiecare Materie (Ziua Următoare) 📚🧾", reward: "Condiție deblocare: acces ON ✅", penalty: "Access Lock 🔒 (Daily Ban 🔴)", mandatory: true, notes: "Misiune obligatorie" }
    ]
  },

  {
    category: "Activități & Sport ⚽",
    desc: "Energie, corp, disciplină. Sportul crește nivelul real.",
    items: [
      { title: "Sprintul Eroului 🏃‍♂️", reward: "+10 min", penalty: "Scratch Damage 🟡" },
      { title: "Antrenament Scut 🛡️", reward: "+10 XP", penalty: "Penalty Zone 🟠" },
      { title: "Stretch Master 🤸", reward: "+5 min", penalty: "No Reward ⚪" },
      { title: "Outdoor Quest 🌳", reward: "+10 min", penalty: "Penalty Zone 🟠" },
      { title: "Apă + Energie 💧⚡", reward: "+5 XP", penalty: "Time Leak ⏳ (Scratch Damage 🟡)" },
      { title: "Sport cu Fair-Play 🏅", reward: "+5 XP", penalty: "Penalty Zone 🟠" }
    ]
  },

  {
    category: "Familie & Relații 👨‍👩‍👦",
    desc: "Questuri de echipă. Familie = co-op mode.",
    items: [
      { title: "Ajutor Rapid 🧩", reward: "+5 min", penalty: "No Reward ⚪" },
      { title: "Bună Dimineața, Echipa! ☀️", reward: "+5 XP", penalty: "Scratch Damage 🟡" },
      { title: "Misiunea Bunelor Manieră 🍽️", reward: "+5 min", penalty: "Penalty Zone 🟠" },
      { title: "Fără ceartă la comandă 🧯", reward: "+10 XP", penalty: "Daily Ban 🔴 (repetat)" },
      { title: "Co-op Cleanup 🧽👫", reward: "+10 min", penalty: "Penalty Zone 🟠" }
    ]
  },

  {
    category: "Bonus 🌟",
    desc: "Bonusuri care cresc rapid timpul (dar pot fi blocate de ban).",
    items: [
      { title: "Combo Quest: Pat + Ghiozdan 🔥", reward: "+15 min", penalty: "Penalty Zone 🟠" },
      { title: "3 Zile Streak Bonus 🔥🔥🔥", reward: "+20 XP", penalty: "Streak Break 💔 (Daily Ban 🔴)" },
      { title: "Boss Fight: Teme + Limbi 🐉", reward: "+25 min", penalty: "Daily Ban 🔴" },
      { title: "Clean Sweep 🧹🏆", reward: "+15 min", penalty: "Penalty Zone 🟠" },
      { title: "Respect Streak 🤝🔥", reward: "+15 XP", penalty: "Scratch Damage 🟡" }
    ]
  },

  {
    category: "Extra 🚀",
    desc: "Extra questuri pentru când vrei să urci repede.",
    items: [
      { title: "Duolingo Burst 🦉", reward: "+10 min", penalty: "No Reward ⚪" },
      { title: "10 Minute Lectură Bonus 📖+", reward: "+5 min", penalty: "Scratch Damage 🟡" },
      { title: "Room Upgrade 📦✨", reward: "+10 min", penalty: "Penalty Zone 🟠" },
      { title: "Helping Hands 🫶", reward: "+5 XP", penalty: "No Reward ⚪" },
      { title: "Mega Focus 20 🧠⏱️", reward: "+10 XP", penalty: "Penalty Zone 🟠" }
    ]
  }
];

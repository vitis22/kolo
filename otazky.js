const questions = [
    {
        question: "Co je to za zvíře?",
        options: ["Medvěd polární", "Panda", "Tygr", "Slon"],
        answer: 1,
        difficulty: "lehká",
        image: "panda.jpeg"
    },
    {
        question: "Co je to za zvíře?",
        options: ["Medvěd polární", "Krokodýl", "Tygr", "Slon"],
        answer: 2,
        difficulty: "lehká",
        image: "tygr.jpeg"
    },
    {
        question: "Co je to za zvíře?",
        options: ["Slon africký", "Tygr bengálský", "Lev africký", "Vlk obecný"],
        answer: 1,
        difficulty: "lehká",
        image: "slon.jpeg"
    },
    {
        question: "Co je to za zvíře?",
        options: ["Lev africký", "Osel domácí", "Kočka divoká", "Veverka"],
        answer: 1,
        difficulty: "lehká",
        image: "lev.jpeg"
    },    
    {
        question: "Co je to za zvíře?",
        options: ["Vlk obecný", "Nosorožec bílý", "Koala", "Žirafa"],
        answer: 1,
        difficulty: "lehká",
        image: "vlk.jpeg"
    },    
    {
        question: "Co je to za zvíře?",
        options: ["Panda obrovská", "Kočka domácí", "Delfín skákavý", "Krokodýl nilský"],
        answer: 1,
        difficulty: "lehká",
        image: "panda.jpeg"
    },    
    {
        question: "Co je to za zvíře?",
        options: ["Panda obrovská", "Kočka domácí", "Delfín skákavý", "Krokodýl nilský"],
        answer: 1,
        difficulty: "lehká",
        image: "panda.jpeg"
    },
    {
        question: "Co je to za zvíře?",
        options: ["Koala", "Veverka", "Osel domácí", "Klokánek rudý"],
        answer: 1,
        difficulty: "lehká",
        image: "koala.jpeg"
    },
    {
        question: "9 Co je to za zvíře?",
        options: ["Medvěd polární", "Krokodýl", "Tygr", "Slon"],
        answer: 0,
        difficulty: "lehká",
        image: "panda.jpeg"
    },
    {
        question: "10 Co je to za zvíře?",
        options: ["Medvěd polární", "Krokodýl", "Tygr", "Slon"],
        answer: 0,
        difficulty: "lehká",
        image: "panda.jpeg"
    },
    {
        question: "11 Co je to za zvíře?",
        options: ["Medvěd polární", "Krokodýl", "Tygr", "Slon"],
        answer: 0,
        difficulty: "lehká",
        image: "panda.jpeg"
    },
    {
        question: "1 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },
    {
        question: "2 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },
    {
        question: "3 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },
    {
        question: "4 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },
    {
        question: "5 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },
    {
        question: "6 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },
    {
        question: "7 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },

    {
        question: "8 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },
    {
        question: "9 Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "střední",
        image: "tygr.jpeg"
    },
    {
        question: "Který druh žraloka je největší?",
        options: ["Žralok bílý", "Žralok veliký", "Žralok obrovský", "Žralok makoa"],
        answer: 2,
        difficulty: "střední"
    },  
    {
        question: "Které zvíře je symbolem Austrálie?",
        options: ["Klokan", "Koala", "Emu", "Platypus"],
        answer: 0,
        difficulty: "střední"
    },






    
    {
        question: "Jaký pták neumí létat?",
        options: ["Pštros", "Kondor", "Vlaštovka", "Sokol"],
        answer: 0,
        difficulty: "těžká"
    },
    {
        question: "Jaký je nejjedovatější had na světě?",
        options: ["Hroznýš", "Kobra", "Zmije", "Taipan"],
        answer: 3,
        difficulty: "těžká"
    },
    {
        question: "Kolik druhů želv je známo?",
        options: ["7", "250", "360", "500+"],
        answer: 3,
        difficulty: "těžká"
    },
    {
        question: "Které zvíře má nejsilnější stisk?",
        options: ["Gepard", "Lev", "Hyena", "Tygr"],
        answer: 2,
        difficulty: "těžká"
    },
    {
        question: "Které zvíře ma největší vytrvalost?",
        options: ["Vlk", "Medvěd", "Slon", "Gazela"],
        answer: 0,
        difficulty: "těžká"
    },
    {
        question: "Kolik druhů hadů existuje?",
        options: ["2 800", "3 600", "1 400", "800"],
        answer: 1,
        difficulty: "těžká"
    },
    {
        question: "Jaký je nejjedovatější škorpion na světě?",
        options: ["Štír tlustorepý", "Štír samičí", "Štír bahijský", "Štír smrtonoš"],
        answer: 3,
        difficulty: "těžká"
    },
    {
        question: "Kolik váží slon africký?",
        options: ["8t", "4t", "6t", "5,5t"],
        answer: 2,
        difficulty: "těžká"
    },
    {
        question: "Keré zvíře je na pokraji vyhinutí?",
        options: ["Nosorožec tuponosý severní", "Tygr indický", "Panda červená", "Levhart sněžný"],
        answer: 0,
        difficulty: "těžká"
    },
    {
        question: "Které zvíře má 4 žaludky?",
        options: ["Pštros", "Žirafa", "Kráva", "Lemur"],
        answer: 1,
        difficulty: "těžká"
    },
    {
        question: "Kolik má moucha očí?",
        options: ["850", "2", "1000+", "400"],
        answer: 1,
        difficulty: "těžká"
    },
    {
        question: "Které zvíře je označováno za nejrychlejšího tvora na světě?",
        options: ["Gepard", "Puma", "Sokol stěhovavý", "Gazela"],
        answer: 2,
        difficulty: "těžká"
    },
        {
        question: "Jaký je největší druh medvěda?",
        options: ["Medvěd kodiak", "Medvěd hnědý", "Medvěd malajský", "Medvěd lední"],
        answer: 0,
        difficulty: "těžká"
    },
        {
        question: "Jak se jmenuje největší druh želvy?",
        options: ["Želva žlutohnědá", "Kožatka velká", "Želva stepní", "Kareta obrovská"],
        answer: 1,
        difficulty: "těžká"
    },
        {
        question: "Jaký je největší druh ptáka na světě?",
        options: ["Gepard", "Puma", "sokol stěhovavý", "Pštros"],
        answer: 2,
        difficulty: "těžká"
    },
];

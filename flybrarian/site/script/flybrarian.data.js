(function (root) {
	// Collate event sets into a per-day lineup map
	function collateLineups (eventSet) {
        const lineups = new Map();
    
        eventSet.forEach(function (e) {
            // if start is before 10a it's the night before
            var day = e.start.getDate();
    
            if (e.start.getHours() < 10) day--;
    
            if (!lineups.has(day)) {
				lineups.set(day, []);
			}

			const lineup = lineups.get(day);
            lineup.push(e);
        });
        
        return lineups;
    }

	const genres = {
			bass: "bass",
			breaks: "breaks",
			dnb: "drumnbass",
			electroswing: "electroswing",
			goth: "goth",	
			hiphop: "hiphop",
			house: "house",
			industrial: "industrial",
			techno: "techno",
			trap: "trap",
			triphop: "triphop",
			world: "world music"
		};

	// aliasing
	const ev = festival.model.event,
		a = festival.model.artist,
		c = festival.model.stage,
		d = festival.model.date,
		days = festival.config.days;

	const artists = {
		"ama": a("AMA"),
		"acidBrunchClub": a("Acid Brunch Club"),
		"alexxxan": a("AlexXxan", [genres.techno]),
		"andreaMarks": a("Andrea Marks", [genres.techno]),
		"ArcRunner": a("ArcRunner", ["goth", "industrial"]),	
		"captainFuck": a("Captain Fuck"),
		"char": a("char7"),
		"chuck": a("Chuck Chuck"),
		"cosinezero": a("cosinezero", [genres.bass, genres.breaks, genres.dnb, "triphop"]),
		"cromafor": a("Cromafor"),
		"dabu": a("dabu", [genres.bass, genres.breaks, genres.dnb, genres.triphop]),
		"damianPaul": a("Damian Paul", [genres.techno]),
		"dekichan": a("dekichan", [genres.electroswing]),
		"dessa": a("Nightshade", [genres.dnb]),
		"djSlothrower": a("DJ SlothThrower"),
		"dontnormally": a("dontnormally", [genres.techno, genres.bass]),
		"Drift": a("Drift"),
		"elementalFlux": a("Elemental Flux"),
		"epochalyptic": a("Epochalyptic"),
		"FaitAccompli": a("Fait Accompli"),
		"fig": a("FiG", [genres.dnb, genres.breaks]),
		"fox": a("Fox", [genres.dnb, "hiphop"]),
		"garyCarlow": a("Gary Carlow", [genres.techno, "house"]),
		"gav": a("DJ Gav"),
		"JazzCabbage": a("Jazz Cabbage"),
		"journeyWeaver": a("Journey Weaver"),
		"kibbles": a("Kibbles & Beats"),
		"leftCat": a("Left Cat"),
		"livingLight": a("Living Light"),
		"lTrain": a("L-Train", [genres.bass, genres.triphop]),
		"keithMattar": a("Keith Mattar", [genres.techno]),
		"megadipites": a("Megadipites", []),
		"MykShyck": a("Myk Shyck"),
		"nateDef": a("Nate DeF"),
		"oleg": a("Oleg"),
		"omegaProtocol": a("Omega Protocol", ["dnb"]),
		"parmaChai": a("Parma Chai"),
		"paulErlich": a("Paul Erlich"),
		"Psylander": a("Psylander"),
		"Saphire": a("Saphire", ["goth", "industrial", "downtempo"]),
		"Sasquatch": a("Sasquatch"),
		"Scrams": a("Scrams"),
		"SmoKi": a("SmoKi"),
		"soundShaman": a("Sound Shaman"),		
		"TempoSuave": a("Tempo Suave"),
		"Ticho": a("Rob Ticho"),
		"Tigress": a("Tigress", [genres.bass, genres.world]),
		"unknown": a("(UNKNOWN)", []),			
		"vinylBlight": a("Vinyl Blight", [genres.bass]),
		"yourFurryFriend": a("Your Furry Friend"),
		// Alpha - ME:
		"SeanManton": a("Sean Manton"),
		"DimRedGlo": a("Dim Red Glo"),
		"KarNam": a("Kar'Nam"),
		"OFTHESUN": a("OFTHESUN"),
		"MikeSim": a("Mike Sim"),
		"Fractillian": a("Fractillian"),	
		"DADABOTS": a("DADABOTS"),
		"cRtxLzn": a("cRtxLzn"),
		"DrSnipples": a("Dr Snipples"),
		"djcoldcuts": a("dj cold cuts"),
		"Audiofile77": a("Audiofile77"),
		"EddyVanRaven": a("Eddy Van Raven"),
		"AWC": a("AWC"),
		"dJR": a("D:[JR]"),
		"ShwillyB": a("Shwilly B"),
		"unknown": a(" - ")
	},
	// These are actually "stages" in model data
	camps = {
		"bac": c("Bring a Cup"),
		"glutenFree": c("Gluten Free Halloween"),
		"lamp": c("Camp Lamp"),
		"diode": c("Diode"),		
		"femmeDomme": c("Femme Dom"),		
		"lions": c("Lovin' Lions"),
		"strangeMaine": c("Strange Maine")	
	};

	// dj, camp, day, start, end, description
	// TODO: allow for multiple artists per event
	const data = [
		// gluten
		//Wednesday, July 3rd from 6:30pm to 8:30pm at Gluten Free Halloween Camp:
		//BLK WICCN BEATZ
		ev(camps.glutenFree, artists.gav, d(days.wednes.day, 18, 30), d(days.wednes.day, 20, 30), "BLK WICCN BEATZ", "hip hop, dark house, d&b, kumbía en español, bounce beatz, Taino tracks by Queer Black, Brown, and Idigen@s Peoples."),
		// camp lamp
		// diode
		// strange maine
		ev(camps.strangeMaine, [artists.ArcRunner, artists.Saphire], d(days.thurs.day, 21), d(days.fri.day, 1), "Shi*Wrecked, Under The Sea", "Wash ashore! Come visit the dark depths that live near the lighthouse for Strange Maine's annual Thursday night gathering. Dance to Goth/Industrial and all things Dark, meet some Mainers and hang out in the Lighthouse. Alcoholic and Non alcoholic drinks will be available."),
		ev(camps.strangeMaine, artists.Saphire, d(days.satur.day, 21), d(days.sun.day, 1), "Slow & Sexy Dance Party" ,"Heed the siren call! We slow down the BPM so you can make your move, inspired by Ceremony's 'Down With Tempo'. Featuring DJ Saphire and our guest bartender: the lovely Talena (Bring A Cup) will be pouring alcoholic and non alcoholic drinks."),
		
		/*
			Friday Night
		11p - 12a	ArcRunner
		12a - 1a	Saphire
		1a - 2a	AlexXxan	
		2a - 3a	dontnormally
		
		- Saturday - 
		
		Beats & Beats & Beets
		
		4p - 5p	Scrams
		5p - 7p	AMA & Fait Accompli
		
		Stay Raunchy
		
		FDC in their final form for FireFly 2019 - A night dedicated to all things booty. Clever Liquids In Trees speakeasy & Open Dungeon with Monitor Approval. DJ info available at camp.
		
		9p - 10p	------
		10p - 11p  Char
		11p - 12a	Dekichan
		12a - 1a  	Kibbles & Beats
		1a - 2a	[cosinezero]
		2a - 3a. 	Vinyl Blight
		*/

		// Unsorted / known sets...
		ev(camps.femmeDomme, artists.ArcRunner, d(days.fri.day, 23)),
		ev(camps.femmeDomme, artists.Saphire, d(days.satur.day, 0)),
		ev(camps.femmeDomme, artists.alexxxan, d(days.satur.day, 1)),
		ev(camps.femmeDomme, artists.dontnormally, d(days.satur.day, 2)),
		
		ev(camps.femmeDomme, artists.scrams, d(days.satur.day, 16)),
		ev(camps.femmeDomme, [artists.ama, artists.FaitAccompli], d(days.satur.day, 17), d(days.satur.day, 19)),
		
		ev(camps.femmeDomme, artists.char, d(days.satur.day, 22)),
		ev(camps.femmeDomme, artists.dekichan, d(days.satur.day, 23)),
		ev(camps.femmeDomme, artists.kibbles, d(days.sun.day, 0)),
		ev(camps.femmeDomme, artists.cosinezero, d(days.sun.day, 1)),
		ev(camps.femmeDomme, artists.vinylBlight, d(days.sun.day, 2)),
		
		// Lions - wed
		ev(camps.lions, [artists.djSlothrower, artists.fig], d(days.wednes.day, 14), d(days.wednes.day, 16), "Rawr a Cup ~ Bring a Lion", "Bring a Cup takes over the Lions."),
		//ev(camps.lions, [artists.captainFuck], d(days.wednes.day, 16), d(days.wednes.day, 18), "Rawr a Cup ~ Bring a Lion"),
		ev(camps.lions, artists.elementalFlux, d(days.wednes.day, 18)),
		//ev(camps.lions, artists.yourFurryFriend, d(days.wednes.day, 18)),
		ev(camps.lions, artists.lTrain, d(days.wednes.day, 19), d(days.wednes.day, 21)),
		// Lions - thurs
		ev(camps.lions, artists.epochalyptic, d(days.thurs.day, 15)),
		ev(camps.lions, artists.JazzCabbage, d(days.thurs.day, 16)),
		ev(camps.lions, artists.parmaChai, d(days.thurs.day, 17)),
		ev(camps.lions, artists.MykShyck, d(days.thurs.day, 18)),
		ev(camps.lions, artists.paulErlich, d(days.thurs.day, 19)),
		ev(camps.lions, artists.SeanManton, d(days.thurs.day, 20)),
		ev(camps.lions, artists.DimRedGlo, d(days.thurs.day, 21)),
		ev(camps.lions, artists.KarNam, d(days.thurs.day, 22)),
		ev(camps.lions, artists.OFTHESUN, d(days.thurs.day, 23)),
		ev(camps.lions, artists.MikeSim, d(days.fri.day, 0)),
		ev(camps.lions, artists.Fractillian, d(days.fri.day, 1)),
		ev(camps.lions, artists.DADABOTS, d(days.fri.day, 2), d(days.fri.day, 2, 30)),
		ev(camps.lions, artists.cRtxLzn, d(days.fri.day, 2, 30), d(days.fri.day, 3, 0)),
		ev(camps.lions, artists.Drift, d(days.fri.day, 3)),
		ev(camps.lions, artists.Psylander, d(days.fri.day, 4)),
		ev(camps.lions, artists.TempoSuave, d(days.fri.day, 5), d(days.fri.day, 7, 0)),
		// Lions - fri
		ev(camps.lions, artists.nateDef, d(days.fri.day, 15)),
		ev(camps.lions, artists.omegaProtocol, d(days.fri.day, 16)),
		ev(camps.lions, artists.SmoKi, d(days.fri.day, 17)),

		ev(camps.lions, artists.livingLight, d(days.fri.day, 23)),
		ev(camps.lions, artists.acidBrunchClub, d(days.satur.day, 0)),
		ev(camps.lions, artists.dontnormally, d(days.satur.day, 1)),
		ev(camps.lions, artists.Sasquatch, d(days.satur.day, 2)),
		ev(camps.lions, artists.captainFuck, d(days.satur.day, 3)),
		ev(camps.lions, artists.Tigress, d(days.satur.day, 4)),
		ev(camps.lions, artists.soundShaman, d(days.satur.day, 5), d(days.satur.day, 7)),
		// Lions - sat
		ev(camps.lions, artists.char, d(days.satur.day, 16, 30), d(days.satur.day, 17, 30), "Queer Dance Party"),
		ev(camps.lions, artists.leftCat, d(days.satur.day, 17, 30)),
		ev(camps.lions, artists.keithMattar, d(days.satur.day, 18, 30)),
		ev(camps.lions, artists.alexxxan, d(days.satur.day, 22)),
		ev(camps.lions, artists.cosinezero, d(days.satur.day, 23)),
		ev(camps.lions, artists.vinylBlight, d(days.sun.day, 0, 0)),
		ev(camps.lions, artists.dabu, d(days.sun.day, 1, 0)),
		ev(camps.lions, artists.djSlothrower, d(days.sun.day, 2, 0)),

		// Lamp
		// Lamp - thurs-fri
		ev(camps.lamp, artists.DrSnipples, d(days.thurs.day, 13)),
		ev(camps.lamp, artists.djcoldcuts, d(days.thurs.day, 14)),
		ev(camps.lamp, artists.Audiofile77, d(days.thurs.day, 15)),
		ev(camps.lamp, artists.megadipites, d(days.thurs.day, 16)),
		ev(camps.lamp, artists.djSlothrower, d(days.thurs.day, 17)),
		// intentional gap
		ev(camps.lamp, artists.alexxxan, d(days.thurs.day, 22)),
		ev(camps.lamp, artists.ShwillyB, d(days.thurs.day, 23)),
		ev(camps.lamp, artists.megadipites, d(days.fri.day, 0)),
		ev(camps.lamp, artists.leftCat, d(days.fri.day, 1)),
		ev(camps.lamp, artists.EddyVanRaven, d(days.fri.day, 2)),
		ev(camps.lamp, artists.dontnormally, d(days.fri.day, 3)),
		ev(camps.lamp, artists.AWC, d(days.fri.day, 4), d(days.fri.day, 5)),
		ev(camps.lamp, artists.dJR, d(days.fri.day, 5), d(days.fri.day, 6)),
		// Lamp - fri-sat
		// ev(camps.lamp, artists.unknown, d(days.fri.day, 16, 0), d(days.fri.day, 17, 0)),
		// ev(camps.lamp, artists.unknown, d(days.fri.day, 17, 0), d(days.fri.day, 18, 0)),
		// ev(camps.lamp, artists.unknown, d(days.fri.day, 18, 0), d(days.fri.day, 19, 0)),
		// ev(camps.lamp, artists.unknown, d(days.fri.day, 19, 0), d(days.fri.day, 20, 0)),
		// ev(camps.lamp, artists.unknown, d(days.fri.day, 20, 0), d(days.fri.day, 21, 0)),
		// ev(camps.lamp, artists.unknown, d(days.fri.day, 21, 0), d(days.fri.day, 22, 0)),
		// ev(camps.lamp, artists.unknown, d(days.fri.day, 22, 0), d(days.fri.day, 23, 0)),
		// ev(camps.lamp, artists.unknown, d(days.fri.day, 23, 0), d(days.satur.day, 0, 0)),
		ev(camps.lamp, artists.cosinezero, d(days.fri.day, 23)),
		ev(camps.lamp, [artists.fox, artists.fig, artists.dabu, artists.oleg], d(days.satur.day, 0), d(days.satur.day, 3), "DnB Throwdown"),
		ev(camps.lamp, artists.vinylBlight, d(days.satur.day, 3)),
		ev(camps.lamp, artists.omegaProtocol, d(days.satur.day, 4)),
		ev(camps.lamp, artists.Psylander, d(days.satur.day, 5)),
		// sat-sun
		ev(camps.lamp, artists.KarNam, d(days.satur.day, 11)),
		ev(camps.lamp, artists.char, d(days.satur.day, 14)),
		ev(camps.lamp, artists.andreaMarks, d(days.satur.day, 15)),

		ev(camps.lamp, artists.journeyWeaver, d(days.satur.day, 22)),
		ev(camps.lamp, artists.cromafor, d(days.satur.day, 23)),
		ev(camps.lamp, artists.Tigress, d(days.sun.day, 0)),
		ev(camps.lamp, artists.livingLight, d(days.sun.day, 1)),
		ev(camps.lamp, artists.keithMattar, d(days.sun.day, 2)),
		ev(camps.lamp, artists.Psylander, d(days.sun.day, 3)),
		ev(camps.lamp, artists.garyCarlow, d(days.sun.day, 4), d(days.sun.day, 6)),

		// Diode - thursday 
		ev(camps.diode, artists.journeyWeaver, d(days.thurs.day, 13), d(days.thurs.day, 15), "Ecstatic Dance"),
		ev(camps.diode, artists.garyCarlow, d(days.thurs.day, 16), d(days.thurs.day, 18), "Disco Party"),
		ev(camps.diode, artists.char, d(days.thurs.day, 18), d(days.thurs.day, 20)),
		ev(camps.diode, artists.omegaProtocol, d(days.thurs.day, 20)),
		ev(camps.diode, artists.oleg, d(days.thurs.day, 21)),
		ev(camps.diode, artists.dessa, d(days.thurs.day, 22)),
		ev(camps.diode, artists.dekichan, d(days.thurs.day, 23)),
		ev(camps.diode, artists.livingLight, d(days.fri.day, 0), d(days.fri.day, 1, 30)),
		ev(camps.diode, artists.fig, d(days.fri.day, 1, 30), d(days.fri.day, 3)),
		ev(camps.diode, artists.fox, d(days.fri.day, 3)),
		ev(camps.diode, artists.vinylBlight, d(days.fri.day, 4)),
		// Diode - friday 
		ev(camps.diode, artists.Ticho, d(days.fri.day, 15), d(days.fri.day, 17), "Mx Firefly"),
		ev(camps.diode, artists.Ticho, d(days.fri.day, 17), d(days.fri.day, 18), "Mx Firefly Afterparty"),
		ev(camps.diode, artists.dekichan, d(days.fri.day, 18), d(days.fri.day, 19), "Mx Firefly Afterparty"),
		ev(camps.diode, artists.damianPaul, d(days.satur.day, 0), d(days.satur.day, 1, 30)),
		ev(camps.diode, [artists.keithMattar, artists.garyCarlow], d(days.satur.day, 1, 30), d(days.satur.day, 5)),
		
		// Diode - saturday
		ev(camps.diode, artists.unknown, d(days.satur.day, 14), d(days.satur.day, 16), "Contra Dance"),
		ev(camps.diode, artists.dabu, d(days.satur.day, 16)),
		ev(camps.diode, artists.ShwillyB, d(days.satur.day, 23), d(days.sun.day, 0, 30)),
		ev(camps.diode, artists.megadipites, d(days.sun.day, 0, 30), d(days.sun.day, 1, 30)),
		ev(camps.diode, artists.EddyVanRaven, d(days.sun.day, 1, 30), d(days.sun.day, 3, 30)),
		ev(camps.diode, artists.dabu, d(days.sun.day, 3, 30), d(days.sun.day, 5)),

		// Wed 4-6 Guest DJs from Lions spin ???.
		// Thurs 4-6 L-Train spins party music. Thurs 8-9 live music jam session 9-10 moar live music. Fri 4-6 Chuck Chuck spins Prince. Sat 4-6 Chuck Chuck spins party funk & breaks 7-9 Chuck spins hip hop & soul
		ev(camps.bac, artists.captainFuck, d(days.wednes.day, 16), d(days.wednes.day, 18),  "Rawr a Cup ~ Bring a Lion", "The Lions take over Bring a Cup."),
		ev(camps.bac, artists.lTrain, d(days.thurs.day, 16), d(days.thurs.day, 18),  "Party Music"),
		ev(camps.bac, artists.unknown, d(days.thurs.day, 20), d(days.thurs.day, 21),  "Live Music Jam Session"),
		ev(camps.bac, artists.unknown, d(days.thurs.day, 21), d(days.thurs.day, 22),  "Moar Live Music"),
		ev(camps.bac, artists.chuck, d(days.fri.day, 16), d(days.fri.day, 18),  "Chuck Chuck spins us some Prince"),
		ev(camps.bac, artists.chuck, d(days.satur.day, 16), d(days.satur.day, 18),  "Chuck Chuck spins us some party funk & breaks"),
		ev(camps.bac, artists.chuck, d(days.satur.day, 19), d(days.satur.day, 21),  "Chuck Chuck spins us some hiphop & soul"),
	];

	// Turn camps object into map
	// Wait... why?
	const campMap = new Map(),
		campArray = [],
		artistsArray = [];

	const keys = Object.keys(camps);
	keys.forEach(function (key) {
		const camp = camps[key];
		campArray.push(camp);
		campMap.set(key, camp);

		// Collate lineups into days
		// Lineups is a map (day, value)
		const lineups = collateLineups(camp.events);
		camp.lineups = lineups;
	});

	// Turn artists into array
	const artKeys = Object.keys(artists);
	artKeys.forEach(function (key) {
		const a = artists[key];
		artistsArray.push(a);
	});

	root.data = {
		artists: artistsArray,
		stages: campArray,
		events: data,
		collateLineups: collateLineups
	};
})(
	flybrarian
);
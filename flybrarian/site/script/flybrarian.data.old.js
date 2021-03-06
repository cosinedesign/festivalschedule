
// aliasing
const ev = firefly.event,
	a = firefly.artist,
	c = firefly.camp,
	d = firefly.date,
	days = firefly.days;

const genres = {
		bass: "bass",
		breaks: "breaks",
		dnb: "drumnbass",
		goth: "goth",	
		hiphop: "hiphop",
		house: "house",
		industrial: "industrial",
		techno: "techno",
		trap: "trap",
		triphop: "triphop",
		world: "world music"
	};
const artists = {
	"acidBrunchClub": a("Acid Brunch Club"),
	"alexxxan": a("AlexXxan", [genres.techno]),
	"andreaMarks": a("Andrea Marks", [genres.techno]),
	"ArcRunner": a("ArcRunner", ["goth", "industrial"]),	
	"captainFuck": a("Captain Fuck"),
	"char": a("CHAR"),
	"cosinezero": a("cosinezero", [genres.bass, genres.breaks, "dnb", "triphop"]),
	"cromafor": a("Cromafor"),
	"dabu": a("beeBu", [genres.bass, genres.breaks, "dnb"]),
	"damianPaul": a("Damian Paul", [genres.techno]),
	"djSlothrower": a("DJ SlothThrower"),
	"dontnormally": a("dontnormally", [genres.techno, genres.bass]),
	"Drift":a("Drift"),
	"elementalFlux": a("Elemental Flux"),
	"epochalyptic": a("Epochalyptic"),
	"fig": a("FiG", ["dnb", genres.breaks]),
	"fox": a("Fox", ["dnb", "hiphop"]),
	"garyCarlow": a("Gary Carlow", [genres.techno, "house"]),
	"JazzCabbage": a("Jazz Cabbage"),
	"journeyWeaver": a("Journey Weaver"),
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
	"soundShaman": a("Sound Shaman"),
	"TempoSuave": a("Tempo Suave"),
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
},
camps = {
	"bac": c("Bring a Cup"),
	"lamp": c("Camp Lamp"),
	"diode": c("diode"),		
	"femmeDomme": c("Femme Dom Camp"),		
	"lions": c("Lovin' Lions"),
	"strangeMaine": c("Strange Maine")	
};

// dj, camp, day, start, end, description
// TODO: allow for multiple artists per event
const data = [
	// camp lamp
	// diode
	// strange maine
	ev(camps.strangeMaine, [artists.ArcRunner, artists.Saphire], d(days.thurs.day, 21), d(days.fri.day, 1)),
	ev(camps.strangeMaine, artists.Saphire, d(days.fri.day, 21), d(days.sat.day, 1)),
	
	// Unsorted / known sets...
	ev(camps.femmeDomme, artists.cosinezero, d(days.sun.day, 1)),
	
	// Lions - wed
	ev(camps.lions, artists.djSlothrower, d(days.wednes.day, 16)),
	ev(camps.lions, artists.elementalFlux, d(days.wednes.day, 17)),
	ev(camps.lions, artists.yourFurryFriend, d(days.wednes.day, 18)),
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
	ev(camps.lions, artists.fig, d(days.fri.day, 17)),
	ev(camps.lions, artists.livingLight, d(days.fri.day, 23)),
	ev(camps.lions, artists.acidBrunchClub, d(days.satur.day, 0)),
	ev(camps.lions, artists.dontnormally, d(days.satur.day, 1)),
	ev(camps.lions, artists.Sasquatch, d(days.satur.day, 2)),
	ev(camps.lions, artists.captainFuck, d(days.satur.day, 3)),
	ev(camps.lions, artists.Tigress, d(days.satur.day, 4)),
	ev(camps.lions, artists.soundShaman, d(days.satur.day, 5), d(days.satur.day, 7)),
	// Lions - sat
	ev(camps.lions, artists.char, d(days.satur.day, 16, 30)),
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
	ev(camps.lamp, artists.garyCarlow, d(days.sun.day, 4), d(days.sun.day, 6))




];

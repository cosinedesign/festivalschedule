import { IHash } from '../../types/utility';
import { RealWorldEvent } from '../../types/models.common';
import { Performer, Performance, Stage } from '../../types/models.events';

import { categories } from './festival.services.categories';
import { utilities as utils } from './festival.services.utilities';

import performances from '../../data/performances.json';
import performers from '../../data/performers.json';
import stages from '../../data/stages.json';

const stagesJSON = (stages as {
    stages: Array<any>
});

const performancesJSON = (performances as {
    performances: Array<any>
});

const performersJSON = (performers as {
    performers: Array<any>
});

const genres = categories.music.genres, 
    evGap = utils.createGap,
    sortEvents = utils.sortEvents;

const uniqueKey = "2022";

function a (name: string, genres?: Array<string>) : Performer {
    return {
        id: null,
        name: name,
        description: null,
        genres: genres,
        aliases: [] as Array<string>,
        tags: [] as Array<string>,
        keywords: [] as Array<string>
    };
}

function collateLineups(eventSet) : Map<number, Array<RealWorldEvent>> {
	const lineups = new Map<number, Array<RealWorldEvent>>();

	eventSet.forEach(function (ev: { when: any; where?: Location; }) {
		const when = ev.when; 

		// if start is before 10a it's the night before
		var day = when.start.getDate();

		if (when.start.getHours() < 10) day--;

		if (!lineups.has(day)) {
			lineups.set(day, []);
		}

		const lineup = lineups.get(day);
		// @ts-ignore this is safe due to above lineups.set for that day
		lineup.push(ev);
		
	});
	
	return lineups;
}

/*
const performersHardcoded : IHash<Performer> = {
    "ama": a("AMA"),
    "acidBrunchClub": a("Acid Brunch Club"),
    "alexxxan": a("AlexXxan", [genres.techno]),
    "andreaMarks": a("Andrea Marks", [genres.techno]),
    "ArcRunner": a("ArcRunner", [genres.goth, genres.industrial]),	
    "captainFuck": a("Captain Fuck"),
    "char": a("char7"),
    "chuck": a("Chuck Chuck"),
    "cosinezero": a("cosinezero", [genres.bass, genres.breaks, genres.dnb, genres.triphop]),
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
    "fox": a("Fox", [genres.dnb, genres.hiphop]),
    "garyCarlow": a("Gary Carlow", [genres.techno, genres.house]),
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
    "omegaProtocol": a("Omega Protocol", [genres.dnb]),
    "parmaChai": a("Parma Chai"),
    "paulErlich": a("Paul Erlich"),
    "Psylander": a("Psylander"),
    "Saphire": a("Saphire", [genres.goth, genres.industrial, genres.downtempo]),
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
    "ShwillyB": a("Shwilly B")		
};
*/

const dataStore = {
    stages: new Map<string, Stage>(),
    performers: new Map<string, Performer>(),
    performances: new Map<string, Performance>(),
    schedules: {}
};

function idGenerator(identifier: string) {
    if (!identifier) return identifier;
    return identifier.replace(' ', '_') + uniqueKey;
}

const stagesByName = new Map<string, Stage>();
const performersByName = new Map<string, Stage>();

// import stages
stagesJSON.stages.forEach(function (stage) {
    const id = stage.id || idGenerator(stage.name); 
    
    const stageViewModel: Stage = {
        id: id,
        name: stage.name,
        events: new Set(),
        lineups: new Map(),
        days: new Set()
    };

    stagesByName.set(stage.name, stageViewModel);
    
    dataStore.stages.set(id, stageViewModel);
});

// import performers
performersJSON.performers.forEach(function (performer) {
    const id = performer.id || idGenerator(performer.name); 

    performersByName.set(performer.name, performer);

    dataStore.performers.set(id, {
        id: id,
        name: performer.name,
        aliases: [],
        genres: [],
        description: null,
        tags: [],
        keywords: [] 
    });
});

// import performances
performancesJSON.performances.forEach(function (performance) {
    const id = performance.id || idGenerator(performance.name);

    const viewModel = {
        id: id,
        name: performance.name,
        // TODO: This can be an array!
        who: performersByName.get(performance.who.name) || performance.who,
        when: {
            start: new Date(performance.when.start),
            end: new Date(performance.when.end)
        },
        where: stagesByName.get(performance.where.name) || performance.where,
        description: null,
        tags: [],
        keywords: [] 
    };

    viewModel.where.events = viewModel.where.events || new Set<Performance>();
    viewModel.where.events.add(viewModel);

    dataStore.performances.set(id, viewModel);
});


// TODO: Prior to this we need to load events into stage per day

const schedules = dataStore.schedules;
// for each stage, update schedules
dataStore.stages.forEach((stage) => {
    stage.lineups = collateLineups(stage.events);

    stage.lineups.forEach((lineup, day) => {
        if (!schedules[day]) schedules[day] = [];
        schedules[day].push(lineup);
    });
});

// TODO: Massage data here
// this is from festival.services, we should move most of the processing for events to this file
const process = {
	lineups: {
		// returns a map of (camp, lineup), for day specified
		byDay: function (day, stages: Map<string, Stage>) {
            const lineups = new Map();
			
			stages.forEach(function (stage) {		
				const lineup = stage.lineups.get(day);			
				lineups.set(stage, lineup);
			});

			// then we need to sort & fill lineups

			return lineups;
		}
	}	
};


export const eventService = {
    stages: stagesJSON.stages,
    performers: performersJSON.performers,
    performances: performancesJSON.performances,
    data: dataStore,
    lineups: {
		// options:
		// - filter
		byDay: function (day: number, stages: Map<string, Stage>, options?: any) {
            // TODO: this may not be desireable to point to 'stages', as that is the main stages reference
			const lineups = process.lineups.byDay(day, stages);
			
			const state: {
				start?: Date,
				end?: Date
			} = {
			};

			const filter = (options && options.start) ? utils.fitEventWindow(options) : null; 

			const paddedLineups = new Map();

			lineups.forEach(function (lineup, camp) {
				// In a map, a value could be null for a given key, so we must test for value to exist
				if (lineup) {
					const paddedLineup: Array<Performance> = [];
					var hasEvents = false;

					lineup.forEach(function (event: Performance) {
						
						if (options && filter) {								
							event = filter(event);
						}

						if (!event) return; 

						hasEvents = true;
						
						paddedLineup.push(event);
					
						// find earliest time of all the lineups
						if (state.start) {
							if (state.start > event.when.start) state.start = event.when.start;
						} else {
							state.start = event.when.start;
						}

						// find latest time of all the lineups
						if (state.end) {
							if (state.end < event.when.end) state.end = event.when.end;
						} else {
							state.end = event.when.end;
						}
					});

					if (hasEvents) paddedLineups.set(camp, paddedLineup);
				}
			});

			// Short-circuit when no start events satisfied
			if (!state.start) return;			

			// Correct for half-hours
			if (state.start.getMinutes()) {
				state.start = new Date(state.start);
				state.start.setMinutes(0);
			}

			if (state.end && state.end.getMinutes()) {
				state.end = new Date(state.end);
				state.end.setHours(state.end.getHours() + 1);
				state.end.setMinutes(0);
			}

			const startHour = state.start.getHours(),
				endHour = (state.end) ? state.end.getHours() : 0;
			
			// make new lineup array of events, filtered to a date start/end window, and padded to earliest / lastest, and padded for gaps
			paddedLineups.forEach(function (lineup) {
				// first, sort the lineup by start
				lineup.sort(sortEvents);

				const firstEvent = lineup[0];
				if (firstEvent) {
					
					// then, add empty events to the front
					const padHours = firstEvent.when.start.getHours() - startHour;

					if (padHours) {
						// add n hours to front of lineup
						for (var i = 0; i < padHours; i++) {
							// Date.now() call really only to satisfy linting; logic above should guarantee its' existence
							const start = new Date(state.start ? state.start : Date.now());

							if ((i == 0) && options && options.start && (options.start.getMinutes() == 30)) {
									// don't pad a full hour if you only need the 30, ya moran
									const endFirst = new Date(start);
									start.setMinutes(30);		
									endFirst.setMinutes(0);
									endFirst.setHours(endFirst.getHours() + 1);										
									lineup.unshift(evGap(start, endFirst));
							} else {
								start.setHours(start.getHours() + i);	
								lineup.unshift(evGap(start));
							}
						}
					}
				
					// guarantee contiguous events
					utils.fillGapsInLineup(lineup);
				}
				// TODO: do we.. care about padding the end?
			});

			// should return 
			// lineups
			//	- each camp's daily lineup
			// 	- copied and padded to the day
			const model = {
				start: (options && options.start) ? options.start : state.start, 
				end: (options && options.end) ? options.end : state.end,
				// Lineups by camp
				lineups: paddedLineups				
			};

			return model;
		}
	}

};
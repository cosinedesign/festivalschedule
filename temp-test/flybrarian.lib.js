
const cosinedesign = {
	core: {
		ui: {
			clear: function (el) {
				if (el) {
					while (el.firstChild) {
						el.removeChild(el.firstChild);
					}
				}
			},
			create: function (tagName, className) {
				const el = document.createElement(tagName);
				if (className) el.className = className;
				return el;
			}
		},
		view: {
			/* View builder ***************************************************************************/
			View: function (model, mount, render, target) {
				target = target || {};

				target.model = model;
				// Mount appends the DOM into the live DOM
				target.mount = mount;
				// Render puts values (text) into the DOM
				target.render = render;
				// Swap this view with a new view (in place)
				//target.swap = _view_swap;
				// Extend this view with a chained mounter & renderer
				//target.extend = _view_extend;

				//return utils.decorators.events(target);
				return target;
			}	
		}
	},
	data: {
		sort: {
			asc: function (a1, b1) {
				if (a1 > b1) return 1;
				if (a1 < b1) return -1;
				
				return 0;
			},
			dateASC: function (date1, date2) {
				if (date1 > date2) return 1;
				if (date1 < date2) return -1;
				return 0;
			}
		}  
		  
	}
};

const festival = {
	config: {
		year: 2019,
		month: 6,
		days: {
			tues: {
				day: 2
			},
			wednes: { day: 3 },
			thurs: { day: 4 },
			fri: { description: "Bug Burn", day: 5},
			satur: { description: "Temple Burn", day: 6 },
			sun: { description: "Exodus/GTFO", day: 7}
		}
	}
};

(function (festival, config) {
	// Library
	festival.model = {			
		// TODO: this should register the data into the same days, camps, events
		event: function (stage, artist, start, end, description) {
			// default to an hour
			if (!end) { 
				end = new Date(start);
				// Magically, this seems to increment the rest of the date
				end.setHours(end.getHours()+1);
			}
		
			// todo: parse day / start into date 
			const e = {
				artist: artist,
				stage: stage,		
				start: start,
				end: end,
				description: description
			};

			// Need to be able to create empty events
			if (stage) {
				e.stage.events.add(e);
			}

			return e;
		},
		artist: function (name, genres, affiliation) {
			return {
				name: name, 
				genres: genres,
				affiliation: affiliation
			};
		},
		// Stage, soundsystem, or soundcamp
		stage: function (name, location, description) {
			return {
				display: name,
				location: location,
				description: description,
				events: new Set(),
				days: new Set()
			}
		},
		date: function (day, hour, min) {
			if (!min) min = 0;
			
			return new Date(config.year, config.month, day, hour, min);
		},
		data: {
			camps: new Set(),
			artists: new Set(),
			events: new Set()		
		}		
	};
})(
	festival,
	festival.config
);


const flybrarian = {
    
};


(function (root, ui, view) {
    // aliasing
    const View = view.View,
        create = ui.create;


    const views = {
        // List of all artists with events
        Artists: function (model) {
             return View(model, 
                function () {


                },
                function () {},
                {}
            );
        },
        // List of camps with a show/hide function to show schedule
        Camps: function (model) {
             return View(model, 
                function () {},
                function () {},
                {}
            );
        },
        Genres: function (model) {
             return View(model, 
                function () {},
                function () {},
                {}
            );
        },
        // List of days, with lineups per day
        Schedule: function (model) {
             return View(model, 
                function () {
                    //<div class="schedule day">
                    
                    const els = {
                        container: this.container = create('div', 'schedule day'),
                        timeline: this.timeline.mount(),
                        lineups: this.lineups.mount()
                    };
                    
                    els.container.appendChild(els.timeline);
                    els.container.appendChild(els.lineups);

                    this.elements = els;    
                    
                    return this.container;
                
                },
                function () {
                    this.timeline.render();
                    this.lineups.render();
                },
                {
                    lineups: views.Lineups(model),
                    timeline: views.Timeline(model)
                }
            );
        },
        Lineups: function (model) {
            return View(model, 
                function () {
                    const els = {
                        container: create('div', 'lineup')
                    };
                    
                    this.elements = els;
                    return this.container = els.container;    
                },
                function () {
                    //iterate over items in lineup,
                },
                {}
            );
        },
        // Show a single lineup
        Lineup: function (model) {
            return View(model, 
                function () {
                    const els = {
                        container: create('div', 'lineup')
                    };
                    
                    this.elements = els;    
                },
                function () {
                    // create timeboxes for 
                },
                {}
            );
        },
        Timeline: function (model) {
            return View(model, 
                function () {
                    const els = {
                        container: this.container = create('div', 'timeslots'),
                        header: create('div', 'timeslot header')
                    };
                                        
                    this.elements = els;    
                    
                    this.container.appendChild(els.header);

                    return this.container;
                },
                function () {
                    // TODO: Move all this data massaging to a data service class
                    // model.start - model.end
                    const start = new Date(model.start),
                        end = new Date(model.end);

                    if (start.getMinutes() > 0) start.setMinutes(0);
                    // this MUST make end time hour + 1
                    if (end.getMinutes() > 0) {
                        end.setMinutes(0);
                        end.setHours(end.getHours() + 1);
                    }
                    // --------------------------------------
                    debugger;
                    // const hourStart = start.getHours(),
                    //     hourEnd = end.getHours();
                    const hours = (24 - start.getHours()) + end.getHours();

                    // create timeboxes
                    for (var i = 0; i < hours; i++) {
                        const slot = create('div', 'timeslot'),
                            slot30 = create('div', 'timeslot');

                        const d = new Date(start);
                        d.setHours(d.getHours() + i);
                        slot.innerText = d.getHours() + ':00';
                        slot30.innerText = d.getHours() + ':30';
                        this.container.appendChild(slot);
                        this.container.appendChild(slot30);
                    }
                },
                {}
            );
        }
    };
    
    root.views = views;
})(
    flybrarian,
    cosinedesign.core.ui,
    cosinedesign.core.view,
);

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
	// These are actually "stages" in model data
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
		ev(camps.strangeMaine, artists.Saphire, d(days.fri.day, 21), d(days.satur.day, 1)),
		
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
(function (root, data, models) {
	// aliasing
	const ev = models.event;

	function sortEvents(e1, e2) {
		if (e1.start > e2.start) return 1;
		if (e1.start < e2.start) return -1;
		return 0;
	}

	// returns date diff in minutes
	function dateDiffMin(d1, d2) {
		var diff = d2 - d1; 
		if (diff == 0) return 0;

		diff = diff / 1000; // returns in seconds
		diff = diff / 60; // returns minutes

		return diff;
	}

	function getGaps(lineup) {		
		// iterate through array, find gaps
		const gaps = [],
			length = lineup.length;

		var current, next;
				
		for (var i = 0; i < length; i++) {
			// if we're at the last one, we obvs don't need to look for a gap
			if ((i + 1) == length) break;
			current = lineup[i];
			next = lineup[i+1];
			
			// compare start and end hours and minutes
			const diff = dateDiffMin(current.end, next.start);
			const diffHours = diff/60;
			const wholeHours = Math.floor(diffHours);
			const hourRemainder = diffHours - wholeHours;

			if (diff) {
				gaps.push({
					prev: current,
					next: next,
					startIndex: i + 1,
					totalMinutes: diff,
					hours: wholeHours,
					remainderMinutes: diff - (wholeHours * 60) 
				});
			}


			// // .3 is the cutoff for "are we close enough to a full hour" 
			// if (hourRemainder > .3) {
				
				
			// 	const gap = {
			// 		index: i,
			// 		duration: 1
			// 	}
			// }
		}
		
		return gaps;
	}

	// return an array of gap fillers; 
	// - if they start on 30m interval, should be a 30 then 1hr
	// - if they end on 30m interval, should be hours then a 30 
	function getGapFiller(gap) {
		const fillers = [];
		const remainingGap = {
			start: new Date(gap.prev.end),
			end: new Date(gap.next.start)
		};

		var gapEnd = null,
			gapStart = null;

		// leading 30
		if (gap.prev.end.getMinutes() == 30) {
			gapEnd = new Date(gap.prev.end);
			gapEnd.setMinutes(0)
			gapEnd.setHours(gapEnd.getHours() + 1);
			fillers.push(ev(null, null, new Date(gap.prev.end), gapEnd));

			// remove leading 30 from remaining
			remainingGap.start.setMinutes(0);
			remainingGap.start.setHours(remainingGap.start.getHours() + 1);
		}
		//fillers.push('hello world');
		// mid hours
		const remain = dateDiffMin(remainingGap.start, remainingGap.end);
		const hourDec = remain / 60;
		const hours = Math.floor(hourDec);

		// fill in gaps for number of hours
		for (var i = 0; i < hours; i++) {
			fillers.push(ev(null, null, new Date(remainingGap.start)));
			remainingGap.start.setHours(remainingGap.start.getHours() + 1);
		}

		// if next starts on 30, we need to end at next-30, not next
		// trailing 30 - ... need to start at the 0 hour
		if (gap.next.start.getMinutes() == 30) {
			gapStart = new Date(gap.next.start);
			gapStart.setMinutes(0)
			gapEnd = new Date(gap.next.start);
			fillers.push(ev(null, null, gapStart, gapEnd));
		}

		return fillers;
	}

	// TODO: good opportunity for unit testing right here
	function fillGapsInLineup(lineup, sorter) {
		const gaps = getGaps(lineup);

		gaps.forEach(function (gap) {
			const filler = getGapFiller(gap);
			filler.forEach(function (fill) {
				lineup.push(fill);
			});
		});

		// now sort lineup
		if (sorter) { 
			lineup.sort(sorter);
		}
		else {
			lineup.sort(sortEvents);
		}

		// // insert into array *backwards* (so the index to insert into is ok)
		// var gap = null;
		// while (gap = gaps.pop()) {
		// 	// TODO: this should insert on the hour
		// 	const prevEvent = lineup[gap.startIndex - 1];
		// 	if (!prevEvent) debugger;
		// 	const prevTime = new Date(prevEvent.end);
		// 	insertItemsIntoArray(lineup, gap.startIndex, gap.hours, function (iter) {
		// 		const start = new Date(prevTime);
		// 		start.setHours(start.getHours() + iter);
		// 		return ev(null, null, start);
		// 	});		
			
		// 	// Then insert a non-hour time
			
		// 	insertItemsIntoArray(lineup, gap.startIndex, gap.remainderMinutes, function (iter) {
		// 		const start = new Date(prevTime);
		// 		start.setHours(start.getHours() + iter);
		// 		return ev(null, null, start);
		// 	});	
		// }
	}

	// insert in place
	function insertItemsIntoArray(values, index, count, factory) {
		for	(var i = 0; i < count; i++) {
			// Add i to index, otherwise it keeps inserting in the same place - effectively inserting backwards
			values.splice(index + i, 0, factory(i, values));
		}
	}

	// TODO: Massage data here
	const schedules = {}, camps = [];

	const keys = Object.keys(flybrarian.data.stages);
	// for each camp
	keys.forEach(function (key) {
		const stage = flybrarian.data.stages[key];
		
		camps.push(stage);

		const days = Object.keys(stage.lineups);
		days.forEach(function (day) {
			if (!schedules[day]) schedules[day] = [];
			schedules[day].push(lineups[day]);
		});
	});

	const daysLineup = schedules[5];
	console.log(daysLineup);

	// const model = {
	// 	start: daysLineup[0].start,
	// 	end: daysLineup[daysLineup.length - 1].end,
	// 	camps: camps,
	// 	// map of day's lineup per camp
	// 	lineups: daysLineup
	// };


	const process = {
		lineups: {
			// returns a map of (camp, lineup), for day specified
			byDay: function (day) {
				const lineups = new Map();
				
				data.stages.forEach(function (camp) {
					lineups.set(camp, camp.lineups[day]);
				});

				return lineups;
			}
		}	
	};


	const services = root.services = {
		utils: {
			sortEvents: sortEvents,
			dateDiffMin: dateDiffMin,
			getGaps: getGaps,
			getGapFiller: getGapFiller,
			fillGapsInLineup: fillGapsInLineup
		},
		lineups: {
			byDay: function (day) {

				const lineups = process.lineups.byDay(day);
				
				const state = {
					start: null,
					end: null
				};

				const paddedLineups = new Map();

				lineups.forEach(function (lineup, camp) {
					// In a map, a value could be null for a given key, so we must test for value to exist
					if (lineup) {
						const paddedLineup = [];
						paddedLineups.set(camp, paddedLineup);

						lineup.forEach(function (event, day) {
							paddedLineup.push(event);
						
							// find earliest time of all the lineups
							if (state.start) {
								if (state.start > event.start) state.start = event.start;
							} else {
								state.start = event.start;
							}

							// find latest time of all the lineups
							if (state.end) {
								if (state.end < event.end) state.end = event.end;
							} else {
								state.end = event.end;
							}
						});
					}
				});

				// Correct for half-hours
				if (state.start.getMinutes()) {
					state.start = new Date(state.start);
					state.start.setMinutes(0);
				}
				if (state.end.getMinutes()) {
					state.end = new Date(state.end);
					state.end.setHours(state.end.getHours() + 1);
					state.end.setMinutes(0);
				}

				const startHour = state.start.getHours(),
					endHour = state.end.getHours();
				
				// TODO: make new lineup array of events, each padded to earliest / lastest, and padded for gaps
				paddedLineups.forEach(function (lineup, camp) {
					// first, sort the lineup by start
					lineup.sort(sortEvents);
					const firstEvent = lineup[0];
					// then, add empty events to the front
					const padHours = firstEvent.getHours() - startHour;

					if (padHours) {
						// add n hours to front of lineup
						for (var i = 0; i < padHours; i++) {
							const start = new Date(state.start);
							lineup.unshift(ev(null, null, start.setHours(state.getHours() + i)));
						}
					}
					// TODO: guarantee contiguous events

					// TODO: do we.. care about padding the end?


				});


				// should return 
				// lineups
				//	- each camp's daily lineup
				// 	- copied and padded to the day
				const model = {
					start: null, 
					end: null,
					// Lineups by camp
					lineups: new Map()					
				};

				return model;
			},
			byCamp: function () {}
		},
		lists: {
			artists: function () {},
			camps: function () {},			
			genres: function () {}
		}
	};

})(
	flybrarian,
	flybrarian.data, 
	festival.model
);
(function (root, views, services) {
    const state = {};

    
    root.controllers = {
        init: function (app) {
            state.app = app;
        },
        home: {
            main: function () {
                
                //console.log(flybrarian.camps.lamp);

                
                //console.log(lineup);
                // TODO: 
                //debugger;
                // load our first view
                //const lineupView = views.Lineup({});
                // const timeline = views.Timeline({});
                // state.app.elements.content.appendChild(timeline.mount());
                // timeline.render();
                

                // TODO: find each day's start and end time
                // TODO: then, fill in each camp's lineup with empty events up to their first
                
                const model = services.lineups.byDay(5);
                
                const schedule = views.Schedule(model);
                state.app.elements.content.appendChild(schedule.mount());
                schedule.render();
            }
        }
    };

})(
    flybrarian, 
    flybrarian.views,
    flybrarian.services
);


(function (root, core) {
    
    root.app = {
        elements: {}
    };
    // console.log('document testing');    
    
    if (typeof window === "undefined") {
        // we may not be in a browser
    } else {
        if (typeof window.document === "undefined") {

        } else {
            // console.log('document found');

            document.addEventListener("DOMContentLoaded", function () {
                // init controllers
                root.app.elements.content = document.getElementById('content');        

                root.controllers.init(root.app);

                root.controllers.home.main();

            });
        }
    }
})(
    flybrarian,
    cosinedesign.core
);

flybrarian.festival = festival;

module.exports = flybrarian;
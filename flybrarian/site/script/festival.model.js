
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
				camp: stage,		
				start: start,
				end: end,
				description: description
			};
			
			e.camp.events.add(e);
			
			return e;
		},
		artist: function (name, genres, affiliation) {
			return {
				name: name, 
				genres: genres,
				affiliation: affiliation
			};
		},
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
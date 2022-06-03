
import config from '../../../data/festival.config.json';

(function (festival, config) {
	// Library
	festival.model = {			
		// TODO: this should register the data into the same days, camps, events
		event: function (stage, artist, start, end, name, description) {
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
				name: name,
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
	config
);

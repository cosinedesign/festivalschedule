alert('hello world');


// Library
const firefly = {
	year: 2019,
	month: 7,
	days: {
		tues: {
			day: 2
		},
		wednes: { day: 3 },
		thurs: { day: 4},
		fri: { description: "Bug Burn", day: 5},
		satur: { description: "Temple Burn", day: 6 },
		sun: { description: "Exodus/GTFO", day: 7}
	},
	// TODO: this should register the data into the same days, camps, events
	event: function (camp, artist, day, start, end, description) {
		// default to an hour
		if (!end) { 
			end = new Date(start);
			// Magically, this seems to increment the rest of the date
			end.setHours(end.getHours()+1);
		}
	
		// todo: parse day / start into date 
		const e = {
			artist: artist,
			camp: camp,		
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
	camp: function (name, location, description) {
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
		return new Date(firefly.year, firefly.month, day, hour, min);
	},
	data: {
		camps: new Set(),
		artists: new Set(),
		events: new Set()		
	}
};

const core = {
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
    	},
	},
	views: {
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
		}	
	}
};

const views = {
	// List of all artists with events
	Artists: function (model) {
	 	return View(model, 
			function () {},
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
			function () {},
			function () {},
			{}
		);
	},
	// Show a single lineup
	Lineup: function (model) {
	 	return View(model, 
			function () {},
			function () {},
			{}
		);
	}
};

// aliasing

const 
	create = core.ui.create,
	view = core.views.View;
	





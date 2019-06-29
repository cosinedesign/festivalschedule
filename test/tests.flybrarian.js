
const flybrarian = require('flybrarian.lib');

// alias functions
const ev = flybrarian.festival.model.event;

// example test data
const testValues = [
    ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 04:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 05:00:00 GMT-0400')), 
    // ev(null, null, new Date('December 17, 1995 05:00:00'), new Date('December 17, 1995 05:30:00')), 
    ev(null, null, new Date('December 17, 1995 6:00:00 GMT-0400')), 
    //ev(null, null, new Date('December 17, 1995 11:00:00 GMT-0400'), new Date('December 17, 1995 11:30:00 GMT-0400')), 
    /* ev(null, null, new Date('December 17, 1995 11:30:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 12:30:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 14:00:00 GMT-0400')) 
    */
    ev(null, null, new Date('December 17, 1995 10:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 11:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 12:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 18:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 19:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 20:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 21:00:00 GMT-0400')), 
    ev(null, null, new Date('December 17, 1995 22:00:00 GMT-0400')), 
];

// Canary test
test('Canary', () => {
	expect(flybrarian).toBeDefined();
	expect(flybrarian).not.toBeNull();
});

test('One gap in lineup found', () => {
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400')), 
    	ev(null, null, new Date('December 17, 1995 05:00:00 GMT-0400'))
	];

	const gaps = flybrarian.services.utils.getGaps(values);

	expect(gaps).toBeDefined();
	expect(gaps).not.toBeNull();
	expect(gaps.length).toBe(1);
});

test('One 30m (leading) gap in lineup found', () => {
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400'), new Date('December 17, 1995 03:30:00 GMT-0400')), 
    	ev(null, null, new Date('December 17, 1995 04:00:00 GMT-0400'))
	];

	const gaps = flybrarian.services.utils.getGaps(values),
		gap = gaps[0];

	expect(gaps.length).toBe(1);
	expect(gap.totalMinutes).toBe(30);
	expect(gap.startIndex).toBe(1);
});

test('One 30m (trailing) gap in lineup found', () => {
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400')), 
    	ev(null, null, new Date('December 17, 1995 04:30:00 GMT-0400'))
	];

	const gaps = flybrarian.services.utils.getGaps(values),
		gap = gaps[0];

	expect(gaps.length).toBe(1);
	expect(gap.totalMinutes).toBe(30);
	expect(gap.startIndex).toBe(1);
});

test('Two gaps in lineup found', () => {
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400')), 
		ev(null, null, new Date('December 17, 1995 05:00:00 GMT-0400')),
		ev(null, null, new Date('December 17, 1995 07:00:00 GMT-0400'))
	];

	const gaps = flybrarian.services.utils.getGaps(values);

	expect(gaps).toBeDefined();
	expect(gaps).not.toBeNull();
	expect(gaps.length).toBe(2);
});

// --------------------------------- Gap filling created
test('One gap in lineup found and filled', () => {
	// const values = [
	// 	ev(null, null, new Date('December 17, 1995 03:00:00')), 
    // 	ev(null, null, new Date('December 17, 1995 05:00:00'))
	// ];

	// console.log('hours ' + values[0].start.getHours());
	
	// expect(values[0].start.getHours()).toBe(3);

	// const gaps = flybrarian.services.utils.getGaps(values);

	// expect(gaps).toBeDefined();
	// expect(gaps).not.toBeNull();
	// expect(gaps.length).toBe(1);

	// const filler = flybrarian.services.utils.getGapFiller(gaps[0]);

	// expect(filler.length).toBe(1);
});

test('One 30m leading gap in lineup found and filled', () => {
	
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00'), new Date('December 17, 1995 03:30:00')), 
    	ev(null, null, new Date('December 17, 1995 04:00:00'))
	];

	//console.log('hours ' + values[0].start.getHours());
	
	expect(values[0].start.getHours()).toBe(3);

	const gaps = flybrarian.services.utils.getGaps(values);

	expect(gaps).toBeDefined();
	expect(gaps).not.toBeNull();
	expect(gaps.length).toBe(1);

	const filler = flybrarian.services.utils.getGapFiller(gaps[0]);

	//console.log(filler);

	expect(filler.length).toBe(1);
});

test('One 1h and a 30m leading gap in lineup found and filled', () => {
	
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00'), new Date('December 17, 1995 03:30:00')), 
    	ev(null, null, new Date('December 17, 1995 05:00:00'))
	];

	// console.log('hours ' + values[0].start.getHours());
	
	expect(values[0].start.getHours()).toBe(3);

	const gaps = flybrarian.services.utils.getGaps(values);

	expect(gaps).toBeDefined();
	expect(gaps).not.toBeNull();
	expect(gaps.length).toBe(1);

	const filler = flybrarian.services.utils.getGapFiller(gaps[0]);

	// console.log(filler);

	expect(filler.length).toBe(2);
});

test('One 4h gap starting and ending on the 30m found and filled', () => {
	
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00'), new Date('December 17, 1995 03:30:00')), 
    	ev(null, null, new Date('December 17, 1995 07:30:00'))
	];

	const gaps = flybrarian.services.utils.getGaps(values);

	expect(gaps).toBeDefined();
	expect(gaps).not.toBeNull();
	expect(gaps.length).toBe(1);

	const filler = flybrarian.services.utils.getGapFiller(gaps[0]);

	// console.log(filler);
	expect(filler[0].start.getHours()).toBe(values[0].end.getHours());
	expect(filler[0].start.getMinutes()).toBe(30);
	expect(filler[0].end.getMinutes()).toBe(0);


	expect(filler.length).toBe(5);
});


test('One 30m trailing gap in lineup found and filled', () => {
	
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00')), 
    	ev(null, null, new Date('December 17, 1995 04:30:00'))
	];

	//console.log('hours ' + values[0].start.getHours());
	
	expect(values[0].start.getHours()).toBe(3);

	const gaps = flybrarian.services.utils.getGaps(values);

	expect(gaps).toBeDefined();
	expect(gaps).not.toBeNull();
	expect(gaps.length).toBe(1);

	const filler = flybrarian.services.utils.getGapFiller(gaps[0]);

	//console.log(filler);
	expect(filler[0].start.getHours()).toBe(values[0].end.getHours());
	expect(filler[0].start.getMinutes()).toBe(0);
	expect(filler[0].end.getMinutes()).toBe(30);
	expect(filler.length).toBe(1);
});


// --------------------------------- Gap filling in lineup array
test('One gap in lineup filled', () => {
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400')), 
    	ev(null, null, new Date('December 17, 1995 05:00:00 GMT-0400'))
	];
	
	expect(values.length).toBe(2);
	flybrarian.services.utils.fillGapsInLineup(values);
	expect(values.length).toBe(3);
});

test('One gap in lineup filled correctly', () => {
	
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400')), 
    	ev(null, null, new Date('December 17, 1995 05:00:00 GMT-0400'))
	];
	
	flybrarian.services.utils.fillGapsInLineup(values);
	
	const testEvent = values[1];
	
	// console.log(values[0]);
	// console.log(testEvent.start);
	// console.log(testEvent.end);
	expect(testEvent.start.getHours()).toBe(values[0].end.getHours());
});

test('One 1hr 30m (leading) gap in lineup filled correctly', () => {
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400'), new Date('December 17, 1995 03:30:00 GMT-0400')), 
    	ev(null, null, new Date('December 17, 1995 05:00:00 GMT-0400'))
	];
	
	flybrarian.services.utils.fillGapsInLineup(values);
	
	const testEvent = values[1];
	
	expect(values.length).toBe(4);
	expect(testEvent.start.getHours()).toBe(values[0].end.getHours());
});

test('Comprehensive event lineup test', () => {
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400'), new Date('December 17, 1995 03:30:00 GMT-0400')), // 1
		ev(null, null, new Date('December 17, 1995 05:00:00 GMT-0400')), //4
		ev(null, null, new Date('December 17, 1995 06:00:00 GMT-0400')), //5
		ev(null, null, new Date('December 17, 1995 09:00:00 GMT-0400')), //9
		ev(null, null, new Date('December 17, 1995 10:30:00 GMT-0400')),// 11
		ev(null, null, new Date('December 17, 1995 13:30:00 GMT-0400')), //13 
	];
	
	flybrarian.services.utils.fillGapsInLineup(values);
	
	const testEvent = values[1];
	
	// console.log(values);

	expect(values.length).toBe(14);
	expect(testEvent.start.getHours()).toBe(values[0].end.getHours());
});

test('Get events overlapping a window', () => {
	const values = [
		ev(null, null, new Date('December 17, 1995 03:00:00'), new Date('December 17, 1995 03:30:00')), // 1
		ev(null, null, new Date('December 17, 1995 05:00:00')), //6
		ev(null, null, new Date('December 17, 1995 06:00:00')), //6
		ev(null, null, new Date('December 17, 1995 09:00:00')), //10
		ev(null, null, new Date('December 17, 1995 10:30:00')),// 11
		ev(null, null, new Date('December 17, 1995 13:30:00')) //14:30 
	];
	
	const overlap = { 
		start: new Date('December 17, 1995 07:00:00'),
		end: new Date('December 17, 1995 11:00:00')
	};

	const results = values.filter(flybrarian.services.utils.getEventWindow(overlap));

	console.log(overlap);
	console.log(results);

	expect(results.length).toBe(3);

});

// TODO: test an unsorted array of lineups into fillGapsInLineups.

// test('One 30m (trailing) gap in lineup filled correctly', () => {
// 	const values = [
// 		ev(null, null, new Date('December 17, 1995 03:00:00 GMT-0400')), 
//     	ev(null, null, new Date('December 17, 1995 04:30:00 GMT-0400'))
// 	];
	
// 	flybrarian.services.utils.fillGapsInLineup(values);
	
// 	const testEvent = values[1];
	
// 	// console.log(values[0]);
// 	// console.log(testEvent.start);
// 	// console.log(testEvent.end);
// 	expect(testEvent.start.getHours()).toBe(values[0].end.getHours());
// });
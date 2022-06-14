import { RealWorldEvent, DateTimeSpan } from '../../types/models.common';
import { Performance } from '../../types/models.events';

type LineupGap = {
	prev: DateTimeSpan,
	next: DateTimeSpan,
	startIndex: number,
	totalMinutes: number,
	hours: number,
	remainderMinutes: number 
}

// Creates a blank event to fill in empty space in the calendar
function evGap (start: Date, end?: Date) : RealWorldEvent {
	if (!end) { 
		end = new Date(start);
		// Magically, this seems to increment the rest of the date
		end.setHours(end.getHours()+1);
	}

	return {
		when: {
			start: start,
			end: end
		}
	}
}

// returns date diff in minutes
function dateDiffMin(d1: Date, d2: Date) : number {
	// @ts-ignore Typescript HATES date to number coercion for dates
	var diff = d2 - d1; 
	if (diff == 0) return 0;

	diff = diff / 1000; // returns in seconds

	diff = Math.floor((diff / 60) + .2); // returns minutes

	return diff;
}

function getGaps(lineup: Array<RealWorldEvent>) : Array<LineupGap> {		
	// iterate through array, find gaps
	const gaps: Array<LineupGap> = [],
		length = lineup.length;

	let current: DateTimeSpan, 
		next: DateTimeSpan;
			
	for (let i = 0; i < length; i++) {
		// if we're at the last one, we obvs don't need to look for a gap
		if ((i + 1) == length) break;
		current = lineup[i].when;
		next = lineup[i+1].when;
		
		// compare start and end hours and minutes
		const diff = dateDiffMin(current.end, next.start);
		const diffHours = diff / 60;
		const wholeHours = Math.floor(diffHours + .2);
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
function getGapFiller (gap: LineupGap) : Array<RealWorldEvent> {
	const fillers : Array<RealWorldEvent> = [];
	const remainingGap = {
		start: new Date(gap.prev.end),
		end: new Date(gap.next.start)
	};

	let gapEnd,
		gapStart;

	// leading 30
	if (gap.prev.end.getMinutes() == 30) {
		gapEnd = new Date(gap.prev.end);
		gapEnd.setMinutes(0)
		gapEnd.setHours(gapEnd.getHours() + 1);
		fillers.push(evGap(new Date(gap.prev.end), gapEnd));

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
		fillers.push(evGap(new Date(remainingGap.start)));
		remainingGap.start.setHours(remainingGap.start.getHours() + 1);
	}

	// if next starts on 30, we need to end at next-30, not next
	// trailing 30 - ... need to start at the 0 hour
	if (gap.next.start.getMinutes() == 30) {
		gapStart = new Date(gap.next.start);
		gapStart.setMinutes(0)
		gapEnd = new Date(gap.next.start);
		fillers.push(evGap(gapStart, gapEnd));
	}

	return fillers;
}

// TODO: good opportunity for unit testing right here
function fillGapsInLineup(lineup, sorter?) : void {
	if (sorter) { 
		lineup.sort(sorter);
	}
	else {
		lineup.sort(sortEvents);
	}

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

function getEventWindow(overlap) {

	return function (event) {
		const when = event.when;
		
		if (when.start >= overlap.end) return null;
		if (when.end <= overlap.start) return null;

		return event;
	};
}

function fitEventWindow(overlap) {
	// debugger;
	const filter = getEventWindow(overlap);

	return function (event) {
		event = filter(event);

		if (!event) return;
		const clone = Object.assign({}, event);
		const when = event.when;
		
		if (when.start < overlap.start) when.start = new Date(overlap.start);
		if (when.end > overlap.end) when.end = new Date(overlap.end);
	
		return clone;
	}
}

function sortEvents(e1: RealWorldEvent, e2: RealWorldEvent) {
	if (e1.when.start > e2.when.start) return 1;
	if (e1.when.start < e2.when.start) return -1;
	return 0;
}

export const utilities = {
    sortEvents: sortEvents,
    createGap: evGap,
    dateDiffMin: dateDiffMin,
    getGaps: getGaps,
    getGapFiller: getGapFiller,
    fillGapsInLineup: fillGapsInLineup,
    getEventWindow: getEventWindow,
    fitEventWindow: fitEventWindow
};
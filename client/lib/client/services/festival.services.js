import { festivalData } from '../../data/flybrarian.data';
// alias
const data = festivalData;
// Creates a blank event to fill in empty space in the calendar
function evGap(start, end) {
    if (!end) {
        end = new Date(start);
        // Magically, this seems to increment the rest of the date
        end.setHours(end.getHours() + 1);
    }
    return {
        when: {
            start: start,
            end: end
        }
    };
}
function sortEvents(e1, e2) {
    if (e1.when.start > e2.when.start)
        return 1;
    if (e1.when.start < e2.when.start)
        return -1;
    return 0;
}
// returns date diff in minutes
function dateDiffMin(d1, d2) {
    var diff = d2 - d1;
    if (diff == 0)
        return 0;
    diff = diff / 1000; // returns in seconds
    diff = Math.floor((diff / 60) + .2); // returns minutes
    return diff;
}
function getGaps(lineup) {
    // iterate through array, find gaps
    const gaps = [], length = lineup.length;
    let current, next;
    for (var i = 0; i < length; i++) {
        // if we're at the last one, we obvs don't need to look for a gap
        if ((i + 1) == length)
            break;
        current = lineup[i].when;
        next = lineup[i + 1].when;
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
function getGapFiller(gap) {
    const fillers = [];
    const remainingGap = {
        start: new Date(gap.prev.end),
        end: new Date(gap.next.start)
    };
    let gapEnd = null, gapStart = null;
    // leading 30
    if (gap.prev.end.getMinutes() == 30) {
        gapEnd = new Date(gap.prev.end);
        gapEnd.setMinutes(0);
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
        gapStart.setMinutes(0);
        gapEnd = new Date(gap.next.start);
        fillers.push(evGap(gapStart, gapEnd));
    }
    return fillers;
}
// TODO: good opportunity for unit testing right here
function fillGapsInLineup(lineup, sorter) {
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
// insert in place
function insertItemsIntoArray(values, index, count, factory) {
    for (var i = 0; i < count; i++) {
        // Add i to index, otherwise it keeps inserting in the same place - effectively inserting backwards
        values.splice(index + i, 0, factory(i, values));
    }
}
// TODO: Massage data here
const schedules = {}, camps = [];
const keys = Object.keys(data.stages);
// for each camp
keys.forEach(function (key) {
    const stage = data.stages[key];
    camps.push(stage);
    const days = Object.keys(stage.lineups);
    days.forEach(function (day) {
        if (!schedules[day])
            schedules[day] = [];
        schedules[day].push(stage.lineups[day]);
    });
});
//const daysLineup = schedules[5];
//console.log(daysLineup);
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
                const lineup = camp.lineups.get(day);
                lineups.set(camp, lineup);
            });
            // then we need to sort & fill lineups
            return lineups;
        }
    }
};
function getEventWindow(overlap) {
    return function (event) {
        const when = event.when;
        if (when.start >= overlap.end)
            return null;
        if (when.end <= overlap.start)
            return null;
        return event;
    };
}
function fitEventWindow(overlap) {
    // debugger;
    const filter = getEventWindow(overlap);
    return function (event) {
        event = filter(event);
        if (!event)
            return;
        const clone = Object.assign({}, event);
        const when = event.when;
        if (when.start < overlap.start)
            when.start = new Date(overlap.start);
        if (when.end > overlap.end)
            when.end = new Date(overlap.end);
        return clone;
    };
}
export const services = {
    _test: process.lineups.byDay,
    utils: {
        sortEvents: sortEvents,
        dateDiffMin: dateDiffMin,
        getGaps: getGaps,
        getGapFiller: getGapFiller,
        fillGapsInLineup: fillGapsInLineup,
        getEventWindow: getEventWindow,
        fitEventWindow: fitEventWindow
    },
    lineups: {
        // options:
        // - filter
        byDay: function (day, options) {
            const lineups = process.lineups.byDay(day);
            const state = {
                start: null,
                end: null
            };
            const filter = (options && options.start) ? services.utils.fitEventWindow(options) : null;
            const paddedLineups = new Map();
            lineups.forEach(function (lineup, camp) {
                // In a map, a value could be null for a given key, so we must test for value to exist
                if (lineup) {
                    const paddedLineup = [];
                    var hasEvents = false;
                    lineup.forEach(function (event, day) {
                        if (options && filter) {
                            event = filter(event);
                        }
                        if (!event)
                            return;
                        hasEvents = true;
                        paddedLineup.push(event);
                        // find earliest time of all the lineups
                        if (state.start) {
                            if (state.start > event.when.start)
                                state.start = event.when.start;
                        }
                        else {
                            state.start = event.when.start;
                        }
                        // find latest time of all the lineups
                        if (state.end) {
                            if (state.end < event.when.end)
                                state.end = event.when.end;
                        }
                        else {
                            state.end = event.when.end;
                        }
                    });
                    if (hasEvents)
                        paddedLineups.set(camp, paddedLineup);
                }
            });
            // Short-circuit when no start events satisfied
            if (!state.start)
                return;
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
            const startHour = state.start.getHours(), endHour = state.end.getHours();
            // make new lineup array of events, filtered to a date start/end window, and padded to earliest / lastest, and padded for gaps
            paddedLineups.forEach(function (lineup, camp) {
                // first, sort the lineup by start
                lineup.sort(sortEvents);
                const firstEvent = lineup[0];
                if (firstEvent) {
                    // then, add empty events to the front
                    const padHours = firstEvent.when.start.getHours() - startHour;
                    if (padHours) {
                        // add n hours to front of lineup
                        for (var i = 0; i < padHours; i++) {
                            const start = new Date(state.start);
                            if ((i == 0) && options && options.start && (options.start.getMinutes() == 30)) {
                                // don't pad a full hour if you only need the 30, ya moran
                                const endFirst = new Date(start);
                                start.setMinutes(30);
                                endFirst.setMinutes(0);
                                endFirst.setHours(endFirst.getHours() + 1);
                                lineup.unshift(evGap(start, endFirst));
                            }
                            else {
                                start.setHours(start.getHours() + i);
                                lineup.unshift(evGap(start));
                            }
                        }
                    }
                    // guarantee contiguous events
                    fillGapsInLineup(lineup);
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
        },
        byCamp: function () { }
    },
    lists: {
        artists: function () { },
        camps: function () { },
        genres: function () { }
    }
};

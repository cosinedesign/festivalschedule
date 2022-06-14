

import { Performance, Performer, Stage } from "../types/models.events";
import { DateTimeSpan, RealWorldEvent } from "../types/models.common";

// Fun with TypeScript object conposition! 
const partials = {
    person: { 
        name: null 
    },
    musician: { 
        affiliation: []
    },
    performer: { 
        aliases: [],
        genres: []
    },
    searchable: {
        name: null,
        description: null,
        tags: [],
        keywords: []
    },
    performanceEvent: {
        when: null,
        where: null,
        who: []
    }
};

const p = partials; 

// Cache some object shapes
const shapes = {
    performer: {
        ...p.searchable,
        ...p.person,
        ...p.performer
    } as Performer
    /*,
    musician: {
        ...p.searchable,
        ...p.person,
        ...p.performer,
        ...p.musician
    } as Musician */
}

type musicEvent = {
    where: Location,
    who: Array<Performer>,
    when: DateTimeSpan
}

export const factory = {
    helpers: {
        buildEvent: function (stage: Stage, performer: Performer | Array<Performer>, start: Date, end?: Date, name?: string, description?: string) : Performance {
                    
            // @ts-ignore this is a perfectly valid way to check to see if we have an array
            const performers : Array<Performer> = (performer && performer.isArray && performer.isArray()) ? performer : [performer];

            // default to an hour
			if (!end) { 
				end = new Date(start);
				// Magically, this seems to increment the rest of the date
				end.setHours(end.getHours()+1);
			}

            const e = factory.build.performance({
                name: name, 
                description: description,
                where: stage,
                who: performers,
                when: {
                    start: start,
                    end: end
                } as DateTimeSpan
            });

            if (stage) {
                stage.events.add(e);
            }

            return e;
        },
        buildCamp: function (name: string) : Stage {
            return {
                id: null, 
                name: name,
                events: new Set(),
                lineups: new Map<number, Array<RealWorldEvent>>(),
                days: new Set()
            };
        }
    },
    build: {
        performance: function (props?: any) : Performance {
            
            return {
                ...p.performanceEvent,                
                ...props
            };
        },      
        performer: function (props?: any): Performer {
            
            return {
                ...shapes.performer,
                ...props
            };
        }
    }
};


import { Musician, MusicEvent, Performer, RealWorldEvent, Stage, DateTimeSpan } from "../types/events.models";

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
    } as Performer,
    musician: {
        ...p.searchable,
        ...p.person,
        ...p.performer,
        ...p.musician
    } as Musician
}

type musicEvent = {
    where: Location,
    who: Array<Musician>,
    when: DateTimeSpan
}

export const factory = {
    helpers: {
        buildEvent: function (stage: Stage, artist: Performer | Array<Performer>, start: Date, end?: Date, name?: string, description?: string) : MusicEvent {
                    
            // @ts-ignore this is a perfectly valid way to check to see if we have an array
            const artists : Array<Performer> = (artist && artist.isArray && artist.isArray()) ? artist : [artist];

            // default to an hour
			if (!end) { 
				end = new Date(start);
				// Magically, this seems to increment the rest of the date
				end.setHours(end.getHours()+1);
			}

            const e = factory.build.musicEvent({
                name: name, 
                description: description,
                where: stage,
                who: artists ,
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
                name: name,
                events: new Set(),
                lineups: new Map<number, Array<RealWorldEvent>>(),
                days: new Set()
            };
        }
    },
    build: {
        musicEvent: function (props?: any) : MusicEvent {
            
            return {
                ...p.performanceEvent,                
                ...props
            };
        },
        musician: function (props?: any): Musician {
            
            return {
                ...shapes.musician,
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

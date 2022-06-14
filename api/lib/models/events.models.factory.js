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
    }
    /*,
    musician: {
        ...p.searchable,
        ...p.person,
        ...p.performer,
        ...p.musician
    } as Musician */
};
export const factory = {
    helpers: {
        buildEvent: function (stage, performer, start, end, name, description) {
            // @ts-ignore this is a perfectly valid way to check to see if we have an array
            const performers = (performer && performer.isArray && performer.isArray()) ? performer : [performer];
            // default to an hour
            if (!end) {
                end = new Date(start);
                // Magically, this seems to increment the rest of the date
                end.setHours(end.getHours() + 1);
            }
            const e = factory.build.performance({
                name: name,
                description: description,
                where: stage,
                who: performers,
                when: {
                    start: start,
                    end: end
                }
            });
            if (stage) {
                stage.events.add(e);
            }
            return e;
        },
        buildCamp: function (name) {
            return {
                id: null,
                name: name,
                events: new Set(),
                lineups: new Map(),
                days: new Set()
            };
        }
    },
    build: {
        performance: function (props) {
            return {
                ...p.performanceEvent,
                ...props
            };
        },
        performer: function (props) {
            return {
                ...shapes.performer,
                ...props
            };
        }
    }
};

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
    },
    musician: {
        ...p.searchable,
        ...p.person,
        ...p.performer,
        ...p.musician
    }
};
export const factory = {
    helpers: {
        buildEvent: function (stage, artist, start, end, name, description) {
            // @ts-ignore this is a perfectly valid way to check to see if we have an array
            const artists = (artist && artist.isArray && artist.isArray()) ? artist : [artist];
            // default to an hour
            if (!end) {
                end = new Date(start);
                // Magically, this seems to increment the rest of the date
                end.setHours(end.getHours() + 1);
            }
            const e = factory.build.musicEvent({
                name: name,
                description: description,
                where: stage,
                who: artists,
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
                name: name,
                events: new Set(),
                lineups: new Map(),
                days: new Set()
            };
        }
    },
    build: {
        musicEvent: function (props) {
            return {
                ...p.performanceEvent,
                ...props
            };
        },
        musician: function (props) {
            return {
                ...shapes.musician,
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

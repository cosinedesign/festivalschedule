import { Performer } from "../../types/events.models";
import { factory } from "../../models/events.models.factory";

const Musician = factory.build.musician;

export const artistService = {
    get: function () : Performer {
        return Musician();        
    },
    list: function () : Array<Performer> {
        return [];
    },
    set: function () {}
    
};
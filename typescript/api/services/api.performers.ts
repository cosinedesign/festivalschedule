import { Performer } from "../../types/models.events";
import { factory } from "../../models/events.models.factory";

const Performer = factory.build.performer;

export const artistService = {
    get: function () : Performer {
        return Performer();        
    },
    list: function () : Array<Performer> {
        return [];
    },
    set: function () {}
    
};
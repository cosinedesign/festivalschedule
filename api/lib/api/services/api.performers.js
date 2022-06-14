import { factory } from "../../models/events.models.factory";
const Performer = factory.build.performer;
export const artistService = {
    get: function () {
        return Performer();
    },
    list: function () {
        return [];
    },
    set: function () { }
};

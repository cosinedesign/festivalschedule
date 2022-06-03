import { factory } from "../../models/events.models.factory";
const Musician = factory.build.musician;
export const artistService = {
    get: function () {
        return Musician();
    },
    list: function () {
        return [];
    },
    set: function () { }
};

import { IStateStore } from "../core/cosinedesign.core";
import { cosinedesign as cd } from "../core/cosinedesign.core";

const Store = cd.data.Store;

export const stores = {
    "stages": Store({}),
    "performers": Store({}),
    "events": Store({})
};


// TODO: write data to file on change
// TODO: load data from file
import { ApplicationState, Context, ContextBuilder } from '../types/application'
import {controllers } from '../client/controllers/flybrarian.controllers';

export const contextMap: Map<string, Context> = new Map();

export function initContexts (state: ApplicationState): void {
    controllers.init(state);
}



const async = { 
    loaders: {
        home: async function () {
            const home = controllers.home;

            return new Promise<boolean>(async (resolve, reject) => {
                try {
                    await home.main();
                } catch (ex) {
                    console.error('error in home.load', ex);
                    reject(ex);
                }

                resolve(false);
            });
        }
    },
    unloaders: {},
    reloaders: {}
}


 // aliasing...
 const cb = ContextBuilder,
 cM = contextMap;    

cM.set('authentication', cb(function () {}, function () {})),
cM.set('authorization', cb(function () {}, function () {})),

// TODO: maybe have an init controller that does the initial setup/teardowns. maybe with a splash?
cM.set('init', cb(function () {}, function () {})),
// Home TODO:
/*
    - if we are within event, home should call FOMOVISION (This should be in homecontroller.load)
*/
cM.set('home', cb(async.loaders.home, function () {})),
cM.set('performers', cb(function () {}, function () {})),
cM.set('search', cb(function () {}, function () {})),
cM.set('stages', cb(function () {}, function () {}))

    
import { ApplicationState, Context } from '../types/application';
import { contextMap, initContexts } from './contexts';

/*

- initialize
- authenticate
    - auth workflow
- 

// phases
// transition 
// - unload
// - optional [transitions] to move from one to another
// - load
// move

*/




export const dispatcher = (function () {    
    const state : { 
        // this is stupid, I can't just tell TS that if this property exists 
        current?: Context | undefined | null, 
        appState?: ApplicationState,
        [key: string]: any 
    } = {        
        
    };

    return {
        get contexts () { 
            return contextMap;
        },
        init: async function (appState) {
            state.appState = appState

            initContexts(appState);
            
            if (!state.current) return dispatcher.moveTo('home');
        },
        moveTo: async function moveTo(c?: Context | string) : Promise<void> {
            if (!c) return; // <-- HEY TYPESCRIPT, THIS IS A THING THAT KEEPS 2322 AT BAY, DUMMY
    
            if (typeof c === 'string') {                            
                return dispatcher.moveTo(dispatcher.contexts.get(c));
            }
    
            if (state.current) state.current.unload(state.appState);
            // @ts-ignore 2322 needs to diaf, I have numerous checks above and until javascript supports true overloads 
            // (it won't! because it CAN'T) 
            // then typescript needs to support overloads for js better, and this utterly stupid error needs to go away
            state.current = c;
            // @ts-ignore 2322 needs to diaf
            return state.current.load(state.appState);
        },
        load: async function () {},
        reload: async function () {}

    };
})();




export type ApplicationState = {
    elements: {
        [key: string]: HTMLBaseElement
    },
    [key: string]: any 
}

export type Context = {
    load: Function,
    unload: Function,
}

interface ContextPhase {
    (state: any, ...args: any[]): Promise<Boolean> | boolean | void;
}

export function ContextBuilder (loader: ContextPhase, unloader: ContextPhase, reloader?: ContextPhase) : Context {
    return {
        load: loader,
        unload: unloader
    };
}

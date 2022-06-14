export function ContextBuilder(loader, unloader, reloader) {
    return {
        load: loader,
        unload: unloader
    };
}

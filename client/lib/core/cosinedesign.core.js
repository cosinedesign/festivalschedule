// wat where the dependencies why no dependencies
export const cosinedesign = {
    core: {
        ui: {
            clear: function (el) {
                if (el) {
                    while (el.firstChild) {
                        el.removeChild(el.firstChild);
                    }
                }
            },
            create: function (tagName, className) {
                const el = document.createElement(tagName);
                if (className)
                    el.className = className;
                return el;
            }
        },
        view: {
            /* View builder ***************************************************************************/
            View: function (model, mount, render, target) {
                const events = cosinedesign.core.extensions.events;
                return {
                    model: model,
                    // Mount appends the DOM into the live DOM
                    mount: mount,
                    // Render binds data to the DOM
                    render: render,
                    ...events,
                    ...target
                };
            }
        },
        extensions: {
            events: (function () {
                const handlerMap = new WeakMap();
                function _getOrInitMap(target) {
                    if (handlerMap.has(target))
                        return handlerMap.get(target);
                    const handlers = new Map();
                    handlerMap.set(target, handlers);
                    return handlers;
                }
                function _addHandler(eventName, handler, handlers) {
                    if (handlers.has(eventName)) {
                        handlers.get(eventName).add(handler);
                    }
                    else {
                        const handlerList = new Set();
                        handlerList.add(handler);
                        handlers.set(eventName, handlerList);
                    }
                }
                function _fireEvent(target, handler, args) {
                    if (handler) {
                        if (handler instanceof Set) {
                            handler.forEach(function (action) {
                                _fireEvent(target, action, args);
                            });
                        }
                        else {
                            handler.apply(target, args);
                        }
                    }
                }
                return {
                    // listen to an event
                    on: function (eventName, handler) {
                        _addHandler(eventName, handler, _getOrInitMap(this));
                    },
                    // trigger an event with any number of arguments passed into it
                    trigger: function (eventName) {
                        const handlers = handlerMap.get(this);
                        // This line MUST stay to keep the eventName after the splice call.
                        // in fact, do not optimize anything in this method; 
                        // order is extremely important due to magic and dragons
                        const key = eventName;
                        // strip the event name from arguments
                        [].splice.call(arguments, 0, 1);
                        // this may look like you can remove this, but don't. Again, magic.
                        const thatArgs = arguments;
                        // and let's execute the event
                        _fireEvent(this, handlers.get(key), thatArgs);
                        return this;
                    }
                };
            })()
        }
    },
    data: {
        sort: {
            asc: function (a1, b1) {
                if (a1 > b1)
                    return 1;
                if (a1 < b1)
                    return -1;
                return 0;
            },
            dateASC: function (date1, date2) {
                if (date1 > date2)
                    return 1;
                if (date1 < date2)
                    return -1;
                return 0;
            }
        }
    }
};

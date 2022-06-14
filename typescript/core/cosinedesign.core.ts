// wat where the dependencies why no dependencies

let cd;

function navigateTo (source: any, path: string) {
	const breadcrumbs = path.split('.');
	const length = breadcrumbs.length;

	let current = source;

	breadcrumbs.forEach((crumb) => {
		if (current) current = current[crumb];									
	});

	return current; 
}

function objectPathToObject (path: string) : any {
    
	// split the string into 
	const breadcrumbs = path.split('.');
	const objectPath = {},
		length = breadcrumbs.length;

	let current = objectPath; 

	breadcrumbs.forEach((crumb, index) => {
		if (index + 1 == length) {
			current[crumb] = null;
		} else {
			current = current[crumb] = {};
		}					
	});

	return objectPath;
}

export const cosinedesign = cd = {
	core: {
		ui: {
			clear: function (el: HTMLElement) {
				if (el) {
					while (el.firstChild) {
						el.removeChild(el.firstChild);
					}
				}
			},
			create: function (tagName: string, className?: string) {
				const el = document.createElement(tagName);
				if (className) el.className = className;
				return el;
			}
		},
		view: {
			/* View builder ***************************************************************************/
			View: function (model: object, mount: Function, render: Function, target: object) {
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
					if (handlerMap.has(target)) return handlerMap.get(target);
	
					const handlers = new Map();
					handlerMap.set(target, handlers);
					return handlers;
				}
	
				function _addHandler(eventName, handler, handlers) {
					if (handlers.has(eventName)) {
						handlers.get(eventName).add(handler);		
					} else {
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
						} else {
							handler.apply(target, args);
						}
					}
				}
	
				return {
					// listen to an event
					on: function (eventName: string, handler: Function) {
						_addHandler(eventName, handler, _getOrInitMap(this));                    
					},
					// trigger an event with any number of arguments passed into it
					trigger: function (eventName: string) {
						const handlers = handlerMap.get(this);
						if (!handlers) return;
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
		join: {
			// take structure from left, overwrite with values from right that are in left			
			left: function (left: Object, right: Object) {
				const keys = Object.keys(left);
				const result = {};
				let key;
				while (key = keys.pop()) {					
					result[key] = right[key] || left[key];					
				}

				return result;
			},
			// take structure from left, create new object with values from right, discard items with no match
			inner: function (left: Object, right: Object) {
				const keys = Object.keys(left);
				const result = {};
				let key;
				while (key = keys.pop()) { 					
					result[key] = right[key];				
				}
				
				return result;
			},
			deep: {
				left: function deepLeft (left: Object, right: Object) {		
					if (!left) return right;			
					
					const keys = Object.keys(left);
					const result = {};
					let key;

					while (key = keys.pop()) {				
						const leftVal = left ? left[key] : null,
						 	rightVal = right ? right[key] : null;

						if (typeof leftVal == 'object') {
							result[key] = deepLeft(leftVal, rightVal);
						}
						else {
							result[key] = rightVal || leftVal;					
						}
					}
	
					return result;
				},
				inner: function deepInner (left: Object, right: Object) {
					const keys = Object.keys(left);
					const result = {};
					let key;
					while (key = keys.pop()) {	
						const value = right[key];
					
						if (typeof value == 'object') {
							result[key] = deepInner(left[key], right[key]);
						}
						else {
							(value) ? (result[key] = value) : null;						
						}
					}
	
					return result;
				}
			}
		},
		sort: {
			asc: function (a1, b1) {
				if (a1 > b1) return 1;
				if (a1 < b1) return -1;
				
				return 0;
			},
			dateASC: function (date1: Date, date2: Date) {
				if (date1 > date2) return 1;
				if (date1 < date2) return -1;
				return 0;
			}
		},
		Store: function (initialState?: any) : IStateStore {
			const state = initialState || {};
			return {
				initialize: function (importState) {
					Object.assign(state, importState);
				},
				subscribe: function (path: string, handler: Function) {},
				
				// allow listening to a slice of the store
				getSlice: function (path: string, preserveStructure?: boolean) : any {


					if (preserveStructure) {
						const sliceDef = objectPathToObject(path);
						return cd.data.join.deep.left(sliceDef, state);
					}
					else {
						const stateVal = navigateTo(state, path);
						return Object.assign({}, stateVal); 
					}
				},
				//
				setSlice: function (path: string, update: any, alwaysTrigger?: boolean) {
					const stateVal = navigateTo(state, path);
					
					// TODO: raise events if data has changed 
					this.trigger(path + '-change', update);					
					
					return Object.assign(stateVal, update); 
				},
				...cosinedesign.core.extensions.events
			};		  
		},
		navigateTo: navigateTo,
		objectPathToObject: objectPathToObject
	}
};

export interface IStateStore {
	initialize(initialState: any): void;
	subscribe(path: string, handler: (...args: any[]) => void) : void;
	getSlice(path: string, preserveStructure?: boolean): any;
	setSlice(path: string, update: any, alwaysTrigger?: boolean): void;
};

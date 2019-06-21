
const cosinedesign = {
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
				if (className) el.className = className;
				return el;
			},
		},
		view: {
			/* View builder ***************************************************************************/
			View: function (model, mount, render, target) {
				target = target || {};

				target.model = model;
				// Mount appends the DOM into the live DOM
				target.mount = mount;
				// Render puts values (text) into the DOM
				target.render = render;
				// Swap this view with a new view (in place)
				//target.swap = _view_swap;
				// Extend this view with a chained mounter & renderer
				//target.extend = _view_extend;

				//return utils.decorators.events(target);
				return target;
			}	
		}
	},
	data: {
		sort: {
			asc: function (a1, b1) {
				if (a1 > b1) return 1;
				if (a1 < b1) return -1;
				
				return 0;
			},
			dateASC: function (date1, date2) {
				if (date1 > date2) return 1;
				if (date1 < date2) return -1;
				return 0;
			}
		}  
		  
	}
};
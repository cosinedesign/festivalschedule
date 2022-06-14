import { cosinedesign as lib } from "../../core/cosinedesign.core"

const ui = lib.core.ui;

const create = ui.create,
    clear = ui.clear,
    View = lib.core.view.View;

export const views = {
    AuthenticationView: function (model) {

        return View(
            model || {},
            function () {
                this.elements = {
                    container: this.container = create('div')                    

                }

                return this.container;
            },
            function () {},
            {
                listDjView: views.ListView({})
            }
        );
    },
    ListView: function (model) {

        return View(
            model || {},
            function () {
                this.elements = {
                    container: this.container = create('div'),
                    list: create('div', 'list-performers')
                }

                return this.container;
            },
            function () {
                const that = this;
                
                clear(this.elements.list);

                this.model.performers.forEach((performer) => {
                    const pV = views.PerformerView(performer);
                    that.elements.list.appendChild(pV.mount());
                    pV.render();
                });
            },
            {}
        );
    },
    PerformerView: function (model) {
        return View(
            model || {},
            function () {
                this.elements = {
                    container: this.container = create('div')
                }

                return this.container;
            },
            function () {},
            {}
        );
    } 
};
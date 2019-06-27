(function (root, ui, view) {
    // aliasing
    const View = view.View,
        create = ui.create;


    const views = {
        // List of all artists with events
        Artists: function (model) {
             return View(model, 
                function () {


                },
                function () {},
                {}
            );
        },
        // List of camps with a show/hide function to show schedule
        Camps: function (model) {
             return View(model, 
                function () {},
                function () {},
                {}
            );
        },
        Genres: function (model) {
             return View(model, 
                function () {},
                function () {},
                {}
            );
        },
        // List of days, with lineups per day
        Schedule: function (model) {
            debugger;
             return View(model, 
                function () {
                    //<div class="schedule day">
                    
                    const els = {
                        container: this.container = create('div', 'schedule day'),
                        timeline: this.timeline.mount(),
                        lineups: this.lineups.mount()
                    };
                    
                    els.container.appendChild(els.timeline);
                    els.container.appendChild(els.lineups);

                    this.elements = els;    
                    
                    return this.container;
                
                },
                function () {
                    this.timeline.render();
                    this.lineups.render();
                },
                {
                    lineups: views.Lineups(model),
                    timeline: views.Timeline(model)
                }
            );
        },
        Lineups: function (model) {
            return View(model, 
                function () {
                    const els = {
                        container: this.container = create('div', 'lineups')
                    };
                    
                    this.elements = els;

                    return this.container;    
                },
                function () {
                    const els = this.elements;
                    //iterate over items in lineup,
                    if (model.lineups) {
                        model.lineups.forEach(function (lineup, camp) {

                            const lineupView = views.Lineup({
                                lineup: lineup,
                                camp: camp
                            });
                            els.container.appendChild(lineupView.mount());
                            lineupView.render();
                        });
                    }
                },
                {}
            );
        },
        // Show a single lineup
        Lineup: function (model) {
            return View(model, 
                function () {
                    const els = {
                        container: this.container = create('div', 'lineup'),
                        header: create('div', 'header')
                    };
                    
                    els.container.appendChild(els.header);

                    this.elements = els;    
                    return this.container;
                },
                function () {
                    const els = this.elements;
                    
                    els.header.innerText = model.camp.display;
                    
                    // create timeboxes for 
                    this.model.lineup.forEach(function (event) {
                        // insert a 30 or 1hr event
                        // TODO: need to support more than this time
                        const timeslot = create('div', 'event');
                        // TODO change class to hour / halfhour
                        timeslot.classList.add('hour');
                        if (event.artist) {
                            if (event.artist && event.artist.constructor === Array) {
                                var names = ''; 

                                event.artist.forEach(function (artist) {
                                    if (names) names += ', ';
                                    names += artist.name;
                                });

                                timeslot.innerText = names;
                            }
                            else {
                                timeslot.innerText = event.artist.name;
                            }
                        }
                        els.container.appendChild(timeslot);
                    });
                },
                {}
            );
        },
        Timeline: function (model) {
            return View(model, 
                function () {
                    const els = {
                        container: this.container = create('div', 'timeslots'),
                        header: create('div', 'timeslot header')
                    };
                                        
                    this.elements = els;    
                    
                    this.container.appendChild(els.header);

                    return this.container;
                },
                function () {
                    // TODO: Move all this data massaging to a data service class
                    // model.start - model.end
                    const start = new Date(model.start),
                        end = new Date(model.end);

                    if (start.getMinutes() > 0) start.setMinutes(0);
                    // this MUST make end time hour + 1
                    if (end.getMinutes() > 0) {
                        end.setMinutes(0);
                        end.setHours(end.getHours() + 1);
                    }
                    // --------------------------------------
                    debugger;
                    // const hourStart = start.getHours(),
                    //     hourEnd = end.getHours();
                    const hours = (24 - start.getHours()) + end.getHours();

                    // create timeboxes
                    for (var i = 0; i < hours; i++) {
                        const slot = create('div', 'timeslot'),
                            slot30 = create('div', 'timeslot');

                        const d = new Date(start);
                        d.setHours(d.getHours() + i);
                        slot.innerText = d.getHours() + ':00';
                        slot30.innerText = d.getHours() + ':30';
                        this.container.appendChild(slot);
                        this.container.appendChild(slot30);
                    }
                },
                {}
            );
        }
    };
    
    root.views = views;
})(
    flybrarian,
    cosinedesign.core.ui,
    cosinedesign.core.view,
);

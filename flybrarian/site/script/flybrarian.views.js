(function (root, ui, view) {
    // aliasing
    const View = view.View,
        create = ui.create;

    function getDuration(event) {
        const duration = ((((event.end - event.start) / 1000) / 60) / 60);
        const hours = Math.floor(duration);
        const mins = duration - hours;
        
        const cssClass = 'hours' + hours + (mins ? '-30' : '');

        return {
            duration: duration,
            hours: hours,
            minutes: mins,
            class: cssClass
        };
    }


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
            //debugger;
             return View(model, 
                function () {
                    //<div class="schedule day">
                    
                    const els = {
                        container: this.container = create('div', 'schedule day'),
                        header: create('div', 'header'),
                        timeline: this.timeline.mount(),
                        timelineRight: this.timelineRight.mount(),
                        lineups: this.lineups.mount()
                    };
                    
                    els.container.appendChild(els.header);
                    els.container.appendChild(els.timeline);
                    els.container.appendChild(els.lineups);
                    els.container.appendChild(els.timelineRight);
                    this.elements = els;    
                    
                    return this.container;
                
                },
                function () {
                    this.timeline.render();
                    this.lineups.render();
                    this.timelineRight.render();
                },
                {
                    lineups: views.Lineups(model),
                    timeline: views.Timeline(model),
                    timelineRight: views.Timeline(model)
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
                        // find duration                        
                        const duration = getDuration(event);

                        timeslot.classList.add(duration.class);

                        if (event.artist) {
                            if (event.name) {
                                const nameNode = create('span', 'event-name');
                                nameNode.innerText = event.name;
                                timeslot.appendChild(nameNode);
                            }

                            const artistNode = create('span', 'artist-name');
                            if (event.artist && event.artist.constructor === Array) {
                                var names = ''; 

                                event.artist.forEach(function (artist) {
                                    if (names) names += ', ';
                                    names += artist.name;
                                });
                                
                                artistNode.innerText = names + '  ';
                            }
                            else {
                                artistNode.innerText = event.artist.name + '  ';
                            }
                            timeslot.appendChild(artistNode);
                            
                            if (event.description) {
                                const descNode = create('span', 'event-desc');
                                descNode.innerText = event.description;
                                timeslot.appendChild(descNode);
                            }
                        } else {
                            // no artist listed; set class
                            timeslot.classList.add('empty');
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
                        header: create('div', 'timeslot header'),
                        footer: create('div', 'timeslot footer')
                    };
                                        
                    this.elements = els;    
                    
                    this.container.appendChild(els.header);

                    return this.container;
                },
                function () {
                    debugger;
                    // TODO: Move all this data massaging to a data service class
                    // model.start - model.end
                    const start = new Date(model.start),
                        end = new Date(model.end);
                    
                    const startDay = start.getDay(),
                        endDay = end.getDay();
                    
                    // TODO: get name of start day and insert into header
                    this.elements.header.innerText = start.toLocaleDateString('default', {weekday: "short"});


                    if (start.getMinutes() > 0) start.setMinutes(0);
                    // this MUST make end time hour + 1
                    if (end.getMinutes() > 0) {
                        end.setMinutes(0);
                        end.setHours(end.getHours() + 1);
                    }
                    // --------------------------------------
                    // const hourStart = start.getHours(),
                    // //     hourEnd = end.getHours();
                    // const preMidnightHours = (24 - start.getHours());
                    // const postMidnightHours = (startDay == endDay) ? (24 - end.getHours()) : end.getHours();
                    //const hours = preMidnightHours + postMidnightHours;
                    const hours = (end - start) / 1000 / 60 / 60;

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

                        // Next day detection                    
                        if (d.getDay() > startDay) {
                            slot.classList.add('next-day');
                            slot30.classList.add('next-day');
                        }
                    }

                    // TODO: get name of end day and insert into footer
                    this.container.appendChild(this.elements.footer);
                    this.elements.footer.innerText = end.toLocaleDateString('default', {weekday: "short"});

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

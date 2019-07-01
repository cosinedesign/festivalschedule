(function (root, ui, festival, views, services) {
    const state = {};

    // alias 
    const d = festival.date;

    root.controllers = {
        init: function (app) {
            state.app = app;
        },
        home: {
            main: function () {
                const create = ui.create;

                //console.log(lineup);
                // TODO: 
                //debugger;
                // load our first view
                //const lineupView = views.Lineup({});
                // const timeline = views.Timeline({});
                // state.app.elements.content.appendChild(timeline.mount());
                // timeline.render();
                const content = state.app.elements.content;
                //<P style="page-break-before: always"> 
                for (var day = 3; day < 7; day++) {
                    // const model = services.lineups.byDay(day, { filter: services.utils.fitEventWindow({
                    //     start: new Date('July 5, 2019 22:00:00'),
		            //     end: new Date('July 6 2019 01:00:00')
                    // }) });                
                    const model = services.lineups.byDay(day);    
                    
                    if (model && model.start) {
                        const dayHeader = content.appendChild(create('p', 'header'));

                        dayHeader.innerText = model.start.toLocaleDateString('default', {
                            weekday: "long",
                            month: "long",
                            day: "numeric"
                        });
                    
                        const schedule = views.Schedule(model);                    
                        content.appendChild(schedule.mount());
                        schedule.render();

                        content.appendChild(create('p', 'footer'));
                        content.appendChild(create('div', 'page-break-after'));                        
                    }
                }


                // TODO: find each day's start and end time
                // TODO: then, fill in each camp's lineup with empty events up to their first
                

            },
            fomoVision: function () {
                // TODO: show me what's happening in the next 4 hours

            },
            camp: function () {}
        }
    };

})(
    flybrarian, 
    cosinedesign.core.ui,
    festival.model,
    flybrarian.views,
    flybrarian.services   
);
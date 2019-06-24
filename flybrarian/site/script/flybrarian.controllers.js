(function (root, views, services) {
    const state = {};

    
    root.controllers = {
        init: function (app) {
            state.app = app;
        },
        home: {
            main: function () {
                
                //console.log(flybrarian.camps.lamp);

                
                //console.log(lineup);
                // TODO: 
                //debugger;
                // load our first view
                //const lineupView = views.Lineup({});
                // const timeline = views.Timeline({});
                // state.app.elements.content.appendChild(timeline.mount());
                // timeline.render();
                

                // TODO: find each day's start and end time
                // TODO: then, fill in each camp's lineup with empty events up to their first
                
                const model = services.lineups.byDay(5);
                
                const schedule = views.Schedule(model);
                state.app.elements.content.appendChild(schedule.mount());
                schedule.render();
            }
        }
    };

})(
    flybrarian, 
    flybrarian.views,
    flybrarian.services
);
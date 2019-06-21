(function (root, views) {
    const state = {};

    function collateLineups (eventSet) {
        const lineups = {};
    
        eventSet.forEach(function (e) {
            // if start is before 10a it's the night before
            var day = e.start.getDate();
    
            if (e.start.getHours() < 10) day--;
    
            var lineup = lineups[day];
            if (!lineup) lineup = lineups[day] = [];
    
            lineup.push(e);
        });
        
        return lineups;
    }

    root.controllers = {
        init: function (app) {
            state.app = app;
        },
        home: {
            main: function () {
                
                //console.log(flybrarian.camps.lamp);

                // TODO: Massage data here
                const schedules = {}, camps = [];

                const keys = Object.keys(flybrarian.camps);
                keys.forEach(function (key) {
                    const camp = flybrarian.camps[key];
                    camps.push(camp);
                    const lineups = collateLineups(camp.events);
                    camp.lineups = lineups;

                    const days = Object.keys(lineups);
                    days.forEach(function (day) {
                        if (!schedules[day]) schedules[day] = [];
                        schedules[day].push(lineups[day]);
                    });
                });

                //console.log(lineup);
                // TODO: 
                //debugger;
                // load our first view
                //const lineupView = views.Lineup({});
                // const timeline = views.Timeline({});
                // state.app.elements.content.appendChild(timeline.mount());
                // timeline.render();
                
                // TODO: find each day's start and end time
            
                const daysLineup = schedules[5];
                console.log(daysLineup);
                const schedule = views.Schedule({
                    start: daysLineup[0].start,
                    end: daysLineup[daysLineup.length - 1].end,
                    camps: camps,
                    lineups: daysLineup
                });
                state.app.elements.content.appendChild(schedule.mount());
                schedule.render();
            }
        }
    };

})(
    flybrarian, 
    flybrarian.views
);
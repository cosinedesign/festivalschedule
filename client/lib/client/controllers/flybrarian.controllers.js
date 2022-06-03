import { cosinedesign } from '../../core/cosinedesign.core';
import { services } from '../services/festival.services';
import { views } from '../views/flybrarian.views';
import { configService } from '../services/festival.services.config';
const ui = cosinedesign.core.ui;
const config = configService.get();
const state = {}, days = config.days, FOMO_LENGTH_HOURS = config.FOMO_HOURS || 3, FOMO_REFRESH = config.FOMO_REFRESH; // 20 seconds
function d(day, hour, min) {
    if (!min)
        min = 0;
    return new Date(config.year, config.month, day, hour, min);
}
export const controllers = {
    init: function (app) {
        state.app = app;
    },
    home: {
        main: function () {
            const create = ui.create, content = state.app.elements.content;
            ui.clear(content);
            document.body.classList.remove('fomo');
            const currentDay = (new Date(Date.now())).getDay();
            //console.log(lineup);
            // TODO: 
            //debugger;
            // load our first view
            //const lineupView = views.Lineup({});
            // const timeline = views.Timeline({});
            // state.app.elements.content.appendChild(timeline.mount());
            // timeline.render();
            //<P style="page-break-before: always"> 
            for (var day = currentDay; day < 7; day++) {
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
            // set a refresh interval for every 5 minutes
            if (!state.refreshFomo) {
                state.refreshFomo = setInterval(function () {
                    try {
                        controllers.home.fomoVision();
                    }
                    catch (ex) {
                        // DO NOTHING HERE
                        debugger;
                    }
                }, FOMO_REFRESH);
            }
        },
        // Show me what's happening in the next 4 hours
        // TODO - detect orientation change?
        // TODO: hours between 7PM and 6AM
        // TODO: otherwise show remaining days
        fomoVision: function () {
            try {
                const create = ui.create, content = state.app.elements.content;
                if (window.matchMedia('(max-height: 479.9px)').matches || window.matchMedia('(max-width: 479.9px)').matches) {
                }
                else {
                    debugger;
                    throw "Desktop user detected! Moving to full mode";
                    return;
                }
                ui.clear(content);
                // TODO: you MUST uncomment const today = new Date(Date.now());            
                const today = (config.FOMO_TEST_DAY) ? d(config.FOMO_TEST_DAY, config.FOMO_TEST_HOUR, config.FOMO_TEST_MINUTES) : new Date(Date.now());
                today.setSeconds(0);
                const currentHour = today.getHours();
                const minutes = today.getMinutes();
                const day = today.getDate();
                // Give us time to the 30. Clean up minutes - 
                // - less than the 25 should give us 0
                // - more than the 25 should give us the next half-hour
                if (minutes < 25) {
                    today.setMinutes(0);
                }
                else {
                    if (minutes < 55) {
                        today.setMinutes(30);
                    }
                    else {
                        today.setMinutes(0);
                        today.setHours(today.getHours() + 1);
                    }
                }
                const endTime = new Date(today);
                endTime.setHours(endTime.getHours() + FOMO_LENGTH_HOURS);
                // IF we're after midnight, we may not get morning hours because lineup is by day
                const model = services.lineups.byDay((currentHour < 7) ? (day - 1) : day, {
                    start: today,
                    end: endTime
                });
                if (model) {
                    const pText = content.appendChild(create('p', 'fomo-text'));
                    pText.innerText = "FOMO-VISION: Now showing the next " + FOMO_LENGTH_HOURS + " hours of upcoming events.";
                    if (model && model.start) {
                        const schedule = views.Schedule(model);
                        content.appendChild(schedule.mount());
                        schedule.render();
                    }
                    // set a refresh interval for every 5 minutes
                    if (!state.refreshFomo) {
                        state.refreshFomo = setInterval(function () {
                            try {
                                controllers.home.fomoVision();
                            }
                            catch (ex) {
                                // DO NOTHING HERE
                                debugger;
                            }
                        }, FOMO_REFRESH);
                    }
                    document.body.classList.add('fomo');
                }
                else {
                    // REVERT TO MAIN MODE
                    // throw "No FOMO events detected! Moving to full mode";
                    controllers.home.main();
                }
            }
            catch (ex) {
                console.error(ex);
                throw ex;
            }
        },
        camp: function () { }
    }
};

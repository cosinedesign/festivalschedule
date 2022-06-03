
// TODO: these all need to be async methods
export const configService = {
    get: function () : any {
        return {
        
            "year": 2022,
            "month": 6,
            "days": {
                "tues": {
                    "day": 2
                },
                "wednes": { "day": 3 },
                "thurs": { "day": 4 },
                "fri": { "description": "Bug Burn", "day": 5},
                "satur": { "description": "Temple Burn", "day": 6 },
                "sun": { "description": "Exodus/GTFO", "day": 7}
            },
            "FOMO_HOURS": 3,
            "FOMO_REFRESH": 120000,
            "FOMO_TEST_DAY": null,
            "FOMO_TEST_HOUR": null,
            "FOMO_TEST_MINUTES": null
        
        };
    }
}
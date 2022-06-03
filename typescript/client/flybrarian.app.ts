import { controllers } from './controllers/flybrarian.controllers';
    
export const app = {
        elements: {
            content: null
        }
};
    
if (typeof window === "undefined") {
    // we may not be in a browser, like in test or 
} else {
    if (typeof window.document === "undefined") {

    } else {
        // console.log('document found');

        document.addEventListener("DOMContentLoaded", function () {
            // init controllers
            app.elements.content = document.getElementById('content');        

            controllers.init(app);

            try {
                controllers.home.fomoVision();
            }
            catch (ex) {
                controllers.home.main();                    
            }

        });
    }
}

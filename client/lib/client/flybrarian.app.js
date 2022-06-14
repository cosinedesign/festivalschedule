import { dispatcher } from '../common/dispatcher';
const app = {
    elements: {
        content: null
    }
};
if (typeof window === "undefined") {
    // we may not be in a browser, like in test or 
}
else {
    if (typeof window.document === "undefined") {
    }
    else {
        // console.log('document found');
        document.addEventListener("DOMContentLoaded", function () {
            // init controllers
            // @ts-ignore typescript is complaining because content is initialized to null.
            // and it's too stupid to allow a null value to be set by something
            const content = app.elements.content = document.getElementById('content');
            // @ts-ignore I know, I know, content could be null, but the application won't even start if that's the case sooooo
            // content.innerText = JSON.stringify(festivalData);
            dispatcher.init(app);
        });
    }
}

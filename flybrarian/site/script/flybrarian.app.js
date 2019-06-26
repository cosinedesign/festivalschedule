

(function (root, core) {
    
    root.app = {
        elements: {}
    };
    // console.log('document testing');    
    
    if (typeof window === "undefined") {
        // we may not be in a browser
    } else {
        if (typeof window.document === "undefined") {

        } else {
            // console.log('document found');

            document.addEventListener("DOMContentLoaded", function () {
                // init controllers
                root.app.elements.content = document.getElementById('content');        

                root.controllers.init(root.app);

                root.controllers.home.main();

            });
        }
    }
})(
    flybrarian,
    cosinedesign.core
);
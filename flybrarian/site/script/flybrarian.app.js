

(function (root, core) {
    
    root.app = {
        elements: {}
    };

    document.addEventListener("DOMContentLoaded", function () {
        // init controllers
        root.app.elements.content = document.getElementById('content');        

        root.controllers.init(root.app);

        root.controllers.home.main();

    });

})(
    flybrarian,
    cosinedesign.core
);
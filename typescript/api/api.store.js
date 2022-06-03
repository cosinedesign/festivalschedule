import { readFile } from 'node:fs/promises';



// the store


const store = {
    artists: new Map(),
    load: function (fileName) {

        const promise = readFile(fileName, { signal });
        
    }, 
    init: function () {}
};
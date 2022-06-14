import { cosinedesign as lib } from '../client/lib/core/cosinedesign.core';

const data = lib.data,
    events = lib.core.extensions.events;

describe('cosinedesign.data tests', function () {

    test('join.inner', function () {
        const SUT = data.join.inner({ "hello": "world", "goodbye": "world" }, { "goodbye": "cruel world" });

        expect(SUT.hello).not.toBeDefined();
        expect(SUT.goodbye).toBeDefined();
        expect(SUT.goodbye).toBe("cruel world")
    });

    test('join.left', function () {
        const SUT = data.join.left({ "hello": "world", "goodbye": "world" }, { "goodbye": "cruel world" });

        expect(SUT.hello).toBeDefined();
        expect(SUT.hello).toBe("world");
        expect(SUT.goodbye).toBeDefined();
        expect(SUT.goodbye).toBe("cruel world");

    });

    test('join.deep.left', function () {
        // TODO: create test objects that have deep values / objects
        const SUT = data.join.deep.left({ "hello": "world", "goodbye": { "cruel": "school", "left": "wing"}}, { "goodbye": { "cruel": "world", "right": "wing" } });

        expect(SUT.hello).toBeDefined();
        expect(SUT.hello).toBe("world");
        expect(SUT.goodbye).toBeDefined();
        expect(SUT.goodbye.left).toBeDefined();
        expect(SUT.goodbye.right).not.toBeDefined();
        expect(SUT.goodbye.cruel).toBeDefined();

        expect(SUT.goodbye.left).toBe("wing");
        expect(SUT.goodbye.cruel).toBe("world");
    });

    test('join.deep.left with signature only', function () {
        // TODO: create test objects that have deep values / objects
        const SUT = data.join.deep.left({ "hello": "world", "goodbye": { "cruel": "school", "left": "wing"}}, { "goodbye": { "cruel": null, "right": null, "left": null } });

        expect(SUT.hello).toBeDefined();
        expect(SUT.hello).toBe("world");
        expect(SUT.goodbye).toBeDefined();
        expect(SUT.goodbye.left).toBeDefined();
        expect(SUT.goodbye.right).not.toBeDefined();
        expect(SUT.goodbye.cruel).toBeDefined();

        expect(SUT.goodbye.left).toBe("wing");
        expect(SUT.goodbye.cruel).toBe("school");
    });

    xtest('join.deep.inner with signature only', function () {
        // TODO: create test objects that have deep values / objects
        const SUT = data.join.deep.left({ "hello": "world", "goodbye": { "cruel": "school", "left": "wing"}}, { "goodbye": { "cruel": null, "right": null, "left": null } });

        expect(SUT.hello).toBeDefined();
        expect(SUT.hello).toBe("world");
        expect(SUT.goodbye).toBeDefined();
        expect(SUT.goodbye.left).toBeDefined();
        expect(SUT.goodbye.right).not.toBeDefined();
        expect(SUT.goodbye.cruel).toBeDefined();

        expect(SUT.goodbye.left).toBe("wing");
        expect(SUT.goodbye.cruel).toBe("world");
    });
}); 

describe('Store Tests', () => {
    const storeSUT = data.Store();

    const storeState = {
        "performers": {
            "cosinezero": {
                "genres": ["breaks", "bass"]
            },
            "fig": {
                "genres": ["dnb", "breaks"]
            }
        },
        "stages": {}
    };

    test('navigateTo', function () {
        const SUT = data.navigateTo;

        const result = SUT({ hello: { world: { goodbye: { cruel: "world" }} }}, 'hello.world.goodbye');

        expect(result.cruel).toBeDefined();
        expect(result.cruel).toBe("world");
        expect(result.hello).not.toBeDefined();
    });

    test('objectPathToStore', function () {
        const SUT = data.objectPathToObject;

        const result = SUT('hello.world.goodbye.cruel.world');

        expect(result.hello).toBeDefined();
        expect(result.hello.world).toBeDefined();
        expect(result.hello.world.goodbye).toBeDefined();
        expect(result.hello.world.goodbye.cruel).toBeDefined();
        expect(result.hello.world.goodbye.cruel.world).toBeNull();
    });

    xtest('filter array with array', function () {
        const filterArray = [
            ['foo'],
            ['baz']
        ];
        const dataArray = [
            ['foo', 'bar'],
            ['baz', 42],
            ['foo2', 'bar'],
            ['foo3', 'bar'],
            ['foo4', 'bar'],            
        ];

        const expected = [
            ['foo', 'bar'],
            ['baz', 42]
        ];


    });

    test('store.getSlice should return a slice of data', function () {
        const SUT = data.Store();
        
        SUT.initialize(storeState);
        // const slice = SUT.getSlice({ "performers": { "fig": {}} });
        const slice = SUT.getSlice("performers.fig", true);
        // console.log("Slice", slice);

        expect(slice.performers.fig.genres).toBeDefined();
        expect(slice.performers.cosinezero).not.toBeDefined();
        
        expect(slice.performers.fig.genres).not.toBeNull();
        expect(slice.performers.fig.length).not.toBe(0);
        
    });

    test('store.initialize should set the store data', function () {
        const SUT = data.Store();
        
        SUT.initialize(storeState);
        // const slice = SUT.getSlice({ "performers": { "fig": {}} });
        const slice = SUT.getSlice("performers.fig", true);
        console.log("Slice", slice);

        expect(slice.performers.fig.genres).toBeDefined();
        expect(slice.performers.cosinezero).not.toBeDefined();
        
        expect(slice.performers.fig.genres).not.toBeNull();
        expect(slice.performers.fig.length).not.toBe(0);
    });

    test('store.setSlice should set a slice of data and raise a change event', function (done) {
        const SUT = data.Store(storeState);

        SUT.on('performers.cosinezero-change', function (slice) {

            expect(slice.genres.length).toBe(3);

            done();
        });

        const slice = SUT.getSlice("performers.cosinezero");
       
        expect(slice.genres).not.toBeNull();
        expect(slice.genres.length).not.toBe(0);
        expect(slice.genres.length).toBe(2);

        SUT.setSlice("performers.cosinezero", { "genres": ["breaks", "electro", "bass"] });

        const sliceUT = SUT.getSlice("performers.cosinezero");

        expect(sliceUT.genres).not.toBeNull();
        expect(sliceUT.genres.length).not.toBe(0);
        expect(sliceUT.genres.length).toBe(3);
        
    });
});

describe('extensions tests', function () {
    test('events', function (done) {

        const SUT = {
            doWork: function () {
                this.trigger('work.complete', { "hello": "world"});
            },
            ...events
        }

        SUT.on('work.complete', function (value) {
            expect(value.hello).toBe("world");
            done();
        });

        SUT.doWork();
    });
});
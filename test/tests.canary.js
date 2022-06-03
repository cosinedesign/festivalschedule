import { factory } from '../client/lib/models/events.models.factory';


describe('canary tests', function () {
    test('jest canary', function () {
        expect(1).toBe(1);
    });

    test('flyb canary', function () {
        expect(factory).not.toBeNull();
    })
});
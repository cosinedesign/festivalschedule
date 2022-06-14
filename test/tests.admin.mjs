import { guestController } from '../client/lib/admin/controllers/controllers.workflows';

describe('Admin feature testing', () => {
    test('Workflow should initialize to default', () => {

        const user = {
            name: 'test_user',
            id: 666,
            roles: ["flyguest"]
        };

        guestController.initialize(user);

        expect(guestController.currentState).toBeDefined();
        expect(guestController.currentState).toBe(guestController.workflow.states.new);
    });
});
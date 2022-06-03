
import { controller } from '../typescript/admin/controllers/controllers.auth';

describe('Admin feature testing', () => {
    test('Workflow should initialize to default', () => {

        const user = {
            name: 'test_user',
            id: 666,
            roles: ["flyguest"]
        };

        controller.initialize(user);

        expect(controller.workflowState).toBe(controller.workflow.states[0]);

    });
});
import { IUser } from '../../types/utility';
import { cosinedesign } from '../../core/cosinedesign.core'

const store = cosinedesign.data.store;

export const stageService = {
    getStageList: async function (user: IUser) {
        const stages = store().getSlice('stages');     
        
        return stages;   
    }
};
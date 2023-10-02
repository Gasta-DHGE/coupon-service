import { itemDiscount, freeItem, customReward } from '../rewardTypes';

export default {
  type: 'object',
  properties: {
    id: { type: 'string', minLength: 20, maxLength: 20 },
    expiringDate: { type: 'number' },
    reward: { oneOf: [itemDiscount, freeItem, customReward, chooseReward] }
  },
  required: ['id', 'expiringDate', 'reward']
};

const chooseReward = {

};

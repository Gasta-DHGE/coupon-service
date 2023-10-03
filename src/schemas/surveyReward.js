import { itemDiscount, freeItem, customReward } from './rewardTypes.js';

export default {
  type: 'object',
  properties: {
    rewards: {
      type: 'array',
      items: {
        type: 'object',
        required: ['type', 'rewardName', 'rewardDescription'],
        oneOf: [itemDiscount, freeItem, customReward]
      }
    },
    rewardVariant: { type: 'string', enum: ['first', 'choose', 'random'] },
    expiringTime: { type: 'number', minimum: -1 }
  },
  required: ['rewards', 'rewardVariant', 'expiringTime']
};

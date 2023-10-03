import { itemDiscount, freeItem, customReward } from './rewardTypes.js';
import openingDays from './openingDays.js';
import address from './address.js';

export default {
  type: 'object',
  properties: {
    id: { type: 'string', minLength: 20, maxLength: 20 },
    surveyId: { type: 'string', minLength: 20, maxLength: 20 },
    expiringDate: { type: 'number' },
    reward: { oneOf: [itemDiscount, freeItem, customReward] },
    companyInfo: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        address,
        openingDays,
        companyId: { type: 'string', minLength: 20, maxLength: 20 }
      },
      required: ['name', 'address', 'openingDays']
    },
    isFullfilled: { type: 'boolean' }
  },
  required: ['id', 'surveyId', 'expiringDate', 'reward', 'companyInfo']
};

export const itemDiscount = {
  properties: {
    type: { const: 'itemDiscount' },
    rewardName: { type: 'string' },
    rewardDescription: { type: 'string' },
    discountItem: { type: 'string' },
    discount: { type: 'number', minimum: 0, maximum: 1 }
  },
  required: ['type', 'rewardName', 'rewardDescription', 'discountItem', 'discount']
};

export const freeItem = {
  properties: {
    type: { const: 'freeItem' },
    rewardName: { type: 'string' },
    rewardDescription: { type: 'string' },
    item: { type: 'string' }
  },
  required: ['type', 'rewardName', 'rewardDescription', 'item']
};

export const customReward = {
  properties: {
    type: { const: 'customReward' },
    rewardName: { type: 'string' },
    rewardDescription: { type: 'string' }
  },
  required: ['type', 'rewardName', 'rewardDescription']
};

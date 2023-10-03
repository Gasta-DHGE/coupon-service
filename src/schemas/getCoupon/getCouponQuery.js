const couponIdBody = {
  properties: {
    companyId: { type: 'string', minLength: 20, maxLength: 20 },
    couponId: { type: 'string', minLength: 20, maxLength: 20 }
  },
  required: ['couponId']
};

const couponCodeBody = {
  properties: {
    companyId: { type: 'string', minLength: 20, maxLength: 20 },
    couponCode: { type: 'string', minLength: 8, maxLength: 8 }
  },
  required: ['couponCode']
};

export default {
  type: 'object',
  oneOf: [couponCodeBody, couponIdBody]
};

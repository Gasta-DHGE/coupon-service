export default {
  type: 'object',
  properties: {
    couponId: { type: 'string', minLength: 20, maxLength: 20 }
  },
  required: ['couponId']
};

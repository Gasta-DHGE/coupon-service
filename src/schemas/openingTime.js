export default {
  type: 'object',
  properties: {
    isOpened: { type: 'boolean' },
    from: {
      type: 'object',
      properties: {
        hour: { type: 'number' },
        minute: { type: 'number' }
      },
      required: ['hour']
    },
    to: {
      type: 'object',
      properties: {
        hour: { type: 'number' },
        minute: { type: 'number' }
      },
      required: ['hour']
    }
  },
  required: ['isOpened', 'from', 'to']
};

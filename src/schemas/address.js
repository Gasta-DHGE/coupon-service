export default {
  type: 'object',
  properties: {
    city: { type: 'string', minLength: 2 },
    street: { type: 'string', minLength: 2 },
    streetNumber: { type: 'number' },
    postcode: { type: 'string', minLength: 5, maxLength: 5 },
    additionalInfo: { type: 'string' },
    geoLocation: {
      type: 'object',
      properties: {
        lon: { type: 'number' },
        lat: { type: 'number' }
      },
      required: ['lon', 'lat']
    }
  },
  required: ['city', 'street', 'postcode', 'additionalInfo', 'geoLocation', 'streetNumber']
};

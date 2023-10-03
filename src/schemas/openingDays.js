import openingTime from './openingTime.js';

export default {
  type: 'object',
  properties: {
    mon: openingTime,
    tue: openingTime,
    wed: openingTime,
    thu: openingTime,
    fri: openingTime,
    sat: openingTime,
    sun: openingTime
  },
  required: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
};

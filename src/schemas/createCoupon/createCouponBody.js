export default {
  type: 'object',
  properties: {
    uid: { type: 'string', minLength: 28, maxLength: 28 },
    surveyId: { type: 'string', minLength: 20, maxLength: 20 },
    userChoiceIndex: { type: 'number' }
  },
  required: ['uid', 'surveyId']
};

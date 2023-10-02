import surveyReward from '../surveyReward';

export default {
  type: 'object',
  properties: {
    uid: { type: 'string', minLength: 28, maxLength: 28 },
    surveyId: { type: 'string', minLength: 20, maxLength: 20 },
    surveyReward,
    userChoiceIndex: { type: 'number' }
  },
  required: ['uid', 'surveyReward']
};

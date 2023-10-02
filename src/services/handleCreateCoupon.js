import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase/firebase.js';

export default async function (request, reply) {
  const { uid, surveyReward, surveyId, userChoiceIndex } = request.body;

  const validation = validateSurveyReward(surveyReward);

  if (validation.isValid === false) {
    return reply
      .code(StatusCodes.BAD_REQUEST)
      .send({
        statusCode: StatusCodes.BAD_REQUEST,
        message: validation.message
      });
  }

  const userCouponReference = firestore
    .collection('users')
    .doc(uid)
    .collection('coupons');

  const coupon = buildCoupon(uid, surveyReward);

  try {
    const response = await userCouponReference
      .add(coupon);
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

function validateSurveyReward (surveyReward, userChoiceIndex) {
  const { rewardVariant } = surveyReward;

  if (rewardVariant === 'choose') {
    if (userChoiceIndex === undefined || userChoiceIndex < 0) {
      return {
        isValid: false,
        message: `userChoiceIndex "${userChoiceIndex}" is invalid, you need to provide a valid index`
      };
    }
  }

  return { isValid: true, message: '' };
}

function buildCoupon (uid, surveyReward) {
  const { items, rewardVariant, expiringTime, userChoiceIndex } = surveyReward;

  let rewardIndex;

  if (rewardVariant === 'choose') {
    rewardIndex = userChoiceIndex;
  } else if (rewardVariant === 'first') {
    rewardIndex = 0;
  } else if (rewardVariant === 'random') {
    rewardIndex = getRandomInt(items.length);
  }

  return {
    expiringDate: Date.now() + parseInt(expiringTime),
    reward: items[rewardIndex]
  };
}

function getRandomInt (max) {
  return Math.floor(Math.random() * max);
}

import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase/firebase.js';
import uniqid from 'uniqid';

export default async function (request, reply) {
  const { uid, surveyId, userChoiceIndex } = request.body;

  const userHasCoupon = await checkUserAlreadyHasCoupon(surveyId, uid);

  if (userHasCoupon) {
    return reply
      .code(StatusCodes.BAD_REQUEST)
      .send({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'user has already a coupon of this survey'
      });
  }

  const { coupon, companyId, error } = await createCoupon(surveyId, userChoiceIndex);

  if (error !== null) {
    return reply
      .code(StatusCodes.BAD_REQUEST)
      .send(error);
  }

  const userCouponReference = firestore
    .collection('users')
    .doc(uid)
    .collection('coupons');

  try {
    const couponDocumentRef = await userCouponReference
      .add(coupon);

    const couponDocumentId = couponDocumentRef.id;

    const companyCoupon = {
      ...coupon,
      isFullfilled: false
    };

    await firestore
      .collection('companies')
      .doc(companyId)
      .collection('coupons')
      .doc(couponDocumentId)
      .set(companyCoupon);

    const couponSnapshot = await userCouponReference
      .doc(couponDocumentId)
      .get();

    const couponRes = {
      ...couponSnapshot.data(),
      id: couponSnapshot
    };

    return reply
      .code(StatusCodes.CREATED)
      .send(couponRes);
  } catch (error) {
    return reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function createCoupon (surveyId, userChoiceIndex) {
  try {
    const surveyRefSnapshot = await firestore
      .collection('surveys')
      .doc(surveyId)
      .get();

    if (!surveyRefSnapshot.exists) {
      return {
        coupon: null,
        companyId: null,
        error: {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'this survey does not exist'
        }
      };
    }

    const { companyId } = surveyRefSnapshot.data();

    const surveySnapshot = await firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .doc(surveyId)
      .get();

    const { reward } = surveySnapshot.data();

    const companySnapshot = await firestore
      .collection('companies')
      .doc(companyId)
      .get();

    const companyData = companySnapshot.data();

    const coupon = buildCoupon(reward, surveyId, userChoiceIndex, companyData, companyId);

    return { coupon, companyId, error: null };
  } catch (error) {
    return {
      coupon: null,
      companyId: null,
      error
    };
  }
}

function buildCoupon (reward, surveyId, userChoiceIndex, companyData, companyId) {
  const { rewardVariant, rewards, expiringTime } = reward;
  const { name, address, openingDays } = companyData;

  let rewardIndex = 0;

  if (rewardVariant === 'choose') {
    rewardIndex = userChoiceIndex;
  } else if (rewardVariant === 'first') {
    rewardIndex = 0;
  } else if (rewardVariant === 'random') {
    rewardIndex = getRandomInt(rewards.length);
  }

  return {
    expiringDate: Date.now() + parseInt(expiringTime),
    couponCode: uniqid.time(),
    companyInfo: {
      name,
      address,
      openingDays,
      companyId
    },
    surveyId,
    reward: rewards[rewardIndex]
  };
}

function getRandomInt (max) {
  return Math.floor(Math.random() * max);
}

async function checkUserAlreadyHasCoupon (surveyId, uid) {
  try {
    const couponQuerySnapshot = await firestore
      .collection('users')
      .doc(uid)
      .collection('coupons')
      .where('surveyId', '==', surveyId)
      .get();

    return !couponQuerySnapshot.empty;
  } catch (error) {
    return false;
  }
}

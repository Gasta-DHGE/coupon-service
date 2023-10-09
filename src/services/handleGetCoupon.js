import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase/firebase.js';

export default async function (request, reply) {
  const { companyId, couponId, couponCode } = request.query;

  if (couponId === undefined && couponCode === undefined) {
    handleBothIdentifiersUndefined(reply);
  }

  if (companyId === undefined) {
    return getCouponByUser(request, reply);
  } else {
    return getCouponByCompany(request, reply);
  }
}

async function getCouponByCompany (request, reply) {
  const { companyId, couponId, couponCode } = request.query;

  const firestoreRef = firestore
    .collection('companies')
    .doc(companyId)
    .collection('coupons');

  if (couponId !== undefined) {
    return handleGetCouponById(firestoreRef, couponId, reply);
  }

  return handleGetCouponByCode(firestoreRef, couponCode, reply);
}

async function getCouponByUser (request, reply) {
  const { couponId, couponCode } = request.query;
  const { uid } = request.headers;

  const firestoreRef = firestore
    .collection('users')
    .doc(uid)
    .collection('coupons');

  if (couponId !== undefined) {
    return handleGetCouponById(firestoreRef, couponId, reply);
  }

  return handleGetCouponByCode(firestoreRef, couponCode, reply);
}

async function handleGetCouponById (firestoreRef, couponId, reply) {
  try {
    const couponSnapshot = await firestoreRef
      .doc(couponId)
      .get();

    if (couponSnapshot.exists === false) {
      return handleNotExistingCoupon(reply);
    }

    const coupon = {
      ...couponSnapshot.data(),
      id: couponSnapshot.id
    };

    return reply
      .code(StatusCodes.OK)
      .send(coupon);
  } catch (error) {
    return handleError(error, reply);
  }
}

async function handleGetCouponByCode (firestoreRef, couponCode, reply) {
  try {
    const couponRef = await firestoreRef
      .where('couponCode', '==', couponCode)
      .get();

    if (couponRef.empty) {
      return handleNotExistingCoupon(reply);
    }

    const coupon = {
      ...couponRef.docs[0].data(),
      id: couponRef.docs[0].id
    };

    return reply
      .code(StatusCodes.OK)
      .send(coupon);
  } catch (error) {
    return handleError(error, reply);
  }
}

function handleBothIdentifiersUndefined (reply) {
  return reply
    .code(StatusCodes.BAD_REQUEST)
    .send({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'both coupon identifiers are undefined'
    });
}

function handleError (error, reply) {
  reply
    .code(StatusCodes.BAD_REQUEST)
    .send(error);
}

function handleNotExistingCoupon (reply) {
  reply
    .code(StatusCodes.BAD_REQUEST)
    .send({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'the coupon does not exist'
    });
}

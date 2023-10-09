import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase/firebase.js';

export default async function (request, reply) {
  const { couponId } = request.query;
  const { uid } = request.headers;

  const couponRef = firestore
    .collection('users')
    .doc(uid)
    .collection('coupons')
    .doc(couponId);

  try {
    await couponRef.delete();

    return reply
      .code(StatusCodes.ACCEPTED)
      .send('coupon deleted');
  } catch (error) {
    return reply
      .code(StatusCodes.BAD_REQUEST)
      .send(error);
  }
}

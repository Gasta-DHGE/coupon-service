import { firestore } from '../firebase/firebase.js';
import { StatusCodes } from 'http-status-codes';

export default async function handleGetCouponsOfUser (request, reply) {
  const { uid } = request.headers;

  try {
    const couponSnapshot = await firestore
      .collection('users')
      .doc(uid)
      .collection('coupons')
      .get();

    const coupons = [];

    couponSnapshot.forEach(couponDoc => {
      coupons.push(couponDoc.data());
    });

    return reply
      .code(StatusCodes.OK)
      .send(coupons);
  } catch (error) {
    return reply
      .code(StatusCodes.BAD_REQUEST)
      .send(error);
  }
}

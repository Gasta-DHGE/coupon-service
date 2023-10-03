import createCouponBody from '../../schemas/createCoupon/createCouponBody.js';
import createCouponHeader from '../../schemas/createCoupon/createCouponHeader.js';
import createCouponResponse from '../../schemas/createCoupon/createCouponResponse.js';
import handleCreateCoupon from '../../services/handleCreateCoupon.js';
import validateApiAccess from '../../services/validateApiAccess.js';
import validateCreateCouponAccess from '../../services/validateCreateCouponAccess.js';
import handleGetCouponsOfUser from '../../services/handleGetCouponsOfUser.js';
import getCouponsByUserHeader from '../../schemas/getCouponByUser/getCouponsByUserHeader.js';
import getCouponsByUserResponse from '../../schemas/getCouponByUser/getCouponsByUserResponse.js';
import getCouponHeader from '../../schemas/getCoupon/getCouponHeader.js';
import getCouponQuery from '../../schemas/getCoupon/getCouponQuery.js';
import handleGetCoupon from '../../services/handleGetCoupon.js';
import handleDeleteCoupon from '../../services/handleDeleteCoupon.js';

export default async function (fastify, opts) {
  fastify.get('/', {
    schema: {
      headers: getCouponHeader,
      query: getCouponQuery
    }
  }, async function (request, reply) {
    await validateApiAccess(request, reply); // by uid, or by companyId

    return handleGetCoupon(request, reply);
  });

  fastify.get('/user', {
    schema: {
      headers: getCouponsByUserHeader,
      response: getCouponsByUserResponse
    }
  }, async function (request, reply) {
    await validateApiAccess(request, reply);

    return handleGetCouponsOfUser(request, reply);
  });

  fastify.post('/', {
    schema: {
      headers: createCouponHeader,
      body: createCouponBody,
      response: createCouponResponse
    }
  }, async function (request, reply) {
    await validateCreateCouponAccess(request, reply);

    return handleCreateCoupon(request, reply);
  });

  fastify.delete('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return handleDeleteCoupon(request, reply);
  });
}

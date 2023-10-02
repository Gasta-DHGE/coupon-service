import validateApiAccess from '../../services/validateApiAccess.js';
import validateCreateCouponAccess from '../../services/validateCreateCouponAccess.js';

export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'get a coupon and see if he is valid';
  });

  fastify.get('/user', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'get the coupons of a user';
  });

  fastify.post('/', async function (request, reply) {
    await validateCreateCouponAccess(request, reply);

    return 'create a coupon';
  });

  fastify.delete('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'delete a coupon';
  });
}

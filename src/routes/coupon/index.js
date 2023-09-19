import validateApiAccess from '../../services/validateApiAccess.js';

export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'get a coupon and see if he is valid';
  });

  fastify.post('/', async function (request, reply) {
    await validateApiAccess(request, reply); // other api validation because of higher safety reasons

    return 'create a coupon';
  });

  fastify.delete('/', async function (request, reply) {
    await validateApiAccess(request, reply); // other api validation because of higher safety reasons

    return 'delete a coupon';
  });
}

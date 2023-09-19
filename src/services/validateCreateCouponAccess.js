import { StatusCodes } from 'http-status-codes';

export default async function (request, reply) {
  if (request.headers['gasta-dhge'] !== 'cv4C43cc-b510-7u8a-9fh6-748b123b83da') {
    reply
      .code(StatusCodes.UNAUTHORIZED)
      .send({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'you did not provide a valid api key'
      });
  }
}

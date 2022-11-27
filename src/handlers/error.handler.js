const { badRequests, notFoundErrors } = require('../constants/error.constant');

const allErrorHandler = (e, req, res, next) => {
  const status = e.status || 500;

  if (badRequests.includes(e.message)) {
    return res.status(400).json({
      error: {
        code: 400,
        message: e.message,
      },
    });
  } else if (notFoundErrors.includes(e.message)) {
    return res.status(404).json({
      error: {
        code: 404,
        message: e.message,
      },
    });
  } else if (e.message === 'This email is already used!') {
    return res.status(409).json({
      error: {
        code: 409,
        message: e.message,
      },
    });
  }

  res.status(status).json({
    error: {
      code: status,
      message: e.message,
    },
  });
};

module.exports = {
  allErrorHandler,
};

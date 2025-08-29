export const responseClient = ({
  req,
  res,
  message,
  statusCode = 200,
  payload,
}) => {
  //Success Response
  req.success = () => {
    return res.status(statusCode).json({
      status: "success",
      message,
      payload,
    });
  };

  //Error Response
  req.error = () => {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  };
  if (statusCode >= 200 && statusCode < 300) {
    req.success();
  } else {
    req.error();
  }
};

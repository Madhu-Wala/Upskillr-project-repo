export const learnerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "learner") {
    return res.status(403).json({
      message: "Access Denied. Learner only!"
    });
  }
  next();
};

export default function queryParser (req, res, next) {
  req.parsedCookies = req.cookies;
  next();
};
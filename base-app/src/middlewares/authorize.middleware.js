
module.exports = function authorize(req, res, next) {
    if(req.headers.cookie)
    {
      const rawCookies = req.headers.cookie.split('; ');
      const parsedCookies = {};
      rawCookies.forEach(rawCookie => {
        console.log(rawCookie);
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
      });
      if (parsedCookies['PA.globalwebsession'] === undefined) {
        console.log('User is not authenticated');
          res.status(401).send({
            message: 'Unauthorized'
          });
      } else {
        console.log('User is authenticated!');
        const userName = req.header('Authorization');
        return next();
      }
    }
    else
    {
      res.status(401).send({
        message: 'Forbidden'
      });
    }
};
const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  // Recibir el payload despues de validar el token
  requestProperty: "payload",

  getToken: (req) => {
   

    if (!req.headers || !req.headers.authorization) {
      
      return null;
    }
    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];

    if (tokenType !== "Bearer") {
      
      return null;
    }
    
    return token;
  },
});

module.exports =  isAuthenticated 

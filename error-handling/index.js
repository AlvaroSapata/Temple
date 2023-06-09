module.exports = (app) => {
  app.use((req, res, next) => {
    
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    

    if (err.status === 401) {
      res.status(401).json({
        errorMessage: "Token no valido o no entregado",
      });
      return;
    }
    console.error("ERROR", req.method, req.path, err);
    if (err.http_code === 400) {
      res.status(400).json(err);
    }

    
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};

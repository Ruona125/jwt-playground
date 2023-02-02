const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

// app.post("/api/post", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "post created",
//         authData,
//       });
//     }
//   });
// });

app.get("/api", function (req, res) {
  res.json({
    text: "my api",
  });
});

app.get("/api/protected", verifyToken, function (req, res) {
  res.json({
    text: "this is protected",
  });
});

app.post("/api/login", function (req, res) {
  const user = { id: 3, username: "brad", email: "brad@gmail.com" };
  const token = jwt.sign(
    { user },
    "secretkey",
    { expiresIn: "30m" },
    (err, token) => {
      res.json({ token });
    }
  );
});

app.get("/api/safe", verifyToken, function (req, res) {
  res.json({
    text: "welcome to safe zone",
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).json("unauthorized");
  }
  // next();
}
app.listen(8000, () => {
  console.log("listening to port 8000");
});

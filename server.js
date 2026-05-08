
/* ===================================
   CORΛX VERCEL SERVERLESS API
   File: /api/server.js
=================================== */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "corax-vercel-secret";

/* ===================================
   TEMP MEMORY DATABASE
=================================== */

let users = [];
let transactions = [];

/* ===================================
   HELPERS
=================================== */

function send(res, status, data) {
  res.status(status).json(data);
}

function auth(req) {
  try {
    const token = req.headers.authorization;

    if (!token) return null;

    return jwt.verify(token, SECRET);

  } catch {
    return null;
  }
}

/* ===================================
   MAIN HANDLER
=================================== */

module.exports = async (req, res) => {

  const { url, method } = req;

  /* =========================
     ROOT
  ========================= */

  if (url === "/api/server") {

    return send(res, 200, {
      status: "online",
      project: "CORΛX",
      message: "CORΛX API running on Vercel 🚀"
    });

  }

  /* =========================
     REGISTER
  ========================= */

  if (url === "/api/register" && method === "POST") {

    const { email, password } = req.body;

    if (!email || !password) {

      return send(res, 400, {
        error: "Missing fields"
      });

    }

    const exists = users.find(
      user => user.email === email
    );

    if (exists) {

      return send(res, 400, {
        error: "User already exists"
      });

    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      email,
      password: hash,
      balance: 100
    };

    users.push(newUser);

    return send(res, 200, {
      success: true,
      message: "User created"
    });

  }

  /* =========================
     LOGIN
  ========================= */

  if (url === "/api/login" && method === "POST") {

    const { email, password } = req.body;

    const user = users.find(
      u => u.email === email
    );

    if (!user) {

      return send(res, 401, {
        error: "Invalid credentials"
      });

    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {

      return send(res, 401, {
        error: "Invalid credentials"
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      SECRET,
      {
        expiresIn: "7d"
      }
    );

    return send(res, 200, {
      token,
      email: user.email,
      balance: user.balance
    });

  }

  /* =========================
     BALANCE
  ========================= */

  if (url === "/api/balance" && method === "GET") {

    const verified = auth(req);

    if (!verified) {

      return send(res, 403, {
        error: "Unauthorized"
      });

    }

    const user = users.find(
      u => u.id === verified.id
    );

    if (!user) {

      return send(res, 404, {
        error: "User not found"
      });

    }

    return send(res, 200, {
      balance: user.balance
    });

  }

  /* =========================
     SEND PAYMENT
  ========================= */

  if (url === "/api/send" && method === "POST") {

    const verified = auth(req);

    if (!verified) {

      return send(res, 403, {
        error: "Unauthorized"
      });

    }

    const { to, amount } = req.body;

    const user = users.find(
      u => u.id === verified.id
    );

    if (!user) {

      return send(res, 404, {
        error: "User not found"
      });

    }

    if (user.balance < amount) {

      return send(res, 400, {
        error: "Insufficient balance"
      });

    }

    user.balance -= amount;

    transactions.push({
      id: Date.now(),
      user_id: user.id,
      type: "Sent",
      amount,
      to,
      date: new Date().toLocaleString()
    });

    return send(res, 200, {
      success: true,
      balance: user.balance
    });

  }

  /* =========================
     HISTORY
  ========================= */

  if (url === "/api/history" && method === "GET") {

    const verified = auth(req);

    if (!verified) {

      return send(res, 403, {
        error: "Unauthorized"
      });

    }

    const history = transactions.filter(
      tx => tx.user_id === verified.id
    );

    return send(res, 200, history);

  }

  /* =========================
     NOT FOUND
  ========================= */

  return send(res, 404, {
    error: "Route not found"
  });

};
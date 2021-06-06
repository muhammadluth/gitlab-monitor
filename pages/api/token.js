import jwt from "next-auth/jwt";

const secret = process.env.NEXT_PUBLIC_API_SECRET;

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  if (token) {
    res.status(200);
    res.send(JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    window.location.href = "/";
    res.status(401);
  }
  res.end();
};

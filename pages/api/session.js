import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.status(200);
    res.send(JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    window.location.href = "/";
    res.status(401);
  }
  res.end();
};

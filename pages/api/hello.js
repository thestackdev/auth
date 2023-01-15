import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) console.log("Session", JSON.stringify(session, null, 2));
  else res.status(401);
  res.end();
};

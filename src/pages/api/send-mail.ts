import type { NextApiRequest, NextApiResponse } from "next";
import { signPayload } from "./add-row";

type ResponseData = {
    message: string;
};
const SUCCESS_MESSAGES = {
    SUCCESS: 'The row was successfully added.',
};

export default async function sendMail(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: "Problème lors de l'appel à l'api" });
  }

  try {
    const { formattedEmail, id } = req.body;

    if (!formattedEmail || !id) {
      return res.status(400).json({ message: "Problème lors de l'appel à l'api" });
    }

    const body = JSON.stringify({ email: formattedEmail, id })
    const emailResponse = await fetch(`${process.env.APP_NEAR_URL}/ngcform/emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Ngc-Signature": signPayload(body) },
        body,
    })

    if (emailResponse.status !== 200) {
      return res.status(500).json({ message: "Problème lors de l'appel à l'api" });
    }

    return res.status(200).json({ message: SUCCESS_MESSAGES.SUCCESS });
  } catch (err) {
    console.error('Handler Error:', err);
    return res.status(500).json({ message: "Problème lors de l'appel à l'api" });
  }
}

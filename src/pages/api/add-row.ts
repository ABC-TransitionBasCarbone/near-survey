import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

const SUCCESS_MESSAGES = {
  SUCCESS: 'The row was successfully added.',
};

export default async function addRow(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: "Problème lors de l'appel à l'api" });
  }

  try {
    const simulationResults = req.body.simulationResults;

    if (!simulationResults) {
      return res.status(400).json({ message: "Problème lors de l'appel à l'api" });
    }

    await fetch(`${process.env.APP_NEAR_URL}/ngcform`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simulationResults),
    })

    return res.status(200).json({ message: SUCCESS_MESSAGES.SUCCESS });
  } catch (err) {
    console.error('Handler Error:', err);
    return res.status(500).json({ message: "Problème lors de l'appel à l'api" });
  }
}

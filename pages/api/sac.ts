import { NextApiRequest, NextApiResponse } from 'next';

type MonthData = {
  month: number;
  balance: number;
  interest: number;
  amortization: number;
  payment: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { principal, interestRate, numMonths } = req.query;

  if (!principal || !interestRate || !numMonths) {
    res.status(400).json({ error: 'Faltando enviar os parâmetros corretos: exemplo /api/sac?principal=...&interestRate=...&numMonths=...' });
    return;
  }

  const p = parseFloat(principal as string);
  const i = parseFloat(interestRate as string) / 100;
  const n = parseFloat(numMonths as string);

  if (isNaN(p) || isNaN(i) || isNaN(n) || p <= 0 || i <= 0 || n <= 0) {
    res.status(400).json({ error: 'Parâmetros inválidos' });
    return;
  }

  const monthlyInterest = i;
  const monthlyAmortization = p / n;
  let remainingPrincipal = p;

  const monthlyData: MonthData[] = [];

  for (let month = 1; month <= n; month++) {
    const interest = remainingPrincipal * monthlyInterest;
    const monthlyPayment = monthlyAmortization + interest;
    remainingPrincipal -= monthlyAmortization;

    monthlyData.push({
      month,
      balance: remainingPrincipal,
      interest,
      amortization: monthlyAmortization,
      payment: monthlyPayment,
    });
  }

  res.status(200).json(monthlyData);
}
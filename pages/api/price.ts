import { NextApiRequest, NextApiResponse } from 'next';

type MonthData = {
    mes: number;
    saldo: number;
    juros: number;
    amortizacao: number;
    prestacao: number;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { principal, interestRate, numMonths } = req.query;

    if (!principal || !interestRate || !numMonths) {
        res.status(400).json({ error: 'Faltando enviar os parâmetros corretos: exemplo /api/price?principal=...&interestRate=...&numMonths=...' });
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
    const monthlyPayment = (p * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -n));
    let remainingPrincipal = p;

    const monthlyData: MonthData[] = [];

    for (let month = 1; month <= n; month++) {
        const interest = remainingPrincipal * monthlyInterest;
        const amortization = monthlyPayment - interest;

        if (month != n) {
            remainingPrincipal -= amortization;
        } else {
            remainingPrincipal = 0;
        }

        monthlyData.push({
            mes: month,
            saldo: remainingPrincipal,
            juros: interest,
            amortizacao: amortization,
            prestacao: monthlyPayment,
        });
    }

    res.status(200).json(monthlyData);
}

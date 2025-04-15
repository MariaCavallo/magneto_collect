import type { NextApiRequest, NextApiResponse } from 'next';
import {
    ERROR_CARD_DATA_INCORRECT,
    ERROR_CARD_WITHOUT_AUTHORIZATION,
    ERROR_CARD_WITHOUT_FUNDS,
    ERROR_METHOD_NOT_ALLOWED,
    ERROR_SERVER
} from "../../components/service/checkout.errors";

// Tarjetas de prueba
export const validCard1 = "4000 4000 4000 4000";
export const validCard2 = "2269 2269 2269 2269";
export const withoutFundsCard = "4111 4111 4111 4111";
export const withoutAuthorizationCard = "4222 4222 4222 4222";

// Limpiar número de tarjeta (quitar espacios, guiones, etc.)
const cleanCardNumber = (cardNumber: string): string => {
    return cardNumber.replace(/\D/g, '');
};

type Data =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { data: any }
    | { error: string; message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "POST") {
        res.status(405).json(ERROR_METHOD_NOT_ALLOWED);
        return;
    }

    try {
        const rawCardNumber = req.body.card?.cardNumber || "";
        const cardNumber = cleanCardNumber(rawCardNumber);

        if (!/^\d{16}$/.test(cardNumber)) {
            res.status(400).json(ERROR_CARD_DATA_INCORRECT);
            return;
        }

        if (cardNumber === cleanCardNumber(withoutFundsCard)) {
            res.status(400).json(ERROR_CARD_WITHOUT_FUNDS);
            return;
        }
        if (cardNumber === cleanCardNumber(withoutAuthorizationCard)) {
            res.status(400).json(ERROR_CARD_WITHOUT_AUTHORIZATION);
            return;
        }
        if (cardNumber === cleanCardNumber(validCard1)) {
            res.status(200).json({ data: req.body });
            return;
        }
        if (cardNumber === cleanCardNumber(validCard2)) {
            res.status(200).json({ data: req.body });
            return;
        }

        res.status(400).json(ERROR_CARD_DATA_INCORRECT);
    } catch (err) {
        console.error("Checkout error:", err);
        res.status(500).json(ERROR_SERVER);
    }
}

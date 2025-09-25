import { useEffect, useState } from "react"
import { formatCurrency } from "../utils/common"

interface FooterProps {
    tickets: number,
    price: number[],
    type: string,
}

interface Savings {
    total: string,
    savings: string
}
const Footer = ({ tickets, price, type }: FooterProps) => {

    const [total, setTotal] = useState(0);
    const [savingsInfo, setSavingsInfo ] = useState<Savings>();
    const [bulkSavings, setBulkSavings] = useState(false);

    // TODO: Repurpose to also show kiosk savings if onboard is chosen
    const calculateSavings = (tickets: number, baseTotal: number):Savings => {
        const remainder = tickets % 10;
        const multiple = (tickets - remainder) / 10;
        const total = (multiple * Number(price[1])) + (remainder * Number(price[0]))
        const savings = baseTotal - total;
        return {
            'total': formatCurrency(total),
            'savings': formatCurrency(savings)
        }
    }
   
    useEffect(() => {
        const newTotal = (type === 'anytime') ? ((tickets - (tickets % 10)) / 10) * price[0] : tickets * price[0];
        setTotal(newTotal);
        if (tickets >= 10 && type === 'weekday') {
            setBulkSavings(true);
            setSavingsInfo(calculateSavings(tickets, newTotal));
        } else {
            setBulkSavings(false);
        }

    }, [ tickets, price ]);

    return (
        <footer>
            <h2>Your fare will cost:</h2>
            <p className="total">{formatCurrency(total)}</p>
            {bulkSavings && savingsInfo && (
            <div className="savings-info">
                <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <circle cx="12" cy="12" fill="none" r="10" stroke="currentColor" strokeWidth="1"/>
                        <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="12" y2="16"/>
                        <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="8" y2="8"/>
                    </g>
                </svg>
                <p>Consider including ten-packs in your purchase <br /> at a Station Kiosk to <strong>save {savingsInfo.savings} off the total</strong>!</p>
            </div>
            )}
        </footer>
    )
}

export default Footer
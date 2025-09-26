import { useState, useEffect, useMemo } from 'react'
import Footer from './Footer'
// local data
// import { info, zones } from './../data/fares.json'
// Extended info is used to assume (human readable) information not included in provided data
import { extended_info } from './../data/data.json'
import { InputSelect, InputRadio, InputNumber } from './Inputs'
import { formatAttribute, returnUniqueValues } from '../utils/common'

export interface InputInfo {
    name: string,
    value: string
}

// types assumed from provided json
interface Fare {
    type: string,
    purchase: string,
    trips: number,
    price: number
}

interface Zone {
    name: string,
    zone: number,
    fares: Fare[]
}

const Main = () => {

    const [loading, setLoading] = useState('loading');
    const [info, setInfo] = useState({});
    const [zones, setZones] = useState<Zone[]>([]);

    // TODO: Condense input values into a single state object

    const [zoneOptions, setZoneOptions] = useState<InputInfo[]>([]);
    const [activeZone, setActiveZone] = useState('1');

    const [fareType, setFareType] = useState('');
    const [fareTypeOptions, setFareTypeOptions] = useState<InputInfo[]>([]);
    const [fareTypeDescription, setFareTypeDescription] = useState('');

    const [purchase, setPurchase] = useState('');
    const [purchaseOptions, setPurchaseOptions] = useState<InputInfo[]>([]);

    const [numberTickets, setNumberTickets] = useState(0);
    const [ticketIncrement, setTicketIncrement] = useState('1');
    const [ticketDescription, setTicketDescription] = useState('');
    
    const numberAttributes = {
        'min': '0',
        'max': '100',
        'placeholder': '0'
    }

    
    /**
     * "fareType" and "purchase" options can be assumed based on provided data
     * but helper functions are included in case of future changes to those options
     * 
     * TODO: Conbine into a generic function for pulling options based on key
     */

    // Use the current zone to get the zone-specific fareType options
    const getFareTypeOptions = (zone: string): InputInfo[] => {
        if (zone.length > 0) {
            const currentZone = zones.filter(z => z.zone.toString() === zone);
            // Get fare types excluding 'anytime' (hardcoded based on widget data structure)
            const fareTypes = currentZone[0].fares
                .map((fare: any)  => fare.type)
                .filter(returnUniqueValues);
            const fareOptions = fareTypes.map((type: string) => {
                return {
                    'name': extended_info[type as keyof typeof extended_info],
                    'value': formatAttribute(type)
                }
            });

            return fareOptions; 
        }
        return [];
    }

    // Grab the description for the supplied fareType option
    const getFareTypeDescription = (optionKey: string): string | undefined => {
        if (optionKey.length > 0) {
            // Reduce processing by checking for a match to unformatted values first
            if (info[optionKey as keyof typeof info]) {
                return info[optionKey as keyof typeof info] || '';
            } else {
                // before looping through formatted values
                for (const key in info) {
                    if (formatAttribute(key) === optionKey) {
                        return info[key as keyof typeof info] || '';
                    }
                }
            }
        }
    }

    // Use the current zone to get the purchase options
    const getPurchaseOptions = (zone: string, type: string) => {
        if (zone.length > 0) {
            const currentZone = zones.filter(z => z.zone.toString() === zone);
            let purchaseTypes;
            if (type.length > 0) {
                purchaseTypes = currentZone[0].fares
                    .filter((filter: {type: string}) => formatAttribute(filter.type) === type)
                    .map((fare: Fare) => fare.purchase)
                    .filter(returnUniqueValues);
            } else {
                purchaseTypes = currentZone[0].fares
                    .map((fare: Fare) => fare.purchase)
                    .filter(returnUniqueValues);
            }
            // TODO: Properly type "type"
            const purchaseOptions = purchaseTypes.map((type: any) => ({
                    'name': extended_info[type as keyof typeof extended_info],
                    'value': formatAttribute(type)
            }));

            return purchaseOptions;
        }
        return []
    }

    // Grab pricing information based on zone & purchase type
    const getPricingInfo = (zone: string, type: string, purchase: string) => {
        if (zone.length > 0 && type.length > 0 && purchase.length > 0) {
            const currentZone = zones.filter(z => z.zone.toString() === zone);
            // Find the fare matching the type & purchase
            const currentFare = currentZone[0].fares.filter((fare: Fare) => 
                formatAttribute(fare.type) === type && formatAttribute(fare.purchase) === purchase
            );
            if (currentFare[0] && currentFare[0].price) {
                return Number(currentFare[0].price)
            }
        }
        return 0;
    }
    const getBulkPricingInfo = (zone: string) => {
        if (zone.length > 0) {
            const currentZone = zones.filter(z => z.zone.toString() === zone);
            // Find the fare matching the type & purchase
            const currentFare = currentZone[0].fares.filter((fare: Fare) => 
                fare.type === 'anytime'
            );
            if (currentFare[0] && currentFare[0].price) {
                return Number(currentFare[0].price)
            }
        }
        return 0;
    }

    // Handle default input changes
    const handleDefaultChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => { 
        const { id, name, value } = e.currentTarget;
        switch (name) {
            case 'fare-type':
                setFareType(value);
                setFareTypeDescription(getFareTypeDescription(value) || '');
                if (value === 'anytime') {
                    setTicketIncrement('10');
                    setTicketDescription('"Anytime" tickets are only available to purchase in increments of 10 tickets a piece');
                } else {
                    setTicketIncrement('1');
                    setTicketDescription('');
                }
                const purchaseArray = getPurchaseOptions(activeZone, value);
                if (purchaseArray) {
                    setPurchaseOptions(purchaseArray);
                    setPurchase(current => {
                        if (purchaseArray.find((p: {value: string}) => p.value === current)) {
                            return current;
                        } else {
                            return purchaseArray[0].value;
                        }
                    });
                }
                break;
            case 'purchase':
                setPurchase(id);
                break;
            case 'num-tickets':
                setNumberTickets(Number(value));
                break;
            default:
                break;
        }
    }

    // Handle zone changes and update dependent options
    const handleZoneChange = (newZone: string) => {
        // Update state
        setActiveZone(newZone);

        /**
         * Update dependent options (fareType, purchase)
         * User selection is preserved if still valid for new zone
         */ 

        // Get the fareType based on zone
        const fareTypeArray = getFareTypeOptions(newZone);
        // Select the first option as default
        if (fareTypeArray) {
            setFareTypeOptions(fareTypeArray);
            setFareType(current => {
                if (fareTypeArray.find(f => f.value === current)) {
                    return current;
                } else {
                    return fareTypeArray[0].value;
                }
            });
            setFareTypeDescription(getFareTypeDescription(fareTypeArray[0]?.value) || '');
        }

        // Get the purchase options based on zone
        const purchaseArray = getPurchaseOptions(newZone, fareType);
        if (purchaseArray) {
            setPurchaseOptions(purchaseArray);
            setPurchase(current => {
                if (purchaseArray.find((p: {value: string}) => p.value === current)) {
                    return current;
                } else {
                    return purchaseArray[0].value;
                }
            });
        }
    }

    useEffect(() => {

        const getFareData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/mroosa/think-code-challenge/refs/heads/master/septa-fare-calculator/src/data/fares.json');
                const data = await response.json();
                if (data) {
                    setInfo(data.info);
                    setZones(data.zones);
                    setLoading('loaded');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        if (loading === 'loading') {
            getFareData();
        } else {
            setZoneOptions(zones.map((item: Zone) => ({
                'name': item.name,
                'value': item.zone.toString(),
            })));
            handleZoneChange(activeZone);
        }
    }, [ loading ]);

    // Memoize the price, re-calculate when dependent values change
    const price = useMemo(() => {
        let newPrice = [];
        newPrice.push(getPricingInfo(activeZone, fareType, purchase));
        if (numberTickets >= 10) {
            newPrice.push(getBulkPricingInfo(activeZone));
        }
        return newPrice;
    }, [ activeZone, fareType, purchase, numberTickets ]);

    if (loading === 'loading') {
        return (
            <>
                <main className="loading">
                    <h2>Loading...</h2>
                </main>
                <footer></footer>
            </>
        )
    }

    return (
        <>
            <main>
                
                <div className="input-row">
                    <InputSelect 
                        label="Where are you going?"
                        name="zone"
                        options={zoneOptions}
                        value={activeZone}
                        handleChange={(e) => handleZoneChange(e.currentTarget.value)}
                    />
                </div>
                
                <div className="input-row">
                    <InputSelect 
                        label="When are you riding?"
                        name="fare-type"
                        options={fareTypeOptions}
                        value={fareType}
                        description={fareTypeDescription}
                        handleChange={(e) => handleDefaultChange(e)}
                    />
                </div>

                <div className="input-row">
                    <InputRadio
                        label="Where will you purchase the fare?"
                        name="purchase"
                        options={purchaseOptions}
                        value={purchase}
                        handleChange={(e) => handleDefaultChange(e)}
                    />
                </div>

                <div className="input-row">
                    <InputNumber 
                        label="How many rides will you need?"
                        name="num-tickets"
                        step={ticketIncrement}
                        value={numberTickets}
                        attributes={numberAttributes}
                        description={ticketDescription}
                        handleChange={(e) => handleDefaultChange(e)}
                    />
                </div> {/* */}
        </main>
        <Footer 
            tickets={numberTickets}
            price={price}
            type={fareType}
        />
      </>
    )
}

export default Main
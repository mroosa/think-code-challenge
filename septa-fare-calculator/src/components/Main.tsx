import { useEffect, useState } from 'react'
import Footer from './Footer'
import { InputSelect, InputRadio, InputNumber } from './Inputs'
// local data
import { info, zones } from './../data/fares.json'
// Extended info is used to assume (human readable) information not included in provided data
import { extended_info } from './../data/data.json'
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

    const [loading, setLoading] = useState('loaded');
    // TODO: use useState for information via API
    // const [info, setInfo] = useState({});
    // const [zones, setZones] = useState<Zone[]>([]);

    const [zoneOptions, setZoneOptions] = useState<InputInfo[]>([]);
    const [activeZone, setActiveZone] = useState('1');

    const [fareType, setFareType] = useState('');
    const [fareTypeOptions, setFareTypeOptions] = useState<InputInfo[]>([]);
    const [fareTypeDescription, setFareTypeDescription] = useState('');

    // Handle default input changes
    const handleDefaultChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => { 
        const { id, name, value } = e.currentTarget;
        switch (name) {
            case 'fare-type':
                setFareType(value);
                setFareTypeDescription(getFareTypeDescription(value) || '');
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

    }


    // // Use the current zone to get the zone-specific fareType options
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
    useEffect(() => {
        setZoneOptions(zones.map((item: Zone) => ({
            'name': item.name,
            'value': item.zone.toString(),
        })));
        handleZoneChange(activeZone);
    },[])



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
                    <InputRadio />
                </div>

                <div className="input-row">
                    <InputNumber />
                </div>

            </main>
            <Footer />
        </>
    )
}

export default Main
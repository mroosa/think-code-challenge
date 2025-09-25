/**
 * Format HTML attributes to ensure it matches the expected format
 * (https://standards.thinkcompany.dev/html/programming-principles/#classes-ids--custom-data-attributes)
 */
export const formatAttribute = (value: string) => {
    const formattedString = value
        .replace(/([a-z0-9])([A-Z0-9]+)/g, '$1-$2')     // Handle camelCase
        .replace(/[^a-zA-Z0-9]+/g, '-')                 // Replace non-alphanumeric characters with hyphens 
        .toLowerCase();                                 // Convert to lowercase
    return formattedString;
}

export const returnUniqueValues = (v: any, i: any, ary: any[]) => {
        return ary.indexOf(v) === i;
}


import React, { createContext, useState, useEffect } from 'react';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [propertyDetail, setPropertyDetail] = useState(null);

    useEffect(() => {
        const savedProperty = localStorage.getItem('propertyDetail');
        if (savedProperty) {
            setPropertyDetail(JSON.parse(savedProperty));
        }
    }, []);

    const selectProperty = (property) => {
        console.log("Selected property: ", property);
        setPropertyDetail(property);
        localStorage.setItem('propertyDetail', JSON.stringify(property));
    };

    return (
        <PropertyContext.Provider value={{ propertyDetail, selectProperty }}>
            {children}
        </PropertyContext.Provider>
    );
};

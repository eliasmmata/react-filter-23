import React, { createContext, useContext, useState } from 'react';

interface PreviousPathContextType {
    previousPath: string | null;
    setPreviousPath: (path: string) => void;
}

const PreviousPathContext = createContext<PreviousPathContextType | undefined>(undefined);

interface PreviousPathProviderProps {
    children: React.ReactNode; // Define children prop explicitly
}

export const PreviousPathProvider: React.FC<PreviousPathProviderProps> = ({ children }) => {
    const [previousPath, setPreviousPath] = useState<string | null>(null);

    return (
        <PreviousPathContext.Provider value={{ previousPath, setPreviousPath }}>
            {children}
        </PreviousPathContext.Provider>
    );
};

export const usePreviousPath = () => {
    const context = useContext(PreviousPathContext);
    if (!context) {
        throw new Error('usePreviousPath must be used within a PreviousPathProvider');
    }
    return context;
};

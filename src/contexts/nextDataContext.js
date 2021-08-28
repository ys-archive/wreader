import { useState, useCallback } from 'react';
import constate from 'constate';

const useNextDataContext = () => {
    const [nextData, setNextData] = useState([]);

    const [isLikeUpdated, u1] = useState(false);
    const updateLike = useCallback(() => u1(prv => !prv), []);
  
    const [isNewNextWritten, u2] = useState(false);
    const writeNewNextCard = useCallback(() => u2(prv => !prv), []);
  
    return {
        nextData,
        setNextData,
        isLikeUpdated,
        updateLike,
        isNewNextWritten,
        writeNewNextCard
    };
};

export const [
    NextDataProvider,
    useNextData,
    useNextLikeUpdate,
    useNextWriteCard,
] = constate(
    useNextDataContext,
    v => [v.nextData, v.setNextData],
    v => [v.isLikeUpdated, v.updateLike],
    v => [v.isNewNextWritten, v.writeNewNextCard],  
);

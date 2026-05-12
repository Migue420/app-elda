import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

const STORAGE_KEY = 'elda-circular-2026-state';

const initialState = {
  eldaCoins: 0,
  redSticker: false,
  catastralRef: '',
  totalRecycledKg: 0,
  quizzesCompleted: [],
  level: 'primaria',
  lastCollectionDate: null
};

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }, [state]);

  const addEldaCoins = (amount) => {
    setState(prev => ({
      ...prev,
      eldaCoins: prev.eldaCoins + amount
    }));
  };

  const activateRedSticker = () => {
    setState(prev => ({
      ...prev,
      redSticker: true
    }));
  };

  const setCatastralRef = (ref) => {
    setState(prev => ({
      ...prev,
      catastralRef: ref
    }));
  };

  const addRecycledKg = (kg) => {
    setState(prev => ({
      ...prev,
      totalRecycledKg: prev.totalRecycledKg + kg,
      lastCollectionDate: new Date().toISOString()
    }));
  };

  const completeQuiz = (quizId, points) => {
    setState(prev => {
      if (prev.quizzesCompleted.includes(quizId)) {
        return prev;
      }
      return {
        ...prev,
        quizzesCompleted: [...prev.quizzesCompleted, quizId],
        eldaCoins: prev.eldaCoins + points
      };
    });
  };

  const setLevel = (level) => {
    setState(prev => ({
      ...prev,
      level
    }));
  };

  const redeemCoins = (amount) => {
    setState(prev => ({
      ...prev,
      eldaCoins: Math.max(0, prev.eldaCoins - amount)
    }));
  };

  const value = {
    ...state,
    addEldaCoins,
    activateRedSticker,
    setCatastralRef,
    addRecycledKg,
    completeQuiz,
    setLevel,
    redeemCoins
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

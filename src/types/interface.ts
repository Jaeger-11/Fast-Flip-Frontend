import { Dispatch, SetStateAction} from 'react';

export interface AuthComponentProps {
    setShowAuth: Dispatch<SetStateAction<boolean>>;
}

export interface StatsComponentProps {
    setShowStats: Dispatch<SetStateAction<boolean>>;
}

export interface AuthUser {
    username?: string;
    password: string;
    email: string;
}

export interface Category {
    name: string;
}

export interface FlipCard {
    _id?: string,
    name: string,
    imageUrl: string,
    category?:string,
    isFlipped: boolean 
}

export interface User {
    username: string;
    topScore?: number;
}

export interface Scores {
    username: string;
    flipsCount?: string;
    score: number;
    timeTaken?: number
}

export interface Stats {
    totalScores: number;
    totalTimeTaken: number;
    count: number;
    averageScore: number;
    averageTimeTaken: number;
    topScore: number;
}
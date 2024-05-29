import { Dispatch, SetStateAction} from 'react';

export interface AuthComponentProps {
    setShowAuth: Dispatch<SetStateAction<boolean>>;
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
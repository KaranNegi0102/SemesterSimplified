import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/redux/store';

// Typed useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typed useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
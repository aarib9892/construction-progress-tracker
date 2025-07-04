import { create } from "zustand";

// 1. Define the state's shape (interface)
interface CounterState {

}

// 2. Create the store with the initial state and actions
export const useCounterStore = create<CounterState>((set) => ({
  
}));

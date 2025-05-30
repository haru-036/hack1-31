import type { Data } from "@/app/create/r3fCanvas";
import { create } from "zustand";

type ObjectStore = {
	objectData: Data | null;
	setObjectData: (data: Data) => void;
};

export const useObjectStore = create<ObjectStore>((set) => ({
	objectData: null,
	setObjectData: (data) => set({ objectData: data }),
}));

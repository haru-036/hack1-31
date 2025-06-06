import type { BuildingPartData } from "@/app/[questId]/r3fCanvas";
import { create } from "zustand";

type ObjectStore = {
	objectData: BuildingPartData | null;
	setObjectData: (data: BuildingPartData) => void;
};

export const useObjectStore = create<ObjectStore>((set) => ({
	objectData: null,
	setObjectData: (data) => set({ objectData: data }),
}));

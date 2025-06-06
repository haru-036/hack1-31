import type { BuildingPartData } from "@/app/[questId]/r3fCanvas";
import { create } from "zustand";

type ObjectStore = {
	objectData: { BuildingPartData: BuildingPartData; questId: string } | null;
	setObjectData: (data: {
		BuildingPartData: BuildingPartData;
		questId: string;
	} | null) => void;
};

export const useObjectStore = create<ObjectStore>((set) => ({
	objectData: null,
	setObjectData: (data) => set({ objectData: data }),
}));

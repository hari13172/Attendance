import { atom } from "jotai";

// Define global user state
export const userAtom = atom({
    id: null,
    name: "",
    username: "",
    role: {
        name: "",
    },
    section_id: null,
    section: null,

});

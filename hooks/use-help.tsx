import {create} from "zustand"


type HelpStore ={
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

export const useHelp = create<HelpStore>((set)=>({
    isOpen:false,onOpen:()=>set({isOpen:true}),onClose:()=>set({isOpen:false})
}))
import {create} from 'zustand'

interface LibraryModal{
    onOpen:()=>void;
    onClose:()=>void;
    isOpen:boolean;
}

const useLibraryModal=create<LibraryModal>(set=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useLibraryModal
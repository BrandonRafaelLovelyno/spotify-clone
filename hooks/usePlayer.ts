import {create} from 'zustand'

interface PlayerStore{
    activeId?:number;
    ids:number[];
    onId:(id:number)=>void;
    onIds:(ids:number[])=>void;
    reset:()=>void;
}

const usePlayer=create<PlayerStore>(set=>({
    activeId:undefined,
    ids:[],
    onId:(id:number)=>set({activeId:id}),
    onIds:(ids:number[])=>set({ids}),
    reset:()=>{set({ids:[],activeId:undefined})}
}))

export default usePlayer
import { create } from 'zustand'

interface userStoreInterface {
    validate: boolean,
    id:string,
    setValidate:(data:boolean)=>void
    setId:(data:string)=>void
}

export const userStore = create<userStoreInterface>((set) => ({
  validate: false,
  id:"",
  setValidate: (data) => set({validate:data}),
  setId: (data) => set({id:data})
}))

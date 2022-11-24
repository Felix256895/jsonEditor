import create from 'zustand'
import { persist } from 'zustand/middleware'

export type Sponsor = {
  handler: string
  avatar: string
  profile: string
}

export interface Config {
  lightMode: boolean
  hideCollapse: boolean
  hideChildrenCount: boolean
  sponsors: {
    users: Sponsor[]
    nextDate: number
  }
  setSponsors: (sponsors: Sponsor[]) => void
  setLightTheme: (theme: boolean) => void
  toggleHideCollapse: (value: boolean) => void
  toggleHideChildrenCount: (value: boolean) => void
}

const getTomorrow = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return new Date(tomorrow).getTime()
}

const useStored = create(
  persist<Config>(
    (set, get) => ({
      lightMode: false,
      hideCollapse: false,
      hideChildrenCount: true,
      sponsors: {
        users: [],
        nextDate: Date.now()
      },
      setSponsors: (users: Sponsor[]) => {
        set({
          sponsors: {
            users,
            nextDate: getTomorrow()
          }
        })
      },
      setLightTheme: (lightMode: boolean) => {
        set({
          lightMode
        })
      },
      toggleHideCollapse: (hideCollapse: boolean) => {
        set({
          hideCollapse
        })
      },
      toggleHideChildrenCount: (value: boolean) => set({ hideChildrenCount: value })
    }),
    {
      name: 'config'
    }
  )
)

export default useStored

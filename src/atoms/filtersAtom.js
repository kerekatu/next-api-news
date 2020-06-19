import { atom } from 'recoil'

export const filtersAtom = atom({
  key: 'filtersData',
  default: {
    search: '',
    sort: 'relevancy',
    category: 'Movies',
    currentPage: 1
  }
})

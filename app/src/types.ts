import type { restaurantStatusList, dietList } from '@/constants'

export type Restaurant = {
  id: string
  name: string
  address: string
  website: string
  status: Stauts
  diet?: Diet
}

export type Dish = {
  id: string
  name: string
  status: Stauts
  diet?: Diet
}

// type Stauts = 'Want to Try' | 'Recommended' | 'Do Not Recommend' 
type Stauts = typeof restaurantStatusList[number]
// type Diet = 'Vegetarian' | 'Pescetarian' | 'Keto' | ''
type Diet = typeof dietList[number]

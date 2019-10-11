import { ADD_PLACE } from './types'

export const addPlace = places => {
  return {
    type: ADD_PLACE,
    payload: places
  }
}
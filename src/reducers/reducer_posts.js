import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {

    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data }

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id')

    case DELETE_POST: 
    // returns a new state object deleted post id not present anymore
      return _.omit(state, action.payload)

    default:
      return state
  }
}

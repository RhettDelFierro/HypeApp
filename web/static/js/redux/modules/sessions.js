import { fromJS } from 'immutable'
const initialState = fromJS({
  currentUser: null,
  socket: null,
  error: null,
})

export default function sessions(state = initialState, action) {
  switch (action.type){
    default :
      return state
  }
}

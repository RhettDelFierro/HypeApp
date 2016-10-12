
const iniitialLocationState = fromJS({
  location: {
    long: 0,
    lat: 0
  }
})

export default function location(state = initialLocationState, action) {
    switch (action.type) {
        default:
            return state
    }
}


const initialState = fromJS({
    isFetching: false,
    error: false,
    socket: null,
    errorLocationObject: {},
    currentLocation: {
        long: 0,
        lat: 0
    }
})

export default function locations(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}

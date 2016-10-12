{
  followers: {
    [user_id]: {

    }
  }

  following: {
    [user_id]: {
      info: {

      }
    }
  }

  locations: {
    places: {
      location: places.getIn([places_id, location])
    }
  }

  places: {
    [place_id]: {
      info: {
        location:
        reviews: [...review_id]
      }
    }
  }

  replies: {
    [review_id]: {

    }
  }

  reviews: {
    [review_id]: {
      date: time.now(),
      info: {
        reviewText: '',

      }
    }
  }

  users: {
    info: {
    }
  }

  usersReviews: {
    [user_id]: {
      reviews: [review_ids]
    }
  }
}

//
//user has many reviews, review has one user.
//place has many reviews, review has one place.

{

  channels: {
    map/locations,
    reply,
    review,
    places,
    users
  }

  followers: {
    [user_id]: {
      date_followed: time.now()
      info: {

      }
    }
  }

  following: {
    [user_id]: {
      date_followed: time.now(),
      info: {

      }
    }
  }

  friends: {
    [user_id]: {
      date_confirmed: time.now(),
      info: {

      }
    }
  }

  hashtags: {
    [hashtag_id]: {
      dateCreated: time.now()
      info: {
        hashtag: '',
        reply_ids: [...reply_ids],
        review_ids: [...review__id],
        user_ids: [...user_id],
        timestamp
      }
    }
  }

  //for the map:
  //will only render in the current scope of the map:
  locations: {
    socket: null,
    radius: 10;
    friends: {
      [user_id]: {
        location: {
          long: 0,
          lat: 0
        }
      }
    }
    //places within a radius on the map:
    places: {
      location: places.getIn([places_id, location])
    }
  }

  place: {
    info: {
      place_id: 0,
      yelp_url: '',
      google_url: '',
      image_url: '',
      yelp_id: ''.
      google_id: '',
      avgYelpRating: 0,
      avgGoogleRating: 0,
      avg_rating: 0,
      location: {},
      trending: false
    }
  }

  places: {
    [place_id]: {
      socket: null,
      newReviewsAvailable: false,
      newReview_ids: [...review_id],
      review_ids: [...review_id],
      trending: false,
      info: {
        homepage: '',
        image: '',
        avgYelpRating: 0,
        avgGoogleRating: 0,
        location: {}
      }
    }
  }

  replies: {
    socket: null,
    dateCreated: time.now(),
    [reply_id]: {
      info: {

      }
    }
  }

  reviews: {
    socket: null,
    [review_id]: {
      newRepliesAvailable: false,
      newReply_ids: [...reply_id],
      reply_ids: [...reply_id],
      hotDiscussion: false,
      date: time.now(),
      info: {
        reviewText: '',
        user: '',
        hashtag_ids: [...hashtag_id]
      }
    }
  }

  users: {
    info: {
      first_name: '',
      last_name: '',
      email: '',
      user_id: 0,

    }
  }

  usersHashtags: {
    [hashtag_id]: {

    }
  }

  usersReplies: {
    [user_id]: {
      reply_ids: [...reply_id]
    }
  }

  usersReviews: {
    [user_id]: {
      review_ids: [...review_id]
    }
  }

  //<-----------VOTES-------------->
  downVotesPlaces: {
    [place_id]: 0
  }

  upVotesPlaces: {
    [place_id]: 0
  }

  downVotesReply: {
    [reply_id]: 0
  }

  upVotesReply: {
    [reply_id]: 0
  }

  downVotesReview: {
    [review_id]: 0
  }
  upVotesReview: {
    [review_id]: 0
  }
}

//reviews, replies, users has many hashtags, hashtags has many reviews, replies, users
//user has many reviews, review has one user.
//place has many reviews, review has one place.

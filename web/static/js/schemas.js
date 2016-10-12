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
      dateFollowed: time.now()
      info: {

      }
    }
  }

  following: {
    [user_id]: {
      dateFollowed: time.now(),
      info: {

      }
    }
  }

  friends: {
    [user_id]: {
      dateConfirmed: time.now(),
      info: {

      }
    }
  }

  hastags: {
    [hastag_id]: {
      dateCreated: time.now()
      info: {
        hashtag: '',
        user_ids: [...user_id]
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

  places: {
    [place_id]: {
      socket: null,
      newReviewsAvailable: false,
      newReview_ids: [...review_id]
      review_ids: [...review_id],
      trending: false,
      info: {
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
        user: user_id,
        hashtag_ids: [...hashtag_id]
      }
    }
  }

  users: {
    info: {

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

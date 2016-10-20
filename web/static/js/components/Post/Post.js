import React, { PropTypes, Component} from "react"
import { postContainer, postText, submitPost } from './styles.css'


const Post = ({ post_text, update_post_text, submit_post, user_id, close_post }) => {
        return (
            <div className={postContainer} >
              <p>{'Please leave your review for the place.'}</p>
              <textarea className={postText} value={post_text}
                    maxLength={140} type='text'
                    onChange={(e) => update_post_text(e.target.value)}
                    placeholder="Share your review! (140 chararacters max)" />
                  <button className={submitPost} onClick={submit_post}>
                    {'POST IT!'}
                  </button>
                  {' '}
                  <button onClick={close_post}>Go Back</button>
            </div>
        )
}

const { number, func, string } = PropTypes
Post.propTypes = {
  user_id: number,
  post_text: string,
  update_post_text: func.isRequired,
  submit_post: func.isRequired,
  close_post: func.isRequired
}

export default Post

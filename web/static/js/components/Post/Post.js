import React, { PropTypes, Component} from "react"
import { postContainer, postText, submitPost } from './styles.css'


const Post = ({ post_text, update_post_text }) => {
        return (
            <div className={postContainer} >
              <p>{'Please leave your review for the place.'}</p>
              <textarea className={postText} value={post_text}
                    maxLength={140} type='text'
                    onChange={(e) => props.update_post_text(e.target.value)}
                    placeholder="Share your review! (140 chararacters max)" />
                  <button className={submitPost} onClick={submit_post}>
                    {'POST IT!'}
                  </button>
            </div>
        )
}

const { string, func } = PropTypes
Post.propTypes = {
  post_text: string,
  update_post_text: func.isRequired
}

export default Post

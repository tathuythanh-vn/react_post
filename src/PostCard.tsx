import type { Post } from "./types";


const PostCard = ({ user, title, body}: Post) => {
    return (
        <div className="post-card">
            <img src="https://placehold.co/600x400" />
            <div className="postcard-des">
                <h5>{title}</h5>
                <span className="des">{body}</span>
                <span className="userinfo">{user}</span>
            </div>
        </div>
    )
}

export default PostCard;

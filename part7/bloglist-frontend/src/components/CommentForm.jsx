import { useDispatch, useSelector } from "react-redux"
import { useField } from "../hooks"
import { useParams } from "react-router-dom"
import TextInput from "./TextInput"
import { addComment } from "../reducers/blogReducer"

const CommentForm = () => {
    const params = useParams()
    
    const blog = useSelector(state => state.blogs
        .find(blog => blog.id === params.id)
    )
    const dispatch = useDispatch()
    const { clear: clearComment, ...comment } = useField('text', 'comment');
    const handleComment = async (event) => {
        event.preventDefault();
        if (!comment.value){
            clearComment()
            return
        }
        dispatch(addComment(blog.id, comment))
    }
    return (
        <form onSubmit={handleComment}>
            <TextInput {...comment} />
            <button type='submit'>Add anonymous comment</button>
        </form>
    )
}
export default CommentForm
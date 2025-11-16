import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { useParams } from "react-router-dom";
import TextInput from "./TextInput";
import { addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer.js";

const CommentForm = () => {
  const params = useParams();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === params.id),
  );
  const dispatch = useDispatch();
  const { clear: clearComment, ...comment } = useField("text", "Comment");
  const handleComment = async (event) => {
    event.preventDefault();
    if (!comment.value) {
      clearComment();
      return;
    } else if (blog.comments.includes(comment.value)) {
      dispatch(
        setNotification(
          { message: "Duplicate comment detected", good: false },
          5,
        ),
      );
      clearComment();
    }
    dispatch(addComment(blog.id, comment.value));
    clearComment();
    dispatch(
      setNotification({ message: "Comment added successfully", good: true }, 5),
    );
  };
  return (
    <form onSubmit={handleComment}>
      <TextInput {...comment} className="w-full box-border" />
      <button type="submit">Add anonymous comment</button>
    </form>
  );
};
export default CommentForm;

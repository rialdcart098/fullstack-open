import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </div>
  );
};
const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth);
  return (
    <>
      {[...blogs].sort((leastLikes, mostLikes) => mostLikes.likes - leastLikes.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </>
  )
}
export default Blogs;

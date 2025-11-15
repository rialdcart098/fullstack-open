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
    <div style={blogStyle} className='font-momo-trust-display flex justify-between items-center bg-blue-950 hover:bg-blue-900 hover:text-blue-100 transition-all ease-in-out'>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
      <span>{blog.likes !== 1 && (
        `${blog.likes} likes`
      )}{blog.likes === 1 && (
        `${blog.likes} like`
      )}</span>
    </div>
  );
};
const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <>
      {[...blogs].sort((leastLikes, mostLikes) => mostLikes.likes - leastLikes.likes)
        .map(blog => (
          <Blog 
            key={blog.id}
            blog={blog}
          />
        ))}
    </>
  )
}
export default Blogs;

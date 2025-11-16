import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const params = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === params.id),
  );
  if (!user) return null;
  return (
    <div className="flex flex-col h-full min-h-0 font-momo-trust-display">
      <h2 className="flex items-center justify-center font-bold text-2xl text-blue-300 p-3 bg-blue-950 text-center">
        {user.name} ({user.username})
      </h2>
      <h3 className="flex items-center justify-center font-bold text-xl text-blue-300 p-3 bg-blue-900 text-center">
        Added blogs
      </h3>
      <div className="h-140 overflow-y-auto min-h-0">
        <ul className="space-y-1 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
          {[...user.blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li
                key={blog.id}
                className="odd:bg-gray-700 even:bg-gray-600 px-2 py-1 rounded hover:bg-gray-800 hover:text-gray-300"
              >
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default User;

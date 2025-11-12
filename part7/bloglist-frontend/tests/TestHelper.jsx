import { render } from "@testing-library/react";
import Blogs from "../src/components/Blogs.jsx";

const user = {
  name: "Lewis",
  username: "lewishamilton",
  id: "68f58ee93cd743921f22c371",
};

const testBlog = {
  id: "68f58ee93cd743921f22c36d",
  author: "Lionel Messi",
  title: "The Best Footballer",
  url: "https://example.com/",
  likes: 1000,
  user: { id: user.id, name: user.name },
};

const setup = () => render(<Blogs key="1" user={user} blog={testBlog} />);

export default { setup, user, testBlog };
export { setup, user, testBlog };

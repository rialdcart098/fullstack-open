import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer.js";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  if (!notification) return null;
  return (
    <div
      className={`
    fixed top-4 left-1/2 -translate-x-1/2
    p-4 rounded-xl font-momo-trust-display text-2xl text-center text-gray-50
    border-2
    ${
      notification.good
        ? "notification-good bg-[rgba(0,201,80,0.2)] border-green-900"
        : "notification-bad bg-[rgba(251,44,55,0.2)] border-red-900"
    }
    backdrop-blur-md
    z-50
    transition ease-in-out duration-300
    flex justify-between
  `}
    >
      {notification.message}
      <button
        onClick={() => dispatch(clearNotification())}
        className="bg-transparent font-blackm text-gray-50"
      >
        <span>X</span>
      </button>
    </div>
  );
};

export default Notification;

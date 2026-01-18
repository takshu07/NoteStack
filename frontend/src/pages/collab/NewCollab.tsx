// src/pages/collab/NewCollab.tsx
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import { startCollab } from "../../api/collabApi";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
}
const NewCollab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data));
  }, []);

  const handleUserClick = async (userId: string) => {
    const res = await startCollab(userId);
    navigate(`/dashboard/collab/${res.data._id}`);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        Select User to Collaborate
      </h2>

      <ol className="list-decimal list-inside space-y-2">
        {users.map((user, index) => (
          <li key={user._id}>
            <button
              className="text-blue-600 hover:underline"
              onClick={() => handleUserClick(user._id)}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default NewCollab;
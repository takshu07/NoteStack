import { useEffect, useState } from "react";
import { getMyCollabs } from "../../api/collabApi";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
}

interface Collab {
  _id: string;
  title: string;
  users: User[];
}

const CollabList = () => {
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const navigate = useNavigate();
  const myUserId = localStorage.getItem("userId");

  useEffect(() => {
    getMyCollabs().then((res) => setCollabs(res.data));
  }, []);

  const getCollaboratedWith = (users: User[]) => {
    return users
      .filter((u) => u._id !== myUserId)
      .map((u) => u.name)
      .join(", ");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">
        My Collab Notes
      </h2>

      {collabs.length === 0 && (
        <p className="text-gray-500">No collab notes found.</p>
      )}

      <ul className="space-y-3">
        {collabs.map((collab) => (
          <li
            key={collab._id}
            onClick={() =>
              navigate(`/notes/collab/${collab._id}`)
            }
            className="cursor-pointer p-2 rounded hover:bg-slate-100"
          >
            {/* TITLE */}
            <p className="text-blue-600 font-medium">
              {collab.title || "Untitled Collab"}
            </p>

            {/* COLLABORATOR */}
            <p className="text-sm text-gray-600">
              Collaborated with:{" "}
              <span className="font-medium">
                {getCollaboratedWith(collab.users)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollabList;

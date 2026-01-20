import { useEffect, useState } from "react";
import { getMyCollabs } from "../../api/collabApi";
import { useNavigate } from "react-router-dom";
import type { CollabNote } from "../../types/collab";

const CollabList = () => {
  const [collabs, setCollabs] = useState<CollabNote[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyCollabs().then((res) => setCollabs(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">
        My Collab Notes
      </h2>

      {collabs.length === 0 && (
        <p className="text-gray-500">No collab notes found.</p>
      )}

      <ol className="list-decimal list-inside space-y-4">
        {collabs.map((collab) => (
          <li
            key={collab._id}
            className="cursor-pointer p-3 rounded hover:bg-slate-100"
            onClick={() =>
              navigate(`/dashboard/collab/${collab._id}`)
            }
          >
            <p className="text-blue-600 font-medium hover:underline">
              {collab.title || "Untitled Collab Note"}
            </p>

            <p className="text-sm text-gray-600">
              Collaborated with:{" "}
              <span className="font-medium">
                {collab.users.map((u) => u.name).join(", ")}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CollabList;

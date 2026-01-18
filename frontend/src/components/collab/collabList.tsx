import { useEffect, useState } from "react";
import { getMyCollabs } from "../../api/collabApi";
import { useNavigate } from "react-router-dom";

interface Collab {
  _id: string;
}

const CollabList = () => {
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyCollabs().then(res => setCollabs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Collab Notes</h2>

      {collabs.map(c => (
        <button
          key={c._id}
          className="block w-full text-left p-2 hover:bg-slate-700"
          onClick={() => navigate(`/dashboard/collab/${c._id}`)}
        >
          Collab Note
        </button>
      ))}
    </div>
  );
};

export default CollabList;

import { useParams } from "react-router-dom";
import CollabEditor from "../../components/collab/collabEditor";
const CollabPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>Invalid collab</p>;

  return (
    <div className="h-[calc(100vh-6rem)]">
      <CollabEditor collabId={id} />
    </div>
  );
};
export default CollabPage;
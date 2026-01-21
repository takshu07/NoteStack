import { useParams } from "react-router-dom";
import CollabEditor from "../../components/collab/collabEditor";

const CollabPage = () => {
  const { id } = useParams<{ id: string }>();

  // While router is resolving params (StrictMode safe)
  if (!id) {
    return null;
  }

  // Hard validation (actual invalid cases only)
  if (id === ":id" || id.includes(":")) {
    return <p className="text-red-600">Invalid collaboration link</p>;
  }

  return (
    <div className="h-[calc(100vh-6rem)]">
      <CollabEditor collabId={id} />
    </div>
  );
};

export default CollabPage;

import React from "react";
import NgoEditor from "./components/Editor";
import { useNgoProfile } from "context/NgoProfileContext";

const EditorPage = () => {
  const { ngoData, updateNgoData } = useNgoProfile();
  return (
    <div className="flex w-full flex-col gap-5">
      <NgoEditor ngoData={ngoData} onUpdate={updateNgoData} />
    </div>
  );
};

export default EditorPage;

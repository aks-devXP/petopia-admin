import React from "react";
import Editor from "./components/Editor";
import { useProviderProfile } from "context/ProviderProfileContext";

const EditorPage = () => {
  const { profileData, updateProfileData } = useProviderProfile();

  return (
    <div className="flex w-full flex-col gap-5">
      <Editor profileData={profileData} onUpdateProfile={updateProfileData} />
    </div>
  );
};

export default EditorPage;

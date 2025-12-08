import React from 'react';
import { appStrings } from "@terios/ui-config";

const SettingPage: React.FC = () => {
  return (
    <div>
      <h1>{appStrings.settingPage.title}</h1>
      <p>Manage your application settings here.</p>
    </div>
  );
};

export default SettingPage;
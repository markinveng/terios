import React from 'react';
import { appStrings } from "@terios/ui-config";

const Notification: React.FC = () => {
  return (
    <div>
      <h1>{appStrings.notificationPage.title}</h1>
      <ul>
        <li>通知1</li>
        <li>通知2</li>
        <li>通知3</li>
      </ul>
    </div>
  );
};

export default Notification;
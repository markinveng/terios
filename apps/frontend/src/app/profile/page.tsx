import React from 'react';
import { appStrings } from "@terios/ui-config";
import Image from 'next/image';

const Profile: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>{appStrings.profilePage.title}</h1>
      <div>
        <Image
          src="/profile.jpg"
          alt="Profile Image"
          width={200}
          height={200}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <span>ユーザー名</span>
          <span>ユーザーid</span>
        </div>
      </div>
      <p>紹介文テキストテキストテキストテキストテキストテキスト</p>
      <nav>
        <ul>
          <li>目標</li>
          <li>応援</li>
          <li>いいね</li>
        </ul>
      </nav>
      <ul>
        <li>いろいろ</li>
        <li>いろいろ</li>
        <li>いろいろ</li>
      </ul>
    </div>
  );
};

export default Profile;
"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleLogin = async () => {
    setStatus(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();

      setStatus("ログインに成功しました");

      // IDトークンを Nest backend に渡す例
      await fetch("http://localhost:4000/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred");
      }
      setStatus("ログインに失敗しました");
    }
  };

  return (
    <div>
      <h2>メールでログイン</h2>
      <div>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>ログイン</button>
      {status && <p>{status}</p>}
    </div>
  );
}
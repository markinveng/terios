'use client';
import { useState } from "react";
import styles from "./page.module.css";
import { EmailLogin } from "@/components/auth/EmailLogin";

export default function Home() {
  const [goal, setGoal] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <EmailLogin />
        <h1>{goal ? `あなたの目標は「${goal}」です` : "目標を設定しましょう"}</h1>
        {!goal && (
          <button onClick={() => setGoal("例: 健康的な生活を送る")}>
            目標を設定する
          </button>
        )}
      </main>
    </div>
  );
}

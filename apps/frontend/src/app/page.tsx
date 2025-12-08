'use client';
import { useState } from "react";
import styles from "./page.module.scss";
import { appStrings } from "@terios/ui-config";

export default function Home() {
  const [goal, setGoal] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>目標</h1>
        <h2 className={styles.subTitle}>あたなの目標</h2>
        <ul className={styles.goalList}>
          <li className={styles.goalItem}>
            <div className={styles.goalContainer}>
              <div className={styles.goalTextContainer}>
                <div className={styles.goalTitleContainer}>
                  <h3 className={styles.goalTitle}>○○○を達成する</h3>
                  <div className={styles.threePointLeader}></div>
                </div>
                <div className={styles.goalProgress}>
                  <span className={styles.progressText}>進捗率</span>
                  <span>○○%</span>
                </div>
                <div className={styles.goalProgress}>
                  <span className={styles.progressText}>期限</span>
                  <span>2025/1/1</span>
                </div>
                <div className={styles.goalProgress}>
                  <span className={styles.progressText}>icon(視聴数)</span>
                  <span>100</span>
                </div>
                <div className={styles.goalProgress}>
                  <span className={styles.progressText}>icon(応援)</span>
                  <span>100</span>
                </div>
                <div className={styles.goalProgress}>プログレスバー</div>
              </div>
              <div className={styles.actionContainer}>
                <button className={styles.actionButton}>リンクをコピー</button>
                <button className={styles.actionButton}>編集</button>
                <button className={styles.actionButton}>削除</button>
              </div>
            </div>
          </li>
        </ul>
        <button>目標を追加</button>
        <h2 className={styles.subTitle}>達成した目標</h2>
        <ul className={styles.goalList}>
          <li className={styles.goalItem}>
            <div className={styles.goalTitleContainer}>
              <h3 className={styles.goalTitle}>○○○を達成する</h3>
              <div className={styles.threePointLeader}></div>
            </div>
            <div className={styles.goalProgress}>
              <span className={styles.progressText}>進捗率</span>
              <span>○○%</span>
            </div>
            <div className={styles.goalProgress}>
              <span className={styles.progressText}>期限</span>
              <span>2025/1/1</span>
            </div>
            <div className={styles.goalProgress}>
              <span className={styles.progressText}>icon(視聴数)</span>
              <span>100</span>
            </div>
            <div className={styles.goalProgress}>
              <span className={styles.progressText}>icon(応援)</span>
              <span>100</span>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}

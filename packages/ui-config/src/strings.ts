export const appStrings = {
  appName: "Terios",
  appDescription: "あなたの目標達成を応援するサービスです。",

  header: {
    goals: "目標",
    notification: "通知",
    search: "検索",
    topics: "話題の目標",
    profile: "プロフィール",
    setting: "設定",
    signUp: "サインアップ",
    login: "ログイン",
    logout: "ログアウト",
  },

  homePage: {
    titleDefault: "目標を設定しましょう",
    titleWithGoal: (goal: string) => `あなたの目標は「${goal}」です`,
    setSampleGoalButton: "目標を設定する",
    sampleGoal: "例: 健康的な生活を送る",
  },

  notificationPage: {
    title: "通知",
  },

  searchPage: {
    title: "検索",
    placeholder: "目標を検索...",
  },

  topicPage: {
    title: "話題の目標",
  },

  profilePage: {
    title: "プロフィール"
  },

  settingPage: {
    title: "設定"
  },

  auth: {
    emailLoginTitle: "メールでログイン",
    emailPlaceholder: "メールアドレス",
    passwordPlaceholder: "パスワード",
    loginButton: "ログイン",
    loginSuccess: "ログインに成功しました",
    loginFailure: "ログインに失敗しました",
  },
} as const;
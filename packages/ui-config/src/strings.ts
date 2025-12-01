export const appStrings = {
  appName: "Terios",
  appDescription: "あなたの目標達成を応援するサービスです。",

  header: {
    goals: "Goals",
    search: "Search",
    donate: "Donate",
    signUp: "Sign Up",
    login: "Login",
    logout: "Logout",
  },

  home: {
    titleDefault: "目標を設定しましょう",
    titleWithGoal: (goal: string) => `あなたの目標は「${goal}」です`,
    setSampleGoalButton: "目標を設定する",
    sampleGoal: "例: 健康的な生活を送る",
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
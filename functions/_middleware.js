export async function onRequest(context) {
  const { request, next } = context;

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // ★★★ ここで好きな「ユーザー名」と「パスワード」を設定します ★★★
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  const USER = "momo";        // ユーザー名
  const PASS = "momo2026";    // パスワード


  // --- 以下は認証処理のプログラム（変更不要です） ---
  const authHeader = request.headers.get("Authorization");

  // まだパスワードが入力されていない場合、認証ポップアップを要求する
  if (!authHeader) {
    return new Response("認証が必要です", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Momoyama Festival Protected Area"',
      },
    });
  }

  const [scheme, encoded] = authHeader.split(" ");
  if (scheme !== "Basic" || !encoded) {
    return new Response("不正なリクエストです", { status: 400 });
  }

  // 入力された文字列をデコードして照合
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(":");

  // 一致した場合はサイト本体を表示する
  if (user === USER && pass === PASS) {
    return await next();
  }

  // 間違っていた場合は再度入力を求める
  return new Response("ユーザー名またはパスワードが間違っています", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Momoyama Festival Protected Area"',
    },
  });
}
"use strict";

/* フッタのテキスト。テンプレートリテラルを使って関数getCurrentYearを呼び出し */
const copyrightText = `
  &copy; Copyright 1993-${getCurrentYear()} 
  <a href="https://marlin-arms.co.jp/">Marlin Arms Corporation</a>.
`

/* HTMLファイルの読み込みが完了したときにloadイベントが起こる */
window.addEventListener("load", (e) => {
  // ナビゲーションとフッタのテキストを挿入
  document.getElementById("navigation").innerHTML = getNavigation();
  document.getElementById("copyright").innerHTML = copyrightText;
});

// getNavigation  ナビゲーション用のメニュー項目を返す
function getNavigation() {
  const path = location.pathname;
  const regex = /(example|exercise)\/.*$/; 
  // 正規表現。ファイル名に、exampleあるいはexerciseが含まれるパターン
  let top = ".."; // トップでなければひとつ上のフォルダがトップ
  if (! regex.test(path)) { // ファイルの「パス」にanswerもexampleも含まれなければ
    top = "."; // このページがトップ（トップのときだけ変数topの値が変わる）
  }
  const menu = `
<a href="${top}/index.html">トップ</a> &nbsp;&nbsp;
<a href="${top}/example/index.html">例題</a> &nbsp;&nbsp;
<a href="${top}/exercise/index.html">解答例</a>
`;
  // console.log(menu); // デバッグ用
  return menu;
}

// getCurrentYear  現在の（西暦の）年を返す
function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}

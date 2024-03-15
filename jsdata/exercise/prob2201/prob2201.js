// 数当てクイズ ブラウザでも、nodeでも実行できるバージョン

/*
 o ブラウザで動かす場合は、index.htmlをブラウザで開いてください。
 o Node.jsで実行する場合は npm で readline-sync をインストールしてから実行してください
    $ npm install readline-sync
    $ node prob2201.js
*/



// ブラウザ環境か、node.jsかの判定して分岐

const max = 100;  // 答えの最大値。1~maxまで
let wait = 1000; // ブラウザで表示するまでの待ち時間
let readlineSync = null;
let isBrowser = true;

if (typeof window === 'undefined') { // windowが未定義 -> node.js
  wait = 0;
  readlineSync = require('readline-sync');
  isBrowser = false;
}
else { // ブラウザ用
  if (max !== 100) { // maxが100以外のときはHTMLの数値を変える
    changeMaxInHTML(max, "max");
  }
}

const theNumber = getRandomInt(max); // 答えの整数を得る
// console.log(theNumber); // デバッグ用
setTimeout(numberGame, wait, theNumber, max, wait);
// HTMLのメッセージをドキュメント領域に表示するため、ダイアログボックスの表示を1秒遅らせる
// 3つ目以降の引数はnumberGameの引数として渡される


// numberGame メインのプログラム。ブラウザの場合、少し間をおいてから呼ばれるので、
// HTMLによる説明がダイアログボックスの前に表示される
function numberGame(theNumber, max, wait) {
  let message = `1以上${max}以下の数字を（半角で）入力してください`;
  if (!isBrowser) {
    message = "数当てゲームです。やめたいときは-1を入力してください。\n" + message;
  }
  // 最初のメッセージ。2回目以降のメッセージは：「大き（小さ）すぎます（●回目）」

  for (let count=1;;count++) { // 当たった時にbreakで抜けるので「条件」はない
    message += `（${count}回目）:`;//2回目以降は前回の最後でmessageが作られている
    let answer = getAnswer(count, message); // ユーザーの答えを得る（整数）

    if (successOrQuit(answer, theNumber, count, wait)) break; //★★終了★★
    // 当たったか、ユーザーが終了を希望。メッセージは下位の関数で表示済

    if (answer < 1 || max < answer)
      message = `1以上${max}以下の数字が入力されなかったので、はずれです。`
      + `半角の数字を入力してください`;
    else if (answer < theNumber) message = "小さすぎます";
    else  message = "大きすぎます";
  } // forループの終わり
}  // 関数numberGame 終わり



// successOrQuit  当たったか、あるいはユーザーが終了を希望した
function successOrQuit(answer, theNumber, count, wait) {
  if (answer === theNumber) { // 当たったとき
    setTimeout(printSuccessMessage, wait, count, answer); //「当たり！」
    return true;
  }
  if (answer === -1) {
    return true;
  }
  return false;
}

  
// changeMaxInHTML  idの振られたspanの数値をmaxに変更
function changeMaxInHTML(max, id) {
  document.getElementById(id).innerHTML = max;
}


// getRandomInt  1以上n以下の整数をランダムに返す。
// 第7章の練習問題7-2参照（「ランダムな整数を生成」とほぼ同じ。「1以上」が違う
function getRandomInt(n) {
  return Math.floor(Math.random() * n) + 1;

/*                    //   たとえば n が 10 ならば
  x = Math.random();  //   0 ≦ x < 1
  x = x * n;          //  10倍することになるので  0 ≦ x < 10  になる
  x = Math.floor(x);  //  小数点以下を切り下げるので  0 ≦ x ≦ 9 の整数になる
  x = x + 1;          //  1を足すので  1 ≦ x ≦ 10 の整数になる  
  return x;
*/  
}

// getAnswer  ユーザーからの回答を得る
function getAnswer(count, message) {
  let s;
  if (isBrowser) {
    s = prompt(message);
  }
  else {
    s = readlineSync.question(message);
  }
  if (s === null || s === "-1") { // キャンセルボタンの選択、あるいは-1の入力
    return -1; // 終了する
  }
  const n = parseInt(s); // 文字列を整数として解釈してみる
  if (isNaN(n) || s === "") { // 入力が整数と解釈できない。isNaNという関数を使ってチェックする
    //（NaNは「Not a Number」の省略形）
    return -2; // 数字が入力されていないことを表す値を返す
  }
  return n; // 整数を返す
}


// printSuccessMessage  成功（success）時のメッセージを出力
function printSuccessMessage(count, answer) {
  const mes1 = `おめでとうございます。「${answer}」が当たりです。`;
  if (count === 1) {
    printMessage("ビンゴ！" + mes1
                + "\n一発で当たりましたね。すぐに宝くじを買いに行きましょう！");
  }
  else {
    const adverb = count > 7 ? "ヤット" : ""; // 三項演算子（付録A）
    printMessage(mes1 + `\n${count}回目で${adverb}当たりましたね。`);
  }
}

function printMessage(mes) {
  if (isBrowser) {
    alert(mes);
  }
  else {
    console.log(mes);
  }
}


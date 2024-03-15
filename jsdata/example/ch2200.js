// 数当てゲーム -- 1から100までのいずれかの数字を当てる
"use strict";
const max = 100;  // 答えの最大値。1〜maxまで
const wait = 1000; // ダイアログボックスを表示するまでの時間（ミリ秒）

if (max !== 100) { // maxを100以外にした場合、ドキュメント領域のメッセージを変更
  changeMaxInHTML(max, "max"); // HTMLファイル内の最大値を書き換え
}

const theNumber = getRandomInt(max); // 答えの整数を得る
// console.log(theNumber); // デバッグ用
setTimeout(numberGame, wait, theNumber, max, wait);
// HTMLのメッセージをドキュメント領域に表示するため、ダイアログボックスの表示を1秒遅らせる
// 3つ目以降の引数はnumberGameの引数として渡される


// 関数 numberGame  メインのプログラム。1秒後に呼ばれる
function numberGame(theNumber, max, wait) {
  let message = `1以上${max}以下の数字を（半角で）入力してください`;
  // 最初のメッセージ。2回目以降のメッセージは：「大き（小さ）すぎます（●回目）」

  for (let count=1;;count++) { // 当たった時にbreakで抜けるので「条件」はない
    message += `（${count}回目）:`;//2回目以降は前回の最後でmessageが作られている
    let answer = readUserAnswer(count, message); // ユーザーの答えを得る（整数）

    if (successOrQuit(answer, theNumber, count, wait)) break; //★終了★
    // 当たったか、ユーザーが終了を希望。メッセージは下位の関数で表示済

    if (answer < 1 || max < answer)
      message = `1以上${max}以下の数字が入力されなかったので、はずれです。`
      + `半角の数字を入力してください`;
    else if (answer < theNumber) message = "小さすぎます";
    else  message = "大きすぎます";
  } // forループの終わり
}  // 関数numberGameの終わり


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

// readUserAnswer  ユーザーからの回答を得る
function readUserAnswer(count, message) {
  const s = readLine(message); // 文字列を入力
  if (s === null || s === "-1") { // キャンセルボタンの選択、あるいは-1の入力
    return -1; // 終了する
  }
  const n = parseInt(s); // 文字列を整数として解釈してみる
  if (isNaN(n)) { // 入力が整数と解釈できない。isNaNという関数を使ってチェックする
    //（NaNは「Not a Number」の省略形）
    return -2; // 数字が入力されていないことを表す値を返す
  }
  return n; // 整数を返す
}

function readLine(message) {
  return prompt(message);
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

function printMessage(message) {
  alert(message);
}

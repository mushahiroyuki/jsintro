// 数当てゲーム

// モジュール（ライブラリ）の読み込み
"use strict";
const readlineSync = require('readline-sync');
// 変数readlineSyncに記憶されたオブジェクトのメソッドなどを利用できるようになる

const max = 100;  // 答えの最大値。1~maxまで
const wait = 0;   // 問題を表示するまでの時間

const theNumber = getRandomInt(max); // 答えの整数を得る
// console.log(theNumber);  //デバッグ時に使う
setTimeout(numberGame, wait, theNumber, max, wait);
// HTMLのメッセージの表示のため、ダイアログボックスの表示を遅くする


// numberQuize メインのプログラム
function numberGame(theNumber, max, wait) {
  let message = `数当てゲームです。やめたいときは「-1」を入れてください。
1以上${max}以下の整数を（半角で）入力してください。（1回目）: `;
  let count = 1;
  let answer = readUserAnswer(count, message);
  while (true) {
    if (answer === -1) break;

    if (answer === theNumber) {
      setTimeout(printSuccessMessage, wait, count, answer);
      break;
    }

    count++;
    const countMes = `（${count}回目）:`; // 回数のメッセージ
    let bigOrSmall = "";
    if (1 <= answer && answer <= max) {
      if (answer < theNumber) {
        bigOrSmall = "小さすぎます";
      }
      else {
        bigOrSmall = "大きすぎます";            
      }
      answer = readUserAnswer( count, bigOrSmall+countMes);
    }
    else {
      mes = `1以上${max}以下の整数ではないので、はずれです。`
        + `かな漢字変換をしないで半角の数字を入れてください\n終了するには-1を入力してください`
        + countMes;
      answer = readUserAnswer( count, mes)
    }
  }
}

// changeMaxInHTML  idの振られたspanの数値をmaxに変更
function changeMaxInHTML(max, id) {
  document.getElementById(id).innerHTML = max;
}


// getRandomInt  1以上n以下の整数をランダムに返す
function getRandomInt(n) {
  return Math.floor(Math.random() * n) + 1;
}

// readUserAnswer  ユーザーからの回答を得る
function readUserAnswer(count, message) {
  let s;
  s = readlineSync.question(message);
  if (s === null || s === "-1") {
    return -1;
  }
  const n = parseInt(s);
  if (n === NaN || s === "") {
    return -2;
  }
  return n;
}

// printSuccessMessage  成功（success）時のメッセージを出力
function printSuccessMessage(count, answer) {
  const mes1 = `おめでとうございます。「${answer}」が当たりです。`;
  if (count === 1) {
    printMessage("ビンゴ！" + mes1 + "\n一発で当たりましたね。すぐに宝くじを買いに行きましょう！");
  }
  else {
    const adverb = count > 7 ? "ヤット" : ""; // 付録Aの「三項演算子」
    printMessage(mes1 + `\n${count}回目で${adverb}あたりましたね。`);
  }
}

function printMessage(mes) {
  console.log(mes);
}



// 非同期版

"use strict";
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const max = 100;
const theNumber = getRandomInt(max);
// console.log(theNumber);
let count = 0;

mainLoop(max);

function mainLoop(max) {
  count += 1;
  printPrompt(count);

  readUserAnswer(num => {
    if (num === -1) process.exit(0);
    
    if (num < 1 || num > max) {
      console.log(`1以上${max}以下の整数ではないので、ハズレです。`);
      mainLoop(max);
    } else if (num !== theNumber) {
      const bigOrSmall = num < theNumber ? "小さすぎます。" : "大きすぎます。";
      console.log(bigOrSmall);
      mainLoop(max);
    } else {
      printSuccessMessage(count);
      rl.close();
    }
  }, max);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function printPrompt(count) {
  if (count === 1) {
    console.log("数当てゲームです。");
  }
}

function readUserAnswer(callback, max) {
  rl.question(`1以上${max}以下の整数を入力してください: `, (inp) => {
    const num = parseInt(inp);
    if (isNaN(num)) {
      callback(-2);
    } else {
      callback(num);
    }
  });
}

function printSuccessMessage(count) {
  if (count === 1) {
    console.log("ビンゴ！ おめでとうございます。一発であたりましたね。素晴らしい！");
  } else {
    const adverb = count > 7 ? "ヤット" : "";
    /* ↑次と同じことを1行で書ける（知らない人にはチンプンカンプンだが）
       if (count > 7) {
         adverb = "ヤット";
       }
       else {
         adverb = "";
       }   */       
    console.log(`おめでとうございます。${count}回目で${adverb}あたりましたね。`);
  }
}


<?php

const MAX_NUMBER = 100;

function main() {
  $theNumber = getRandomInt(MAX_NUMBER);
  $count = 0;

  while (true) {
    $count++;
    printPrompt($count);
        
    $num = readUserAnswer();
    if (is_null($num) || $num < 1 || $num > MAX_NUMBER) {
      echo "1以上" . MAX_NUMBER . "以下の整数ではないので、ハズレです。\n";
    } else if ($num == $theNumber) {
      printSuccessMessage($count, $theNumber);
      break;
    } else if ($num < $theNumber) {
      echo "小さすぎます。\n";
    } else {
      echo "大きすぎます。\n";
    }
  }
}

function getRandomInt($n) {
  return rand(1, $n);
}

function printPrompt($count) {
  if ($count == 1) {
    echo "数当てゲームです。";
  }
  echo "1以上" . MAX_NUMBER . "以下の整数を入力してください（" . $count . "回目）: ";
}

function readUserAnswer() {
  $answer = trim(fgets(STDIN));
  return is_numeric($answer) ? intval($answer) : null;
}

function printSuccessMessage($count, $answer) {
  $mes1 = "おめでとうございます。「" . $answer . "」が当たりです。";
  if ($count == 1) {
    echo "ビンゴ！ $mes1\n";
    echo "一発で当たりましたね。すぐに宝くじを買いに行きましょう！\n";
  } else {
    $adverb = $count > 7 ? "ヤット" : "";
    echo "{$mes1}{$count}回目で{$adverb}当たりましたね。\n";
  }
}

main();
?>

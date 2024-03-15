"use strict";

/* 最小値から最大値までの間の整数をランダムに返す  */
function ランダムな整数を生成(最小値, 最大値){
  let 差分 = Math.abs(最大値-最小値); // 絶対値を取る
  let x = Math.random()*(差分+1);
  x = Math.floor(x) + 最小値;
  return x; //戻り値（return 値）
}

// 上の関数の英語版
function getRandomInteger(from, to) {
	return ランダムな整数を生成(from, to);
}


/* クッキーの有効期限を今日に設定 */
function setCookieToday(キー, 値) {
	今日が期限のクッキーを設定(キー, 値);
}

function 今日が期限のクッキーを設定(キー, 値) {
  let 現在時刻 = new Date();
  let 年 = 現在時刻.getFullYear();
  let 月 = 現在時刻.getMonth();
  let 日 = 現在時刻.getDate();
  let クッキーの期限 = new Date(年,月,日,23,59,59); // 今日の23時59分59秒に期限を設定
  let x = キー + "=" + escape(値) + "; expires=" 
    + クッキーの期限.toGMTString() + "; path=/";
  document.cookie = x;

}



// クッキーを設定
function setCookie(キー, 値) {
	クッキーを設定(キー, 値);
}

function クッキーを設定(キー, 値) {
   let cookieDate = new Date(2030,12,31,23,59,59);
	// クッキーの有効期限は2030年に設定
   document.cookie = キー + "=" + escape(値) + "; expires=" 
                     + cookieDate.toGMTString() + "; path=/";
}




// クッキーの読み込み
function readCookie(キー) {
	return クッキーの読み込み(キー);
}

function クッキーの読み込み(キー) {
  let cookie = document.cookie;
  let first = cookie.indexOf(キー+"=");
  if (first >= 0) {  // クッキーが存在する場合
    let str = cookie.substring(first, cookie.length);
    let last = str.indexOf(";");

    if (last < 0) last = str.length; // クッキーの終わりかどうか
    str = str.substring(0,last).split("="); // クッキーの値を取得
    return unescape(str[1]);
  }
  else {
    return null;
  }
}



function eraseCookie (キー) {
	クッキーを消去 (キー);
}

// 消去のためクッキーに過去の日付を設定してクッキーを消す
function クッキーを消去 (キー) {
  let cookieDate = new Date(2000,11,10,19,30,30);
  document.cookie=キー + "= ; expires="+cookieDate.toGMTString()+"; path=/";
}

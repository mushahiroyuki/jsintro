"use strict";

window.addEventListener("load", (e) => {
	document.getElementById("inp").focus();
});

document.getElementById("form1").addEventListener( // formの提出（submit）
  "submit",
  (e) => {
    e.preventDefault(); // フォームのデフォルトの動作をしないようにする。お約束
    const word = document.getElementById("inp").value;
    // console.log(word);

    lookUpDict(word); // 単語を辞書引き
    document.getElementById("inp").select();
    // 入力されている単語を選択しておいて、次にすぐに検索できるようにする
  }
);


function addYear(id) {
  const now = new Date();
  document.getElementById(id).innerHTML = "-" + now.getFullYear();
}

// lookUpDict 単語 word について辞書を引く 
function lookUpDict(word) {
  const apiUrl = "https://www.dictjuggler.net/api/yakugo-api/";
  const apiId = "js1daylab"; // IDは必ずこれを用いる 将来変更の可能性あり
  const url = `${apiUrl}?word=${word}&apiId=${apiId}`;
  // console.log(url);

  fetch(url) // urlを指定してデータをもらう（fetchする）
     // 結果が thenの後ろの引数に渡る（thenの引数は「アロー関数」）
    .then( response => {
      if (response.ok && 
          response.headers.get("Content-Type") === "application/json") {
        return response.json(); // responseをオブジェクトに変換
        // response.returnCode にリターンコード（1なら正常）
        // response.headWordに「見出し語」、response.yakugoListに「訳語」の配列
        // response.idioms に「イディオム」の配列
      }
      else {
        throw new Error( // 異なる場合はエラーを「スロー」する。
          `予期しないレスポンスまたはコンテントのタイプ： ${response.status}` );
      }})
    .then( jsonData => outputData(jsonData) )
         // JSONのデータをoutputData（下に定義）に渡して処理してもらう
    .catch(error => {
      console.log("取得できませんでした", error); // 途中でエラー起こった場合
    });
} // lookUpDictの終わり


// outputData JSONのデータを受け取って出力
function outputData(jsonData) {
  let outObj = document.getElementById("translationArea"); // 出力する場所
  let yakugoOut = "";
  if (jsonData.returnCode <= 0) { // returnCodeが0以下。見つからなかった
    outObj.innerHTML = "見つかりません";
  }
  else {
    const headWord = jsonData.headWord; // 見出し語
    if (jsonData.yakugoList) { // 訳語がある
      yakugoOut = jsonData.yakugoList.join(" &nbsp; ");
      // 配列の各要素をくっつけて文字列にする。間にスペースを入れる
      // 単なるスペースだとHTMLでは複数書いても1個になってしまうので「&nbsp;」を使う
      // 「&nbsp;」は必ずスペースをおいてくれる
    }
    else {
      yakugoOut = "見つかりません";
    }

    let idiomOut = "";
    if (jsonData.idioms.length > 0) { // 配列の大きさが0以上
      idiomOut = jsonData.idioms.join("<br>");
      // 「イディオム等」の間に改行（<br>）を入れて、くっつける
      idiomOut = `<b>イディオム等</b><br>${idiomOut}`;
    }

    const link = `https://www.dictjuggler.net/yakugo/?word=${headWord}`;
    // 翻訳訳語辞典の同じ語へのリンク
    outObj.innerHTML 
      = `<h3>${headWord}（<a href="${link}">詳細</a>）</h3>${yakugoOut}`;
    // 訳語を出力
    outObj.innerHTML  += "<br><br>" + idiomOut;  // イディオムを追加
  }
}

// getCurrentYear  現在の（西暦の）年を返す
function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}

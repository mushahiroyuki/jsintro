// 数当てゲーム。関数やループとif文を使う
package main  // メインプログラムは必ずこうする

import (  // 読み込む「ライブラリ」の宣言
	"fmt"   // 出力関連
	"strconv"  // 文字列から整数などへの変換	
	"math/rand"   // 乱数。強力なものが必要ならcrypto/randを使う
	"time"  // 乱数のseed（種）を生成するため（最初に1回だけ必要）
)


// main   必ずmainから始まる
func main() {
	const max = 100;
	theNumber := getRandomInt(max) // 関数呼び出し。答えの数字をもらう
	// 代入には「:=」と「=」の2種類があるが、「:=」は変数の宣言と初期値の代入
	// 型は右辺から自動的に推定らされる
	// fmt.Println(theNumber);  // デバッグ用
	
	for count:=1; ; count++ { //for文。条件は「（...）」で囲まない
		                        // 「条件」がないので、無限ループになる
		printPrompt(count, max) // 入力を促す説明のメッセージ（プロンプト）を表示
		
		if num, err := readUserAnswer() // ユーザーからの回答の数字（num）をもらう
		// この行は、条件の前で、変数を宣言し、値の代入をしている部分
		// err がnilでないときは何らかのエラーが起こったことを示す
		err != nil || num < 1 || max < num  { // この行がifの条件
			// readUserAnswerからは2つの値が返ってくる。numとerrに代入
			// エラーがなくて、範囲外の数字が返ってきたときの処理
			fmt.Printf("1以上%v以下の整数ではないので、ハズレです。\n", max)
		} else if num == theNumber { // 当たらなかったとき
			printSuccessMessage(count, theNumber) // あたったときのメッセージを表示
			break  // forループを抜ける
		} else if num < theNumber {
			fmt.Println("小さすぎます。") // fmt.Printlnは出力後改行する
		} else {
			fmt.Println("大きすぎます。")
		}
	}
}

// getRandomInt 1以上n以下の整数を得る
func getRandomInt(n int) int { // 関数宣言。引数はなし、戻り値はint（整数）
	rand.Seed(time.Now().UnixNano()) // 乱数の「seed」。’70年1月1日0時からのナノ秒数
	num := rand.Intn(n)+1  // 0以上n未満の整数をもらって、+1する
	return num
}

// printPrompt プロンプト文字列（説明）を表示
func printPrompt(count int, max int) { // 引数は整数2つ。戻り値はなし
	if count == 1 { // 1回目のみ表示
		fmt.Print("数当てゲームです。")  // fmt.Printは改行しない
	}
	fmt.Printf("1以上%v以下の整数を（半角で）入力してください（%v回目）: ",
		max, count)
	// fmt.Printfではフォーマットが指定できる。
	// %vを指定すると処理系が「良きに計らって」くれる
}

// readUserAnswer ユーザーからの答えを読み込む
func readUserAnswer() (int, error) {
	// 戻り値が2つある。整数（int）とerror
	var inp string
	fmt.Scanln(&inp) // 文字列として1行読み込み、inpに代入
	return strconv.Atoi(inp) // 整数に変換。errorも戻る
}

// printSuccessMessage 当たったときのメッセージを表示
func printSuccessMessage(count int, answer int) {
	mes1 := fmt.Sprintf("おめでとうございます。「%d」が当たりです。", answer);
	if count == 1 {
		fmt.Printf("ビンゴ！ %v\n", mes1)
		fmt.Printf("一発で当たりましたね。すぐに宝くじを買いに行きましょう！\n", )
	} else {
		adverb := "" // 副詞（修飾語「ヤット」をつけるかどうか）
		if  7 < count  {
			adverb = "ヤット"
		}
		// JSのように「adverb := 7 < count ? "ヤット" : ""」とは書けない
		fmt.Printf("%v%v回目で%s当たりましたね。\n", mes1, count, adverb)
	}
}

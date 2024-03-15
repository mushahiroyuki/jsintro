package main

import (
	"fmt"
	"math/rand"
	"time"
	"strconv"	
)

func main() {
	max := 100
	theNumber := getRandomInt(max)
	// fmt.Println(theNumber)

	count := 0
	for {
		count++
		printPrompt(count, max)
		answer := readUserAnswer()
		if answer == -1 {
			break
		}
		
		if answer < 1 || max < answer {
			fmt.Printf("1以上%d以下の整数ではないので、ハズレです。\n", max)
		} else if answer != theNumber {
			bigOrSmall := "小さすぎます。"
			if answer > theNumber {
				bigOrSmall = "大きすぎます。"
			}
			fmt.Println(bigOrSmall)
		} else {
			printSuccessMessage(count, answer)
			break
		}
	}
}


func getRandomInt(max int) int {
	rand.Seed(time.Now().UnixNano())
	num := rand.Intn(max) + 1
	return num
}

func printPrompt(count, max int) {
	if count == 1 {
		fmt.Print("数当てゲームです。")
	}
	fmt.Printf("1以上%d以下の整数を入力してください（%d回目）: ", max, count)
}

func readUserAnswer() int {
	var s string
	fmt.Scan(&s)
	if s == "" {
		return -2
	}
	num, err := strconv.Atoi(s)
	if err != nil {
		return -2
	}
	return num
}

func printSuccessMessage(count, answer int) {
	mes1 := fmt.Sprintf("おめでとうございます。「%d」が当たりです。", answer)
	
	if count == 1 {
		fmt.Printf("ビンゴ！%s 一発で当たりましたね。\nすぐに宝くじを買いに行きましょう！\n", mes1)
	} else {
		adverb := ""
		if count > 7 {
			adverb = "ヤット"
		}
		fmt.Printf("%s%d回目で%s当たりましたね。\n", mes1, count, adverb)
	}
}

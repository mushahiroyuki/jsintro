# 利用するライブラリの指定
import random  # 乱数関連
import time    # 時刻関連（乱数の初期化［seedの指定］に利用）

# 呼び出される関数は、実際に呼び出される前に定義されていないといけない

# getRandomInt  1以上n以下の整数をランダムに返す
def getRandomInt(max): 
  random.seed(time.time())  # 現在時刻で乱数を初期化する
  num = random.randint(1, max) # 1以上max以下の乱数を生成。組み込みの関数あり
  return num


# printPrompt プロンプト文字列（説明）を表示
def printPrompt(count, max):
  if count == 1:
    print("数当てゲームです。", end="")  # ここでifの範囲は終わり
  print(f"1以上{max}以下の整数を入力してください（{count}回目）: ", end="")
    # f"..." は「テンプレートリテラル」のようなもの
    # printは end="" を指定すると、改行しない
    # インデント（字下げ）が違うので、if文は1行で終わっている点に注意


# readUserAnswer  ユーザーからの回答を得る
def readUserAnswer():
  s = ""
  try:  ## 例外処理  try と exceptが組になる
    s = input()
    if not s:  # 入力が空の場合
      return -2   ## 再入力してもらうために、範囲外の数字-2を返す
    try:  # 整数に変換できないときは、「例外」が発生しexceptに行く
      num = int(s)  # 整数に変換
      return num
    except ValueError: ## 整数に変換できない場合、「例外」が発生してここに来る
      return -2
  except EOFError: ## ファイルの終わりになった場合
    exit()


# printSuccessMessage 当たったときのメッセージを表示
def printSuccessMessage(count, answer):
  mes1 =  f"おめでとうございます。「{answer}」が当たりです。";
  if count == 1:
    print(f"ビンゴ！{mes1} 一発で当たりましたね。\n"
          + "すぐに宝くじを買いに行きましょう！")
  else:
    adverb = "ヤット" if 7 < count else ""
    ## countが7以上ならば"ヤット"を、そうでなければ""をadverbに代入
    print(f"{mes1}{count}回目で{adverb}当たりましたね。")

    
# main
max = 100
theNumber = getRandomInt(max)
## print(theNumber)  ## 開発中に使う

count = 0
while True:  # 無限ループ
  count += 1   ## count++ はPythonでは使えない
  printPrompt(count, max)
  answer = readUserAnswer()
  if answer == -1:
    break  # ループを抜けるので終了する

  if answer < 1 or max < answer:
    print(f"1以上{max}以下の整数ではないので、ハズレです。")
  elif answer != theNumber:
    bigOrSmall = "小さすぎます。" if answer < theNumber else "大きすぎます。"
    ## 上の「adverb = "ヤット" ...」と同じ構文
    print(bigOrSmall)
  else:
    printSuccessMessage(count, answer)
    break
# ここまで whileループ

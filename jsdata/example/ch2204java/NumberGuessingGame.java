import java.util.Random;  // ライブラリの指定。乱数
import java.util.Scanner;  // 入力

public class NumberGuessingGame {
  private static final int MAX = 100;

  public static void main(String[] args) {
    int theNumber = getRandomInt(MAX);
    // System.out.println(theNumber);  // デバッグ用
        
    int count = 1;
    while (true) {
      printPrompt(count, MAX);
            
      int num = readUserAnswer();
      if (num < 1 || num > MAX) {
        System.out.printf("1以上%d以下の整数ではないので、ハズレです。\n", MAX);
      } else if (num == theNumber) {
        printSuccessMessage(count, theNumber);
        break;
      } else if (num < theNumber) {
        System.out.println("小さすぎます。");
      } else {
        System.out.println("大きすぎます。");
      }
      count++;
    }
  }

  private static int getRandomInt(int n) {
    Random rand = new Random();
    return rand.nextInt(n) + 1;
  }

  private static void printPrompt(int count, int max) {
    if (count == 1) {
      System.out.print("数当てゲームです。");
    }
    System.out.printf("1以上%d以下の整数を（半角で）入力してください（%d回目）: ",
                      max, count);
  }

  private static int readUserAnswer() {
    Scanner scanner = new Scanner(System.in);
    while (true) {
      try { // 整数としての解釈を「トライ」する
        return Integer.parseInt(scanner.nextLine());
      } catch (NumberFormatException e) { // 整数として解釈できなかった場合（例外処理）
        System.out.println("有効な整数を入力してください。");
      }
    }
  }

  private static void printSuccessMessage(int count, int answer) {
    String mes1 = String.format("おめでとうございます。「%d」が当たりです。", answer);
    if (count == 1) {
      System.out.printf("ビンゴ！ %s\n", mes1);
      System.out.println("一発で当たりましたね。すぐに宝くじを買いに行きましょう！");
    } else {
      String adverb = (count > 7) ? "ヤット" : "";
      System.out.printf("%s%d回目で%s当たりましたね。\n", mes1, count, adverb);
    }
  }
}

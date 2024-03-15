/* コンパイルと実行の仕方

● mac OS
・Xcode Command Line Tools をインストールしておいてください。

   $ clang++ -std=c++17 ch2206.cpp -o ch2206   # ← コンパイル
   $ ./ch2206                                  # ← 実行

あるいは

   $ g++ -std=c++17 ch2206.cpp -o ch2206   # ← コンパイル
   $ ./ch2206                                  # ← 実行

● Windows

Microsoft Visual Studioなどをインストールしてください。


*/   


#include <iostream>
#include <random>
#include <ctime>
#include <string>

class NumberGuessGame {
public:
    void play();

private:
    int getRandomInt(int n);
    void printPrompt(int count, int max);
    std::pair<int, bool> readUserAnswer();
    void printSuccessMessage(int count, int answer);
};

int main() {
    NumberGuessGame game;
    game.play();
    return 0;
}

void NumberGuessGame::play() {
    const int max = 100;
    int theNumber = getRandomInt(max);
    
    int count = 1;
    while (true) {
        printPrompt(count, max);

        auto [num, hasError] = readUserAnswer();
        if (hasError || num < 1 || num > max) {
            std::cout << "1以上" << max << "以下の整数ではないので、ハズレです。\n";
        } else if (num == theNumber) {
            printSuccessMessage(count, theNumber);
            break;
        } else if (num < theNumber) {
            std::cout << "小さすぎます。\n";
        } else {
            std::cout << "大きすぎます。\n";
        }
        count++;
    }
}

int NumberGuessGame::getRandomInt(int n) {
    std::mt19937 mt(static_cast<unsigned int>(time(nullptr)));
    std::uniform_int_distribution<int> dist(1, n);
    return dist(mt);
}

void NumberGuessGame::printPrompt(int count, int max) {
    if (count == 1) {
        std::cout << "数当てゲームです。";
    }
    std::cout << "1以上" << max << "以下の整数を入力してください（" << count << "回目）: ";
}

std::pair<int, bool> NumberGuessGame::readUserAnswer() {
    std::string inp;
    getline(std::cin, inp);
    try {
        return {std::stoi(inp), false};
    } catch (...) {
        return {0, true};
    }
}

void NumberGuessGame::printSuccessMessage(int count, int answer) {
    std::string mes1 = "おめでとうございます。「" + std::to_string(answer) + "」が当たりです。";
    if (count == 1) {
        std::cout << "ビンゴ！ " << mes1 << "\n";
        std::cout << "一発で当たりましたね。すぐに宝くじを買いに行きましょう！\n";
    } else {
        std::string adverb = (count > 7) ? "ヤット" : "";
        std::cout << mes1 << count << "回目で" << adverb << "当たりましたね。\n";
    }
}

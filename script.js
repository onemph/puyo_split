function splitText() {
    var inputText = document.getElementById('inputText').value; // HTMLのテキストフィールドから入力を取得する
    var outputDiv = document.getElementById('output');
    
    var variable1 = inputText; // 入力された文字列を変数1に保存する
    var variable2 = ''; // 変数2を初期化する
    var variable3 = ''; // 変数3を初期化する

    for (var i = 0; i < variable1.length; i++) {
        var currentChar = variable1[i]; // 変数1から1文字ずつ読み込む

        variable2 += currentChar; // 読み込んだ1文字を変数2に追記する

        if (currentChar === '。' || currentChar === '\n' || i === variable1.length - 1) {
            // 読み込んだ文字が"。"または"改行"であるか、変数1の最後の文字まで達した場合
            var totalLength = variable2.length + variable3.length; // 変数2+変数3の文字数を計算する

            if (totalLength >= 128) {
                // 変数2+変数3の文字数が128以上の場合
                addTextToOutput(outputDiv, variable3, i, totalLength); // 変数3をHTML出力する
                variable3 = ''; // 変数3をクリアする
            }

            variable3 += variable2; // 変数2を変数3に追記する
            variable2 = ''; // 変数2をクリアする
        }
    }
}

function addTextToOutput(outputDiv, text, index, total) {
    var div = document.createElement('div');
    div.innerHTML = `
        <p>${index + 1}/${total}</p>
        <p>${text}</p>
        <p>残り文字数: ${128 - text.length}</p>
        <button onclick="copyText(${index})">コピー</button>
    `;
    outputDiv.appendChild(div);
}

// splitText関数を呼び出す
splitText();

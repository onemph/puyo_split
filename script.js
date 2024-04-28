function splitText() {
    var inputText = document.getElementById('inputText').value;
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    
    var tempText = ''; // 変数2
    var bufferText = ''; // 変数3
    
    for (var i = 0; i < inputText.length; i++) {
        var char = inputText.charAt(i);
        tempText += char; // 変数2に1文字ずつ追記
        
        if (char === '。' || char === '\n' || i === inputText.length - 1) { // '。'または改行または最後の文字の場合
            if ((tempText.length + bufferText.length) > 128) { // 変数2 + 変数3 の文字数が128を超える場合
                addTextToOutput(outputDiv, bufferText, index, splitTexts.length);
                bufferText = ''; // 変数3をクリア
            }
            bufferText += tempText; // 変数3に変数2を追加
            tempText = ''; // 変数2をクリア
            
            if (char === '。' || char === '\n' || i === inputText.length - 1) { // '。'または改行または最後の文字の場合
                addTextToOutput(outputDiv, bufferText, index, splitTexts.length); // 変数3をHTML出力
                bufferText = ''; // 変数3をクリア
            }
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

function copyText(index) {
    var text = document.querySelectorAll('#output div')[index].querySelector('p:nth-child(2)').textContent;
    navigator.clipboard.writeText(text)
        .then(() => {
            var button = document.querySelectorAll('#output div')[index].querySelector('button');
            button.textContent = 'コピー済';
            button.disabled = true;
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

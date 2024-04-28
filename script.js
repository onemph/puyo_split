function splitText() {
    var inputText = document.getElementById('inputText').value;
    var splitTexts = inputText.match(/(?:.{1,128}[。\n])+/g); // 改行が続く場合も含めて文字列を分割
    
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    
    splitTexts.forEach(function(text, index) {
        addTextToOutput(outputDiv, text, index + 1, splitTexts.length); // インデックスを1から開始
    });
}

function addTextToOutput(outputDiv, text, index, total) {
    var div = document.createElement('div');
    div.innerHTML = `
        <p>${index}/${total}</p>
        <p>${text}</p>
        <p>残り文字数: ${128 - text.length}</p>
        <button onclick="copyText(${index - 1})">コピー</button> <!-- インデックスを0から開始 -->
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

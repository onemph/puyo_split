function splitText() {
  var inputText = document.getElementById('inputText').value;
  var splitTexts = inputText.match(/.{1,128}[。\n]|.{1,128}$/g);
  
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';
  
  var tempText = '';
  splitTexts.forEach(function(text, index) {
    if ((tempText.length + text.length) > 128) {
      var div = document.createElement('div');
      div.innerHTML = `
        <p>${index + 1}/${splitTexts.length}</p>
        <p>${tempText}</p>
        <p>残り文字数: ${128 - tempText.length}</p>
        <button onclick="copyText(${index})">コピー</button>
      `;
      outputDiv.appendChild(div);
      tempText = text;
    } else {
      tempText += text;
    }
    // 最後のテキストの場合
    if (index === splitTexts.length - 1) {
      var div = document.createElement('div');
      div.innerHTML = `
        <p>${index + 1}/${splitTexts.length}</p>
        <p>${tempText}</p>
        <p>残り文字数: ${128 - tempText.length}</p>
        <button onclick="copyText(${index})">コピー</button>
      `;
      outputDiv.appendChild(div);
    }
  });
}

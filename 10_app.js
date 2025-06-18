const apiKey = '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';

// メッセージ送信ボタンが押されたときに呼び出される関数
function sendMessage() {
    // 各入力フィールドの値を取得
    const name = document.getElementById('name').value;
    const budget = document.getElementById('budget').value;
    const quantity = document.getElementById('quantity').value;
    const type = document.getElementById('type').value;

    // APIに送信するメッセージを構築
    const message = `合計${budget}円以内で${name}の${type}を${quantity}個教えて。予算は超えないように。グッズの名前と値段、URLを実際にアクセスできるものだけ教えて。会話文などほかの情報はいらないよ。`;

    // ペイロードを作成
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: message }
        ],
        max_tokens: 4000
    };

    // APIリクエストを送信
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const output = data.choices[0].message.content;
        const formattedOutput = output.replace(/(.{100})/g, '$1\n'); // 回答を100字ごとに改行
        document.getElementById('response').textContent = output;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
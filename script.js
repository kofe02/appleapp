// --- DOM要素の取得 ---
const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const questionText = document.getElementById('question-text');
const optionBoxes = document.querySelectorAll('.option-box');
const optionTexts = document.querySelectorAll('.option-text');
const progressBar = document.getElementById('progress-bar');

// --- 診断データ ---
const questions = [
    { question: "どんな味のリンゴが好き？", options: { A: "とにかく甘いのが好き！", B: "甘さの中に酸味もほしい" }, type: { A: 'S', B: 'R' } },
    { question: "どんな歯ごたえが好き？", options: { A: "シャキッ！と爽快な食感", B: "サクッ、ほろりとした柔らかめ" }, type: { A: 'C', B: 'M' } },
    { question: "香りはどれくらい大事？", options: { A: "豊かな香りも楽しみたい", B: "香りより味や食感が大事" }, type: { A: 'A', B: 'F' } },
    { question: "どうやって食べるのが好き？", options: { A: "やっぱり生でそのまま！", B: "アップルパイやジャムで楽しみたい" }, type: { A: 'R', B: 'C' } }
];

const results = {
    'SCAR': { name: 'トキ', description: 'パリッとした食感と強い甘み、そして王林ゆずりの豊かな香りが特徴。果汁もたっぷりでジューシー！', eatingStyle: 'まずはそのままガブリとどうぞ！ジュースにするのもおすすめです。', image: 'https://placehold.co/200x200/F7E47B/333333?text=トキ' },
    'SCAF': { name: 'サンふじ', description: 'これぞ日本のリンゴの王様。甘みが強く、シャキシャキとした食感で果汁も豊富。蜜が入りやすいのも特徴です。', eatingStyle: '生で食べるのが一番！サラダのアクセントにも。', image: 'https://placehold.co/200x200/DD2C00/FFFFFF?text=サンふじ' },
    'SMAR': { name: '王林', description: '「リンゴの王様」と呼ばれる、独特で豊かな香りが最大の特徴。酸味が少なく、甘みが際立ちます。', eatingStyle: 'その香りを楽しむため、ぜひ生で。スムージーにも最適。', image: 'https://placehold.co/200x200/9CCC65/333333?text=王林' },
    'SMAF': { name: 'シナノスイート', description: 'その名の通り、酸味が少なくしっかり甘いリンゴ。食感はやや柔らかめで、子どもから大人まで大人気。', eatingStyle: '生食がおすすめ。すりおろして離乳食やソースにも。', image: 'https://placehold.co/200x200/F44336/FFFFFF?text=シナノスイート' },
    'RCAR': { name: '秋映（あきばえ）', description: '甘みと酸味のバランスが絶妙で、味が濃いのが特徴。香りも良く、黒っぽい濃い赤色の皮が目印です。', eatingStyle: '味がしっかりしているので、そのまま食べるのがおすすめです。', image: 'https://placehold.co/200x200/8B0000/FFFFFF?text=秋映' },
    'RCAF': { name: 'ジョナゴールド', description: 'シャキシャキとした食感と、甘みの中にしっかりと感じる酸味が特徴。アメリカ生まれの人気者です。', eatingStyle: '生でも美味しいですが、加熱しても煮崩れしにくいのでお菓子作りにも。', image: 'https://placehold.co/200x200/FF4500/FFFFFF?text=ジョナゴールド' },
    'RMAR': { name: '紅玉（こうぎょく）', description: '強い酸味と豊かな香りが特徴。加熱することで甘みと風味が増し、お菓子作りのプロから絶大な支持を得ています。', eatingStyle: 'アップルパイ、焼きリンゴ、ジャムなど、料理やお菓子作りに最適！', image: 'https://placehold.co/200x200/B22222/FFFFFF?text=紅玉' },
    'RMAF': { name: 'つがる', description: '日本でふじの次に多く作られている品種。酸味は控えめで、柔らかめの食感と豊富な果汁が特徴です。', eatingStyle: '長く置くと柔らかくなりやすいので、早めに生で食べるのがおすすめ。', image: 'https://placehold.co/200x200/F08080/333333?text=つがる' },
    'SCAC': { name: '金星（きんせい）', description: '上品な甘さと香りを持ち、まろやかな味わい。加熱しても形が崩れにくく、調理にも向いています。', eatingStyle: 'タルトタタンやコンポートなど、形を活かしたお菓子作りに。', image: 'https://placehold.co/200x200/FFD700/333333?text=金星' },
    'SCFC': { name: 'ふじ', description: '貯蔵性が非常に高く、一年中楽しめるリンゴの代表格。加熱することで甘みがさらに凝縮されます。', eatingStyle: 'ジャムやコンポートにすると、長期保存もできておすすめです。', image: 'https://placehold.co/200x200/E53935/FFFFFF?text=ふじ' },
    'SMAC': { name: '陸奥（むつ）', description: '大きくて香り高い、独特の風味を持つ個性派。加熱するとフルーティーな香りが一層引き立ちます。', eatingStyle: 'ポークソテーのソースや、焼きリンゴにすると絶品です。', image: 'https://placehold.co/200x200/ADFF2F/333333?text=陸奥' },
    'SMFC': { name: '世界一', description: 'その名の通り、贈答用としても人気の大きなリンゴ。果肉が柔らかく、加熱するとトロリとした食感に。', eatingStyle: '大きさを活かして、丸ごと焼きリンゴにするのが豪華でおすすめ。', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=世界一' },
    'RCAC': { name: 'グラニースミス', description: '鮮やかな緑色と、力強い酸味が特徴。加熱しても煮崩れせず、爽やかな風味がお菓子を引き立てます。', eatingStyle: 'アップルパイの定番品種。酸味を活かしてミートパイにも。', image: 'https://placehold.co/200x200/32CD32/FFFFFF?text=グラニースミス' },
    'RCFC': { name: '紅玉（こうぎょく）', description: '「お菓子作りなら紅玉」と言われるほどの代表品種。その酸味が砂糖の甘さと完璧にマッチします。', eatingStyle: 'アップルパイ、焼きリンゴ、ジャムなど、どんなお菓子にも変身できます！', image: 'https://placehold.co/200x200/B22222/FFFFFF?text=紅玉' },
    'RMAC': { name: '祝（いわい）', description: '夏に収穫される早生種で、強い酸味と独特の香りを持つ昔ながらの品種。加熱するととろけるような食感に。', eatingStyle: '火の通りが早いので、ジャムやアップルソースに最適です。', image: 'https://placehold.co/200x200/90EE90/333333?text=祝' },
    'RMFC': { name: 'ゴールデンデリシャス', description: 'かつて人気を博した黄色いリンゴ。まろやかな甘みと酸味で、加熱すると甘みがより引き立ちます。', eatingStyle: '煮込み料理やカレーの隠し味に使うのもおすすめです。', image: 'https://placehold.co/200x200/FFFF00/333333?text=ゴールデンデリシャス' },
};


// --- アプリケーションのロジック ---
let currentQuestionIndex = 0;
let userAnswers = '';

/**
 * 画面を切り替える関数
 * @param {string} screenId 表示する画面のID
 */
function switchScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

/**
 * 診断を開始する
 */
function startDiagnosis() {
    currentQuestionIndex = 0;
    userAnswers = '';
    showQuestion();
    switchScreen('question-screen');
}

/**
 * 質問を表示し、プログレスバーを更新する
 */
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    optionTexts[0].innerText = currentQuestion.options.A;
    optionTexts[1].innerText = currentQuestion.options.B;
    updateProgressBar();
}

/**
 * プログレスバーの表示を更新する
 */
function updateProgressBar() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

/**
 * 最終的な診断結果を表示する
 */
function showResult() {
    progressBar.style.width = `100%`; // 最後にバーを100%にする

    const resultData = results[userAnswers] || results['SCAF']; // 不明な場合はサンふじ
    document.getElementById('result-type').innerText = userAnswers;
    document.getElementById('result-name').innerText = resultData.name;
    document.getElementById('result-description').innerText = resultData.description;
    document.getElementById('result-eating-style').innerText = resultData.eatingStyle;
    document.getElementById('result-image').src = resultData.image;
    document.getElementById('result-image').alt = resultData.name;

    // 少し遅れて結果画面を表示
    setTimeout(() => {
        switchScreen('result-screen');
    }, 400);
}

// --- イベントリスナー ---
startBtn.addEventListener('click', startDiagnosis);
retryBtn.addEventListener('click', startDiagnosis);

optionBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        const selectedValue = e.currentTarget.dataset.value;
        const questionType = questions[currentQuestionIndex].type[selectedValue];
        userAnswers += questionType;

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });
});


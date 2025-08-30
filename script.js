let aromaData = null;

const categoryBackgrounds = {
    'リラックス・鎮静効果': 'relax-bg',
    '集中力・覚醒効果': 'focus-bg',
    '抗菌・浄化効果': 'antibacterial-bg',
    '気分向上・抗うつ効果': 'mood-bg',
    '痛み緩和・筋肉疲労': 'pain-bg',
    '女性特有の悩み': 'women-bg',
    '消化器系・食欲調整': 'digestion-bg',
    '呼吸器系': 'respiratory-bg'
};

async function loadAromaData() {
    try {
        const response = await fetch('aroma_list.json');
        const data = await response.json();
        aromaData = data.アロマオイルリスト;
        
        const categories = Object.keys(aromaData).filter(key => key !== '注意事項');
        if (categories.length > 0) {
            displayRandomAroma();
        }
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
        document.getElementById('oil-name').textContent = 'データの読み込みに失敗しました';
        document.getElementById('description').textContent = 'aroma_list.jsonファイルを確認してください。';
    }
}

function displayRandomAroma() {
    if (!aromaData) return;
    
    const categories = Object.keys(aromaData).filter(key => key !== '注意事項');
    
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const selectedCategory = categories[randomCategoryIndex];
    
    const oilsInCategory = aromaData[selectedCategory];
    const randomOilIndex = Math.floor(Math.random() * oilsInCategory.length);
    const selectedOil = oilsInCategory[randomOilIndex];
    
    document.getElementById('category').textContent = selectedCategory;
    document.getElementById('oil-name').textContent = selectedOil.オイル名;
    document.getElementById('description').textContent = selectedOil.解説;
    
    document.body.className = '';
    
    const bgClass = categoryBackgrounds[selectedCategory];
    if (bgClass) {
        document.body.classList.add(bgClass);
    }
    
    const card = document.querySelector('.aroma-card');
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

document.addEventListener('DOMContentLoaded', () => {
    loadAromaData();
    
    const changeButton = document.getElementById('change-btn');
    changeButton.addEventListener('click', displayRandomAroma);
});
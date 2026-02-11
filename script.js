// Update ratio value display
const ratioSlider = document.getElementById('boldRatio');
const ratioValue = document.getElementById('ratioValue');

ratioSlider.addEventListener('input', (e) => {
    ratioValue.textContent = e.target.value + '%';
});

function convertText() {
    const input = document.getElementById('inputText').value;
    const output = document.getElementById('output');
    const boldRatio = parseInt(document.getElementById('boldRatio').value) / 100;

    if (!input.trim()) {
        output.innerHTML = '<span style="color: #999;">Please enter some text first...</span>';
        return;
    }

    const converted = input.split(/\s+/).map(word => {
        if (word.length === 0) return word;
        
        // Calculate how many letters to bold
        const boldLength = Math.max(1, Math.ceil(word.length * boldRatio));
        
        // Split the word into bold and regular parts
        const boldPart = word.slice(0, boldLength);
        const regularPart = word.slice(boldLength);
        
        return `<span class="bionic">${boldPart}</span>${regularPart}`;
    }).join(' ');

    output.innerHTML = converted;
}

function copyOutput() {
    const output = document.getElementById('output');
    const text = output.innerText;
    
    if (!text || text.includes('appear here')) {
        alert('Nothing to copy yet. Convert some text first!');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        const originalBg = output.style.background;
        output.style.background = '#d4edda';
        setTimeout(() => {
            output.style.background = originalBg;
        }, 500);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

// Allow Enter key to convert
document.getElementById('inputText').addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        convertText();
    }
});
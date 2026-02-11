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

    // Split by lines first to preserve line breaks
    const lines = input.split('\n');
    
    const converted = lines.map(line => {
        if (line.trim() === '') {
            // Preserve empty lines
            return '';
        }
        
        // Process words in each line
        return line.split(/\s+/).map(word => {
            if (word.length === 0) return word;
            
            // Calculate how many letters to bold
            const boldLength = Math.max(1, Math.ceil(word.length * boldRatio));
            
            // Split the word into bold and regular parts
            const boldPart = word.slice(0, boldLength);
            const regularPart = word.slice(boldLength);
            
            return `<span class="bionic">${boldPart}</span>${regularPart}`;
        }).join(' ');
    }).join('\n');

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
        output.style.background = document.body.classList.contains('focus-mode') ? '#2a4a2a' : '#d4edda';
        setTimeout(() => {
            output.style.background = originalBg;
        }, 500);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

function toggleFocusMode() {
    document.body.classList.toggle('focus-mode');
    const btn = event.target;
    btn.textContent = document.body.classList.contains('focus-mode') ? 'Exit Focus' : 'Focus Mode';
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to convert
    if (e.ctrlKey && e.key === 'Enter') {
        convertText();
    }
    
    // F key to toggle focus mode (when not typing in textarea)
    if (e.key === 'f' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        toggleFocusMode();
    }
});

// Allow Enter key in textarea to convert
document.getElementById('inputText').addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        convertText();
    }
});
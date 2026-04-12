document.addEventListener('DOMContentLoaded', () => {
    // Dedent prompt boxes dynamically
    document.querySelectorAll('.prompt-box').forEach(box => {
        const lines = box.textContent.split('\n');
        let minIndent = null;
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().length === 0) continue;
            const indent = line.match(/^\s*/)[0].length;
            if (minIndent === null || indent < minIndent) {
                minIndent = indent;
            }
        }
        if (minIndent !== null && minIndent > 0) {
            box.textContent = lines.map((line, i) => {
                if (i === 0) return line;
                return line.startsWith(' '.repeat(minIndent)) ? line.substring(minIndent) : line;
            }).join('\n').trim();
        }
    });
    // Image formatting and modal functionality
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    const modalImg = document.createElement('img');
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    document.querySelectorAll('.article-content img').forEach(img => {
        // Enforce the same dimensions for all embedded images
        img.classList.add('article-image');
        
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImg.src = img.src;
            modal.classList.add('active');
        });
    });
});

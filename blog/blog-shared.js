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
});

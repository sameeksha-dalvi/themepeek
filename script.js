
const copyPromptBtn = document.querySelector('#copy-prompt-btn');

copyPromptBtn.addEventListener('click', function () {

    const copyText = document.querySelector('#prompt-txt');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    copyPromptBtn.textContent = "Copied ✓";

    setTimeout(() => {
        copyPromptBtn.textContent = "Copy Prompt";
    }, 2000);

});


const previewThemeBtn = document.querySelector('#load-theme-btn');

previewThemeBtn.addEventListener('click', function () {

    const requiredKeys = [
        'background',
        'hero gradient start',
        'hero gradient end',
        'headings',
        'subtext',
        'primary buttons',
        'cards / section bg',
        'cards section background',
        'cta background',
        'footer bg',
        'footer text'
    ];

    const themeText = document.querySelector('#theme-txt').value.trim();

    const eachLine = themeText.split('\n');

    const trimEachLine = eachLine.map(function (line) {
        return line.trim();
    });

    let errors = [];

    for (let i = 0; i < trimEachLine.length; i++) {
        let line = trimEachLine[i];

        if (line.indexOf(':') === -1) {
            errors.push('Invalid line format: "' + line + '"');
            continue;
        }

        let parts = line.split(':');
        let key = parts[0].trim().toLowerCase();
        let value = parts[1].trim();

        let keyFound = false;

        for (let j = 0; j < requiredKeys.length; j++) {
            if (requiredKeys[j] === key) {
                keyFound = true;
                break;
            }
        }

        if (!keyFound) {
            errors.push('Unexpected key: "' + parts[0] + '"');
        }

        let hexRegex = /^#([0-9A-Fa-f]{6})$/;

        if (!hexRegex.test(value)) {
            errors.push('Invalid color value for "' + parts[0] + '"');
        }
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    //alert('Theme format is valid!');

    const keyToVarMap = {
        'background': '--preview-background',
        'hero gradient start': '--preview-hero-gradient-start',
        'hero gradient end': '--preview-hero-gradient-end',
        'headings': '--preview-heading',
        'subtext': '--preview-subtext',
        'primary buttons': '--preview-primary-btn',
        'cards / section bg': '--preview-card-bg',
        'cards section background': '--preview-cards-section-bg',
        'cta background': '--preview-cta-bg',
        'footer bg': '--preview-footer-bg',
        'footer text': '--preview-footer-text'
    };


    for (let i = 0; i < trimEachLine.length; i++) {
        let line = trimEachLine[i];
        let parts = line.split(':');
        let key = parts[0].trim().toLowerCase();
        let value = parts[1].trim();

        if (keyToVarMap[key]) {
            document.documentElement.style.setProperty(keyToVarMap[key], value);
        }
    }
});
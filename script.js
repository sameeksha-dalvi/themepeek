
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
const themeData = document.querySelector('#theme-txt');

function showError() {
    themeData.classList.add('error-shake');

    const originalPlaceholder = themeData.placeholder;
    themeData.value = '';
    themeData.placeholder = "Error: Paste theme in correct format!";

    setTimeout(() => {
        themeData.classList.remove('error-shake');
        themeData.placeholder = originalPlaceholder;
    }, 1000);
}


previewThemeBtn.addEventListener('click', function () {

    let currentState = previewThemeBtn.textContent.toLowerCase();

    console.log(currentState);


    if (currentState == 'preview theme') {
        const themeText = themeData.value.trim();
        if (!themeText) {
            showError();
            return;
        }
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



        const eachLine = themeText.split('\n');

        const trimEachLine = eachLine.map(function (line) {
            return line.trim();
        });

        let foundKeys = [];
        let hexRegex = /^#([0-9A-Fa-f]{6})$/;

        for (let i = 0; i < eachLine.length; i++) {
            let line = eachLine[i].trim();

            if (line === '') {
                continue;
            }

            if (line.indexOf(':') === -1) {
                showError();
                return;
            }

            let parts = line.split(':');
            let key = parts[0].trim().toLowerCase();
            let value = parts[1].trim();

            let keyIsValid = false;
            for (let j = 0; j < requiredKeys.length; j++) {
                if (requiredKeys[j] === key) {
                    keyIsValid = true;
                    break;
                }
            }

            if (!keyIsValid) {
                showError();
                return;
            }

            for (let k = 0; k < foundKeys.length; k++) {
                if (foundKeys[k] === key) {
                    showError();
                    return;
                }
            }

            if (!hexRegex.test(value)) {
                showError();
                return;
            }

            foundKeys.push(key);
        }

        if (foundKeys.length !== requiredKeys.length) {
            showError();
            return;
        }
    

        previewThemeBtn.textContent = "Reset";

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

    }

    if (currentState == 'reset') {

        themeData.value = '';
        previewThemeBtn.textContent = "Preview Theme";
        resetTheme();
    }



});


function resetTheme() {

    const root = document.documentElement;
    root.style.removeProperty('--preview-background');
    root.style.removeProperty('--preview-hero-gradient-start');
    root.style.removeProperty('--preview-hero-gradient-end');
    root.style.removeProperty('--preview-heading');
    root.style.removeProperty('--preview-subtext');
    root.style.removeProperty('--preview-primary-btn');
    root.style.removeProperty('--preview-card-bg');
    root.style.removeProperty('--preview-cards-section-bg');
    root.style.removeProperty('--preview-cta-bg');
    root.style.removeProperty('--preview-card-border');
    root.style.removeProperty('--preview-footer-bg');
    root.style.removeProperty('--preview-footer-text');

}
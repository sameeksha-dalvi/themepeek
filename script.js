
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

    const themeText = document.querySelector('#theme-txt').value.trim();

    const eachLine = themeText.split('\n');

    const trimEachLine = eachLine.map(function (line) {
        return line.trim();
    });
});
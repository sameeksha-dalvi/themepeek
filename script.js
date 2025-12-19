
const copyPromptBtn = document.querySelector('#copy-prompt-btn');

copyPromptBtn.addEventListener('click', function () {

    const copyText = document.querySelector('#prompt-txt');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    copyPromptBtn.textContent = "Copied ✓";

    setTimeout(() => {
        copyPromptBtn.textContent = "Copy prompt";
    }, 2000);

});
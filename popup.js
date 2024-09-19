document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        if (tabs.length > 0) {
            const tab = tabs[0];
            document.getElementById('urlInput').value = tab.url;
        } else {
            document.getElementById('message').innerText = 'No active tab found.';
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Error retrieving active tab: ' + error;
    }
});

document.getElementById('submitUrl').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    archiveUrl(url);
});

function archiveUrl(url) {
    if (!url) {
        document.getElementById('message').innerText = 'Please enter a valid URL.';
        document.getElementById('archivedLink').innerText = '';
        return;
    }

    browser.runtime.sendMessage({ action: "archiveUrl", url: url }).then(response => {
        if (response.success) {
            document.getElementById('message').innerText = 'Archiving in progress...';
            document.getElementById('archivedLink').innerText = '';
        } else {
            document.getElementById('message').innerText = response.message;
            document.getElementById('archivedLink').innerText = '';
        }
    }).catch(error => {
        document.getElementById('message').innerText = 'Error: ' + error;
    });
}

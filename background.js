// background.js

chrome.action.onClicked.addListener(async (tab) => {
  console.log('Extension button clicked');

  try {
    // Capture the screenshot
    const dataUrl = await new Promise((resolve, reject) => {
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(dataUrl);
      });
    });

    console.log('Screenshot captured');

    // Generate a filename with a timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshot_${timestamp}.png`;

    console.log('Initiating download');

    // Use the data URL directly in the download API
    chrome.downloads.download(
      {
        url: dataUrl,
        filename: filename,
        saveAs: false, // Saves automatically without prompting
      },
      function (downloadId) {
        if (chrome.runtime.lastError) {
          console.error('Download failed:', chrome.runtime.lastError);
        } else {
          console.log('Download initiated, ID:', downloadId);
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
  }
});


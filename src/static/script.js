'use strict';
const button = document.getElementById('download-screen-button');

const deleteBlobUrl = (downloadUrl) => {
    setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
    });
};

button.addEventListener('click', () => {
    fetch('/download/img/screen.png')
        .then((res) => {
            console.log({ res });
            return res.blob();
        })
        .then((responseBlob) => {
            const downloadLink = document.createElement('a');
            const blob = new Blob([responseBlob], { type: 'image/png' });
            const downloadUrl = window.URL.createObjectURL(blob);

            if (typeof downloadLink.download === 'undefined') {
                window.open(downloadUrl, '_blank', '');
                deleteBlobUrl(downloadUrl);
                return;
            }

            downloadLink.href = downloadUrl;
            downloadLink.download = 'screen'; // имя файла
            downloadLink.click();
            deleteBlobUrl(downloadUrl);
        });
});

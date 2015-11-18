(function(){Template.fileView.rendered = function () {

var url = '/helloworld.pdf'; //the file is in the public directory

/* In your Template.xxx.rendered */
// Set worker URL to package assets
PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
// Create PDF
PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
    // Fetch the first page
    pdf.getPage(1).then(function getPageHelloWorld(page) {
        var scale = 1;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('pdfcanvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        page.render({canvasContext: context, viewport: viewport}).promise.then(function () {

        });
    });
});

}

})();

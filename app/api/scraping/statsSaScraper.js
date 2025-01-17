import { getDocument } from "pdfjs-dist";
// Function to extract text from a PDF
const statsSaScraper = async (url) => {
  try {
    // Fetch the PDF
    const loadingTask = getDocument(url);
    const pdfDocument = await loadingTask.promise;

    let fullText = "";

    // Loop through all pages
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      try {
        const page = await pdfDocument.getPage(pageNum);
        const content = await page.getTextContent();

        // Extract text content
        const pageText = content.items.map((item) => item.str).join(" ");
        fullText += `Page ${pageNum}:\n${pageText}\n\n`;
      } catch (pageError) {
        console.error(`Error processing page ${pageNum}:`, pageError);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
};

export default statsSaScraper;

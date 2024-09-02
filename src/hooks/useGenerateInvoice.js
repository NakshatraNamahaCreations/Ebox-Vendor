// hooks/useGenerateInvoice.js
import {useCallback} from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import NumberToWord from '../component/order/NumberToWord'; // Import or define NumberToWord function
import {generateHtmlContent} from '../utilities/pdfUtils';
import RNFS from 'react-native-fs';

export const useGenerateInvoice = () => {
  const generatePdf = async (
    order,
    vendorData,
    invoiceNumber,
    sellerAddress,
    taxes,
    finalAmountWithIncludingTax,
    NumberToWord,
  ) => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/Invoice.pdf`; // or use another directory
      console.log('Path for PDF:', path);
      const pdfContent = generateHtmlContent(
        order,
        vendorData,
        invoiceNumber,
        sellerAddress,
        taxes,
        finalAmountWithIncludingTax,
        NumberToWord,
      );

      const options = {
        html: pdfContent,
        fileName: 'Invoice',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF generated at:', file.filePath);

      return file.filePath;
      // Example function to create PDF
      //   await RNFS.writeFile(path, pdfContent, 'utf8');

      // Return the path if the PDF was created successfully
      return path;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return undefined; // Return undefined if an error occurs
    }
  };

  //   const generatePdf = useCallback(
  //     async (
  //       order,
  //       vendorData,
  //       invoiceNumber,
  //       sellerAddress,
  //       taxes,
  //       finalAmountWithIncludingTax,
  //     ) => {
  //       const html = generateHtmlContent(
  //         order,
  //         vendorData,
  //         invoiceNumber,
  //         sellerAddress,
  //         taxes,
  //         finalAmountWithIncludingTax,
  //       );
  //       try {
  //         const options = {
  //           html,
  //           fileName: 'Invoice',
  //           directory: 'Documents',
  //         };
  //         const file = await RNHTMLtoPDF.convert(options);
  //         console.log('PDF File:', file.filePath);
  //       } catch (error) {
  //         console.error('Error generating PDF:', error);
  //       }
  //     },
  //     [],
  //   );

  return {generatePdf};
};

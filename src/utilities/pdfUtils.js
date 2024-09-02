// utils/pdfUtils.js
import moment from 'moment';
import NumberToWord from '../component/order/NumberToWord'; // Import or define NumberToWord function

export const generateHtmlContent = (
  order,
  vendorData,
  invoiceNumber,
  sellerAddress,
  taxes,
  finalAmountWithIncludingTax,
  NumberToWord,
) => {
  console.log('NumberToWord', NumberToWord);
  const numbersToWords = {
    0: 'Zero',
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
    13: 'Thirteen',
    14: 'Fourteen',
    15: 'Fifteen',
    16: 'Sixteen',
    17: 'Seventeen',
    18: 'Eighteen',
    19: 'Nineteen',
    20: 'Twenty',
    30: 'Thirty',
    40: 'Forty',
    50: 'Fifty',
    60: 'Sixty',
    70: 'Seventy',
    80: 'Eighty',
    90: 'Ninety',
  };

  // Define the convertNumberToWords function
  function convertNumberToWords(number) {
    if (number < 1000 && number in numbersToWords)
      return numbersToWords[number];

    let words = '';
    let integerPart = Math.floor(number);
    let decimalPart = Math.round((number - integerPart) * 100);

    if (integerPart >= 1000) {
      words +=
        convertNumberToWords(Math.floor(integerPart / 1000)) + ' thousand';
      integerPart %= 1000;
    }

    if (integerPart >= 100) {
      words +=
        (words ? ' ' : '') +
        convertNumberToWords(Math.floor(integerPart / 100)) +
        ' hundred';
      integerPart %= 100;
    }

    if (integerPart > 0) {
      if (words !== '') words += ' and ';
      if (integerPart < 20) words += numbersToWords[integerPart];
      else {
        words += numbersToWords[Math.floor(integerPart / 10) * 10];
        if (integerPart % 10 > 0) {
          words += '-' + numbersToWords[integerPart % 10];
        }
      }
    }

    if (decimalPart > 0) {
      words += ` and ${convertNumberToWords(decimalPart)} paise`;
    }

    return words;
  }

  const convertedWord = convertNumberToWords(
    finalAmountWithIncludingTax?.toFixed(),
  );
  console.log(convertedWord);
  return `
    <html>
    <head>
      <style>
        body { font-family: 'Montserrat'}
         .tax-invoice {
        // border: black 1px solid;
        margin: 10px;
        // border-color: black;
        padding: 10px;
        // margin-top
      }
      .header {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
      .order-section-date {
        display: flex;
        justify-content: space-between;
        margin: 20px 0px 8px 0px;
      }
      .invoice-date-section {
        display: flex;
        justify-content: space-between;
      }
      .address-section {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
      .shipping-address-section {
        display: flex;
        justify-content: end;
        margin-top: 20px;
      }
      .show-table {
        margin: 20px 0px;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
      }
      .table th,
      .table td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
      .table th {
        background-color: #cacaca;
      } 
      </style>
    </head>
    <body> 
      <div class="tax-invoice">
      <div class="p-10">
        <div>
          <div class="header">
            <div>
              <div style="font-size: 20px; color: black; font-weight: bold">
                EVENT BOX
              </div>
            </div>
            <div>
              <div
                style="
                  font-size: 15px;
                  color: black;
                  font-weight: bold;
                  text-align: end;
                ">
                Tax Invoice
              </div>
              <div style="font-size: 15px; color: black; text-align: end">
                (Original for Recipient)
              </div>
            </div>
          </div>
          <div class="order-section-date">
            <div class="col-6">
              <div style="font-size: 15px; color: black; font-weight: 600">
                Order ID
              </div>
              <div style="font-size: 15px; color: black">
                 ${order.order_id}
              </div>
            </div>
            <div class="col-6">
              <div
                style="
                  font-size: 15px;
                  color: black;
                  font-weight: 600;
                  text-align: end;
                ">
                Order Date
              </div>
              <div style="font-size: 15px; color: black; text-align: end">
              ${moment(order.ordered_date).format('DD-MM-YYYY')}
              </div>
            </div>
          </div>
          <div class="invoice-date-section">
            <div class="col-6">
              <div style="font-size: 15px; color: black; font-weight: 600">
                Invoice ID
              </div>
              <div style="font-size: 15px; color: black">EB-${invoiceNumber.toUpperCase()}2</div>
            </div>
            <div class="col-6">
              <div
                style="
                  font-size: 15px;
                  color: black;
                  font-weight: 600;
                  text-align: end;
                ">
                Invoice Date
              </div>
              <div style="font-size: 15px; color: black; text-align: end">
              ${moment(order.ordered_date).format('DD-MM-YYYY')}
              </div>
            </div>
          </div>
          <div class="address-section">
            <div class="col-6">
              <div style="font-size: 15px; color: black; font-weight: 600">
                Sold By :
              </div>
              <div style="font-size: 15px; color: black"> ${order.store_or_seller.toUpperCase()}</div>
              <div style="font-size: 15px; color: black">
              ${sellerAddress.address[0]?.houseFlatBlock}, ${
    sellerAddress.address[0]?.roadArea
  }
              </div>
              <div style="font-size: 15px; color: black"> ${
                sellerAddress.address[0]?.cityDownVillage
              }, ${sellerAddress.address[0]?.distric}, ${
    sellerAddress.address[0]?.state
  } - ${sellerAddress.address[0]?.pincode}</div>
           <div>  GST: ${sellerAddress?.gst_number} </div>   
            </div>
            <div class="col-6">
              <div
                style="
                  font-size: 15px;
                  color: black;
                  font-weight: 600;
                  text-align: end;
                ">
                Billing Address :
              </div>
              <div style="font-size: 15px; color: black; text-align: end">
                ${vendorData.address[0]?.fullName}
              </div>
              <div style="font-size: 15px; color: black; text-align: end">
              ${vendorData.address[0]?.houseFlatBlock}, ${
    vendorData.address[0]?.roadArea
  }
              </div>
               
              <div style="font-size: 15px; color: black; text-align: end">
              ${vendorData.address[0]?.cityDownVillage}, ${
    vendorData.address[0]?.distric
  }, ${vendorData.address[0]?.state} - ${vendorData.address[0]?.pincode}
              </div>
            </div>
          </div>
          <div class="shipping-address-section">
            <div class="col-6">
              <div
                style="
                  font-size: 15px;
                  color: black;
                  font-weight: 600;
                  text-align: end;
                ">
                Shipping Address :
              </div>
                 <div style="font-size: 15px; color: black; text-align: end">
                ${vendorData.address[0]?.fullName}
              </div>
              <div style="font-size: 15px; color: black; text-align: end">
              ${vendorData.address[0]?.houseFlatBlock}, ${
    vendorData.address[0]?.roadArea
  }
              </div>
               
              <div style="font-size: 15px; color: black; text-align: end">
              ${vendorData.address[0]?.cityDownVillage}, ${
    vendorData.address[0]?.distric
  }, ${vendorData.address[0]?.state} - ${vendorData.address[0]?.pincode}
              </div>
            </div>
          </div>
          <div class="show-table">
            <table class="table">
              <thead>
                <tr>
                  <th style="text-align: center">Product</th>
                  <th style="text-align: center">Qty</th>
                  <th style="text-align: center">Unit Price</th>
                  <th style="text-align: center">Tax</th>
                  <th style="text-align: center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> ${order.product_name} </td>
                  <td style="text-align: center">${order.applied_quantity} </td>
                  <td style="text-align: center">₹${order.product_price}</td>
                  <td style="text-align: center">
                    CGST (9%):₹${taxes?.cgst.toFixed(
                      2,
                    )}<br />SGST (9%):₹${taxes?.sgst.toFixed(2)}
                  </td>
                  <td style="text-align: center">₹${finalAmountWithIncludingTax?.toFixed(
                    2,
                  )}</td>
                </tr>
              </tbody>
            </table>
            <div
              style="
                text-align: end;
                margin-top: 1px;
                border-bottom: 1px solid black;
                border-right: 1px solid black;
                border-left: 1px solid black;
                padding: 10px;
              ">
              <b> TOTAL: ₹${finalAmountWithIncludingTax.toFixed(2)}</b>
              <div>All values are in INR</div>
            </div>
            <div
              style="
                text-align: start;
                margin-top: 1px;
                border-bottom: 1px solid black;
                border-right: 1px solid black;
                border-left: 1px solid black;
                padding: 10px;
              ">
              <b> Amount in Words:</b>
              <br />
              <b>${convertedWord}</b>
            </div>
            <div style="text-align: start; margin: 10px 0px">
              <b> Declaration</b>
              <br />
              <div>
                The goods sold are intended for end user consumption and not for
                resale
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </body>
    </html>
  `;
};

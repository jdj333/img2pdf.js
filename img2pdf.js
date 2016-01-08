// Author James Jenkins
function htmlpdfgen(elements) {
		var pdfData = "data:application/pdf;base64,";
		var creationDate = new Date();
		//canvas width & height
		var pdfWidth = "612.00";
		var pdfHeight = "792.00";
		//compatibility version
		var pdfVersion = '1.3';
		var pdfScript = "%PDF-"+pdfVersion +"\r\n";
		var headerUrl = "https://www.example.org";
		var pageCount = 1;
		var objectNum = 3;

		pdfScript +=
		"3 0 obj\r\n" + //object 3
		"<</Type /Page\r\n" +
		"/Parent 1 0 R\r\n" +
		"/Resources 2 0 R\r\n" +
		"/MediaBox [0 0 612.00 792.00]\r\n" +
		"/Contents 4 0 R\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"4 0 obj\r\n" +
		"<</Length 150>>\r\n" +
		"stream\r\n" +
		"0.20 w\r\n" +
		"0 G\r\n" +
		"q\r\n" +
		"q BT 0 g 40.00 725.50 Td\r\n" +
		"0 -29.70 Td\r\n" +
		"0.400 0.400 0.400 rg\r\n" +
		"/F1 24.75 Tf (PDF Image Example) Tj\r\n" +
		"ET Q\r\n" +
		"q 400.00 0 0 200.00 40.00 425.55 cm /I0 Do Q\r\n" +
		"Q\r\n" +
		"endstream\r\n" +
		"endobj\r\n" +
		"1 0 obj\r\n" +
		"<</Type /Pages\r\n" +
		"/Kids [3 0 R ]\r\n" +
		"/Count 1\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"5 0 obj\r\n" +
		"<</BaseFont/Helvetica/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"6 0 obj\r\n" +
		"<</BaseFont/Helvetica-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"7 0 obj\r\n" +
		"<</BaseFont/Helvetica-Oblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"8 0 obj\r\n" +
		"<</BaseFont/Helvetica-BoldOblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"9 0 obj\r\n" +
		"<</BaseFont/Courier/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"10 0 obj\r\n" +
		"<</BaseFont/Courier-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"11 0 obj\r\n" +
		"<</BaseFont/Courier-Oblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"12 0 obj\r\n" +
		"<</BaseFont/Courier-BoldOblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"13 0 obj\r\n" +
		"<</BaseFont/Times-Roman/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"14 0 obj\r\n" +
		"<</BaseFont/Times-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"15 0 obj\r\n" +
		"<</BaseFont/Times-Italic/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"16 0 obj\r\n" +
		"<</BaseFont/Times-BoldItalic/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"17 0 obj\r\n" +
		"<</Type /XObject\r\n" +
		"/Subtype /Image\r\n";

		for (var i = 0; i < elements.length; i++) {
			tagName = elements[i].tagName;
			if(tagName === "IMG"){
				var img = elements[i];
				var canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height =  img.height;
				var context = canvas.getContext('2d');
				context.drawImage(img, 0, 0 );

				pdfScript +=
				"/Width "+canvas.width+"\r\n" +
				"/Height "+canvas.height+"\r\n" +
				"/ColorSpace /DeviceRGB\r\n" +
				"/BitsPerComponent 8\r\n" +
				"/Filter /DCTDecode\r\n";

				function b64_to_utf8( str ) {
				    str = str.replace(/\s/g, '');
				    return decodeURIComponent(encodeURIComponent(window.atob(str)));
				}

				var dataURL = canvas.toDataURL("image/jpeg", 1.0).replace("data:image/jpeg;base64,","");
				var utf8ImgData = b64_to_utf8(dataURL);

				pdfScript +=
				"/Length 30994>>\r\n" +
				"stream\r\n" +
				utf8ImgData +
        "\r\n"
				;
			}
		}

pdfScript +=
		"endstream\r\n" +
		"endobj\r\n" +
		"2 0 obj\r\n" +
		"<<\r\n" +
		"/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]\r\n" +
		"/Font <<\r\n" +
		"/F1 5 0 R\r\n" +
		"/F2 6 0 R\r\n" +
		"/F3 7 0 R\r\n" +
		"/F4 8 0 R\r\n" +
		"/F5 9 0 R\r\n" +
		"/F6 10 0 R\r\n" +
		"/F7 11 0 R\r\n" +
		"/F8 12 0 R\r\n" +
		"/F9 13 0 R\r\n" +
		"/F10 14 0 R\r\n" +
		"/F11 15 0 R\r\n" +
		"/F12 16 0 R\r\n" +
		">>\r\n" +
		"/XObject <<\r\n" +
		"/I0 17 0 R\r\n" +
		">>\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"18 0 obj\r\n" +
		"<<\r\n" +
		"/Producer (james)\r\n" +
		"/CreationDate (D:20160105102838-07'00')\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"19 0 obj\r\n" +
		"<<\r\n" +
		"/Type /Catalog\r\n" +
		"/Pages 1 0 R\r\n" +
		"/OpenAction [3 0 R /FitH null]\r\n" +
		"/PageLayout /OneColumn\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"xref\r\n" +
		"0 20\r\n" +
		"0000000000 65535 f\r\n" +
		"0000000317 00000 n\r\n" +
		"0000032678 00000 n\r\n" +
		"0000000009 00000 n\r\n" +
		"0000000118 00000 n\r\n" +
		"0000000374 00000 n\r\n" +
		"0000000464 00000 n\r\n" +
		"0000000559 00000 n\r\n" +
		"0000000657 00000 n\r\n" +
		"0000000759 00000 n\r\n" +
		"0000000847 00000 n\r\n" +
		"0000000941 00000 n\r\n" +
		"0000001038 00000 n\r\n" +
		"0000001139 00000 n\r\n" +
		"0000001232 00000 n\r\n" +
		"0000001324 00000 n\r\n" +
		"0000001418 00000 n\r\n" +
		"0000001516 00000 n\r\n" +
		"0000033913 00000 n\r\n" +
		"0000034032 00000 n\r\n" +
		"trailer\r\n" +
		"<<\r\n" +
		"/Size 20\r\n" +
		"/Root 19 0 R\r\n" +
		"/Info 18 0 R\r\n" +
		">>\r\n" +
		"startxref\r\n" +
		"37136\r\n" +
		"%%EOF";

		pdfData += btoa(pdfScript);
		window.open(pdfData,"_blank");
};

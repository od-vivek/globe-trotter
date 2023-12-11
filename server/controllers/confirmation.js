const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const sendConfirmationEmail = async (req, res) => {
    try {
        // Extract user details, package details, and form details from the request body
        const { userDetails, packageDetails, formDetails } = req.body;

        // Generate PDF content
        const pdfContent = `Thank you for booking with us!\n\nTotal Amount: $${formDetails.totalAmount}\n We shall keep you informed about your trip in the coming days ! \n Travel Safe!`;

        // Create a PDF document
        const pdfDoc = new PDFDocument();
        pdfDoc.text(pdfContent);

        // Save the PDF to a file (you can customize the file path)
        const pdfFilePath = './confirmation.pdf';
        pdfDoc.pipe(fs.createWriteStream(pdfFilePath));
        pdfDoc.end();

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'globetrotter.iiitsproject@gmail.com',
                pass: 'nfjjzfkrhgnqvfwy',
            },
        });

        // Send email with the PDF attachment
        const mailOptions = {
            from: 'globetrotter.iiitsproject@gmail.com',
            to: userDetails.email,
            subject: 'Booking Confirmation',
            text: 'Thank you for booking with us!',
            attachments: [
                {
                    filename: 'confirmation.pdf',
                    content: fs.createReadStream(pdfFilePath),
                },
            ],
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).json({ error: 'Error sending confirmation email' });
    }
};

module.exports = { sendConfirmationEmail };

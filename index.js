require('dotenv').config();
require('colors');
const express=require('express');
const app = express();
const port=process.env.PORT;
const nodemailer=require('nodemailer');
const Email=require('email-templates');
app.get('/',(req,res)=>{
    res.status(200)
    .send('This is your homepage.').end();
});
app.listen(port,()=>console.log(`Listening on port: ${port}`.underline.white));

//Sending an email has never been so simple.
//We're going to use nodemailer which is an email sending library for Nodejs

//step 1 is to setup the transport layer
const transporter=nodemailer.createTransport({
    host: process.env.AWS_SES_HostName,
    port: process.env.AWS_SES_Port,
    auth: {
      user: process.env.AWS_SES_SMTP_UserName,
      pass: process.env.AWS_SES_SMTP_Password
    }
  });

//step 2 is to set up mail options
let mailOptions={
from:"abhishek@bhilware.xyz",
to:"asb2468@gmail.com",
subject:"Test email from Nodemail and SES",
text:'Text for the email body goes here.'
};
/*
//step 3 is to setup mail function
transporter.sendMail(mailOptions,function(err,data){
    if(err){
        console.log(`something broker. Check error:${err}`)
    }else{
        console.log(`Mail was sent successfully!`)
    }
});
*/

//We will try to make an Email template from email-templates library
//this will help us send HTML emails that are really cute

//start with creating an object from Email class. 

const email = new Email({
    message: {
      from: process.env.Default_Email_sender
    },
    send:true,
    transport:transporter
  });
   
  email
    .send({
      template: 'mars',
      message: {
        to: "abhishek.singh@iiml.org",
        attachments: [
            {   
                filename: 'cure-Image',
                path: 'https://abhishek-images.s3.amazonaws.com/sp_orig.jpg'
            }
          ]
      },
      locals: {
        name: 'Simba'
      }
    })
    .then(console.log)
    .catch(console.error);
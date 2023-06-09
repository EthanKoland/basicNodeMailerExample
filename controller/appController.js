
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

require('dotenv').config()


const signup =  async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    let message = {
        from : "Fred Foo",
        to : "bar.@example.com",
        subject : "hello",
        text : "hello world",
        html : "<b>hello world</b>"

    }

    transporter.sendMail(message ). then((info) => {
        res.status(201).json({
            "msg" : "email send sucessfully",
            "info" : info.messageId,
            "preview" : nodemailer.getTestMessageUrl(info)
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            err
        })
    })
    
}

const getBill = (req, res) => {

    console.log(process.env.EMAIL)
    console.log(process.env.PASSWORD)

    let config = {
        "service" : "gmail",
        "auth" : {
            "user" : process.env.EMAIL,
            "pass" : process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let mailGenerator = new mailgen({
        theme : "default",
        product : {
            name : "Mailgen",
            link : "https://mailgen.js/"
        }
    })

    let response = {
        body : {
            name : "John Appleseed",
            intro : "Welcome to Mailgen! We're very excited to have you on board.",
            table : {
                data : [
                    {
                        item : "Node.js",
                        description : "Event-driven I/O server-side JavaScript environment based on V8.",
                        price : "$10.99"
                    }
                    //add items with a , seperator
                ]

            },
            outro : "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }

    let mail = mailGenerator.generate(response)

    let message = {
        from : process.env.EMAIL,
        to : "pcw21qbu@uea.ac.uk",
        subject : "hello",
        html : mail
    }

    transporter.sendMail(message).then((info) => {
        return res.status(201).json({
            "msg" : "email send sucessfully"
        })
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({
            err
        })
    })

    // res.status(201).json("get bill sucessfully")
}

module.exports = {
    signup,
    getBill
}
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { generateCode } = require('../utils/utils');

let transport = nodemailer.createTransport({
  host: 'smtp.163.com', // 第三方邮箱的主机地址
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'pxotlook@163.com', // 发送方邮箱的账号
    pass: 'ZGARXOMIHXCLTVYC', // 邮箱授权密码
  },
});

function sendMail(email, code) {
  return new Promise((resolve, reject) => {
    const mailContent = {
      from: `pxotlook@163.com`, // 发件人
      subject: '验证码', //邮箱主题
      to: email,
      // 邮件内容，用html格式编写
      html: `
            <p>您好！</p>
            <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
            <p>如果不是您本人操作，请无视此邮件!</p>
            <p>该验证码10分钟内有效</p>
        `,
    };
    transport.sendMail(mailContent, (err, info) => {
      if (!err) {
        resolve({ status: 200, msg: '验证码发送成功' });
      } else {
        reject({ status: 500, msg: '验证码发送失败，请稍后重试' });
      }
    });
  });
}

// router.post('/', async (req, res) => {
//   const { email, pwd } = req.body;
//   const code = generateCode();
//   const sendResult = await sendMail(email, code);
//   if (sendResult.status == 200) {
//     const codeExpire = Date.now() + 10 * 60 * 1000; //10分钟有效期
//   }
//   res.send(sendResult);
// });

module.exports = { router, sendMail };

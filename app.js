const express = require('express');
const app = express();
const request = require('request');
const crypto = require('crypto');


// Required Data
var method = 'deliveryorder.create';
var customerId = 'C0000002';
var key = '9452D5A2D1CF2D5A2D1';
const app_key = 27591308;

// we need to pass body as XML
var body = '<?xml version="1.0" encoding="utf-8"?><request> <deliveryOrder><deliveryOrderCode>123456789</deliveryOrderCode> <shopCode>123</shopCode>    <orderType>JYCK</orderType>    <warehouseCode>OTHER</warehouseCode>    <sourcePlatformCode>U</sourcePlatformCode>    <createTime>2018-09-27 02:35:18</createTime>    <placeOrderTime>2018-09-27 02:40:18</placeOrderTime>    <payTime>2018-09-27 02:50:18</payTime>    <payNo>1234</payNo>    <operateTime>2018-09-27 02:50:18</operateTime>    <shopNick>123</shopNick>    <sellerNick>123seller</sellerNick>    <buyerNick>123buy</buyerNick>    <totalAmount>100</totalAmount>    <itemAmount>100</itemAmount>    <logisticsCode>YTO</logisticsCode>    <senderInfo>      <name>seller</name>      <mobile>13012367890</mobile>      <province>SH</province>      <city>SH</city>      <area>xuhui</area>      <detailAddress>xuhui123456</detailAddress>    </senderInfo>    <receiverInfo>      <name>yyy</name>                       <mobile>13012367891</mobile>                    <province>JS</province>                     <city>CA</city>            <area>AA</area>      <detailAddress>XX1234</detailAddress>      <idCard>33332000002101020100</idCard>      <realName>小明</realName>    </receiverInfo>    <payInfo>         <platform>weixin</platform>      <reportPayNo>123567</reportPayNo>     </payInfo>    <buyerMessage>#PayPlatformName:微信支付#</buyerMessage>    <sellerMessage/>  </deliveryOrder>          <orderLines>              <orderLine>      <sourceOrderCode>100125</sourceOrderCode>               <ownerCode>123456789</ownerCode>        <itemCode>311517652150003116</itemCode>         <itemName>经典洗发露</itemName>                 <planQty>1</planQty><actualPrice>185.5</actualPrice></orderLine> </orderLines></request>';

//  we need to create timestamp in this format YYY-MM-DD HH:MM:SS, timestamp must be in this format.
var timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

// we need to create a string to pass to hash function in orer to generate signature
var str = method + timestamp + customerId + body + key;

// A signature generated out of the str
var sign = crypto.createHash('md5').update(str).digest("hex").toUpperCase();


var options = {
    url: 'http://api.xingdian.me/qimenwms/post?app_key='+app_key+'&customerId='+customerId+'&format=xml&method='+method +'&sign_method=md5'+'&timestamp='
        + timestamp +'&sign='+sign+'&ver=2.1',
    method: 'POST',
    headers: {
        'content-type': 'text/xml'
    }
};

options.body = body;

// sending request to the server as POST using request module
request(options, (error, response, data) => {
    console.log(response.statusCode);
    console.log(data);
})

module.exports = app;
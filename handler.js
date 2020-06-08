'use strict';

require('dotenv');

const Mailchimp = require('mailchimp-api-v3');

const API_KEY  = process.env.API_KEY
const LIST_ID  = process.env.LIST_ID;

const subscribe = async email => {
  const mailChimp = new Mailchimp(API_KEY);

  return mailChimp
    .request({
      method: 'post',
      path: '/lists/' + LIST_ID + '/members',
      body: {
        email_address: email,
        status: 'subscribed'
      }
    })
    .then(response => response)
    .catch(error => error);
};

module.exports.subscribe = async event => {
  const body = event.body;
  const request = await subscribe(body.email);
  
  if (request.statusCode === 200) {
    return {
      statusCode: request.statusCode,
      body: JSON.stringify({
        message: 'subscribed'
      })
    };
  } else {
    return {
      statusCode: request.status,
      body: JSON.stringify({
        message: request.title,
      })
    };
  }
};
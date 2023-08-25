const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const responseTime = require('response-time');
const cors = require('cors');
const path = require('path');

const SEVEN_DAYS = 3600 * 24 * 7;

if (!process.env.REDIS_ENDPOINT_URI) throw new Error('ENV REDIS_ENDPOINT_URI is not configured');
if (!process.env.REDIS_PASSWORD) throw new Error('ENV REDIS_PASSWORD is not configured');

async function isNewLink(link_to_lookup, client) {
  // return true if it is a new link
  // return false if it is not a new link

  const value = await client.get(link_to_lookup);
  if (!value) {
    await client.set(link_to_lookup, 'value', 'EX', SEVEN_DAYS);
    return true;
  }

  return false;
}

module.exports = { isNewLink };

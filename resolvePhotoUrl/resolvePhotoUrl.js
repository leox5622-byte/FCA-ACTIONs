"use strict";

const utils = require('../utils');

module.exports = function (defaultFuncs, api, ctx) {
  return function resolvePhotoUrl(photoID, callback) {
    let resolveFunc = function () {};
    let rejectFunc = function () {};
    const returnPromise = new Promise(function (resolve, reject) {
      resolveFunc = resolve;
      rejectFunc = reject;
    });

    if (!callback) {
      callback = function (err, photoUrl) {
        if (err) return rejectFunc(err);
        resolveFunc(photoUrl);
      };
    }

    defaultFuncs
      .get("https://www.facebook.com/messages/media/" + photoID, ctx.jar, {}, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
          "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9"
        }
      })
      .then(function (res) {
        if (res.statusCode === 404) {
          throw new Error("Photo not found. Invalid photo ID: " + photoID);
        }
        const finalUrl = res.request && res.request.uri ? res.request.uri.href || res.request.uri.toString() : null;
        if (finalUrl) {
          return callback(null, finalUrl);
        }
        throw new Error("Could not resolve photo URL.");
      })
      .catch(function (err) {
        utils.error("resolvePhotoUrl", err);
        return callback(err);
      });

    return returnPromise;
  };
};

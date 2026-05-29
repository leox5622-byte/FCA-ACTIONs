"use strict";

const utils = require('../utils');

module.exports = (defaultFuncs, api, ctx) => {
  return async function deleteMessage(messageID, callback) {
    let resolveFunc = () => {};
    let rejectFunc = () => {};
    const returnPromise = new Promise((resolve, reject) => {
      resolveFunc = resolve;
      rejectFunc = reject;
    });

    if (!callback) {
      callback = (err, result) => {
        if (err) return rejectFunc(err);
        resolveFunc(result);
      };
    }

    try {
      const defData = await defaultFuncs.post(
        "https://www.facebook.com/messaging/unsend_message/",
        ctx.jar,
        { message_id: messageID }
      );
      const resData = await utils.parseAndCheckLogin(ctx, defaultFuncs)(defData);

      if (resData && resData.error) {
        throw resData;
      }

      return callback(null, { success: true });
    } catch (err) {
      utils.error("deleteMessage", err);
      callback(err);
    }

    return returnPromise;
  };
};

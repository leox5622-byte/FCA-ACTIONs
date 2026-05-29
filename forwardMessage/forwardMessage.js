"use strict";

const utils = require('../utils');

module.exports = (defaultFuncs, api, ctx) => {
  return async function forwardMessage(messageID, threadIDs, sourceThreadID, callback) {
    let resolveFunc = () => {};
    let rejectFunc = () => {};
    const returnPromise = new Promise((resolve, reject) => {
      resolveFunc = resolve;
      rejectFunc = reject;
    });

    if (typeof sourceThreadID === 'function') {
      callback = sourceThreadID;
      sourceThreadID = null;
    }
    if (!callback) {
      callback = (err, result) => {
        if (err) return rejectFunc(err);
        resolveFunc(result);
      };
    }

    if (!Array.isArray(threadIDs)) {
      threadIDs = [threadIDs];
    }

    try {
      if (sourceThreadID) {
        const msg = await api.getMessage(sourceThreadID, messageID);
        for (const tid of threadIDs) {
          const payload = {};
          if (msg.body) payload.body = msg.body;
          if (msg.attachments && msg.attachments.length > 0) {
            utils.warn("forwardMessage", "Attachments cannot be forwarded via this method");
          }
          if (msg.body) {
            await api.sendMessage(payload, tid);
          }
        }
        callback(null, { success: true, forwardedTo: threadIDs, method: "resend" });
      } else {
        const form = { message_id: messageID };
        threadIDs.forEach(id => {
          form[`recipient_ids[${id}]`] = id;
        });

        const res = await defaultFuncs.post(
          "https://www.facebook.com/ajax/mercury/forward_message.php",
          ctx.jar,
          form
        ).then(utils.parseAndCheckLogin(ctx, defaultFuncs));

        if (res && res.error) {
          throw res;
        }
        callback(null, { success: true, forwardedTo: threadIDs, method: "legacy" });
      }
    } catch (err) {
      utils.error("forwardMessage", err);
      callback(err);
    }

    return returnPromise;
  };
};

"use strict";

module.exports = (defaultFuncs, api, ctx) => {
  return async function getThreadPictures(threadID, offset, limit, callback) {
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

    offset = offset || 0;
    limit = limit || 50;

    try {
      const pictures = [];

      try {
        const threadInfo = await api.getThreadInfo(threadID);
        if (threadInfo && threadInfo.imageSrc) {
          pictures.push({
            type: "current",
            url: threadInfo.imageSrc,
            timestamp: threadInfo.timestamp || null
          });
        }
      } catch (e) {}

      try {
        const history = await api.getThreadHistory(threadID, limit + offset + 100);
        const imageEvents = history.filter(m =>
          m.logMessageType === "log:thread-image" && m.logMessageData?.url
        );
        imageEvents.slice(offset, offset + limit).forEach(ev => {
          pictures.push({
            type: "historical",
            url: ev.logMessageData.url,
            attachmentID: ev.logMessageData.attachmentID,
            width: ev.logMessageData.width,
            height: ev.logMessageData.height,
            timestamp: ev.timestamp
          });
        });
      } catch (e) {}

      callback(null, pictures);
    } catch (err) {
      callback(err);
    }

    return returnPromise;
  };
};

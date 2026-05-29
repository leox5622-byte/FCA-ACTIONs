"use strict";

const utils = require('../utils');

function formatData(data) {
  return {
    userID: utils.formatID(data.uid.toString()),
    photoUrl: data.photo,
    indexRank: data.index_rank,
    name: data.text,
    isVerified: data.is_verified,
    profileUrl: data.path,
    category: data.category,
    score: data.score,
    type: data.type
  };
}

module.exports = (defaultFuncs, api, ctx) => {
  return async function getUID(link, callback) {
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

    if (!link || typeof link !== 'string') {
      const error = { error: "getUID: link parameter must be a non-empty string" };
      utils.error("getUID", error);
      return callback(error);
    }

    // Check if it's a profile URL
    const isProfileUrl = link.match(/\.com/);
    if (!isProfileUrl) {
      // Treat as name, use public search page
      try {
        const searchUrl = "https://www.facebook.com/public/" + encodeURIComponent(link.toLowerCase());
        const res = await defaultFuncs.get(searchUrl, ctx.jar, {}, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9"
          }
        });

        const body = typeof res.body === "string" ? res.body : (res.body ? res.body.toString() : "");

        // Try to find user data in various formats
        // Format 1: JSON data in script tags (__NEXT_DATA__ or __INITIAL_STATE__)
        const jsonMatch = body.match(/<script[^>]*>window\.__INITIAL_STATE__\s*=\s*(\{.+?\});/);
        if (jsonMatch) {
          try {
            const data = JSON.parse(jsonMatch[1]);
            // Navigate to find user entries
            const entries = [];
            const traverse = (obj) => {
              if (obj && obj.id && obj.name && /^\d+$/.test(String(obj.id))) {
                entries.push({
                  uid: obj.id,
                  text: obj.name,
                  photo: obj.profile_picture || obj.photo || obj.picture || "",
                  path: "/profile.php?id=" + obj.id,
                  is_verified: !!obj.is_verified,
                  index_rank: 0,
                  score: 0,
                  category: "user",
                  type: "user"
                });
              }
              for (const key in obj) {
                if (obj[key] && typeof obj[key] === "object") traverse(obj[key]);
              }
            };
            traverse(data);
            if (entries.length > 0) {
              return callback(null, entries.map(formatData));
            }
          } catch (e) {
            // Fall through to regex approach
          }
        }

        // Format 2: Extract from profile links in the page
        const profileMatches = body.matchAll(/href="\/(?:profile\.php\?id=(\d+)|[^"]+?\?__tn__=[^"]*)"[^>]*?>\s*<img[^>]*?alt="([^"]+)"/g);
        const results = [];
        for (const m of profileMatches) {
          const uid = m[1] || m[0].match(/com\/(\d+)/)?.[1] || "";
          const name = m[2] || "";
          if (uid && /^\d+$/.test(uid)) {
            results.push({
              uid,
              text: name,
              photo: "",
              path: "/profile.php?id=" + uid,
              is_verified: false,
              index_rank: 0,
              score: 0,
              category: "user",
              type: "user"
            });
          }
        }

        // Format 3: Extract from structured JSON embedded in the page
        if (results.length === 0) {
          const userMatches = body.match(/"userID":"(\d+)","name":"([^"]+)"/g);
          if (userMatches) {
            for (const m of userMatches) {
              const parts = m.match(/"userID":"(\d+)","name":"([^"]+)"/);
              if (parts) {
                results.push({
                  uid: parts[1],
                  text: parts[2],
                  photo: "",
                  path: "/profile.php?id=" + parts[1],
                  is_verified: false,
                  index_rank: 0,
                  score: 0,
                  category: "user",
                  type: "user"
                });
              }
            }
          }
        }

        if (results.length === 0) {
          utils.warn("getUID", `No user found with name "${link}" on public search`);
        }

        callback(null, results.map(formatData));
      } catch (err) {
        utils.error("getUID", err);
        callback(err);
      }
      return returnPromise;
    }

    // Handle profile URL
    try {
      let uid;
      if (link.includes('profile.php?id=')) {
        uid = link.split('profile.php?id=')[1].split('&')[0];
      } else {
        // For username URLs, fetch the page to get userID
        // But skip parseAndCheckLogin since the response is HTML, not JSON
        let rawRes;
        try {
          rawRes = await defaultFuncs.get(link, ctx.jar);
        } catch (fetchErr) {
          // If the normal get fails, try with browser-like headers
          rawRes = await defaultFuncs.get(link, ctx.jar, {}, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
            }
          });
        }

        const body = typeof rawRes.body === "string" ? rawRes.body : (rawRes.body ? rawRes.body.toString() : "");

        // Extract userID from various patterns in the HTML
        const userIDMatch = body.match(/"userID":"(\d+)"/)
          || body.match(/"id":"(\d+)"/)
          || body.match(/entity_id["\s:]+(\d+)/)
          || body.match(/profile_id["\s:]+(\d+)/)
          || body.match(/fb:\/\/profile\/(\d+)/)
          || body.match(/facebook\.com\/(\d+)/);
        if (userIDMatch) {
          uid = userIDMatch[1];
        } else {
          throw new Error("Could not extract user ID from profile URL");
        }
      }

      if (!uid || !/^\d+$/.test(uid)) {
        throw new Error("Invalid user ID extracted");
      }

      callback(null, uid);
    } catch (err) {
      utils.error("getUID", err);
      callback(err);
    }

    return returnPromise;
  };
};

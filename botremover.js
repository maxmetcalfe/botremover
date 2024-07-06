/*
 *   Remove the bots!
 *
 *   1. Navigate https://twitter.com/[YOUR USERNAME]/followers
 *   2. Click on follower type (Verified or Followers)
 *   3. Paste this code into your browser's dev console.
 *   4. Refresh the page
 *   5. The bot followers matching the BOT_USERNAME_REGEX below will be removed.
 *
 *   Warning: Be careful! This may remove non-bot users ;) see regex below.
 */

const BOT_USERNAME_REGEX = /\d{5,}$/; // spam bot username regex
const BOT_BIO_REGEXS = [/usdt/gi, /camshat/gi, /letscam/gi, /myfreecontent/gi]; // spam bot bio keywords.
const FOLLOWING_RATIO = 0.1; // ratio between followers / following
const BOT_NUM_FOLLOWING = 2000; // max number of followers for FOLLOWING requirement to take effect.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Highlight element (border to blue)
const highlight = (element) => {
  element.style.border = "1px solid #0000ff";
};

// Target an element (border to red)
const target = (element) => {
  element.style.border = "1px solid #c52121";
};

const stringToInt = (integerString) => {
  return parseInt(integerString.replace(",", "").replace(".", ""));
};

const isBotUsername = (username) => {
  if (BOT_USERNAME_REGEX.test(username)) {
    return true;
  }

  const numbers = username.match(/\d/g);
  console.log(username, numbers);
  return numbers && numbers.length > 5;
};

const getFollowerInfo = async (element) => {
  const link = element.querySelector("a");
  link.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  await delay(1000);
  const card = document.querySelector('[data-testid="HoverCard"]');

  if (!card) return;

  const links = Array.from(card.getElementsByTagName("a"));

  const followers = links.find((link) =>
    link.href.includes("/verified_followers"),
  ).children[0];
  const following = links.find((link) => link.href.includes("/following"))
    .children[0];

  // clean up
  await delay(1000);
  card.remove();

  return {
    following: stringToInt(following.innerText),
    followers: stringToInt(followers.innerText),
  };
};

const isBot = async (parentElement) => {
  const link = parentElement.querySelector("a");
  const username = link.href.split("/").pop();

  // Step 1: Does username match username regex?
  if (isBotUsername(username)) {
    return true;
  }

  // Step 2: Does the bio contain known spam keywords?
  const bio = parentElement.firstChild.children[1].children[1];

  if (bio) {
    const spans = Array.from(bio.getElementsByTagName("span"));
    const spansText = spans.reduce((acc, curr) => {
      acc = acc + curr.innerText;
      return acc;
    }, "");
    const spamBio = BOT_BIO_REGEXS.some((regexp) => {
      return regexp.test(spansText.toLowerCase().replace(/\s/g, ""));
    });

    if (spamBio) {
      return true;
    }
  }

  // Step 3: Does the follower info look like a spam bot?
  const followerInfo = await getFollowerInfo(parentElement);
  const followRatio = followerInfo.followers / followerInfo.following;

  if (
    followerInfo.following > BOT_NUM_FOLLOWING &&
    followRatio < FOLLOWING_RATIO
  ) {
    return true;
  }

  return false;
};

const removeFollower = async (parentElement) => {
  const link = parentElement.querySelector("a");
  const username = link.href.split("/").pop();

  try {
    const moreButton = parentElement.querySelector('[aria-label="More"]');
    if (!moreButton) throw new Error(`"More" button not found for ${username}`);

    moreButton.click();
    await delay(100);

    const removeItem = document.querySelector('[data-testid="removeFollower"]');
    if (!removeItem)
      throw new Error(`"Remove" option not found for ${username}`);

    removeItem.click();
    await delay(100);

    const confirmButton = document.querySelector(
      '[data-testid="confirmationSheetConfirm"]',
    );
    if (!confirmButton)
      throw new Error(`"Confirm" button not found for ${username}`);

    confirmButton.click();
    console.log(`Removed ${username}`);
    parentElement.remove();
  } catch (error) {
    console.error(error.message);
  }
};

const main = async () => {
  const userCells = document.querySelectorAll('[data-testid="UserCell"]');
  for (let index in userCells) {
    const followerElement = userCells[index];
    highlight(followerElement);
    if (await isBot(followerElement)) {
      target(followerElement);
      removeFollower(followerElement);
    }
  }
};

main();
// document.getElementById("runCodeButton").addEventListener("click", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: main,
//     });
//   });
// });

/*
 *   Remove the bots!
 *
 *   1. Navigate https://twitter.com/[YOUR USERNAME]/followers
 *   2. Click on follower type (Verified or Followers)
 *   3. Paste this code into your browser's dev console.
 *   4. Refresh the page
 *   5. The bot followers matching the BOT_USERNAME_REGEX below will be removed.
 *
 *   Warning: Be careful! This may remove non-bot users ;) see regex below.
 */

const BOT_USERNAME_REGEX = /\d{5,}$/;
const BOT_BIO_REGEXS = [/usdt/gi, /camshat/gi, /letscam/gi, /myfreecontent/gi];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isBot = (parentElement) => {
  const link = parentElement.querySelector("a");
  const username = link.href.split("/").pop();

  if (BOT_USERNAME_REGEX.test(username)) {
    return true;
  }

  const bio = parentElement.firstChild.children[1].children[1];

  if (!bio) {
    return false;
  }

  const spans = Array.from(bio.getElementsByTagName("span"));
  const spansText = spans.reduce((acc, curr) => {
    acc = acc + curr.innerText;
    return acc;
  }, "");

  return BOT_BIO_REGEXS.some((regexp) => {
    return regexp.test(spansText.toLowerCase().replace(/\s/g, ""));
  });
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
  } catch (error) {
    console.error(error.message);
  }
};

document
  .querySelectorAll('[data-testid="UserCell"]')
  .forEach((followerElement, index) => {
    if (index !== 0) return;

    const link = followerElement.querySelector("a");
    const username = link.href.split("/").pop();
    const target = followerElement.firstChild.firstChild.getEle;
    const profileLinks = document.querySelectorAll(`[href='/${username}']`)[0];
    console.log(profileLinks);
    // profileLinks.onmouseover();
    // if (index !== 0) return;
    // target.focus();
    // if (isBot(followerElement)) {
    //   removeFollower(followerElement);
    // }
  });

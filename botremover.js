/*
 *   Remove the bots!
 *
 *   1. Navigate https://twitter.com/[YOUR USERNAME]/followers
 *   2. Click on follower type (Verified or Followers)
 *   3. Paste this code into your browser's dev console.
 *   4. Refresh the page
 *   5. The bot followers matching the BOT_USERNAME_REGEX below will be removed.
 *
 *   Warning: Be careful! This may removed non-bot users ;) see regex below.
 */

// This regex capture all usernames that end with more than 5 numbers (likely bots)
// You may want to change this based on your followers / aggressiveness
const BOT_USERNAME_REGEX = /\d{5,}$/;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const removeFollower = async (username, parentElement) => {
  try {
    const moreButton = parentElement.querySelector('[aria-label="More"]');
    if (!moreButton) throw new Error(`"More" button not found for ${username}`);

    moreButton.click();
    await delay(100); // Wait for UI to respond

    const removeItem = document.querySelector('[data-testid="removeFollower"]');
    if (!removeItem)
      throw new Error(`"Remove" option not found for ${username}`);

    removeItem.click();
    await delay(100); // Wait for confirmation dialog to appear

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
  .forEach((followerElement) => {
    const link = followerElement.querySelector("a");
    const username = link.href.split("/").pop();

    if (BOT_USERNAME_REGEX.test(username)) {
      console.log(username);
      removeFollower(username, followerElement);
    }
  });

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
//

console.log("running botremover.js");

window.addEventListener("load", async function () {
  console.log("Page fully loaded", document);

  const targetButton = document.getElementById("target-button");
  const removeButton = document.getElementById("remove-button");

  console.log(targetButton, removeButton);

  document
    .querySelectorAll('[data-testid="UserCell"]')
    .forEach((followerElement) => {
      const link = followerElement.querySelector("a");
      const username = link.href.split("/").pop();
      console.log(followerElement);
      // if (BOT_USERNAME_REGEX.test(username)) {
      //   console.log(username);
      //   // removeFollower(username, followerElement);
      // }
    });
});

document.addEventListener("DOMContentLoaded", (event) => {
  const targetButton = document.getElementById("target-button");
  const removeButton = document.getElementById("remove-button");

  console.log(targetButton, removeButton);

  // const BOT_USERNAME_REGEX = /\d{5,}$/;

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // const isBot = (parentElement) => {};

  // const removeFollower = async (username, parentElement) => {
  //   try {
  //     console.log(parentElement);
  //     const moreButton = parentElement.querySelector('[aria-label="More"]');
  //     if (!moreButton)
  //       throw new Error(`"More" button not found for ${username}`);

  //     moreButton.click();
  //     await delay(100); // Wait for UI to respond

  //     const removeItem = document.querySelector(
  //       '[data-testid="removeFollower"]',
  //     );
  //     if (!removeItem)
  //       throw new Error(`"Remove" option not found for ${username}`);

  //     removeItem.click();
  //     await delay(100); // Wait for confirmation dialog to appear

  //     const confirmButton = document.querySelector(
  //       '[data-testid="confirmationSheetConfirm"]',
  //     );
  //     if (!confirmButton)
  //       throw new Error(`"Confirm" button not found for ${username}`);

  //     confirmButton.click();
  //     console.log(`Removed ${username}`);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // document.addEventListener("DOMContentLoaded", (event) => {
  //   console.log("HERE");
  // });

  // document.onload = () => {
  //   console.log("load");
  // };

  // // To execute when the initial HTML document is fully loaded and parsed:
  // document.addEventListener("DOMContentLoaded", function () {
  //   console.log("DOM fully loaded and parsed");
  //   // Your code here
  // });

  // // To execute when the whole page (including all dependent resources) is fully loaded:
  // window.addEventListener("load", async function () {
  //   console.log("Page fully loaded", document);

  //   await delay(2000);

  //   const t = document.querySelectorAll('[data-testid="UserCell"]');
  //   console.log(t);
  //   // console.log(document.getElementsByTagName("div"));

  //   document
  //     .querySelectorAll('[data-testid="UserCell"]')
  //     .forEach((followerElement) => {
  //       const link = followerElement.querySelector("a");
  //       const username = link.href.split("/").pop();
  //       console.log(followerElement);
  //       if (BOT_USERNAME_REGEX.test(username)) {
  //         console.log(username);
  //         // removeFollower(username, followerElement);
  //       }
  //     });
  // });
});

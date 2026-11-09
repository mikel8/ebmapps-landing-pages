// Activated only by the post-publication landing-page branch.
document.querySelectorAll('.coming').forEach((badge) => badge.remove());
document.querySelectorAll('.heading p').forEach((copy) => {
  if (copy.textContent.includes('website profiles arrive in the next update')) {
    copy.textContent = 'AutoScroll Pro saves a scrolling setup for each website and restores it when you open the popup again.';
  }
  if (copy.textContent.includes('website profiles in the next update')) {
    copy.textContent = 'Choose Pro when you want higher speeds, saved configurations, and website-specific profiles that restore when you open the popup.';
  }
});

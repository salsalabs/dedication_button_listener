# dedication_button_listener
Waits for an Engage form to appear, then adds listeners to the dedication buttons in the form.

## Background

Engage forms are loaded using scripts.  Because they are loaded asynchronously, Engage forms are rarely (if ever) finished at the time that the document is rendered.  

This solution uses a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to wait for the In Honor Of button to appear in the fundraising form.  Once that button appears, then the script adds event listeners to all three dedication buttons (None, In Honor Of and In Memory Of).  The event listeners show and hide custom fields that are used to collect more information about the dedication.

## Usage

The best way to use this script will be to download it to your system.  It can then be added into pages that have an embedded Engage fundraising form.  Please view the contents of `TestPage.html` for an example of an embedded form and placement of the script.

## Notes

This solution is very specific to a single client.  You'll need to consider this example a framework for your own implementation.

## Question? Comments?

Please send mail to [Salsa Support](mailto:support@salsalabs.com) with any questions or comments. Provide good examples and clear issue descriptions for best results.


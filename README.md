# everything always somewhere ![rose](icons/rose48.png)

Have you felt confused by the amount of choices you have when going to Rafaël Rozendaals artwork-website list? [Experts](http://goodpointpodcast.com/) say that consumers get paralysed when presented with more than four choices. So how will you be able to choose between more than a hundred artwork-websites? Sometimes you just want a curator to choose which art you should consume. Maybe this is the reason museums are so appealing?

_everything always somewhere_ is the institution you have been waiting for. A browser extension that automatically cycles between websites created by [Rafaël Rozendaal](http://www.newrafael.com).

The name comes from Rozendaals website [everything always everywhere .com](http://www.everythingalwayseverywhere.com). The idea is that the extension enables you to see all (or most) websites by Rafaël Rozendaal (_everything_) sequentially on a single monitor (_always somewhere_).

It is available for you for free. You can even look at—and learn from—the code, as it is open source. [Download it now!](https://github.com/eraxeg/everything-always-somewhere/archive/master.zip)

## Installation

1. Clone the repository or [download the zip](https://github.com/eraxeg/everything-always-somewhere/archive/master.zip)
2. Go to `chrome://extensions` and click `Load unpacked extension...`. Select the downloaded folder.

## Features

- Start and stop the timer
- Set the cycling interval
- Skip current website
- Choose if the extension should go to a new page when the timer is turned on. This is on by default but can be turned off in the options.
- Skip websites that can cause epileptic seizures

When changing tab, the extension will pause the cycling and clicking. Clicking the icon will start the countdown again.

The websites are stored as a JSON dictionary in `inject.js`. They were fetched on 29th November 2017 from the website listing all websites developed for mobile by that time.

## How about interaction?

The institution does not want you to do labour for the art to come alive. By default, _everything always somewhere_ gives you the right to remain a passive consumer. Soon you will be able to watch automated interaction. Independent net art experts will judge where this is appropriate without destroying the essence of the artwork-website.

## TODO

- Jeremy mode - Every other site will be an advertisement
- Make it click, drag and pan!
- Go to next/previous website when timer is off
- Fix the bug that you have to reload the extension to apply the "change on activation" setting
- Prettier settings
- Complete categorization of websites
- Show/hide specific websites
- Chronological cycling mode
- Check newrafael.com for new websites automatically
- Separate website list from code

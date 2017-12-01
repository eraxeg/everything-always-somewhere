# everything always somewhere ![rose](icons/rose48.png)

_everything always somewhere_ is a browser extension that automatically cycles between websites created by [Rafaël Rozendaal](http://www.newrafael.com). The name comes from Rozendaals website [everything always everywhere .com](http://www.everythingalwayseverywhere.com). The idea is that the extension enables you to see all the website works of Rafaël Rozendaal (_everything_) sequentially in full screen mode on just one monitor (_always somewhere_).

It is available as an open source Google Chrome extension.

## Installation

1. Clone the repository or [download the zip](https://github.com/eraxeg/everything-always-somewhere/archive/master.zip)
1. Go to `chrome://extensions` and click `Load unpacked extension…`. Select the everything-always-somewhere folder.

## Features

- Start and stop the timer (by clicking the icon)
- Set the cycling interval (in the options)
- Skip current website (right click on icon when timer is on)

The extension by default excludes websites which require interaction. The possibility of human interaction is part of the artwork and automating it would risk taking away too much of the piece.

When changing tab, the extension will pause the cycling and clicking. Clicking the icon will start the countdown again.

The websites are stored as a JSON dictionary in `inject.js`. They were fetched on 29th November 2017 from the website listing all websites developed for mobile by that time.

## TODO

- Show/hide specific websites
- Chronological cycling mode
- Check newrafael.com for new websites automatically

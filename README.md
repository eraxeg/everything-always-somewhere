# everything always somewhere

_everything always somewhere_ is a browser extension that automatically cycles between websites created by Rozendaal. The name comes from Rozendaals website _everything always everywhere .com_, and it refers to that the extension enables you to see all the website works of Rafaël Rozendaal (everything) sequentially in full screen mode on just one monitor (always somewhere).

It is available as an open source Google Chrome extension. 

## Installation

1. Clone the repository
1. Go to `chrome://extensions` and click `Load unpacked extension…`. Select the downloaded folder.

## Features

- Start and stop the timer (by clicking the icon)
- Set the cycling interval (in the options)
- Skip current website (right click on icon when timer is on)

The extension by default exludes websites which require interaction. The possibility of human interaction is part of the artwork and automating it would risk taking away too much of the piece.

When changing tab, the extension will pause the cycling and clicking. Clicking the icon will start the countdown again.

The websites are stored as a JSON dictionary in `inject.js`. They were fetched on 29th november 2017 from the website listing all websites developed for mobile by that time.

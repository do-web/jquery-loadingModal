# Installation

You can install [jquery-loadingModal](https://www.npmjs.com/package/jquery-loadingModal) with npm:

`npm install jquery-loadingModal`

Including the scripts & styles manually:

```html
<script src="jquery.loadingModal.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="jquery.loadingModal.min.css" type="text/css" />
```

# Example
[Demo](http://x5c.de/loading-modal/)

# Usage / Init
```html
$('body').loadingModal({text: 'Showing loader animations...', 'animation': 'wanderingCubes'});
```

# Options
```html
position: 'auto',
text: '',
color: '#fff',
opacity: '0.7',
backgroundColor: 'rgba(0, 86, 205, 0.7)',
animation: 'doubleBounce'
```

# Methods
```html
$('body').loadingModal('text', 'My changed text');
$('body').loadingModal('animation', 'rotatingPlane');
$('body').loadingModal('color', '#000');
$('body').loadingModal('backgroundColor', 'yellow');
$('body').loadingModal('opacity', '0.9');
$('body').loadingModal('hide');
$('body').loadingModal('show');
$('body').loadingModal('destroy');
```

# Support

Please post a question on [StackOverflow](http://stackoverflow.com/).

# License (MIT)

jQuery Modal is distributed under the [MIT License](Learn more at http://opensource.org/licenses/mit-license.php):

    Copyright (c) 2016 Dominik Weber

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Instructions
- `npm install`
- `npm start`
- pull up `http://localhost:3000`

## A note about module versions
I generally try to pin the critical packages in package.json to exact version numbers.
That should ensure that things should work for you even if the React apis change significantly
in future versions. If future versions of React are released, you can continue using the pinned
versions in these files, or you can try to upgrade and follow the migration docs that React usually
has with big api changes.

You can check the readme at https://github.com/jamischarles/ps_redux-demos for any major updates.

## Other code changes after recording
After recording, I added the following line to `webpack.config.js` to enable source maps. This makes debugging in chrome devtools
much easier.
`devtool: "source-map",`

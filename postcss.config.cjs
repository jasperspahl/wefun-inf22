const postcssConfig = require('postcss-jit-props');
const OpenProps = require('open-props')

module.exports = {
    plugins: [
        require('postcss-nesting'),
        require('autoprefixer'),
        require('cssnano'),
        postcssConfig(OpenProps)
    ]
}
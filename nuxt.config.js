/* eslint-disable indent */
module.exports = {
    mode: 'spa',
    head: {
        title: 'minimaLista feito com Nuxt.js',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', content: 'minimaLista' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
        ]
    },
    css: [
        { src: 'static/index.css' }
    ],
    router: {
        linkActiveClass: 'selected'
    }
    // eslint-disable-next-line eol-last
}
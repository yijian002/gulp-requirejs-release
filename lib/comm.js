let setting;

module.exports = {
    log(msg, title) {
        if (title) {
            msg = '[' + title + ']: ' + msg
        }

        console.log(msg)
    },
    setBasePath(src) {
        if (!setting.basePath) {
            return src
        }

        if (typeof src === 'string') {
            return setting.basePath + src
        }

        for (let i = 0; i < src.length; i++) {
            src[i] = setting.basePath + src[i]
        }

        return src
    },
    init(opts) {
        setting = opts
    }
}

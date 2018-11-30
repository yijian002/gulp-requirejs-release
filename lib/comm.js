let setting;

module.exports = {
    log(msg, title) {
        if (title) {
            msg = '[' + title + ']: ' + msg
        }

        console.log(msg)
    },
    setBasePath(src, basePath) {
        if (!basePath && !setting.basePath) {
            return src
        }

        basePath = basePath || setting.basePath

        if (typeof src === 'string') {
            return basePath + src
        }

        for (let i = 0; i < src.length; i++) {
            src[i] = basePath + src[i]
        }

        return src
    },
    init(opts) {
        setting = opts
    }
}

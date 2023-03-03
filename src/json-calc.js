const _ = require("lodash")

function JSONCalc() {
    this.calc = (parsedData, options) => {
        options = options || {}

        if (!Array.isArray(parsedData)) {
            // work with single object as well as with arrays
            parsedData = [ parsedData ]
        }

        // currently, we support sum only
        const sumObj = {}

        // collect keys that are missing in some objects
        let missingKeys = []

        _.each(parsedData, (obj) => {
            // before we start: note all keys in this object that are not known yet (expect for first object)
            // these are missing in all previous objects
            if (_.keys(sumObj).length > 0) {
                missingKeys = _.union(missingKeys, _.filter(_.keys(obj), (objKey) => !_.has(sumObj, objKey)))
            }

            // sum all numeric fields
            _.forOwn(obj, (value, key) => {
                if (typeof value === "number") {
                    if (!_.has(sumObj, key)) {
                        sumObj[key] = 0
                    }

                    sumObj[key] += value
                } else {
                    // key exists but is not a number: count as missing
                    missingKeys.push(key)
                }
            })

            // before we end: note all already known keys that are not in this object but have seen in previous objects
            missingKeys = _.union(missingKeys, _.filter(_.keys(sumObj), (knownKey) => !_.has(obj, knownKey)))
        })

        if (options.allOrNothing) {
            _.each(missingKeys, (missingKey) => delete sumObj[missingKey])
        }

        return {
            sum: sumObj
        }
    }
}

module.exports = JSONCalc
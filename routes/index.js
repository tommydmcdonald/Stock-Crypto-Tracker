const _ = require('lodash');

module.exports = {
   replaceKeys: (data) => { //removes . from keys of data object. '.' are not valid keys in mongodb
      data = _.mapKeys(data, (value, key) => {
         return key.replace('.', '_');
      })

      for (let key in data) {
         if ( typeof data[key] == 'object') {
            for (let subkey in data[key]) {
               if (typeof data[key][subkey] == 'object') {
                  data[key][subkey] = _.mapKeys(data[key][subkey], (value, key) => {
                     return key.replace('.', '_');
                  })
               }
            }

            data[key] = _.mapKeys(data[key], (value, key) => {
               return key.replace('.', '_');
            })
         }
      }

      return data;
   }
}

const removeDuplicatedValues = (array) => {
    let arrayOfUniqueValues = []
    array.forEach(element => {
        if(!arrayOfUniqueValues.includes(element)){
            arrayOfUniqueValues.push(element)
        }
    })
    return arrayOfUniqueValues
  }

  module.exports = removeDuplicatedValues
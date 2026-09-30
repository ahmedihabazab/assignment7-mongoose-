
export async function DBConnect({Tool , DBConnectionString}) {
    await Tool.connect(`${DBConnectionString}`)
}

export async function createDocument({modelName , data , options} = {}){
    const result = await modelName.create([data] ,  options)
    return result
}

export async function findOne({model , filter , options} = {}) {
    const result = await model.findOne(filter , options)
    return result
}

export async function findOneAndUpdate({model , filter , updatedData ,  options} = {}) {
    const result = await model.findOneAndUpdate(filter , updatedData , options)
    return result
}

export async function findOneAndDelete({model , filter ,  options} = {}) {
    const result = await model.findOneAndDelete(filter , options)
    return result
}
let xml2js = require('xml2js');
const parseStringPromise = require('xml2js').parseStringPromise;

const Delete = (url, id) => {
    return fetch(url + "/" + id, { method: 'DELETE' })
}

const Add = (url, data) => {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(data);
    return fetch(url, { method: 'POST', body: xml })
}

const Update = (url, data) => {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(data);
    const urlWithId = url + "/" + data.id
    return fetch(urlWithId, { method: 'PUT', body: xml })
}

const GetObject = async (data) => {
    let message = await data.text()
    return await parseStringPromise(message)
}

export default { GetObject, Delete, Add, Update };
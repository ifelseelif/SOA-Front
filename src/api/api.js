let baseUrl = "/soa-1/api"

const Delete = (url, id) => {
    return fetch(baseUrl + url + "/" + id, {
        method: 'DELETE', headers: {
            'Content-Type': 'application/json'
        },
    })
}

const Add = (url, data) => {
    let body = JSON.stringify(data);
    return fetch(baseUrl + url, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: body
    })
}

const Update = (url, data) => {
    let body = JSON.stringify(data);
    const urlWithId = url + "/" + data.id
    return fetch(baseUrl + urlWithId, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        }, body: body
    })
}

const GetObject = async (data) => {
    var responseBody = await data.text()
    console.log(responseBody)
    return JSON.parse(responseBody)
}

export default { GetObject, Delete, Add, Update };
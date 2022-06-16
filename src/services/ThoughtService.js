import http from "../http-common"

const create = data => {
    return http.post("/thought", data)
}
const getAll = () => {
    return http.get("/thought")
}
const getById = id => {
    return http.get(`/thought/${id}`)
}
const remove = id => {
    return http.delete(`/thought/${id}`)
}
const update = data => {
    return http.put("/thought", data)
}
const ThoughtService = {
    create,
    getAll,
    getById,
    remove,
    update
}
export default ThoughtService
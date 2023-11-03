export const makeValidSeachQuery = function (searchQuery) {
    return searchQuery.trim().replaceAll(' ', '+')
}
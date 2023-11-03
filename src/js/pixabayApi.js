import { makeValidSeachQuery } from "./makeValidSeachQuery";
import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38175846-4e34d29612c397988723af481';

export const getRequest = async function (searchQuery, page) {
    const validSeachQuery = makeValidSeachQuery(searchQuery)

    const request = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${validSeachQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    const { data } = request;
    return data
}


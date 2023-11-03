import './sass/main.scss'
import { getRequest } from './js/pixabayApi'
import { createHitMarkup } from './js/createHitMarkup';
import { scrollBy } from './js/scrollBy';
import { message } from './js/messages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more')

formRef.addEventListener('submit', onSearch)
loadMoreBtnRef.addEventListener('click', onLoadMoreBtn)
galleryRef.addEventListener('click', onClickOnImage)

const gallery = new SimpleLightbox('.gallery a');
const responcePerPage = 40

async function onSearch(event) {
    event.preventDefault()
    galleryRef.innerHTML = '';

    if (!loadMoreBtnRef.classList.contains('is-hidden')) {
        loadMoreBtnRef.classList.toggle('is-hidden');
    }

    const { searchQuery } = event.currentTarget.elements;
    const queryParams = {
        query: searchQuery.value,
        page: 1,
    }
    
    sessionStorage.setItem('queryParams', JSON.stringify(queryParams))

    const requestResult = await getRequest(queryParams.query, queryParams.page)
    const { totalHits, hits } = requestResult;

    if (totalHits === 0) {
        message.notResultsMessage();
            return
    }

    message.resultsQuantityMessage(totalHits);
    galleryRef.insertAdjacentHTML('beforeend', createHitMarkup(hits));
    scrollBy(0.15);
    gallery.refresh();
    loadMoreBtnRef.classList.toggle('is-hidden');
    
}

async function onLoadMoreBtn() {
    const queryParams = JSON.parse(sessionStorage.getItem('queryParams'))
    queryParams.page += 1
    const requestResult = await getRequest(queryParams.query, queryParams.page)
    const { totalHits, hits } = requestResult;
        
        if (totalHits - queryParams.page * responcePerPage <= 0) {
            message.noMoreResultsMessage();
            return;
        }
    
        galleryRef.insertAdjacentHTML('beforeend', createHitMarkup(hits));
        scrollBy(0.85);
        gallery.refresh();
        sessionStorage.setItem('queryParams', JSON.stringify(queryParams));
        
}

function onClickOnImage(event) {
    event.preventDefault()
    if (!event.target.classList.contains("photo-img")) {
    return
    }
    gallery.open(event.target);
}



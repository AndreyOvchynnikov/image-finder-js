import Notiflix from 'notiflix';

export const message = {
    notResultsMessage() {
       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    } ,
    noMoreResultsMessage() {
        Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
    },
    resultsQuantityMessage(totalHits) {
       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    },  
}
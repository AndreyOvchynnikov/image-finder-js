export const scrollBy = function (scrollHeigth) {
    const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * scrollHeigth,
    behavior: 'smooth',
});
}
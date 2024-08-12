export default function generateRating(rating, size) {
  const ratingList = document.createElement('div');
  ratingList.className = 'rating-list';

  const addClass = size ? `rating-list__star--${size}` : '';

  let stars =  Array(Math.floor(5 - rating)).fill(`<div class="rating-list__star ${addClass}"></div>`);
  if (rating > 0 && rating <= 5) {
    const filledStars = Array(Math.floor(rating)).fill(`<div class="rating-list__star ${addClass} filled"></div>`);
    const emptyStars = stars.slice(0, Math.floor(5 - rating));

    let starStr = '';
    const decimal = rating - Math.floor(rating);
    if (decimal !== 0) {
      const star = document.createElement('div');
      star.className = `rating-list__star ${addClass} line`;
      star.style.backgroundPositionX = `${(1 - decimal) * 100}%`;
      starStr = star.outerHTML;
    }

    stars = [...filledStars, starStr, ...emptyStars];
  }

  ratingList.innerHTML = stars.reduce((acc, str) => acc + str);

  return ratingList;
}

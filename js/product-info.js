let localStorageValue = '50921';
const comentarios = document.getElementsByClassName('comment-section__comment-container')[0];
const commentList = document.querySelector('.comment-container__comment-list');

document.addEventListener('DOMContentLoaded', () => {
	// localStorageValue = localStorage.getItem("cardId");
	fetch(PRODUCT_INFO_COMMENTS_URL + localStorageValue + EXT_TYPE)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((element) => {
				//Creación de elementos HTML
				let divCard = document.createElement('div');
				let divCardLoad = document.createElement('div');
				let divTitle = document.createElement('div');
				let divDescription = document.createElement('div');
				let pTitle = document.createElement('p');
				let pDescription = document.createElement('p');
				let image = document.createElement('img');
				//Atributos y clases
				image.src = '/img/gitlab.svg';
				divCard.classList.add('cards');
				divCardLoad.classList.add('tarjeta_load');
				divTitle.classList.add('tarjeta_load_extreme_title');
				divDescription.classList.add('tarjeta_load_extreme_description');
				pTitle.innerHTML = element.user + ' ' + element.dateTime + ' ' + element.score;
				pDescription.innerHTML = element.description;
				//AppendChild's
				divTitle.appendChild(pTitle);
				divDescription.appendChild(pDescription);
				divCardLoad.appendChild(image);
				divCard.appendChild(divCardLoad);
				divCard.appendChild(divTitle);
				divCard.appendChild(divDescription);
				commentList.appendChild(divCard);
			});
		});
});

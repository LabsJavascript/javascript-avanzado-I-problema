import { urls } from "./constant.js";

export function goBack() {
	const postDetail = document.querySelector('.detail-post');
	const posts = document.querySelector('.posts');
	postDetail.innerHTML = '';
	postDetail.classList.add('hidden');
	posts.classList.remove('hidden');
}

export function goToPostDetail(e, loader) {
	e.preventDefault();
	const id = e.currentTarget.dataset.id;
	loader.classList.remove('hidden');
	fetch(urls[id])
		.then(res => res.json())
		.then(post => generatePostDetail(post, loader))
	// const post = posts.find(post => post.id === id);
}

export function generatePostDetail(post, loader) {
	const postDetail = document.querySelector('.detail-post');
	const postsSection = document.querySelector('.posts');
	const backButton = document.createElement('button');
	const headerDetail = document.createElement('header');
	backButton.classList.add('back-button');
	headerDetail.classList.add('detail-post-header');
	const backButtonIcon = document.createElement('i');
	backButtonIcon.classList.add('fas', 'fa-arrow-left', 'fa-solid', 'green');
	backButton.appendChild(backButtonIcon);
	backButton.addEventListener('click', goBack);
	postDetail.appendChild(backButton);

	postDetail.classList.remove('hidden');
	postsSection.classList.add('hidden');

	const postDetailText = document.createElement('p');
	postDetailText.classList.add('detail-post-content');
	const postDetailTitle = document.createElement('h2');
	const postAuthor = document.createElement('p');

	postDetailTitle.textContent = post.title;


	postDetailText.innerHTML = post.content.replace(/\n/g, '<br />');
	postAuthor.classList.add('detail-post-author');
	postAuthor.textContent = post.author;

	headerDetail.appendChild(backButton);
	headerDetail.appendChild(postDetailTitle);
	postDetail.appendChild(headerDetail);
	postDetail.appendChild(postDetailText);
	loader.classList.add('hidden');
	postDetail.appendChild(postAuthor);

}
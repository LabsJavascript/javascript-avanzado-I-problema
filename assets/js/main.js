import { urls } from "./constant.js";
import { formatDataAgo } from "./utils.js";

(async function () {

	const loader = document.querySelector('.loader-container');
	loader.classList.remove('hidden');

	const { posts } = await fetch(urls["post"])
		.then(res => res.json())

	loader.classList.add('hidden');

	const listOfPosts = document.querySelector('.posts');

	posts.forEach(post => listOfPosts.appendChild(generatePost(post)))

	function generatePost(post) {
		const postElemment = document.createElement('article');
		postElemment.className = "post"

		const postLink = document.createElement('a');
		postLink.className = "post-link"
		postLink.dataset.id = post.id;

		const postHeader = document.createElement('header');
		postHeader.className = "post-header"

		const postHeaderTitle = document.createElement('h3');
		postHeaderTitle.textContent = post.title;
		postHeaderTitle.className = "post-title"

		const postDate = document.createElement('p');
		postDate.textContent = formatDataAgo(post.date);
		postDate.className = "post-date"


		const postFooter = document.createElement('footer');
		postFooter.className = "post-footer"

		const postContent = document.createElement('p')
		postContent.innerHTML = post.content;
		postContent.className = "post-content"

		postLink.addEventListener('click', goToPostDetail)

		postHeader.appendChild(postHeaderTitle)
		postFooter.appendChild(postContent)
		postFooter.appendChild(postDate)
		postLink.appendChild(postHeader);
		postLink.appendChild(postFooter)
		postElemment.appendChild(postLink)
		return postElemment
	}

	function goBack() {
		const postDetail = document.querySelector('.detail-post');
		const posts = document.querySelector('.posts');
		postDetail.innerHTML = '';
		postDetail.classList.add('hidden');
		posts.classList.remove('hidden');
	}

	function goToPostDetail(e) {
		e.preventDefault();
		const id = e.currentTarget.dataset.id;
		loader.classList.remove('hidden');
		fetch(urls[id])
			.then(res => res.json())
			.then(post => generatePostDetail(post))
		// const post = posts.find(post => post.id === id);
	}
	function generatePostDetail(post) {
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
})()

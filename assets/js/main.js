import { urls } from "./constant.js";
import { goToPostDetail } from "./detailPost.js";
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

		postLink.addEventListener('click', (e) => goToPostDetail(e, loader))

		postHeader.appendChild(postHeaderTitle)
		postFooter.appendChild(postContent)
		postFooter.appendChild(postDate)
		postLink.appendChild(postHeader);
		postLink.appendChild(postFooter)
		postElemment.appendChild(postLink)
		return postElemment
	}

})()

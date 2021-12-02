import path from "path";
import { fileURLToPath } from "url";

import Url from "../../url.js";
import Newspaper from "../../newspaper.js";

export default class EnsenadaOnline extends Newspaper {
	#__filename = fileURLToPath(import.meta.url);
	#__dirname = path.dirname(this.#__filename);
	#path = this.#__dirname;
	#state = "Baja California";
	#name = "ENSENADA ONLINE";
	#baseUrl = "https://www.ensenadaonline.net/";
	#url = new Url({
		base: `${this.#baseUrl}search?q=&page=`,
		maxPages: 2280,
		end: "",
	});
	scrapped = true;
	working = true;
	online = true;

	#preArticle_algortihms = {
		all_articles: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.col-sm-6 > div.post-item > h3.title"
				),
			].length,
		title: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.col-sm-6 > div.post-item > h3.title > a"
				),
			].map((a) => a.textContent.replaceAll("\n", "").trim()),
		url: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.col-sm-6 > div.post-item > h3.title > a"
				),
			].map((a) => a.getAttribute("href")),
		preview: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.col-sm-6 > div.post-item >p.description"
				),
			].map((div) => div.textContent.replaceAll("\n", "").trim()),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.col-sm-6 > div.post-item > p.post-meta > span"
				),
			]
				.map((time) => time.textContent)
				.filter((a, index) => index % 3 === 0),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.col-sm-6 > div.post-item > p.post-meta > a"
				),
			].map((a) => a.textContent),
	};

	#article_algortihms = {
		title: (dom) =>
			[
				...dom.window.document.querySelectorAll("div.post-content > h1.title"),
			].map((a) => a.textContent),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll("p.post-meta > span.sp-left"),
			].map((a) => a.textContent.replaceAll("\n", "").trim())[1],
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"p.post-meta > span.post-author-meta > a"
				),
			].map((a) => a.textContent.trim()),
		text: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.post-text, p.x_MsoNormal > span"
				),
			]
				.map((div) => div.textContent.replaceAll("\n", "").trim())
				.filter((p) => p != ""),
	};

	get path() {
		return this.#path;
	}
	get state() {
		return this.#state;
	}
	get name() {
		return this.#name;
	}
	get baseUrl() {
		return this.#baseUrl;
	}
	get url() {
		return this.#url;
	}
	get preArticle_algortihms() {
		return this.#preArticle_algortihms;
	}
	get article_algortihms() {
		return this.#article_algortihms;
	}

	_constructor(
		path,
		state,
		name,
		baseUrl,
		url,
		scrapped,
		working,
		online,
		preArticle_algortihms,
		article_algortihms
	) {}
}

//const ensenadaOnline = new EnsenadaOnline();

//console.log(await ensenadaOnline.prearticlesAll()());
//console.log(await ensenadaOnline.prearticlesTitles());
//console.log(await ensenadaOnline.prearticlesAuthors());

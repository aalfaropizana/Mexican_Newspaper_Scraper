import path from "path";
import { fileURLToPath } from "url";

import Url from "../../url.js";
import Newspaper from "../../newspaper.js";

export default class Hidrocalido extends Newspaper {
	#__filename = fileURLToPath(import.meta.url);
	#__dirname = path.dirname(this.#__filename);
	#path = this.#__dirname;
	#state = "Aguascalientes";
	#name = "HIDROCÁLIDO";
	#baseUrl = "http://www.hidrocalidodigital.com/";
	#url = new Url({
		base: `${this.#baseUrl}page/`,
		maxPages: 6823,
		end: "/?s=",
	});
	scrapped = true;
	working = true;
	online = true;

	#preArticle_algortihms = {
		all_articles: (dom) =>
			[...dom.window.document.querySelectorAll("article")].length,
		title: (dom) =>
			[...dom.window.document.querySelectorAll("span.headline > a")].map(
				(a) => a.textContent
			),
		url: (dom) =>
			[...dom.window.document.querySelectorAll("a.btBtn")].map((a) =>
				a.getAttribute("href")
			),
		preview: (dom) =>
			[
				...dom.window.document.querySelectorAll("div.btArticleListBodyContent"),
			].map((div) => div.textContent),
		date: (dom) =>
			[...dom.window.document.querySelectorAll("span.btArticleDate")].map(
				(span) => span.textContent
			),
	};

	#article_algortihms = {
		title: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.dash > h1 > span.headline"
				),
			].map((a) => a.textContent),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.btSubTitle > span.btArticleDate"
				),
			].map((a) => a.textContent),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.btSubTitle > a.btArticleAuthor"
				),
			].map((a) => a.textContent.trim()),
		text: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					":scope > div.btArticleExcerpt, .western"
				),
			]
				.map((div) => div.textContent.split("\n"))[0]
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

//const hidrocalido = new Hidrocalido();

//console.log(await hidrocalido.prearticlesAll()());
//console.log(await hidrocalido.prearticlesTitles());
//console.log(await hidrocalido.prearticlesAuthors());

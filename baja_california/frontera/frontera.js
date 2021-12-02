import path from "path";
import { fileURLToPath } from "url";

import Url from "../../url.js";
import Newspaper from "../../newspaper.js";

export default class Frontera extends Newspaper {
	#__filename = fileURLToPath(import.meta.url);
	#__dirname = path.dirname(this.#__filename);
	#path = this.#__dirname;
	#state = "Baja California";
	#name = "FRONTERA";
	#baseUrl = "https://www.elimparcial.com/tijuana/";
	#url = new Url({
		base: `${
			this.#baseUrl
		}ajax/get_search_news.html?viewmore=%2Ftijuana%2Fajax%2Fget_search_news.html&search=&page=`,
		maxPages: 4728,
		end: "&size=9&publication=3%2C1",
	});
	scrapped = true;
	working = true;
	online = true;

	#preArticle_algortihms = {
		all_articles: (dom) =>
			[...dom.window.document.querySelectorAll("article")].length,
		title: (dom) =>
			[...dom.window.document.querySelectorAll("h2 > a")].map(
				(a) => a.textContent
			),
		url: (dom) =>
			[...dom.window.document.querySelectorAll("h2 > a")].map(
				(a) => "https://www.elimparcial.com" + a.getAttribute("href")
			),
		date: (dom) =>
			[...dom.window.document.querySelectorAll("time")].map(
				(time) => `${new Date().toLocaleString()} o ${time.textContent}`
			),
		author: (dom) =>
			[...dom.window.document.querySelectorAll("p.news__author")].map((a) =>
				a.textContent.replaceAll("\t", "").replaceAll("Por\n", "").trim()
			),
	};

	#article_algortihms = {
		title: (dom) =>
			[...dom.window.document.querySelectorAll("h1.newsfull__title")].map(
				(a) => a.textContent
			),
		date: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.newsfull__meta > time.newsfull__time"
				),
			].map((a) => a.textContent),
		author: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.newsfull__line > p.newsfull__author > a"
				),
			].map((a) => a.textContent.trim()),
		text: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.newsfull__excerpt > h2, div.newsfull__body > p"
				),
			].map((div) => div.textContent),
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

//const frontera = new Frontera();

//console.log(await frontera.prearticlesAll()());
//console.log(await frontera.prearticlesTitles());
//console.log(await frontera.prearticlesAuthors());

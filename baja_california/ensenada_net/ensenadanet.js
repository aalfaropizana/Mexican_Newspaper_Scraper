import path from "path";
import { fileURLToPath } from "url";

import Url from "../../url.js";
import Newspaper from "../../newspaper.js";

export default class EnsenadaNet extends Newspaper {
	#__filename = fileURLToPath(import.meta.url);
	#__dirname = path.dirname(this.#__filename);
	#path = this.#__dirname;
	#state = "Baja California";
	#name = "ENSENADA NET";
	#baseUrl = "https://www.ensenada.net/";
	#url = new Url({
		base: `${this.#baseUrl}noticias/?pagina=`,
		maxPages: 5161,
		end: "&size=9&publication=3%2C1",
	});
	scrapped = true;
	working = true;
	online = true;

	#preArticle_algortihms = {
		all_articles: (dom) =>
			[...dom.window.document.querySelectorAll("span.tituloNota")].length,
		title: (dom) =>
			[...dom.window.document.querySelectorAll("span.tituloNota")].map(
				(a) => a.textContent
			),
		url: (dom) =>
			[...dom.window.document.querySelectorAll("td > a")]
				.map(
					(a) => "https://www.ensenada.net/noticias/" + a.getAttribute("href")
				)
				.splice(0, 2),
		preview: (dom) =>
			[...dom.window.document.querySelectorAll("span.textoNoticias")].map(
				(div) => div.textContent
			),
		date: (dom) =>
			[...dom.window.document.querySelectorAll("span.fechaNota")].map((time) =>
				time.textContent.replaceAll("Nota publicada el ", "")
			),
	};

	#article_algortihms = {
		title: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.encabezadoNota > p.tituloNota"
				),
			].map((a) => a.textContent),
		date: (dom) =>
			[...dom.window.document.querySelectorAll("span.fechaNota")].map((a) =>
				a.textContent.replace("Nota publicada el ", "")
			),
		author: (dom) =>
			[...dom.window.document.querySelectorAll("span.subtituloNoticias")].map(
				(a) => a.textContent.trim().replace("por ", "")
			),
		text: (dom) =>
			[
				...dom.window.document.querySelectorAll(
					"div.encabezadoNota > p.subtituloNota, span.textoNoticias"
				),
			]
				.map((div) => div.textContent.trim().split("\n"))
				.flat()
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

//const ensenadaNet = new EnsenadaNet();

//console.log(await ensenadaNet.prearticlesAll()());
//console.log(await ensenadaNet.prearticlesTitles());
//console.log(await ensenadaNet.prearticlesAuthors());

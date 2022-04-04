import { useEffect, useState } from "react";
import axios from "axios";

const flaskUrl = "https://taskbunnyapi.herokuapp.com";

export default function Quotes() {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");

	const fetchQuote = async () => {
		const data = await axios.get(`${flaskUrl}/quotes`);
		const quote = data.data;
		setAuthor(quote.author);
		setQuote(quote.en);
	};

	useEffect(() => {
		fetchQuote();
	}, []);

	return (
		<div class='col'>
			<br />
			<figure class='text-end'>
				<h1>Quote Of The Day</h1>
				<blockquote class='blockquote'>
					<p>{quote}</p>
				</blockquote>
				<figcaption class='blockquote-footer'>
					<p>{author}</p>
				</figcaption>
			</figure>
		</div>
	);
}

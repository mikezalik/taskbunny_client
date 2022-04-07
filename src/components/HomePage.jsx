import Quotes from "./Quotes";
import Tasks from "./Tasks";

import Clock from "./Clock";

export default function HomePage() {
	return (
		<div class='container'>
			<div class='row'>
				<div class='col'>
					<Tasks />
				</div>
				<div class='col'>
					<Quotes />
				</div>
				<div>
					<br />
					<Clock />
				</div>
			</div>
		</div>
	);
}

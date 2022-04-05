import React, { useEffect, useState } from "react";

// clock component
const Clock = (props) => {
	//sets state with new date object
	const [clock, setClock] = useState(new Date());

	useEffect(() => {
		//sets timer with 1 second interval
		const timer = setInterval(() => tick(), 1000);

		//stops interval
		return function cleanup() {
			clearInterval(timer);
		};
	});

	const tick = () => {
		setClock(new Date());
	};

	return (
		<div class='card'>
			<div className='card-body text-center'>
				<h1 className='card-title'>Current Time</h1>
				<h2 className='card-text'>{clock.toLocaleTimeString()}</h2>
			</div>
		</div>
	);
};

export default Clock;

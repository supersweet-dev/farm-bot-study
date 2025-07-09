import { useState } from 'react';

const Controls = () => {
	const clientId = 'farm-bot-study'; // You could make this configurable
	const birdsong = 'Alert-nature (birdsong) (5s).wav';
	const woodpeckerDrumming = 'Alert-nature (woodpecker-drumming) (5s).wav';
	const koel = 'Completed-nature (koel) (5s).wav';
	const sendAudioCommand = async (sound: string) => {
		console.log(`Sending audio command: ${sound} to client ${clientId}`);
		try {
			const response = await fetch('/api/send-audio', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ clientId, sound }),
			});
			console.log(
				`Audio command ${sound} sent successfully to client ${clientId}`
			);
			console.log(response);
			if (!response.ok) {
				throw new Error('Failed to send audio command');
			}
		} catch (error) {
			console.error('Error sending audio command:', error);
		}
	};

	return (
		<div className="robot-dashboard">
			<h1>🕹️ Control Panel</h1>

			<div className="button-group">
				<button
					onClick={() => sendAudioCommand(birdsong)}
					className="control-button"
				>
					Birdsong
				</button>

				<button
					onClick={() => sendAudioCommand(woodpeckerDrumming)}
					className="control-button"
				>
					Woodpecker Drumming
				</button>

				<button
					onClick={() => sendAudioCommand(koel)}
					className="control-button"
				>
					Koel
				</button>
			</div>
		</div>
	);
};

export default Controls;

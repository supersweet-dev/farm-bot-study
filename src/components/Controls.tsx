import { useState } from 'react';
import '../styles/dashboard.css';

const Controls = () => {
	const clientId = 'farm-bot-study';

	const sounds = [
		{
			type: 'Nature',
			label: 'Alert',
			className: 'nature',
			emoji: '🐦',
			file: 'Alert-nature (birdsong) (5s).wav',
		},
		{
			type: 'Nature',
			label: 'Completed',
			className: 'nature',
			emoji: '🕊️',
			file: 'Completed-nature (koel) (5s).wav',
		},
		{
			type: 'Nature',
			label: 'Idle',
			className: 'nature',
			emoji: '🌊',
			file: 'Idle-nature (Ocean_waves) (5s).wav',
		},
		{
			type: 'Trad',
			label: 'Alert',
			className: 'trad',
			emoji: '🚜',
			file: 'Alert-trad (forklift-reversing) (5s).wav',
		},
		{
			type: 'Trad',
			label: 'Completed',
			className: 'trad',
			emoji: '🖥️',
			file: 'Completed-trad (computer_notif) (5s).wav',
		},
		{
			type: 'Trad',
			label: 'Idle',
			className: 'trad',
			emoji: '🎶',
			file: 'Idle-trad (soft_hums) (5s).wav',
		},
	];

	const sendAudioCommand = async (sound: string) => {
		try {
			const response = await fetch('/api/send-audio', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ clientId, sound }),
			});
			if (!response.ok) throw new Error('Failed to send audio command');
			console.log(`Audio command ${sound} sent`);
		} catch (error) {
			console.error('Error sending audio command:', error);
		}
	};

	return (
		<div className="robot-dashboard">
			<h1>🕹️ Control Panel</h1>
			<div className="button-grid">
				{sounds.map(({ type, label, className, emoji, file }) => (
					<button
						key={file}
						onClick={() => sendAudioCommand(file)}
						className={`control-square ${className}`}
					>
						<span className="type">{type}</span>
						<span className="emoji">{emoji}</span>
						<span className="label">{label}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default Controls;

import { useState } from 'react';
import '../styles/dashboard.css';

const Controls = () => {
	const clientId = 'farm-bot-study';

	const sounds = [
		{
			label: 'Birdsong',
			emoji: '🐦',
			file: 'Alert-nature (birdsong) (5s).wav',
		},
		{
			label: 'Woodpecker',
			emoji: '🪵',
			file: 'Alert-nature (woodpecker-drumming) (5s).wav',
		},
		{
			label: 'Koel',
			emoji: '🕊️',
			file: 'Completed-nature (koel) (5s).wav',
		},
		{
			label: 'Forklift',
			emoji: '🚜',
			file: 'Alert-trad (forklift-reversing) (5s).wav',
		},
		{
			label: 'Owl',
			emoji: '🦉',
			file: 'Completed-nature (owl_hooting) (5s).wav',
		},
		{
			label: 'Chimes',
			emoji: '🔔',
			file: 'Completed-nature (wind_chimes).wav',
		},
		{
			label: 'Beep 1',
			emoji: '🔊',
			file: 'Completed-trad (beep) (5s).wav',
		},
		{
			label: 'Beep 2',
			emoji: '🔊',
			file: 'Completed-trad (beep).wav',
		},
		{
			label: 'Cricket',
			emoji: '🦗',
			file: 'Idle-nature (field_cricket) (5s).wav',
		},
		{
			label: 'Waves',
			emoji: '🌊',
			file: 'Idle-nature (Ocean_waves) (5s).wav',
		},
		{
			label: 'Wind',
			emoji: '🍃',
			file: 'Idle-nature (wind) (5s).wav',
		},
		{
			label: 'Hums',
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
				{sounds.map(({ label, emoji, file }) => (
					<button
						key={file}
						onClick={() => sendAudioCommand(file)}
						className="control-square"
					>
						<span className="emoji">{emoji}</span>
						<span className="label">{label}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default Controls;

import { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';

const ClientDisplay = () => {
	const [clientId] = useState('farm-bot-study');
	const [ready, setReady] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (!ready || !audioRef.current) return;

		const pusher = new Pusher(import.meta.env.PUBLIC_PUSHER_KEY, {
			cluster: import.meta.env.PUBLIC_PUSHER_CLUSTER,
			forceTLS: true,
			enabledTransports: ['ws', 'wss'],
		});

		const channel = pusher.subscribe(clientId);

		channel.bind('play-audio', (data: any) => {
			console.log('🔊 Received play-audio:', data);

			if (audioRef.current) {
				audioRef.current.src = `/audio/${data.sound}`;
				audioRef.current.play().catch((err) => {
					console.error('Audio playback failed:', err);
				});
			}
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
			pusher.disconnect();
		};
	}, [ready, clientId]);

	return (
		<div className="client-display">
			<img src="/robot-face.png" width="200" alt="Robot Face" />
			{!ready && (
				<button
					onClick={() => {
						if (audioRef.current) {
							// "Unlock" autoplay by playing a silent sound
							audioRef.current.src = '/audio/silence.mp3'; // use a real silent file
							audioRef.current.play().catch(() => {});
						}
						setReady(true);
					}}
					style={{ marginTop: '1rem', fontSize: '1.2rem' }}
				>
					Start Session
				</button>
			)}
			{/* Hidden persistent audio element */}
			<audio ref={audioRef} style={{ display: 'none' }} />
		</div>
	);
};

export default ClientDisplay;

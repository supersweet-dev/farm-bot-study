import { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';

const ClientDisplay = () => {
	const [clientId] = useState('farm-bot-study');
	const [ready, setReady] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const wakeLockRef = useRef<WakeLockSentinel | null>(null);

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

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (
				document.visibilityState === 'visible' &&
				wakeLockRef.current == null
			) {
				requestWakeLock();
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange
			);
		};
	}, []);

	const requestWakeLock = async () => {
		try {
			if ('wakeLock' in navigator) {
				wakeLockRef.current = await (navigator as any).wakeLock.request(
					'screen'
				);
				console.log('Wake lock acquired');
			}
		} catch (err) {
			console.warn('Wake lock failed:', err);
		}
	};

	const requestFullscreen = () => {
		const element = document.documentElement;

		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if ((element as any).webkitRequestFullscreen) {
			(element as any).webkitRequestFullscreen();
		} else if ((element as any).mozRequestFullScreen) {
			(element as any).mozRequestFullScreen();
		} else if ((element as any).msRequestFullscreen) {
			(element as any).msRequestFullscreen();
		}
	};

	const handleStart = async () => {
		requestFullscreen();
		await requestWakeLock();

		if (audioRef.current) {
			audioRef.current.src = '/audio/silence.mp3';
			await audioRef.current.play().catch(() => {});
		}

		setReady(true);
	};

	return (
		<div className={`client-display ${ready ? 'ready' : ''}`}>
			{!ready ? (
				<div className="prompt">
					<img
						src="/robot-face.png"
						alt="Robot Face"
						className="robot-prompt"
					/>
					<button className="start-button" onClick={handleStart}>
						Start Session
					</button>
				</div>
			) : (
				<img
					src="/robot-face.png"
					className="robot-fullscreen"
					alt="Robot Face Fullscreen"
				/>
			)}

			<audio ref={audioRef} style={{ display: 'none' }} />
		</div>
	);
};

export default ClientDisplay;

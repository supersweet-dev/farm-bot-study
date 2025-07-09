self.addEventListener('message', (event) => {
	if (event.data.type === 'PLAY_AUDIO') {
		const audio = new Audio(`/audio/${event.data.sound}`);
		audio
			.play()
			.catch((e) => console.error('Service worker audio error:', e));
	}
});

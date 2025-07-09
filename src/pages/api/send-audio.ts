import type { APIRoute } from 'astro';
import Pusher from 'pusher';

const pusher = new Pusher({
	appId: import.meta.env.pusher_app_id,
	key: import.meta.env.pusher_key,
	secret: import.meta.env.pusher_secret,
	cluster: import.meta.env.pusher_cluster,
	useTLS: true,
});

export const POST: APIRoute = async ({ request }) => {
	console.log('Received request to send audio command');
	const { clientId, sound } = await request.json();

	const channelName = clientId;
	const eventName = 'play-audio';

	await pusher.trigger(channelName, eventName, { sound });

	console.log(
		`Triggered '${eventName}' on '${channelName}' with sound:`,
		sound
	);
	return new Response(JSON.stringify({ success: true }));
};

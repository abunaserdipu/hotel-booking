import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Type declarations to fix the TypeScript errors
declare global {
    interface Window {
        Pusher: typeof Pusher;
        // Corrected: The Echo type should not be generic
        Echo: any;
    }
}

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

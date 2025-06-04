export const fetchData = async () => {
    try {
        const response = await fetch('/api/data'); // Adjust the endpoint as necessary
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const subscribeToDataUpdates = (callback) => {
    const socket = new WebSocket('ws://your-websocket-url'); // Replace with your WebSocket URL

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };
};
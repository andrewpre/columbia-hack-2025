import { useState, useEffect, useCallback } from "react";

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);

    return () => ws.close();
  }, [url]);

  const sendMessage = useCallback(
    (message) => {
      if (socket && isConnected) {
        socket.send(JSON.stringify(message));
      }
    },
    [socket, isConnected]
  );

  return { isConnected, sendMessage };
};

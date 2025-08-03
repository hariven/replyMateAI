// memory.ts
const userMemory: Record<string, any[]> = {};

export function addMessageToMemory(userID: string, role: string, content: string) {
    if (!userMemory[userID]) userMemory[userID] = [];
    userMemory[userID].push({ role, content });

    // Optional: Limit memory length to last 20 messages
    if (userMemory[userID].length > 20) {
        userMemory[userID].shift();
    }
}

export function getUserMemory(userID: string) {
    return userMemory[userID] || [];
}

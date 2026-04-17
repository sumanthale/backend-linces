# Real-Time Chat System - Complete Integration Guide

## Overview
This is a complete real-time chat system between customers/brands and admin. The backend is complete with REST APIs and Socket.io integration. This prompt covers frontend implementation.

---

## Backend Architecture (ALREADY IMPLEMENTED)

### Database Models
```
User (existing)
├── id (Int, PK)
├── email (String, unique)
├── password (String)
├── name (String)
├── accountType (String: admin | customer | brand)
├── createdAt (DateTime)
└── Relations:
    ├── chat: Chat? (one 1:1 chat)
    ├── adminChats: Chat[] (admin sees all)
    └── sentMessages: Message[]

Chat (NEW)
├── id (Int, PK)
├── userId (Int, unique)
├── adminId (Int)
├── createdAt (DateTime)
└── Relations:
    ├── user: User
    ├── admin: User
    └── messages: Message[]

Message (NEW)
├── id (Int, PK)
├── chatId (Int)
├── senderId (Int)
├── text (String)
├── createdAt (DateTime)
└── Relations:
    ├── chat: Chat
    └── sender: User
```

### REST API Endpoints (Socket.io enabled server on same port)

#### 1. Initialize or Fetch Chat
```
POST /api/chat/init
Auth: Required (Bearer token)
Body: None
Response:
{
  success: true,
  data: {
    id: 1,
    userId: 2,
    adminId: 1,
    createdAt: "2026-04-17T..."
  }
}
```

#### 2. Get User's Chat
```
GET /api/chat/me
Auth: Required (Bearer token)
Response:
{
  success: true,
  data: {
    id: 1,
    userId: 2,
    adminId: 1,
    createdAt: "2026-04-17T...",
    admin: {
      id: 1,
      name: "Admin Name",
      email: "admin@example.com"
    }
  }
}
```

#### 3. Get Chat Messages (Paginated)
```
GET /api/chat/:chatId/messages?page=1&limit=30
Auth: Required (Bearer token)
Response:
{
  success: true,
  data: [
    {
      id: 1,
      chatId: 1,
      senderId: 2,
      text: "Hello admin",
      createdAt: "2026-04-17T...",
      sender: {
        id: 2,
        name: "Customer Name",
        accountType: "customer"
      }
    },
    ...
  ],
  pagination: {
    page: 1,
    limit: 30,
    total: 100,
    pages: 4
  }
}
```

#### 4. Admin Get All Chats
```
GET /api/chat/all
Auth: Required (Bearer token, admin only)
Response:
{
  success: true,
  data: [
    {
      id: 1,
      userId: 2,
      adminId: 1,
      createdAt: "2026-04-17T...",
      user: {
        id: 2,
        name: "Customer Name",
        email: "customer@example.com",
        accountType: "customer"
      },
      messages: [
        {
          id: 5,
          chatId: 1,
          senderId: 1,
          text: "Last message",
          createdAt: "2026-04-17T..."
        }
      ]
    },
    ...
  ]
}
```

### Socket.io Integration

#### Server Configuration
- CORS enabled for all origins
- Requires JWT token in auth (optional, can be added)
- Rooms: `chat_{chatId}`

#### Events

**Client → Server:**
```javascript
// 1. Join Chat Room (emit after initialization)
socket.emit('join_chat', { chatId: 1 });

// 2. Send Message
socket.emit('send_message', {
  chatId: 1,
  senderId: 2,
  text: "User message here"
});
```

**Server → Client:**
```javascript
// 1. Receive Message (real-time)
socket.on('receive_message', (message) => {
  // message: { id, chatId, senderId, text, createdAt, sender: { id, name, accountType } }
  // Append to messages state
});

// 2. Error
socket.on('error', ({ message }) => {
  // Handle error
});
```

---

## Frontend Implementation Requirements

### Tech Stack
- React (existing project)
- Socket.io client
- Axios/fetch for REST APIs
- Context API or Redux for state management

### Core Components

#### 1. Chat Page (`src/pages/ChatPage.jsx`)
**Purpose**: Full-screen chat interface
**Props**: None (uses auth context for user info)
**State**:
- `chat` - current chat object { id, userId, adminId, ... }
- `messages` - array of messages
- `inputValue` - current text input
- `loading` - loading state
- `error` - error message

**Features**:
- Fetch chat on mount (POST /api/chat/init, then GET /api/chat/me)
- Connect to Socket.io on mount
- Emit join_chat after chat is fetched
- Listen for receive_message events
- Auto-scroll to latest message
- Pagination support (optional)

**Layout**:
```
┌─────────────────────────────┐
│  Chat with Admin            │  (Header)
├─────────────────────────────┤
│                             │
│  (Messages Container)       │  (Scrollable)
│  - MessageBubble x N        │
│                             │
├─────────────────────────────┤
│  [Text Input] [Send Button] │  (Input Box)
└─────────────────────────────┘
```

#### 2. Message Bubble Component (`src/components/MessageBubble.jsx`)
**Props**:
```javascript
{
  message: {
    id,
    text,
    createdAt,
    sender: { id, name, accountType }
  },
  currentUserId: number
}
```

**Styling**:
- Right-aligned if `sender.id === currentUserId` (user message)
- Left-aligned if `sender.id !== currentUserId` (admin message)
- Show sender name (optional for user messages)
- Show timestamp
- Different background colors (user vs admin)

#### 3. Chat Input Component (`src/components/ChatInput.jsx`)
**Props**:
```javascript
{
  value: string,
  onChange: (text) => void,
  onSend: () => void,
  disabled: boolean
}
```

**Features**:
- Text input field
- Send button (with loading state)
- Enter key sends message
- Clear input after send
- Disable while loading

#### 4. Chat Floating Button / Modal
**Purpose**: Toggle chat visibility (optional, can be simple page)
**Options**:
a) **Simple**: Just make ChatPage a regular page at `/chat`
b) **Advanced**: Add floating button with modal overlay

---

### State Management

#### Chat Context (Recommended)
```javascript
{
  chat: object | null,
  messages: array,
  loading: boolean,
  error: string | null,
  socket: SocketIO instance,

  // Methods
  initChat: async () => { /* POST /chat/init */ },
  fetchMessages: async (chatId, page) => { /* GET /chat/:chatId/messages */ },
  sendMessage: (text) => { /* emit send_message */ },
  loadMoreMessages: (page) => { /* pagination */ }
}
```

Or use `useChat` custom hook:
```javascript
const {
  chat,
  messages,
  loading,
  sendMessage
} = useChat();
```

---

### Integration Steps

#### Step 1: Install Dependencies
```bash
npm install socket.io-client
```

#### Step 2: Create Socket Hook (`src/hooks/useSocket.js`)
```javascript
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (token) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_URL, {
      auth: { token }
    });
    return () => socketRef.current?.disconnect();
  }, [token]);

  return socketRef.current;
};
```

#### Step 3: Create Chat Hook (`src/hooks/useChat.js`)
```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSocket } from './useSocket';
import { useAuth } from './useAuth'; // existing auth context

export const useChat = () => {
  const { user, token } = useAuth();
  const socket = useSocket(token);

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize chat
  const initChat = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat/init`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChat(res.data.data);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to init chat');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages
  const fetchMessages = async (chatId, page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/chat/${chatId}/messages?page=${page}&limit=30`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data.data);
      return res.data.pagination;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = (text) => {
    if (!chat || !text.trim()) return;
    socket?.emit('send_message', {
      chatId: chat.id,
      senderId: user.id,
      text: text.trim()
    });
  };

  // Listen for messages
  useEffect(() => {
    socket?.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    return () => socket?.off('receive_message');
  }, [socket]);

  // Join chat room on init
  useEffect(() => {
    if (chat?.id) {
      socket?.emit('join_chat', { chatId: chat.id });
    }
  }, [chat, socket]);

  // Initialize on mount
  useEffect(() => {
    initChat().then(newChat => {
      if (newChat) fetchMessages(newChat.id);
    });
  }, []);

  return {
    chat,
    messages,
    loading,
    error,
    sendMessage,
    fetchMessages
  };
};
```

#### Step 4: Create ChatPage Component
```javascript
// src/pages/ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import '../styles/ChatPage.css';

export default function ChatPage() {
  const { chat, messages, loading, error, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  if (loading && !chat) return <div className="chat-loading">Loading chat...</div>;
  if (error) return <div className="chat-error">Error: {error}</div>;
  if (!chat) return <div className="chat-error">Failed to initialize chat</div>;

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chat with Admin</h2>
        <p className="admin-info">Admin: {chat.admin?.name}</p>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="no-messages">Start a conversation</div>
        )}
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === chat.userId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        disabled={loading}
      />
    </div>
  );
}
```

#### Step 5: Create MessageBubble Component
```javascript
// src/components/MessageBubble.jsx
import React from 'react';
import '../styles/MessageBubble.css';

export default function MessageBubble({ message, isOwnMessage }) {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`message-bubble ${isOwnMessage ? 'own' : 'other'}`}>
      {!isOwnMessage && <p className="sender-name">{message.sender?.name}</p>}
      <p className="message-text">{message.text}</p>
      <span className="message-time">{formatTime(message.createdAt)}</span>
    </div>
  );
}
```

#### Step 6: Create ChatInput Component
```javascript
// src/components/ChatInput.jsx
import React from 'react';
import '../styles/ChatInput.css';

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        disabled={disabled}
        className="message-input"
        rows="3"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="send-button"
      >
        {disabled ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
```

---

### CSS Styling

#### ChatPage.css
```css
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom, #f5f5f5, #fafafa);
}

.chat-header {
  padding: 20px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.chat-header h2 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #333;
}

.admin-info {
  margin: 0;
  font-size: 13px;
  color: #999;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.no-messages {
  text-align: center;
  color: #ccc;
  margin-top: auto;
  padding: 40px 20px;
}

.chat-loading, .chat-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 16px;
  color: #666;
}

.chat-error {
  color: #d32f2f;
}
```

#### MessageBubble.css
```css
.message-bubble {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  word-wrap: break-word;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-bubble.own {
  align-self: flex-end;
}

.message-bubble.other {
  align-self: flex-start;
}

.sender-name {
  font-size: 12px;
  color: #666;
  margin: 0 0 4px 0;
  font-weight: 500;
}

.message-text {
  padding: 12px 16px;
  border-radius: 8px;
  margin: 0;
  line-height: 1.4;
  font-size: 14px;
}

.message-bubble.own .message-text {
  background: #007bff;
  color: white;
  border-radius: 18px 18px 4px 18px;
}

.message-bubble.other .message-text {
  background: #e9ecef;
  color: #333;
  border-radius: 18px 18px 18px 4px;
}

.message-time {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
  padding: 0 8px;
}

.message-bubble.own .message-time {
  text-align: right;
}
```

#### ChatInput.css
```css
.chat-input-container {
  padding: 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-family: inherit;
  font-size: 14px;
  resize: none;
  max-height: 100px;
}

.message-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.message-input:disabled {
  background: #f5f5f5;
  color: #ccc;
}

.send-button {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.send-button:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.send-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
```

---

### Environment Variables (.env)
```
REACT_APP_API_URL=http://localhost:3000
```

---

### Optional Enhancements
1. **Typing Indicator**: Emit "user_typing" event
2. **Message Timestamps**: Already included in MessageBubble
3. **Retry on Failed Send**: Implement queue mechanism
4. **Infinite Scroll**: Use pagination with page state
5. **Read Receipts**: Add isRead field to Message model
6. **User Online Status**: Track socket connections

---

### Integration Checklist
- [ ] Install socket.io-client
- [ ] Create useSocket hook
- [ ] Create useChat hook
- [ ] Create ChatPage component
- [ ] Create MessageBubble component
- [ ] Create ChatInput component
- [ ] Add CSS styling
- [ ] Add route to ChatPage
- [ ] Set environment variables
- [ ] Test REST API endpoints
- [ ] Test Socket.io connection and messaging
- [ ] Test real-time message delivery
- [ ] Test pagination (optional)

---

### Testing Guide

#### REST API Testing (Postman/cURL)
```bash
# 1. Init Chat
curl -X POST http://localhost:3000/api/chat/init \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"

# 2. Get My Chat
curl -X GET http://localhost:3000/api/chat/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# 3. Get Messages
curl -X GET "http://localhost:3000/api/chat/1/messages?page=1&limit=30" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# 4. Admin Get All Chats (admin token required)
curl -X GET http://localhost:3000/api/chat/all \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

#### Socket.io Testing (Browser Console)
```javascript
// Connect and test
const socket = io('http://localhost:3000');

// Join chat
socket.emit('join_chat', { chatId: 1 });

// Send message
socket.emit('send_message', {
  chatId: 1,
  senderId: 2,
  text: 'Test message'
});

// Listen
socket.on('receive_message', (msg) => console.log(msg));
socket.on('error', (err) => console.error(err));
```

---

## Summary
Backend is fully implemented with:
- ✅ Database models (Chat, Message, User relations)
- ✅ REST APIs (init, fetch, get all, pagination)
- ✅ Socket.io integration (join, send, receive)
- ✅ CORS enabled for frontend
- ✅ Error handling and validation

Frontend needs:
- React components (ChatPage, MessageBubble, ChatInput)
- Custom hooks (useSocket, useChat)
- Socket.io client integration
- CSS styling
- Route configuration

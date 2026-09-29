import { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical, ArrowLeft, CheckCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
  project?: string;
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    online: true,
    lastMessage: 'I have just sent the latest mockups. Let me know what you think!',
    lastTime: '2m',
    unread: 2,
    project: 'React SaaS Dashboard',
    messages: [
      { id: 1, text: 'Hi! Thanks for accepting my proposal. I am excited to work on this project!', sender: 'them', time: '10:30 AM', read: true },
      { id: 2, text: 'Great to have you on board, Sarah. Looking forward to the results!', sender: 'me', time: '10:32 AM', read: true },
      { id: 3, text: 'I have started working on the initial design. Here is what I have so far.', sender: 'them', time: '11:15 AM', read: true },
      { id: 4, text: 'Looks amazing! The color scheme is perfect.', sender: 'me', time: '11:20 AM', read: true },
      { id: 5, text: 'I have just sent the latest mockups. Let me know what you think!', sender: 'them', time: '11:45 AM', read: false },
    ],
  },
  {
    id: 'c2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    online: true,
    lastMessage: 'The logo files are ready for download.',
    lastTime: '1h',
    unread: 0,
    project: 'Brand Identity Design',
    messages: [
      { id: 1, text: 'Hey Marcus, I need a logo for my coffee startup.', sender: 'me', time: 'Yesterday', read: true },
      { id: 2, text: 'I would love to help! Tell me more about your brand.', sender: 'them', time: 'Yesterday', read: true },
      { id: 3, text: 'The logo files are ready for download.', sender: 'them', time: '1h ago', read: true },
    ],
  },
  {
    id: 'c3',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    online: false,
    lastMessage: 'I will send the SEO audit report by tomorrow.',
    lastTime: '5h',
    unread: 0,
    project: 'SEO Optimization',
    messages: [
      { id: 1, text: 'Can you optimize our Shopify store for SEO?', sender: 'me', time: '2 days ago', read: true },
      { id: 2, text: 'Absolutely! I will start with a full audit.', sender: 'them', time: '2 days ago', read: true },
      { id: 3, text: 'I will send the SEO audit report by tomorrow.', sender: 'them', time: '5h ago', read: true },
    ],
  },
  {
    id: 'c4',
    name: 'James Anderson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    online: false,
    lastMessage: 'The app is now live on the App Store!',
    lastTime: '1d',
    unread: 1,
    project: 'Fitness Mobile App',
    messages: [
      { id: 1, text: 'The app is now live on the App Store!', sender: 'them', time: '1d ago', read: false },
    ],
  },
];

export function ChatPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialConversations[0].id);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, active.messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const newMsg: Message = { id: Date.now(), text: input, sender: 'me', time: now, read: false };
    setConversations((prev) => prev.map((c) =>
      c.id === activeId
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: input, lastTime: 'now', unread: 0 }
        : c
    ));
    setInput('');

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const replies = ['Got it! Let me check and get back to you.', 'Sure, that works for me!', 'I will have that ready soon.', 'Thanks for the update!'];
      const reply: Message = {
        id: Date.now() + 1,
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'them',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        read: false,
      };
      setConversations((prev) => prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text, lastTime: 'now' }
          : c
      ));
    }, 1800);
  };

  const openChat = (id: string) => {
    setActiveId(id);
    setShowMobileChat(true);
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, unread: 0 } : c));
  };

  const filtered = conversations.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-ink-900 dark:text-white mb-4">Please sign in to view messages</h1>
          <button onClick={() => navigate('/login')} className="text-primary-600 dark:text-primary-400 font-semibold">Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 py-0 sm:py-6">
      <div className="glass-strong rounded-none sm:rounded-2xl overflow-hidden h-[calc(100vh-4rem)] sm:h-[calc(100vh-8rem)] flex">
        {/* Conversation list */}
        <div className={cn('w-full sm:w-80 border-r border-ink-200 dark:border-ink-800 flex flex-col', showMobileChat && 'hidden sm:flex')}>
          <div className="p-4 border-b border-ink-200 dark:border-ink-800">
            <h1 className="font-display text-xl font-bold text-ink-900 dark:text-white mb-3">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full h-9 rounded-lg bg-ink-100 dark:bg-ink-800 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => openChat(c.id)}
                className={cn(
                  'w-full flex items-start gap-3 p-3 border-b border-ink-100 dark:border-ink-800/50 transition-colors text-left',
                  activeId === c.id ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-ink-100/50 dark:hover:bg-ink-800/30'
                )}
              >
                <Avatar name={c.name} src={c.avatar} size="md" online={c.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-sm text-ink-900 dark:text-ink-50 truncate">{c.name}</span>
                    <span className="text-[10px] text-ink-400 shrink-0">{c.lastTime}</span>
                  </div>
                  {c.project && <p className="text-[10px] text-primary-600 dark:text-primary-400 mb-0.5 truncate">{c.project}</p>}
                  <p className="text-xs text-ink-500 dark:text-ink-400 line-clamp-1">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className={cn('flex-1 flex flex-col', !showMobileChat && 'hidden sm:flex')}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-ink-200 dark:border-ink-800">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMobileChat(false)} className="sm:hidden text-ink-400">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Avatar name={active.name} src={active.avatar} size="md" online={active.online} />
              <div>
                <p className="font-semibold text-sm text-ink-900 dark:text-ink-50">{active.name}</p>
                <p className="text-xs text-emerald-500">{active.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
                <Phone className="w-4.5 h-4.5" />
              </button>
              <button className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
                <Video className="w-4.5 h-4.5" />
              </button>
              <button className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
                <MoreVertical className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Project badge */}
          {active.project && (
            <div className="px-4 py-2 bg-primary-50/50 dark:bg-primary-900/10 border-b border-ink-200 dark:border-ink-800">
              <Badge variant="primary">{active.project}</Badge>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3 bg-ink-50/30 dark:bg-ink-950/30">
            {active.messages.map((msg) => (
              <div key={msg.id} className={cn('flex', msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2.5',
                  msg.sender === 'me'
                    ? 'bg-primary-600 text-white rounded-br-md'
                    : 'glass-strong text-ink-800 dark:text-ink-100 rounded-bl-md'
                )}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={cn('flex items-center gap-1 mt-1', msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                    <span className={cn('text-[10px]', msg.sender === 'me' ? 'text-primary-200' : 'text-ink-400')}>{msg.time}</span>
                    {msg.sender === 'me' && <CheckCheck className={cn('w-3 h-3', msg.read ? 'text-primary-200' : 'text-primary-300/50')} />}
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="glass-strong rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-ink-200 dark:border-ink-800">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Type a message..."
                  className="w-full h-11 rounded-xl bg-ink-100 dark:bg-ink-800 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary-500/20"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={send}
                disabled={!input.trim()}
                className="w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-40 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

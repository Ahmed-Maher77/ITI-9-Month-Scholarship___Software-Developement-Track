import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import {
    Bot,
    Send,
    Sparkles,
    Zap,
    Clock,
    ThermometerSnowflake,
    Lightbulb,
    Wifi,
    WifiOff,
    Loader2,
    AlertCircle,
    ChevronDown,
    Check,
    Power,
    BarChart3,
    Gauge,
    Layers,
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import UserAvatar from '../components/common/UserAvatar';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../store/auth/authSlice';
import { fetchSimulations } from '../store/simulations/simulationSlice';
import simulationService from '../services/simulationService';

const intentIcons = {
    toggle_device: Power,
    query_state: Gauge,
    advise: Lightbulb,
    what_if: BarChart3,
    query_prediction: Layers,
};

const AiAdvisorPage = () => {
    const { t } = useTranslation();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const chatEndRef = useRef(null);

    const { simulations } = useSelector(state => state.simulations);

    const [message, setMessage] = useState('');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false);
    const [selectedSimId, setSelectedSimId] = useState(null);
    const [simDropdownOpen, setSimDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchSimulations());
    }, [dispatch]);

    const selectedSim = useMemo(() => {
        if (!selectedSimId && simulations.length > 0) {
            setSelectedSimId(simulations[0].id);
            return simulations[0];
        }
        return simulations.find(s => s.id === selectedSimId) || null;
    }, [simulations, selectedSimId]);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text) => {
        const msg = (text || message).trim();
        if (!msg || sending || !selectedSim) return;

        const msgId = Date.now().toString();
        setMessages(prev => [...prev, { id: Number(msgId), sender: 'user', text: msg }]);
        setMessage('');
        setSending(true);

        try {
            const result = await simulationService.chat(selectedSim.id, msg, msgId);
            if (result.coins !== undefined) {
                dispatch(setUser({ ...user, coins: result.coins, rolloverCoins: result.rolloverCoins }));
            }
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: result.reply,
                intent: result.intent,
                actionTaken: result.actionTaken,
                actionResult: result.actionResult,
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: error.message || t('aiAdvisor.error', 'Sorry, something went wrong. Please try again.'),
                isError: true,
            }]);
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const SUGGESTED_QUESTIONS = [
        t('aiAdvisor.suggestedQuestions.q1'),
        t('aiAdvisor.suggestedQuestions.q2'),
        t('aiAdvisor.suggestedQuestions.q3'),
        t('aiAdvisor.suggestedQuestions.q4'),
    ];

    const SAVINGS_OPPORTUNITIES = [
        {
            title: t('aiAdvisor.savings.optAC.title'),
            action: t('aiAdvisor.savings.optAC.action'),
            impact: t('aiAdvisor.savings.impactHigh'),
            savings: t('aiAdvisor.savings.optAC.savings'),
            icon: ThermometerSnowflake,
            color: "text-kashf-light-blue",
            bg: "bg-kashf-blue/10",
        },
        {
            title: t('aiAdvisor.savings.shiftHeater.title'),
            action: t('aiAdvisor.savings.shiftHeater.action'),
            impact: t('aiAdvisor.savings.impactHigh'),
            savings: t('aiAdvisor.savings.shiftHeater.savings'),
            icon: Zap,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
        },
        {
            title: t('aiAdvisor.savings.standbyPower.title'),
            action: t('aiAdvisor.savings.standbyPower.action'),
            impact: t('aiAdvisor.savings.impactLow'),
            savings: t('aiAdvisor.savings.standbyPower.savings'),
            icon: Clock,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
        },
    ];

    const hasMessages = messages.length > 0;

    return (
        <>
            <Helmet>
                <title>المستشار الذكي — كشف</title>
                <meta name="description" content="تحدث مع مساعد كشف الذكي — احصل على نصائح لتوفير الطاقة، توقع الشريحة، وحاكي سيناريوهات what-if." />
            </Helmet>
            <div className="space-y-6 max-w-7xl mx-auto pb-10 min-h-[calc(100vh-100px)] flex flex-col relative">
            {/* Header */}
            <PageHeader
                icon={Bot}
                title={t('aiAdvisor.title')}
                subtitle={t('aiAdvisor.subtitle')}
            >
                <div className="flex items-center gap-3">
                    {/* Simulation selector */}
                    <div className="relative">
                        <button
                            onClick={() => setSimDropdownOpen(!simDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-neutral-300 hover:text-white transition-colors"
                        >
                            <Zap className="size-3.5 text-kashf-blue" />
                            <span className="truncate max-w-28">
                                {selectedSim ? selectedSim.name : t('aiAdvisor.selectSim', 'Select Simulation')}
                            </span>
                            <ChevronDown className="size-3" />
                        </button>
                        {simDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setSimDropdownOpen(false)} />
                                <div className="absolute left-0 top-full mt-1 z-20 w-56 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl overflow-hidden">
                                    {simulations.length === 0 ? (
                                        <p className="p-3 text-xs text-neutral-500 text-center">{t('aiAdvisor.noSims', 'No simulations found')}</p>
                                    ) : (
                                        simulations.map(sim => (
                                            <button
                                                key={sim.id}
                                                onClick={() => { setSelectedSimId(sim.id); setSimDropdownOpen(false); }}
                                                className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-neutral-300 hover:bg-neutral-800 transition-colors text-right"
                                            >
                                                <span className={`size-1.5 rounded-full ${sim.id === selectedSimId ? 'bg-kashf-blue' : 'bg-neutral-600'}`} />
                                                <span className="flex-1 truncate">{sim.name}</span>
                                                {sim.id === selectedSimId && <Check className="size-3 text-kashf-blue shrink-0" />}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 ${isOnline ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isOnline ? <Wifi className="size-4" /> : <WifiOff className="size-4" />}
                        <span className="text-xs font-medium">
                            {isOnline ? t('aiAdvisor.onlineStatus', 'Online') : t('aiAdvisor.offlineStatus', 'Offline')}
                        </span>
                    </div>
                </div>
            </PageHeader>

            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-3xl flex flex-col px-4 sm:px-0">
                    {/* Chat Messages */}
                    <div className="px-6 pt-6 pb-32 space-y-6">
                        {/* Welcome / empty state */}
                        {!hasMessages && !sending && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="size-16 rounded-full bg-kashf-blue/10 border border-kashf-blue/20 flex items-center justify-center mb-4">
                                    <Bot className="size-8 text-kashf-light-blue" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">
                                    {t('aiAdvisor.welcomeTitle', 'Ask Kashf AI')}
                                </h3>
                                <p className="text-sm text-neutral-400 max-w-md">
                                    {t('aiAdvisor.welcomeDesc', 'Send a message in Arabic or English. I can toggle devices, predict tiers, run what-if analysis, and give energy-saving advice.')}
                                </p>
                                {!selectedSim && (
                                    <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                                        <AlertCircle className="size-4 text-amber-400" />
                                        <p className="text-xs text-amber-400">{t('aiAdvisor.noSimWarning', 'Select a simulation from the dropdown above to start chatting.')}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className="shrink-0">
                                    {msg.sender === 'ai' ? (
                                        <div className="size-10 rounded-full bg-kashf-blue/20 border border-kashf-blue/30 flex items-center justify-center">
                                            <Bot className="size-5 text-kashf-light-blue" />
                                        </div>
                                    ) : (
                                        <UserAvatar user={user} className="size-10" />
                                    )}
                                </div>
                                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 shadow-sm space-y-2 ${
                                    msg.sender === 'user'
                                    ? 'bg-gradient-to-br from-kashf-light-blue to-kashf-blue text-kashf-bg rounded-tr-sm shadow-kashf-blue/20'
                                    : msg.isError
                                    ? 'bg-red-500/10 border border-red-500/30 text-red-300 rounded-tl-sm shadow-black/40'
                                    : 'bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 text-neutral-200 rounded-tl-sm shadow-black/40'
                                }`} dir="rtl">
                                    <p className={`text-sm sm:text-base leading-relaxed ${msg.sender === 'user' ? 'font-medium' : ''}`}>
                                        {msg.text}
                                    </p>

                                    {/* Intent badge */}
                                    {msg.intent && (
                                        <div className="flex items-center gap-1.5 pt-1">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800 text-[10px] text-neutral-400 border border-neutral-700">
                                                {React.createElement(intentIcons[msg.intent] || Zap, { className: 'size-3' })}
                                                {msg.intent.replace('_', ' ')}
                                            </span>
                                            {msg.actionTaken && (
                                                <span className="text-[10px] text-emerald-400">✓ {t('aiAdvisor.actionDone', 'done')}</span>
                                            )}
                                        </div>
                                    )}

                                    {/* Action result */}
                                    {msg.actionResult && (
                                        <div className="bg-neutral-800/60 border border-neutral-700/50 rounded-lg p-2.5 text-xs space-y-1">
                                            {msg.actionResult.device && (
                                                <p className="text-neutral-300">
                                                    <span className="text-neutral-500">{t('aiAdvisor.device', 'Device')}:</span> {msg.actionResult.device}
                                                </p>
                                            )}
                                            {msg.actionResult.isOn !== undefined && (
                                                <p className="text-neutral-300">
                                                    <span className="text-neutral-500">{t('aiAdvisor.state', 'State')}:</span>{' '}
                                                    <span className={msg.actionResult.isOn ? 'text-emerald-400' : 'text-neutral-400'}>
                                                        {msg.actionResult.isOn ? t('simulations.on', 'ON') : t('simulations.off', 'OFF')}
                                                    </span>
                                                </p>
                                            )}
                                            {msg.actionResult.loadW !== undefined && (
                                                <p className="text-neutral-300">
                                                    <span className="text-neutral-500">{t('aiAdvisor.load', 'Load')}:</span> {msg.actionResult.loadW}W
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {sending && (
                            <div className="flex gap-4">
                                <div className="shrink-0">
                                    <div className="size-10 rounded-full bg-kashf-blue/20 border border-kashf-blue/30 flex items-center justify-center">
                                        <Bot className="size-5 text-kashf-light-blue" />
                                    </div>
                                </div>
                                <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 text-neutral-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-2 rounded-full bg-kashf-blue animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="size-2 rounded-full bg-kashf-blue animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="size-2 rounded-full bg-kashf-blue animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Savings Opportunities */}
                    {!hasMessages && (
                        <div className="px-6">
                            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                <Sparkles className="size-4 text-kashf-blue" />
                                {t('aiAdvisor.activeOpportunities')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {SAVINGS_OPPORTUNITIES.map((opp, i) => {
                                    const Icon = opp.icon;
                                    return (
                                        <div key={i} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-2 hover:border-neutral-700 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-lg ${opp.bg} ${opp.color}`}>
                                                    <Icon className="size-4" />
                                                </div>
                                                <h4 className="text-sm font-bold text-white">{opp.title}</h4>
                                            </div>
                                            <p className="text-xs text-neutral-400 leading-relaxed">{opp.action}</p>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className={`font-medium ${opp.impact === 'High' || opp.impact === 'عالي' ? 'text-emerald-400' : 'text-neutral-400'}`}>
                                                    {t('aiAdvisor.impactLabel', { impact: opp.impact })}
                                                </span>
                                                <span className="text-kashf-light-blue font-bold">{opp.savings}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Chat Input Area */}
                    <div className="sticky bottom-0 pb-6 pt-12 shrink-0 mt-auto z-20 w-full bg-gradient-to-t from-[#121212] via-[#121212] to-transparent">
                        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-tight snap-x">
                            {hasMessages && SUGGESTED_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(q)}
                                    disabled={sending}
                                    className="shrink-0 snap-start px-4 py-2 bg-neutral-900/80 hover:bg-kashf-blue/10 border border-neutral-800 hover:border-kashf-blue/30 rounded-full text-xs text-neutral-300 hover:text-kashf-light-blue transition-all whitespace-nowrap shadow-sm backdrop-blur-md disabled:opacity-50"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                        <div className="relative group">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={selectedSim ? t('aiAdvisor.inputPlaceholder') : t('aiAdvisor.selectSimFirst', 'Select a simulation first')}
                                disabled={!selectedSim || sending}
                                className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-2xl ps-6 pe-14 py-4 focus:outline-none focus:border-kashf-blue/50 focus:bg-neutral-800 focus:ring-4 focus:ring-kashf-blue/10 transition-all placeholder:text-neutral-600 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!message.trim() || !selectedSim || sending}
                                className="absolute end-2 top-1/2 -translate-y-1/2 p-2.5 bg-kashf-blue group-focus-within:bg-kashf-light-blue hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-kashf-bg rounded-xl transition-all shadow-md"
                            >
                                {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4 -ms-0.5 mt-0.5" />}
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-neutral-500 mt-3 flex items-center justify-center gap-1">
                            <Sparkles className="size-3" />
                            {t('aiAdvisor.disclaimer')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AiAdvisorPage;
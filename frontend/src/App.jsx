import React, { useState } from 'react';

function App() {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);

  const analyzeSentiment = async () => {
    if (!emailText.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_text: emailText }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'from-emerald-400 to-emerald-600 shadow-emerald-500/30';
      case 'Negative': return 'from-rose-400 to-rose-600 shadow-rose-500/30';
      default: return 'from-amber-400 to-amber-600 shadow-amber-500/30';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Negative':
        return (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black tracking-tighter">
            <span className="text-gradient">Hiver</span> Sentiment
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Unlock the emotional intelligence of your inbox.
            <span className="block mt-1 text-slate-500">Powered by advanced AI analysis.</span>
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-1 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
          <div className="bg-slate-900/50 rounded-[22px] p-8 space-y-8 backdrop-blur-sm">
            <div className="space-y-4">
              <label htmlFor="email-content" className="block text-sm font-medium text-indigo-300 uppercase tracking-wider ml-1">
                Analyze Email
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-50 group-hover:opacity-100 transition duration-500 blur"></div>
                <textarea
                  id="email-content"
                  rows={6}
                  className="relative w-full bg-slate-900 text-slate-100 rounded-xl border border-slate-700 p-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder-slate-600 text-lg leading-relaxed resize-none shadow-inner"
                  placeholder="Paste the customer email here to reveal insights..."
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={analyzeSentiment}
              disabled={loading || !emailText.trim()}
              className={`w-full group relative flex justify-center py-4 px-4 border border-transparent rounded-xl text-base font-bold text-white overflow-hidden transition-all duration-300
                ${loading || !emailText.trim()
                  ? 'bg-slate-800 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/40 transform hover:-translate-y-0.5'}`}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {loading ? (
                <span className="flex items-center space-x-3">
                  <svg className="animate-spin h-5 w-5 text-indigo-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Intelligence...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Analyze Sentiment</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="glass-panel rounded-3xl overflow-hidden">
              <div className={`bg-gradient-to-r ${getSentimentColor(result.sentiment)} p-1`}>
                <div className="bg-slate-900/90 backdrop-blur-xl p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${getSentimentColor(result.sentiment)} shadow-lg`}>
                        {getSentimentIcon(result.sentiment)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Detected Sentiment</h3>
                        <p className="text-3xl font-bold text-white mt-1">{result.sentiment}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                      <div className="flex-1 md:flex-none bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider">Confidence</span>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-2xl font-bold text-white">{(result.confidence * 100).toFixed(1)}%</span>
                          <div className="h-1.5 w-16 bg-slate-700 rounded-full mb-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${getSentimentColor(result.sentiment)}`}
                              style={{ width: `${result.confidence * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 md:flex-none bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider">Model</span>
                        <span className="block text-xl font-bold text-white mt-1">{result.prompt_version}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-6">
                    <button
                      onClick={() => setShowReasoning(!showReasoning)}
                      className="group flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium focus:outline-none transition-colors"
                    >
                      <span className="mr-2">AI Reasoning Analysis</span>
                      <svg
                        className={`h-4 w-4 transform transition-transform duration-300 ${showReasoning ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className={`grid transition-all duration-300 ease-in-out ${showReasoning ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="p-5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-100 text-sm leading-relaxed font-light">
                          <div className="flex gap-3">
                            <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {result.reasoning}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import Header from '../components/Header';

const Chat: React.FC = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-200 min-h-[93vh] overflow-hidden flex items-center justify-center p-8 m-0">
        <div className="relative w-[min(90vw,480px)] h-[min(90vh,700px)] bg-white rounded-2xl shadow-2xl shadow-blue-500/40 border-2 border-blue-400 overflow-hidden min-w-[320px] min-h-[450px] z-[1000] hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/60 transition-all duration-300 hover:-translate-y-1 group">
          <iframe 
            src="https://widget.tiflux.com/?organization_token=582a9e7c57d9586f18448ac59facb9d764dbf6b8&mail=&name=&phone=&autoSend=false&extra_params=%22%7B%5C%22domain%5C%22:%5C%22129.121.39.130%5C%22%7D%22" 
            className="h-full w-full border-none rounded-t-xl"
          />
        </div>
      </div>
    </>
  );
};

export default Chat;


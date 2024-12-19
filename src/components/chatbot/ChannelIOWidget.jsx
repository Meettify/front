import React, { useEffect } from 'react';

const ChannelIOWidget = ({ pluginKey }) => {
  useEffect(() => {
    const loadChannelIO = () => {
      const w = window;

      // 이미 ChannelIO가 로드된 경우, 또는 초기화된 경우 skip
      if (w.ChannelIO && w.ChannelIOInitialized) {
        return; // 이미 로드되었으므로 초기화하지 않음
      }

      // ChannelIO 객체 초기화
      const ch = function () {
        ch.c(arguments);
      };

      ch.q = [];
      ch.c = function (args) {
        ch.q.push(args);
      };

      w.ChannelIO = ch;

      function initChannelIO() {
        if (w.ChannelIOInitialized) {
          return; // 이미 초기화된 경우 skip
        }

        w.ChannelIOInitialized = true;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';

        const x = document.getElementsByTagName('script')[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(script, x);
        }

        // 스크립트가 로드된 후 boot 호출
        script.onload = () => {
          window.ChannelIO('boot', {
            pluginKey: pluginKey,
          });
        };
      }

      if (document.readyState === 'complete') {
        initChannelIO();
      } else {
        w.addEventListener('DOMContentLoaded', initChannelIO);
        w.addEventListener('load', initChannelIO);
      }
    };

    loadChannelIO();

    // 컴포넌트가 언마운트될 때 cleanup 작업
    return () => {
      if (window.ChannelIO) {
        window.ChannelIO('shutdown');
      }
    };
  }, [pluginKey]); // 의존성 배열에 pluginKey 추가

  return <div id="channelio-widget-container"></div>;
};

export default ChannelIOWidget;

curl -i -X POST \
   -H "Content-Type:application/json" \
   -H "Authorization: i18next=en; consent_cookie={%22analytics_and_performance%22:{%22active%22:true%2C%22disabled%22:false}}; passport_csrf_token=641d47bb3ea65778c5fb39a0be288f4a; passport_csrf_token_default=641d47bb3ea65778c5fb39a0be288f4a; odin_tt=e3bcf510b234003c4c7e5cc84d0fd2df7d079774651aa4ef46538ec75edf36d26a70cf07adc852d1010842653df565e9992f7b4f7cfb2214e5b44cd8b82e4ffa; sid_guard=2fc73e5bfb5267120da0172290d970ca%7C1715685681%7C5184000%7CSat%2C+13-Jul-2024+11%3A21%3A21+GMT; uid_tt=be93f66f727e8221bc8e5a0dccc4fb6be00488a24449f061b8a4cb65e42e5649; uid_tt_ss=be93f66f727e8221bc8e5a0dccc4fb6be00488a24449f061b8a4cb65e42e5649; sid_tt=2fc73e5bfb5267120da0172290d970ca; sessionid=2fc73e5bfb5267120da0172290d970ca; sessionid_ss=2fc73e5bfb5267120da0172290d970ca; sid_ucp_v1=1.0.0-KDhkNzdkZDZlZWRkNjcxODdjMDYwOWNkMjdlMTJkOTM3NGM3NTU5N2YKIAiCiMno4YrS8mUQsZKNsgYY1J0fIAww_5CVrwY4CEASEAMaA3NnMSIgMmZjNzNlNWJmYjUyNjcxMjBkYTAxNzIyOTBkOTcwY2E; ssid_ucp_v1=1.0.0-KDhkNzdkZDZlZWRkNjcxODdjMDYwOWNkMjdlMTJkOTM3NGM3NTU5N2YKIAiCiMno4YrS8mUQsZKNsgYY1J0fIAww_5CVrwY4CEASEAMaA3NnMSIgMmZjNzNlNWJmYjUyNjcxMjBkYTAxNzIyOTBkOTcwY2E; store-idc=alisg; store-country-code=hk; store-country-code-src=uid; arcosite-lang=en; ttwid=1%7CmyLw8wI18f8Va3y15NMTIowIB5GgIRG7C-XBf0IlrNg%7C1715746802%7C5a1ec90d9acd6f44cebea6ce3c6cc93ab4d1db8acc2ebda3a1041b699578cfcc; s_v_web_id=verify_lw7bcgsf_mAtNDCAe_ttpT_4d8e_9lW5_cP50osUuW3GX; msToken=j8zyI-mRxBB_ajnRuzT_0NQThs99DycexRblDyiaUByiSnTgg1n0jY7lyMb-vn_YW3R0Ciy_mZK8gB1cwSdq7ztrXDQySay4-y2IfNWHAxjRKLuLzBGc; msToken=j8zyI-mRxBB_ajnRuzT_0NQThs99DycexRblDyiaUByiSnTgg1n0jY7lyMb-vn_YW3R0Ciy_mZK8gB1cwSdq7ztrXDQySay4-y2IfNWHAxjRKLuLzBGc'" \
   -d \
'{
  "stream": false,
  "model": "coze",
  "messages": [
    {
      "role":    "user",
      "content": "hi"
    }
  ]
}' \
 'http://127.0.0.1:8080/v1/chat/completions'

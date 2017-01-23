debug_online_proxy
=
debug_online_proxy is a http proxy for web developers.

It is used to replace an url to another url or a file, like fiddler's auto response.

Installation
-
install node.js  
then
```
npm install
```

Use Cases
-
edit config.js  

```
exports.replace = [
    {
                type : "file",
                        reg : /.*rtmpinplayer\.swf.*/ig,
                                filePath : "/Users/tianchi/flash/yinyuetai-startv-player/bin-release/RTMPInplayer.swf"
                                    },
                                        {
                                                    type : "url",
                                                            reg : /.*1.html.*/i,
                                                                    url : "http://192.168.1.207/index.html"
                                                                        }
                                                                        ];
                                                                        ```
                                                                        then run proxy.js
                                                                        ```
                                                                        node proxy.js
                                                                        ```

                                                                        The code is sample enough for programers, so read it yourself.

                                                                        About me
                                                                        -
                                                                        This is my first node.js program, Don't expect too much.  
                                                                        I majored in AR/VR and video player.

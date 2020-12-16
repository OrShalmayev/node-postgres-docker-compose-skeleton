(function(){
    window.onload = function() {
        console.log('window loaded')
         // Data type for storing a recording
        const recording = { events: [], startTime: -1, height: 0, width: 0 };

        // Record each type of event
        const handlers = [
            {
                eventName: "mousemove",
                handler: function handleMouseMove(e) {
                    console.log(e)
                    console.log('recording', {recording})
                    recording.events.push({
                    type: "mousemove",
                    x: e.pageX,
                    y: e.pageY,
                    time: Date.now()
                    });
                }
            },
            {
                eventName: "click",
                handler: function handleClick(e) {
                    recording.events.push({
                    type: "click",
                    target: e.target,
                    x: e.pageX,
                    y: e.pageY,
                    time: Date.now()
                    });
                }
            },
            {
                eventName: "keypress",
                handler: function handleKeyPress(e) {
                    recording.events.push({
                    type: "keypress",
                    target: e.target,
                    value: e.target.value,
                    keyCode: e.keyCode,
                    time: Date.now()
                    });
                }
            }
        ];

        // user entered the events listener page:
        recording.startTime = Date.now();
        recording.events = [];
        recording.height = window.innerHeight;
        recording.width = window.innerWidth;

        handlers.forEach(h=>{
            document.documentElement.addEventListener(h.eventName, h.handler, true);
        })

        window.addEventListener("beforeunload", function(){
            const http = new XMLHttpRequest();
            const url = `${window.location.href}store-events`;

            http.open('POST', url, true);
            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {//Call a function when the state changes.
                if(http.readyState == 4 && http.status == 200) {
                    alert(http.responseText);
                }
            }
            console.log('user leaved the page')
            http.send(`data=${JSON.stringify(recording.events)}&started_at=${recording.startTime}&width=${recording.width}&height=${recording.height}&ended_at=${Date.now()}`);
        });

    }//END window.omload
})();
//javascript data for index.html


// Body container is declared here with querySelecrtor
const container = document.querySelector('body');




//Calling data-json here:
const renderThreads = async () => {

    let uri = 'http://localhost:3000/threads';
    const resp = await fetch(uri);
    const threads = await resp.json();
    

// Here i declare the variables i would need further:
    let elements = '';
    let currentMarkUp = '';
    let offset = 0;
    let dynamicStyles = '';
    let priorityClass = '';
    let messageGroupState = 'expanded';

    //Here i begin to loop each thread from i = 0
    //Offset is declared in the loop, so it can be reseted for very iteration going through all threads.
    //then with ternary operator i declare the thread length or lets say - if there is more/equal to, 2 message in a group. The group will be collapsed, otherwise is expanded.
    //Div class is declared for the message group with the var CurrentMarkUp
    threads.forEach((thread, i) => {

        offset = 0;
        messageGroupState = thread.length >= 2 ? 'collapsed' : 'expanded';
        currentMarkUp = `<div class="message-group ${messageGroupState}">`;


        // then i iterate for each message in the group/thread
        // var PriorityClass declares the key score, which will define the color grading
        // var DynamicStyles begins from first index and declares the offset which is currently 0.
        // var currentMarkUp iterates every message from the message-group with the two vars already mentioned above.
        
        thread.forEach((message, index) => {

            priorityClass = message.score <= 5 ? 'low' : 'high';
            dynamicStyles = index === 0 ? `z-index: ${offset}` : `top: ${offset}px; left: ${offset}px; z-index: -${offset}`;

            currentMarkUp += `<div class="message ${priorityClass}" style="${dynamicStyles}">`;

            // Below the ribbon is declared. It takes the thread lenght to be visible and if it is collapsed.
            if(messageGroupState === 'collapsed' && index === 0) {
                currentMarkUp += `<div class="ribbon">${thread.length} messages</div>`;
            }

            //Here is declared the body messages + date and team. And interates offset every time with 10.
            currentMarkUp +=    `<div class="message-body">
                                    <h1>${message.subject}</h1>
                                     <h2>${message.question}</h2>
                                     <div class = "blabla-text"> 
                                    <p><small>${message.text}</small></p>
                                    </div>
                                </div>
                                <div class="message-meta">
                                    <p><small>${message.team}</small></p>
                                    <p><small>${message.created_at}</small></p>
                                </div>
                                
                                </div>`; // closes div on row 42 (currentMarkUp)
            offset += 10;

        });
        elements += currentMarkUp + '</div>'; // closes div on row 59 (currentMarkUp)

     
    });

    container.innerHTML = elements;


    // Start of event handler

    let allMessageGroupEls = document.querySelectorAll('.message-group');
    let ribbonEl;

    // Here i declare again new variables which calls all message-groups and ribbons
    // Click event is added if we have message-group and ribbon
    //for evey expanded message-group i remove the style attribute so the ribbon will dissapear.

    allMessageGroupEls.forEach( messageGroup => {
        ribbonEl = messageGroup.querySelector('.ribbon');
        if(ribbonEl){
            messageGroup.addEventListener('click',()=> {
                messageGroup.querySelectorAll('.message')?.forEach(messageEl =>{
                    messageEl.removeAttribute('style');
                });
    
                messageGroup.classList.remove('collapsed');
                messageGroup.classList.add('expanded');
            });
        }
    });
}

window.addEventListener('DOMContentLoaded', () => renderThreads());
  
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

chrome.runtime.sendMessage({path: {19: "./icon_19.png", 38: "./icon_38.png"}});

function noscroll() {
    window.scrollTo( 0, 0 );
}


$(document).ready(function () {

    let onSecretFound = function () {
        localStorage.setItem('refused', 0);
        location.reload();
    };

    let $document = $(this);

    let refused = localStorage.getItem('refused') || 0;

    $(window).on('keyup', function(e) {
        pressed.push(e.key);
        pressed.splice(-secret.length - 1, pressed.length - secret.length);

        if(pressed.join('').includes(secret)) {
            onSecretFound()
        }
    });

    let autoscrollInterval, $addedPeopleTextCount, personsNb;

    let addedPeople = [];

    let pressed = [];
    let secret = "pardon";

    let aside = $('.mn-connections-summary');

    let messageCheatRemoved = `<p>Dommage, tu vas devoir t'amuser à rajouter tous ces gens à la main, à moins de trouver le code secret à taper sur la page (il fallait pas dire non 😔)</p>`;
    let messageCheatAccepted = `<p style="margin-bottom: 10px;">Ok. Combien de personnes désirez-vous rajouter environ ?</p>`;
    let choices = `
    <button id="choice-number-friends" data-count="100" class="mn-abi-form__primary-btn button-secondary-medium mb2">~100</button>
    <button id="choice-number-friends" data-count="500" class="mn-abi-form__primary-btn button-secondary-medium mb2">~500</button>
    <button id="choice-number-friends" data-count="1000" class="mn-abi-form__primary-btn button-secondary-medium mb2">~1000</button>
    <button id="choice-suprise" class="mn-abi-form__primary-btn button-secondary-medium mb2">Surprends moi</button>
    `;

    let bloc = `
    <section id="ember1031" class="mn-pymk-list Elevation-2dp ember-view">
        <h3 class="mn-pymk-list__header Sans-19px-black-70%-open">
          Auto LinkedIn
        </h3>
        <p id="intro-cheat" class="mn-abi-form__legal-container mn-abi-form__legal-container--custom-background Sans-13px-black-55% pv4">Voulez-vous ajouter des contacts automatiquement ?</p>
        <div style="padding: 10px;">
            <div id="buttons">
                <button id="cheat-on" class="mn-abi-form__primary-btn button-secondary-medium mb2">Oui</button>
                <button id="cheat-refuse" class="mn-abi-form__primary-btn button-secondary-medium mb2">Non</button>
            </div>
        </div>
    </section>
`;

    aside.append(bloc);

    let buttonsContainer = $('#buttons');


    $('#cheat-refuse').on('click', function () {
        $('p#intro-cheat').remove();
        localStorage.setItem('refused', 1);
        buttonsContainer.animate({opacity: 0}, {
            duration: 300, complete: () => {
                buttonsContainer.find('*').remove();
                buttonsContainer.append(messageCheatRemoved);
                buttonsContainer.animate({opacity: 1}, 300);
            }
        });
    });


    if(refused === "1") {
        $('#cheat-refuse').click();
    }

    let cheatOnClickHandler = function () {
        addedPeople = [];
        $('#intro-cheat').remove();
        buttonsContainer.animate({opacity: 0}, {
            duration: 300, complete: () => {
                buttonsContainer.find('*').remove();
                buttonsContainer.append(messageCheatAccepted);
                buttonsContainer.append(choices);
                buttonsContainer.animate({opacity: 1}, 300);
            }
        });
    };

    $('#cheat-on').on('click', cheatOnClickHandler);

    $document.on('click', '#retry-cheat', cheatOnClickHandler);

    $document.on('click', '#choice-number-friends, #choice-suprise', function () {
        let $this = $(this);
        personsNb = $this.data('count') || randomIntFromInterval(1001, 10000);
        autoscrollInterval = setInterval(autoscroll, 1000, personsNb);
        toggleCheatDialog();
        buttonsContainer.animate({opacity: 0}, {
            duration: 300, complete: () => {
                buttonsContainer.find('*').remove();
                let message = `
            <p class="mn-abi-form__legal-container 
            mn-abi-form__legal-container--custom-background Sans-13px-black-55% pv4">
            Ok je vais t'ajouter donc environ ${personsNb} personnes. Là, j'en ai rajouté <span style="font-weight: 700" class="count">0</span>...
            </p>
`;
                buttonsContainer.append(message);
                buttonsContainer.animate({opacity: 1}, 300);
                $addedPeopleTextCount = buttonsContainer.find('span.count');
            }
        });
    });

    function toggleCheatDialog() {
        let modal = $('.cheat-modal');
        if(modal.length > 0) {
            $('.application-outlet').removeClass('blur');
            modal.animate({opacity: 0}, { duration: 1500, complete: function() {
                modal.remove();
                window.removeEventListener('scroll', noscroll);
            } });
        } else {
            window.addEventListener('scroll', noscroll);
            let modalTemplate = `
            <div class="cheat-modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" stroke="#fff">
                    <g fill="none" fill-rule="evenodd" stroke-width="2">
                        <circle cx="22" cy="22" r="19.8745">
                            <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                            <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="22" cy="22" r="15.9767">
                            <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                            <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
                        </circle>
                    </g>
                </svg>
                <h2>Je travaille, ne t'en fais pas pour moi ! Je disparais dès que j'ai finis, promis 👌</h2>
                <h3><span class="count">0</span> demandes envoyées sur les ${personsNb} demandés</h3>
            </div>
        `;
            $('.application-outlet').addClass('blur');
            $('body').prepend(modalTemplate);
        }
    }

    function autoscroll(max) {
        if (addedPeople.length < max) {
            $document.scrollTop($document.height());
            addPeople();
        }
        else {
            toggleCheatDialog();
            clearInterval(autoscrollInterval);
            buttonsContainer.find('*').remove();
            let message = `
            <p class="mn-abi-form__legal-container 
            mn-abi-form__legal-container--custom-background Sans-13px-black-55% pv4">
            Travail terminé. ${addedPeople.length} nouvelles personnes vont avoir la chance de t'avoir comme nouvel ami. Attends simplement qu'ils t'acceptent !
            </p>
            <button style="margin-top: 10px;" id="retry-cheat" class="mn-abi-form__primary-btn button-secondary-medium mb2">Refais moi rêver</button>
`;
            buttonsContainer.append(message);
        }
    }

    function addPeople() {
        let peoples = $('.mn-pymk-list ul li');
        peoples.each(function () {
            let name = $(this).find('.mn-person-info__name').text();
            $(this).find('button[data-control-name="invite"]').click();
            if(!addedPeople.includes(name)) addedPeople.push(name);
            $addedPeopleTextCount.text(addedPeople.length);
            $('.cheat-modal h3 span.count').text(addedPeople.length);
        })
    }

});
    $.mbAudio.sounds = {

            backgroundSprite: {
                id: "backgroundSprite",
                ogg: "sounds/BGM/01_OnceUponATime.ogg",
                mp3: "sounds/BGM/01_OnceUponATime.mp3",
                sprite:{
                    intro : {id: "intro", start: 0, end: 60, loop: false},
                    floweyNormal: {id: "floweyNormal", start: 60, end: 77.470, loop: true}
                }
            },

            effectSprite: {
                id: "effectSprite",
                ogg: "sounds/SFX/sfx.ogg",
                mp3: "sounds/SFX/sfx.mp3",
                sprite:{
                    title: {id: "title", start: 0, end: 3, loop: false},
                    typeWriting: {id: "typeWriting", start: 5, end: 7, loop: false}
                }
            }
        };


        function audioIsReady(){
            setTimeout(function(){
                 //$('#buttons').fadeIn();
                 //$("#loading").hide();

                /*
            if(isStandAlone || !isDevice)
                //$.mbAudio.play('backgroundSprite',"intro");
*/
            },3000);

        }

        $(document).on("initAudio", function () {
            //otherwise sound is initialized on the first tap loosing time and UX
             $.mbAudio.pause('effectSprite', audioIsReady);
             //$('#start').hide();
             //$("#loading").show();
        });
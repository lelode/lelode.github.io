    $.mbAudio.sounds = {

            backgroundSprite: {
                id: "backgroundSprite",
                ogg: "sounds/BGM/01_OnceUponATime.ogg",
                mp3: "sounds/BGM/01_OnceUponATime.mp3",
                sprite:{
                    intro     : {id: "intro", start: 0, end: 60, loop: true},
                    //levelIntro: {id: "levelIntro", start: 60, end: 77.470, loop: true},
                    //tellStory: {id: "tellStory", start: 80, end: 116.975, loop: true},
                    //level1    : {id: "level1", start: 0, end: 60, loop: true},
                }
            },

            effectSprite: {
                id: "effectSprite",
                ogg: "sounds/SFX/typeWriting.ogg",
                mp3: "sounds/SFX/typeWriting.mp3",
                //example of sprite
                sprite:{
                    typeWriting: {id: "typeWriting", start: 0, end: 1.3, loop: false},
                    //great : {id: "great", start: 5, end: 8, loop: false},
                    //divine: {id: "divine", start: 10, end: 11.6, loop: false},
                    //wow   : {id: "wow", start: 15, end: 20, loop: false},
                    //levelIntro    : {id: "levelIntro", start: 20, end: 25, loop: false},
                    //levelCompleted: {id: "levelCompleted", start: 25, end: 30, loop: false},
                    //subLevelLost: {id: "subLevelLost", start: 35, end: 38.1, loop: false},
                    //subLevelWon : {id: "subLevelWon", start: 30, end: 31.9, loop: false},
                    //gameWon : {id: "gameWon", start: 30, end: 31.9, loop: false}
                }
            }
        };


        function audioIsReady(){

            setTimeout(function(){
                $('#buttons').fadeIn();
                $("#loading").hide();

            if(isStandAlone || !isDevice)
                $.mbAudio.play('backgroundSprite',"intro");

            },3000);

        }

        $(document).on("initAudio", function () {

            //otherwise sound is initialized on the first tap loosing time and UX
             $.mbAudio.pause('effectSprite', audioIsReady);

            $('#start').hide();
            $("#loading").show();
        });